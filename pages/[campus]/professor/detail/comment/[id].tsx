import React, { useMemo, useState } from 'react';
import CScoreCard from '@/components/Rating/CScoreCard';
import Super from '../surper.svg';
import Like from '../Like.svg';
import DisLike from '../disLike.svg';
import LikeActive from './like-active.svg';
import Comments from '../Comments.svg';
import Discussion from '../discussion.svg';
import Union from '../Union.svg';
import PostDiscussionInput from '@/components/Input/PostDiscussionInput';
import Header from '@/components/Header';
import useRequest from '@/libs/request';
import useFetch from '../../../../../hooks/useFetch';
import { useRouter } from 'next/router';
import Image from 'next/image';
import useLocalStorage from '../../../../../hooks/useStore';
export default function userComment() {
  const router = useRouter();
  const [reRender, setReRender] = useState(false);
  const like = async (id) => {
    const data = await useRequest.post(`/api/comment/like`, {
      id: id,
    });
    // console.log(data.message,"message")
    // if(data.message){
    setReRender(!reRender);
    // }
  };
  const [language, setLanguage] = useLocalStorage('language', 'en');
  const { id } = router.query;
  const { data, error } = useFetch(`/evaluation/detail?id=${id}&t=${new Date()}`, 'get');
  const comments = [
    {
      id: 1,
      createdAt: '2022-12-07',
      updatedAt: '2022-12-07',
      content: 'This is the first comment',
      children: [
        {
          id: 2,
          createdAt: '2022-12-07',
          updatedAt: '2022-12-07',
          content: 'This is the first reply to the first comment',
          children: [],
          parent: 1,
          evaluation: {},
          student: {},
          deletedAt: null,
        },
        {
          id: 3,
          createdAt: '2022-12-07',
          updatedAt: '2022-12-07',
          content: 'This is the second reply to the first comment',
          children: [],
          parent: 1,
          evaluation: {},
          student: {},
          deletedAt: null,
        },
        {
          id: 4,
          createdAt: '2022-12-07',
          updatedAt: '2022-12-07',
          content: 'This is the third reply to the first comment',
          children: [],
          parent: 1,
          evaluation: {},
          student: {},
          deletedAt: null,
        },
      ],
      parent: null,
      evaluation: {},
      student: {},
      deletedAt: null,
    },
    {
      id: 5,
      createdAt: '2022-12-07',
      updatedAt: '2022-12-07',
      content: 'This is the second comment',
      children: [
        {
          id: 6,
          createdAt: '2022-12-07',
          updatedAt: '2022-12-07',
          content: 'This is the first reply to the second comment',
          children: [],
          parent: 5,
          evaluation: {},
          student: {},
          deletedAt: null,
        },
        {
          id: 7,
          createdAt: '2022-12-07',
          updatedAt: '2022-12-07',
          content: 'This is the second reply to the second comment',
          children: [],
          parent: 5,
          evaluation: {},
          student: {},
          deletedAt: null,
        },
        {
          id: 8,
          createdAt: '2022-12-07',
          updatedAt: '2022-12-07',
          content: 'This is the third reply to the second comment',
          children: [],
          parent: 5,
          evaluation: {},
          student: {},
          deletedAt: null,
        },
      ],
      parent: null,
      evaluation: {},
      student: {},
      deletedAt: null,
    },
  ];
  const DiscussionComponentFooter = (props) => {
    const { data, id } = props;
    const [clike, setLike] = useState(data?.liked);
    const handleLike = (e) => {
      setLike(!e);
      like(id);
    };
    const likeCount = useMemo(() => {
      if (clike) {
        return Number(data?.likeCount) - 1;
      } else {
        return Number(data?.likeCount) + 1;
      }
    }, [clike]);
    return (
      <div className="w-full flex justify-between mt-2 mb-2">
        <div className="flex items-center space-x-2">
          <div className="text-xs text-lightGray">4小时前</div>
          <div className="text-xs font-semibold text-secondGray">回复</div>
        </div>
        <div
          className="flex space-x-1"
          onClick={() => {
            handleLike(clike);
          }}
        >
          {clike ? <LikeActive></LikeActive> : <Like></Like>}

          <div className="flex items-center text-xs text-[#A9B0C0]">
            {data?.likeCount || 0}
          </div>
          {/* <div className="flex items-center text-xs">3</div> */}
        </div>
      </div>
    );
  };
  const DiscussionComponent = ({ children, data }) => {
    return (
      <div className="w-full mt-2 flex justify-start space-x-3">
        <div className="rounded-full">
          {data?.student?.avatar ? (
            <Image
              placeholder="blur"
              objectFit="cover"
              blurDataURL={`${Cons.BASEURL}${data?.student.avatar}`}
              width={'24px'}
              height={'24px'}
              className="rounded-full"
              src={`${Cons.BASEURL}${data?.student?.avatar}`}
            />
          ) : (
            <span className="text-3xl">K</span>
          )}
        </div>
        <div className="w-full pr-4">
          <div className="font-medium">{data?.student.nickName}</div>
          <div className="text-xs text-secondGray mt-1">
            {data?.student?.education?.year} · {data?.student?.education?.major}
          </div>
          <div className="text-sm mt-1">{data?.content}</div>
          <DiscussionComponentFooter
            id={data?.id}
            data={data?.interactInfo}
          ></DiscussionComponentFooter>
          <div>{children}</div>
        </div>
      </div>
    );
  };
  const Discussion = (props) => {
    const { data } = props;
    return (
      <div>
        {data?.map((item) => {
          const [expand, setExpand] = useState(false);
          return (
            <div>
              <DiscussionComponent data={item}>
                <>
                  {expand
                    ? item?.children?.map((item) => {
                        return (
                          <div className="w-full mt-2 flex justify-start space-x-3">
                            <div className="rounded-full">
                              {item?.student?.avatar ? (
                                <Image
                                  placeholder="blur"
                                  objectFit="cover"
                                  blurDataURL={`${Cons.BASEURL}${item?.student.avatar}`}
                                  width={'24px'}
                                  height={'24px'}
                                  className="rounded-full"
                                  src={`${Cons.BASEURL}${item?.student?.avatar}`}
                                />
                              ) : (
                                <span className="text-3xl">K</span>
                              )}
                            </div>
                            <div className="w-full">
                              <div className="font-medium">
                                {item.student.nickName}
                              </div>
                              <div className="text-xs text-secondGray mt-1">
                                {item?.student?.education?.year || '未认证'} ·{' '}
                                {item.student?.education?.major || '未认证'}
                              </div>
                              <div className="text-sm mt-1 w-full">
                                {item.content}
                              </div>
                              <DiscussionComponentFooter
                                id={item?.id}
                                data={item?.interactInfo}
                              ></DiscussionComponentFooter>
                            </div>
                          </div>
                        );
                      })
                    : item?.children?.slice(0, 2).map((item) => {
                        return (
                          <div className="w-full mt-2 flex justify-start space-x-3">
                            <div className="rounded-full">
                              {item?.student?.avatar ? (
                                <Image
                                  placeholder="blur"
                                  objectFit="cover"
                                  blurDataURL={`${Cons.BASEURL}${item?.student.avatar}`}
                                  width={'24px'}
                                  height={'24px'}
                                  className="rounded-full"
                                  src={`${Cons.BASEURL}${item?.student?.avatar}`}
                                />
                              ) : (
                                <span className="text-3xl">K</span>
                              )}
                            </div>
                            <div className="w-full">
                              <div className="font-medium">
                                {item?.student?.nickName}
                              </div>
                              <div className="text-xs text-secondGray mt-1">
                                {item.student?.education?.year} ·{' '}
                                {item?.student?.education?.major || '未认证'}
                              </div>
                              <div className="text-sm mt-1 w-full">
                                {item?.content}
                              </div>
                              <DiscussionComponentFooter
                                id={item?.id}
                                data={item?.interactInfo}
                              ></DiscussionComponentFooter>
                            </div>
                          </div>
                        );
                      })}
                </>
                <div className="flex space-x-3">
                  <div>
                    <div className="w-6 h-6"></div>
                  </div>
                  {item?.children?.length > 2 ? (
                    <div
                      className="font-semibold text-primary text-xs"
                      onClick={() => [setExpand(!expand)]}
                    >
                      {expand ? '收起' : '查看全部 3 条回复'}
                    </div>
                  ) : null}
                </div>
              </DiscussionComponent>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div className="bg-white p-4 rounded-lg  mb-4">
      <Header></Header>
      {/* {reRender} */}
      <div className="flex items-center mb-4">
        <div className="avatar placeholder">
          <div className="bg-neutral-focus text-neutral-content rounded-full w-14">
            {data?.data?.student ? (
              <Image
                placeholder="blur"
                objectFit="cover"
                className="rounded-full"
                blurDataURL={`${Cons.BASEURL}${data?.data?.student?.avatar}`}
                width={'80px'}
                height={'80px'}
                src={`${Cons.BASEURL}${data?.data?.student?.avatar}`}
              />
            ) : null}
          </div>
        </div>
        <div>
          <div className="text-lg ml-4 font-medium max-w-8 text-blueTitle">
            {data?.data?.student?.nickName}
          </div>
          <div className="text-gray-200 ml-4">
            {data?.data?.student?.education?.year} ·{' '}
            {data?.data?.student?.education?.major}
          </div>
        </div>
      </div>
      <div>
        <div className="w-full   rounded-t-xl org-gradient2 relative h-8">
          <Super className="absolute right-1 bottom-0 z-10"></Super>
          <Union className="absolute right-0 bottom-0"></Union>
          <div className="pl-4 pt-2 course-evaluation">课程评价</div>
        </div>
        <div className="bg-gradient-to-b from-yellow-50  p-4">
          <div className="flex justify-between items-center comment-detail-header to-yellow-50 w-full ">
            <div>
              <div className="flex space-x-2 mb-1 mt-1">
                <div className="text-gray-300">课程名称:</div>
                <div className="text-blueTitle">
                  {data?.data?.course[language]} 1000
                </div>
              </div>
              <div className="flex space-x-2 mb-1 mt-1">
                <div className="text-gray-300">最终成绩:</div>
                <div className="text-blueTitle">{data?.data?.finalGrade}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <CScoreCard
          title={'内容评分'}
          score={data?.data?.contentRating}
          type={2}
        ></CScoreCard>
        <CScoreCard
          title={'作业评分'}
          score={data?.data?.homeworkRating}
          type={2}
        ></CScoreCard>
        <CScoreCard
          title={'考试评分'}
          score={data?.data?.examRating}
          type={2}
        ></CScoreCard>
      </div>
      <div>
        <div className="mt-2 mb-2">
          {data?.data?.content ||
            '这门课需要大量的练习和时间，但有可能做得好。'}
        </div>
        {/* <div className="pb-2">
          <div className="text-sm font-bold text-blueTile">课程内容</div>
          <div className="text-sm tracking-wide	 font-extralight  text-blueTile leading-normal">
            这是普通化学序列的第一部分，在第一单元中涵盖了CHM1025的大部分内容。
          </div>
        </div>
        <div className="pb-2">
          <div className="text-sm font-bold text-blueTile">对课程的评价</div>
          <div className="text-sm tracking-wide	 font-extralight text-blueTile leading-normal">
            哈里斯博士是一位乐于助人、招人喜欢的教授。比起他的讲座视频，我更喜欢阅读教科书和额外的在线资源，但在面授和办公时间，他很细心，知识渊博。
          </div>
        </div>
        <div className="pb-2">
          <div className="text-sm font-bold text-blueTile">建议</div>
          <div className="text-sm tracking-wide	 font-extralight	 text-blueTile leading-normal">
            你不需要Studyedge来做好这门课，但无论如何，你必须投入时间来学习材料并学好它。如果你有一段时间没有上过化学课（对我来说是高二），我建议你上CHM1025。我的日常工作是使用讲座幻灯片、教科书、讲座视频和/或其他在线资源来做笔记，并在亲自授课前学习材料（我是在翻转课堂部分）。我有一个单独的笔记本，在讲课时做题。对于家庭作业，我记下了我所纠结的问题，并重新做了作业，直到我全部做对。我还在每个单元的谷歌文档中记录了我可能会忘记的提示和信息。为了准备考试，我复习了我在考试中遇到的问题/章节。
          </div>
        </div> */}
      </div>
      {/* <div className="flex justify-between mt-3">
        <div className="flex space-x-4 ">
          <div className="flex">
            <Like></Like>
            <div className="text-xs text-gray-300">600</div>
          </div>
          <div className="flex">
            <DisLike></DisLike>
            <div className="text-xs text-gray-300">600</div>
          </div>
          <div className="flex">
            <Comments></Comments>
            <div className="text-xs text-gray-300">600</div>
          </div>
        </div>
      </div> */}
      <div className="h-1 m-0 divider opacity-30"></div>
      <div className="space-y-8 mt-4">
        <PostDiscussionInput></PostDiscussionInput>
        <Discussion data={data?.data?.comments}></Discussion>
      </div>
    </div>
  );
}
