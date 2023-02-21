import React, { useState, useMemo } from 'react';
import EmptyIcon from './empty.svg';
import Image from 'next/image';
import LikeActive from './like-active.svg';
import Like from './Like.svg';
import useRequest from '@/libs/request';
import { useRouter } from 'next/router';
export default function index(props) {
  // const comments = [
  //     {
  //       id: 1,
  //       createdAt: '2022-12-07',
  //       updatedAt: '2022-12-07',
  //       content: 'This is the first comment',
  //       children: [
  //         {
  //           id: 2,
  //           createdAt: '2022-12-07',
  //           updatedAt: '2022-12-07',
  //           content: 'This is the first reply to the first comment',
  //           children: [],
  //           parent: 1,
  //           evaluation: {},
  //           student: {},
  //           deletedAt: null
  //         },
  //         {
  //           id: 3,
  //           createdAt: '2022-12-07',
  //           updatedAt: '2022-12-07',
  //           content: 'This is the second reply to the first comment',
  //           children: [],
  //           parent: 1,
  //           evaluation: {},
  //           student: {},
  //           deletedAt: null
  //         },
  //         {
  //           id: 4,
  //           createdAt: '2022-12-07',
  //           updatedAt: '2022-12-07',
  //           content: 'This is the third reply to the first comment',
  //           children: [],
  //           parent: 1,
  //           evaluation: {},
  //           student: {},
  //           deletedAt: null
  //         }
  //       ],
  //       parent: null,
  //       evaluation: {},
  //       student: {},
  //       deletedAt: null
  //     },
  //     {
  //       id: 5,
  //       createdAt: '2022-12-07',
  //       updatedAt: '2022-12-07',
  //       content: 'This is the second comment',
  //       children: [
  //         {
  //           id: 6,
  //           createdAt: '2022-12-07',
  //           updatedAt: '2022-12-07',
  //           content: 'This is the first reply to the second comment',
  //           children: [],
  //           parent: 5,
  //           evaluation: {},
  //           student: {},
  //           deletedAt: null
  //         },
  //         {
  //           id: 7,
  //           createdAt: '2022-12-07',
  //           updatedAt: '2022-12-07',
  //           content: 'This is the second reply to the second comment',
  //           children: [],
  //           parent: 5,
  //           evaluation: {},
  //           student: {},
  //           deletedAt: null
  //         },
  //         {
  //           id: 8,
  //           createdAt: '2022-12-07',
  //           updatedAt: '2022-12-07',
  //           content: 'This is the third reply to the second comment',
  //           children: [],
  //           parent: 5,
  //           evaluation: {},
  //           student: {},
  //           deletedAt: null
  //         }
  //       ],
  //       parent: null,
  //       evaluation: {},
  //       student: {},
  //       deletedAt: null
  //     }
  //   ];
  const { comments, commentComment } = props;
  const router = useRouter();
  const timeSince = (date: string): string => {
    const createdDate = new Date(date);
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - createdDate.getTime();
    const hours = timeDiff / (1000 * 60 * 60);
    console.log(timeDiff / (1000 * 60 * 60), date, 'time');
    if (hours < 1)
      return timeDiff / (1000 * 60) > 1
        ? `${parseInt(String(timeDiff / (1000 * 60)))}分钟`
        : '刚刚';
    return hours > 24
      ? `${Math.floor(hours / 24)}天`
      : `${parseInt(String(hours))}小时`;
    // return timeDiff / (1000 * 60 * 60);
  };
  const DiscussionComponentFooter = (props) => {
    const { data, id, user, isChild, parent, time } = props;
    const [clike, setLike] = useState(data?.liked);
    const like = (id: number) => {
      useRequest.post('/api/comment/like', { id: id });
    };
    const handleLike = (e) => {
      setLike(!e);
      like(id);
    };
    const defaultLike = data?.liked;
    const likeCount = useMemo(() => {
      if (defaultLike && !clike) {
        return Number(data?.likeCount) - 1;
      }
      if (!defaultLike && clike) {
        return Number(data?.likeCount) + 1;
      }
      return Number(data?.likeCount);
      // if(defaultLike && clike){
    }, [clike]);
    return (
      <div className="w-full flex justify-between mt-2 mb-2">
        <div
          className="flex items-center space-x-2"
          onClick={() => {
            commentComment({ user, id, pid: parent?.id });
          }}
        >
          <div className="text-xs text-lightGray">{timeSince(time)}前</div>
          <div className="text-xs font-semibold text-secondGray">回复</div>
        </div>
        <div
          className="flex space-x-1 items-center"
          onClick={() => {
            handleLike(clike);
          }}
        >
          {clike ? <LikeActive></LikeActive> : <Like></Like>}

          <div className="flex  text-xs text-[#A9B0C0]">{likeCount || 0}</div>
          {/* <div className="flex items-center text-xs">3</div> */}
        </div>
      </div>
    );
  };
  const DiscussionComponent = ({ children, data }) => {
    return (
      <div className="w-full mt-2 flex justify-start space-x-3">
        <div
          className="rounded-full"
          onClick={() => {
            router.push({
              pathname: '/Profile/user',
              query: { id: data?.student?.id },
            });
          }}
        >
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
            <span className="text-3xl"></span>
          )}
        </div>
        <div className="w-full pr-4">
          <div
            className="font-medium"
            onClick={() => {
              router.push({
                pathname: '/Profile/user',
                query: { id: data?.student?.id },
              });
            }}
          >
            {data?.student.nickName}
          </div>
          <div className="text-xs text-secondGray mt-1">
            {data?.student?.education?.year} · {data?.student?.education?.major}
          </div>
          <div className="text-sm mt-1">{data?.content}</div>
          <DiscussionComponentFooter
            id={data?.id}
            data={data?.interactInfo}
            user={data?.student}
            parent={data?.parent}
            time={data?.createdAt}
          ></DiscussionComponentFooter>
          <div>{children}</div>
        </div>
      </div>
    );
  };
  const Discussion = ({ comments }) => {
    return (
      <div>
        {comments?.map((item) => {
          const [expand, setExpand] = useState(false);
          return (
            <div>
              <DiscussionComponent data={item}>
                <div className="">
                  {expand
                    ? item?.children?.map((item) => {
                        return (
                          <div className="w-full mt-2 flex justify-start space-x-3">
                            <div
                              className="rounded-full"
                              onClick={() => {
                                router.push({
                                  pathname: '/Profile/user',
                                  query: { id: item?.student?.id },
                                });
                              }}
                            >
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
                              <div
                                className="font-medium"
                                onClick={() => {
                                  router.push({
                                    pathname: '/Profile/user',
                                    query: { id: item?.student?.id },
                                  });
                                }}
                              >
                                {item.student.nickName}
                              </div>
                              <div className="text-xs text-secondGray mt-1">
                                {item?.student?.education?.year || '未认证'} ·{' '}
                                {item.student?.education?.major || '未认证'}
                              </div>
                              <div className=" items-center space-x-1">
                                {item?.reply ? (
                                  <span className="whitespace-nowrap text-sm">
                                    回复
                                  </span>
                                ) : null}
                                <span className="text-sm mt-1 whitespace-nowrap font-medium">
                                  {item?.reply
                                    ? `@${item?.reply?.student?.nickName}`
                                    : null}
                                </span>
                                <span className="text-sm mt-1 w-full">
                                  {item.content}
                                </span>
                              </div>

                              <DiscussionComponentFooter
                                id={item?.id}
                                data={item?.interactInfo}
                                user={item?.student}
                                parent={item?.parent}
                                time={item?.createdAt}
                              ></DiscussionComponentFooter>
                            </div>
                          </div>
                        );
                      })
                    : item?.children?.slice(0, 2).map((item) => {
                        return (
                          <div className="w-full mt-2 flex justify-start space-x-3">
                            <div
                              className="rounded-full"
                              onClick={() => {
                                router.push({
                                  pathname: '/Profile/user',
                                  query: { id: item?.student?.id },
                                });
                              }}
                            >
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
                                <span className="text-3xl"></span>
                              )}
                            </div>
                            <div className="w-full">
                              <div
                                className="font-medium"
                                onClick={() => {
                                  router.push({
                                    pathname: '/Profile/user',
                                    query: { id: item?.student?.id },
                                  });
                                }}
                              >
                                {item?.student?.nickName}
                              </div>
                              <div className="text-xs text-secondGray mt-1">
                                {item.student?.education?.year} ·{' '}
                                {item?.student?.education?.major || '未认证'}
                              </div>
                              <div className=" items-center space-x-1">
                                {item?.reply ? (
                                  <span className="whitespace-nowrap text-sm">
                                    回复
                                  </span>
                                ) : null}

                                <span className="text-sm mt-1 whitespace-nowrap font-medium">
                                  {item?.reply
                                    ? `@${item?.reply?.student?.nickName}`
                                    : null}
                                </span>
                                <span className="text-sm mt-1 w-full">
                                  {item.content}
                                </span>
                              </div>
                              <DiscussionComponentFooter
                                id={item?.id}
                                data={item?.interactInfo}
                                user={item?.student}
                                parent={item?.parent}
                                time={item?.createdAt}
                              ></DiscussionComponentFooter>
                            </div>
                          </div>
                        );
                      })}
                </div>
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
                        ? '收起'
                        : `查看全部 ${item?.children?.length} 条回复`}
                    </div>
                  ) : null}
                </div>
                {/* <div className="w-full">
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
                            </div> */}
              </DiscussionComponent>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <div className="my-4 text-sm font-semibold text-blueTitle">
        评论 {comments?.length || 0}
      </div>
      <div className="w-full mb-3 bg-border h-px1"></div>
      {comments?.length === 0 ? (
        <div onClick={()=>{
          props.callDiscussion()
        }} className="w-full h-[300px] flex flex-col justify-center items-center">
          <EmptyIcon></EmptyIcon>
          <div className="mt-8">
            {' '}
            <span className="text-[#A9B0C0] text-xs">目前还没有评论，</span>
            <span className="text-[#3665FF] text-xs">点击评论</span>
          </div>
        </div>
      ) : (
        <Discussion comments={comments}></Discussion>
      )}
    </div>
  );
}
