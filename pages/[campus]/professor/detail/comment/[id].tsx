import React, { useEffect, useMemo, useState } from 'react';
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
import { useDispatch } from 'react-redux';
// import Discussion from '@/components/Discussion/index'
import GDiscussionComponent from '@/components/Discussion';
import { selectAuthState, setAuthState, selectOpen } from '@/stores/authSlice';
import { Toast } from 'react-vant';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function userComment() {
  const router = useRouter();
  const [reRender, setReRender] = useState(false);
  const like = async (id) => {
    const data = await useRequest.post(`/api/comment/like`, {
      id: id,
    });
  };
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAuthState(true));
  }, []);
  const [language, setLanguage] = useLocalStorage('language', 'en');
  const { id } = router.query;
  const { data, error } = useFetch(`/evaluation/detail?id=${id}`, 'get');
  const { data: _commentData, mutate } = useFetch('/comment/list', 'page', {
    id: data?.data?.id,
    pageSize: 10,
    type: 3,
  });
  const commentData = useMemo(
    () =>
      _commentData
        ? commentData
          ? [...commentData].concat(_commentData)
          : [].concat(..._commentData)
        : [],
    [_commentData, data],
  );
  React.useEffect(() => {
    console.log(commentData, 'commentData');
  }, [commentData]);
  useEffect(() => {
    mutate();
  }, [data?.data?.id]);
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
        return Number(data?.interactInfo?.likeCount) - 1;
      }
      if (!defaultLike && clike) {
        return Number(data?.interactInfo?.likeCount) + 1;
      }
      return Number(data?.interactInfo?.likeCount);
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

          <div className=" text-xs text-[#A9B0C0]">{likeCount || 0}</div>
          {/* <div className="flex items-center text-xs">3</div> */}
        </div>
      </div>
    );
  };
  const DiscussionComponent = ({ children, data }) => {
    return (
      <div className="w-full mt-2 flex justify-start space-x-3">
        <div className="rounded-full">
          {data?.user?.avatar ? (
            <Image
              placeholder="blur"
              objectFit="cover"
              blurDataURL={`${Cons.BASEURL}${data?.user.avatar}`}
              width={'24px'}
              height={'24px'}
              className="rounded-full"
              src={`${Cons.BASEURL}${data?.user?.avatar}`}
            />
          ) : null}
        </div>
        <div className="w-full pr-4">
          <div className="font-medium">{data?.user.nickName}</div>
          <div className="text-xs text-secondGray mt-1">
            {data?.user?.education?.year} · {data?.user?.education?.major}
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
                              {item?.user?.avatar ? (
                                <Image
                                  placeholder="blur"
                                  objectFit="cover"
                                  blurDataURL={`${Cons.BASEURL}${item?.user.avatar}`}
                                  width={'24px'}
                                  height={'24px'}
                                  className="rounded-full"
                                  src={`${Cons.BASEURL}${item?.user?.avatar}`}
                                />
                              ) : null}
                            </div>
                            <div className="w-full">
                              <div className="font-medium">
                                {item?.user?.nickName}
                              </div>
                              <div className="text-xs text-secondGray mt-1">
                                {item?.user?.education?.year || '未认证'} ·{' '}
                                {item.user?.education?.major || '未认证'}
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
                              {item?.user?.avatar ? (
                                <Image
                                  placeholder="blur"
                                  objectFit="cover"
                                  blurDataURL={`${Cons.BASEURL}${item?.user.avatar}`}
                                  width={'24px'}
                                  height={'24px'}
                                  className="rounded-full"
                                  src={`${Cons.BASEURL}${item?.user?.avatar}`}
                                />
                              ) : null}
                            </div>
                            <div className="w-full">
                              <div className="font-medium">
                                {item?.user?.nickName}
                              </div>
                              <div className="text-xs text-secondGray mt-1">
                                {item.user?.education?.year} ·{' '}
                                {item?.user?.education?.major || '未认证'}
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
                      {expand
                        ? t('收起')
                        : `${t('查看全部')}${item?.children?.length}${t(
                            '条回复',
                          )})`}
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
  const inputRef = React.useRef(null);
  const focusInput = () => {
    inputRef.current.focus();
  };

  /**
   * @description 发送评论
   * @param e 评论内容
   */
  const sendComment = async (e) => {
    const { data } = await useRequest.post('/api/evaluation/comment', {
      id: id,
      content: e,
    });
    if (data?.message) {
      Toast.success(t('评论成功'));
      mutate();
    }
  };
  /**
   *
   * @param comment 评论内容
   * @param id 当父id不存在时，id为当前评论id，否则为父id
   * @param pid 父id
   */
  const sendChild = async (comment, id, pid) => {
    const { data } = await useRequest.post('/api/comment/comment', {
      pid: !pid ? id : pid,
      replyId: !pid ? null : id,
      content: comment,
    });
    if (data?.message) {
      Toast.success(t('评论成功'));
      mutate();
    }
  };
  const [commentChild, setCommentChild] = useState({
    id: null,
    user: null,
    pid: null,
  });
  const commentComment = (e) => {
    console.log(e, 'setCommentChild');
    setCommentChild(e);
  };
  function FooterDiscussionInputChild(props) {
    const [comment, setComment] = useState<string>('');
    const { user, id, pid } = props;
    const send = () => {
      props.send(comment, id, pid);
      setComment('');
    };
    return (
      <div className="sticky  z-30 bottom-10 flex   items-center w-full p-5 bg-white h-[60px]">
        <input
          placeholder={`${t("回复")}${user?.nickName}`}
          value={comment}
          className="px-1 pl-4 w-full   h-9 bg-[#F7F8F9] rounded-full"
          onChange={(e) => {
            setComment(e.target.value);
          }}
        ></input>

        <div
          className="text-sm text-[#798195] whitespace-nowrap"
          onClick={() => {
            send();
          }}
        >
          {t("发送")}
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="bg-white p-4 rounded-lg  mb-4">
        <>
          <div
            className={
              'fixed  inset-0 top-0 z-50 flex items-center   w-full p-5 shadow h-11 bg-gray-50 '
            }
          >
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
                    {data?.data?.user ? (
                      <Image
                        placeholder="blur"
                        objectFit="cover"
                        className="rounded-full"
                        blurDataURL={`${Cons.BASEURL}${data?.data?.user?.avatar}`}
                        width={'24px'}
                        height={'24px'}
                        src={`${Cons.BASEURL}${data?.data?.user?.avatar}`}
                      />
                    ) : null}
                  </div>
                </div>
                <div>
                  <div className="text-sm ml-2 font-medium max-w-8 text-blueTitle">
                    {data?.data?.user?.nickName}
                  </div>
                  <div className="text-gray-200 text-xs ml-2">
                    {data?.data?.user?.education?.year} ·{' '}
                    {data?.data?.user?.education?.major}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-11"></div>
        </>
        <div>
          <div className="w-full   rounded-t-xl org-gradient2 relative h-8">
            <Super className="absolute right-1 bottom-0 z-10"></Super>
            <Union className="absolute right-0 bottom-0"></Union>
            <div className="pl-4 pt-2 course-evaluation">{t('课程评价')}</div>
          </div>
          <div className="bg-gradient-to-b from-yellow-50  p-4">
            <div className="flex justify-between items-center comment-detail-header to-yellow-50 w-full ">
              <div>
                <div className="flex space-x-2 mb-1 mt-1">
                  <div className="text-gray-300">{t('课程名称')}: </div>
                  <div className="text-blueTitle">
                    {data?.data?.course.code}
                  </div>
                </div>
                <div className="flex space-x-2 mb-1 mt-1">
                  <div className="text-gray-300">{t('最终成绩')}: </div>
                  <div className="text-blueTitle">{data?.data?.finalGrade}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <CScoreCard
            title={t('内容评分')}
            score={data?.data?.contentRating}
            type={2}
          ></CScoreCard>
          <CScoreCard
            title={t('作业评分')}
            score={data?.data?.homeworkRating}
            type={2}
          ></CScoreCard>
          <CScoreCard
            title={t('考试评分')}
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
          <PostDiscussionInput
            callDiscussion={focusInput}
          ></PostDiscussionInput>
          <GDiscussionComponent
            commentComment={(e) => {
              commentComment(e);
            }}
            callDiscussion={focusInput}
            comments={commentData}
            data={commentData}
          ></GDiscussionComponent>
        </div>
      </div>
      {commentChild?.id ? (
        <div className="fixed bottom-12 w-full">
          <FooterDiscussionInputChild
            send={(comment, id, pid) => {
              sendChild(comment, id, pid);
            }}
            {...commentChild}
          ></FooterDiscussionInputChild>
        </div>
      ) : (
        <div className="fixed bottom-12 w-full">
          <FooterDiscussionInput
            ref={inputRef}
            send={(e) => {
              sendComment(e);
            }}
            data={data?.data}
          ></FooterDiscussionInput>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps({ params, locale }) {
  const post = {
    title: 'FatCoupon Refer-A-Friend: Give $15; Get $10',
    details: 'jjj',
  };
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
