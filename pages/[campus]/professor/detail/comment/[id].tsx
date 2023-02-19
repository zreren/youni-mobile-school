import React, { useMemo, useState } from 'react';
import CScoreCard from '@/components/Rating/CScoreCard';
import Super from '../surper.svg';
import Like from './Like.svg';
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
import FooterDiscussionInput from '@/components/Input/FooterDiscussionInput';
import useLocalStorage from '../../../../../hooks/useStore';
export default function userComment() {
  const router = useRouter();
  const [reRender, setReRender] = useState(false);
  const like = async (id) => {
    const data = await useRequest.post(`/api/comment/like`, {
      id: id,
    });
    // console.log(data.message, "message")
    // if(data.message){
    // setReRender(!reRender);
    // }
  };
  const [language, setLanguage] = useLocalStorage('language', 'en');
  const { id } = router.query;
  const { data, error } = useFetch(`/evaluation/detail?id=${id}`, 'get');
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
    const defaultLike = data?.liked;
    const handleLike = (e) => {
      setLike(!e);
      like(id);
    };
    const likeCount = useMemo(() => {
      if (defaultLike && !clike) {
        return Number(data?.likeCount) - 1;
      }
      if (!defaultLike && clike) {
        return Number(data?.likeCount) + 1;
      }
      return Number(data?.likeCount);
      // if(defaultLike && clike){
      //   return Number(data?.likeCount);
      // }

    }, [clike]);
    return (
      <div className="w-full flex justify-between mt-2 mb-2">
        <div className="flex items-center space-x-2">
          <div className="text-xs text-lightGray">4小时前</div>
          <div className="text-xs font-semibold text-secondGray">回复</div>
        </div>
        <div
          className="flex space-x-1 items-center"
          onClick={() => {
            handleLike(clike);
          }}
        >
          {clike ? <LikeActive></LikeActive> : <Like></Like>}

          <div className=" text-xs text-[#A9B0C0]">
            {likeCount || 0}
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
                      {expand ? '收起' : `查看全部 ${item?.children?.length} 条回复`}
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
    <>
      <div className="bg-white p-4 rounded-lg  mb-4">
        <>
        <div className={"fixed  inset-0 top-0 z-50 flex items-center   w-full p-5 shadow h-11 bg-gray-50 "}>
        <div
          onClick={() => {
           router.back();
          }}
        >
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.19531 0.328613L7.13812 1.27142L2.42408 5.98547L7.13812 10.6995L6.19531 11.6423L1.0099 6.45691C1.00988 6.45689 1.00986 6.45687 1.48127 5.98547L1.0099 6.45691L0.538458 5.98547L6.19531 0.328613Z"
              fill="#1D2129"
            />
          </svg>
        </div>
        <div>
        <div className="flex items-center  ml-2">
          <div className="avatar placeholder">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-6">
              {data?.data?.student ? (
                <Image
                  placeholder="blur"
                  objectFit="cover"
                  className="rounded-full"
                  blurDataURL={`${Cons.BASEURL}${data?.data?.student?.avatar}`}
                  width={'24px'}
                  height={'24px'}
                  src={`${Cons.BASEURL}${data?.data?.student?.avatar}`}
                />
              ) : null}
            </div>
          </div>
          <div>
            <div className="text-sm ml-2 font-medium max-w-8 text-blueTitle">
              {data?.data?.student?.nickName}
            </div>
            <div className="text-gray-200 text-xs ml-2">
              {data?.data?.student?.education?.year} ·{' '}
              {data?.data?.student?.education?.major}
            </div>
          </div>
        </div>
        </div>
      </div>
      <div className="mb-11"></div>
        </>
        {/* {reRender} */}
        {/* <div className="flex items-center mb-4">
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
        </div> */}
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
                    {data?.data?.course.ename} {data?.data?.course.code}
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
        </div>
        <div className="h-1 m-0 divider opacity-30"></div>
        <div className="space-y-8 mt-4 mb-20">
          <PostDiscussionInput></PostDiscussionInput>
          <Discussion data={data?.data?.comments}></Discussion>
        </div>
      </div>
     <div className='fixed bottom-12 w-full'>
     <FooterDiscussionInput method={'course'} send={()=>{}} data={data?.data}></FooterDiscussionInput>
     </div>
    </>
  );
}
