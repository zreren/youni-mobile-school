import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Imagebg from '../bg.png';
import PostGroupIcon1 from './post-group/icon1.svg';
import PostGroupIcon2 from './post-group/icon2.svg';
import PostGroupIcon3 from './post-group/icon3.svg';
import classnames from 'classnames';
import LoveIcon from './heart.svg';
import LoveIconx from './heartx.svg';
import useRequest from '@/libs/request';
import useFetch from '@/hooks/useFetch';
import { useRouter } from 'next/router';
import { Toast } from 'react-vant';
import { mutate } from 'swr';
import useUser from '@/hooks/useUser';
import { useDispatch } from 'react-redux';
import { setOpenLogin } from '../../../../stores/authSlice';
import { Cell, Dialog } from 'react-vant';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import TopicIcon from './topic.svg';
import Waterfall from '@/components/Layout/Waterfall';
import { grey } from '@mui/material/colors';
import ReturnBackIcon from './returnBack.svg';
import { useTranslation } from 'next-i18next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function recommend() {
  const router = useRouter();
  const { user } = useUser();
  const [openDetail, setOpenDetail] = useState(false);
  const [t] = useTranslation();
  const { data, mutate } = useFetch(
    `/post/detail?id=${router.query.id}`,
    'get',
  );

  const PostGroupDetail = (props) => {
    const { data, isEdit, mutate } = props;
    const cancelStarPost = async (id) => {
      console.log('PostGroupDetail', id, data?.id);
      await useRequest.post('/api/post/unstar', {
        id: id,
        collectionId: data?.id,
      });
      Toast.success(t('移除成功'));
      mutate();
    };

    return (
      <div className="w-full h-screen">
        <div className="w-full h-[126px] bg-[#F7F8F9] p-5 pt-6 mb-2">
          <div className="flex items-center">
            <div className=" ">
              <TopicIcon></TopicIcon>
            </div>
            {
              <div className="ml-4 text-[#37455C] font-semibold text-lg">
                {props?.topicName}
              </div>
            }
          </div>
          <div></div>
        </div>
        {data?.length > 0 ? (
          <Waterfall
            key={data?.id + data?.length}
            cancelStarPost={(id) => {
              cancelStarPost(id);
            }}
            postData={data?.map((item) => {
              return { ...item };
            })}
          ></Waterfall>
        ) : (
          <div className="text-[#898E97] flex justify-center">
            {t('该话题暂时没有内容')}
          </div>
        )}
      </div>
    );
  };
  const [topicId, setTopicId] = useState();
  const { data: topicCourseList } = useFetch(
    `/campus/topic/posts?id=${topicId}`,
    'get',
  );

  const PostGroupDrawer = (props) => {
    const {
      open,
      isEdit,
      mutate,
    }: { open: boolean; isEdit: boolean; mutate: any } = props;
    const [id, setId] = useState(props?.id);
    const Puller = styled(Box)(({ theme }) => ({
      width: 33,
      height: 4,
      backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
      borderRadius: 3,
      position: 'absolute',
      top: 8,
      left: 'calc(50% - 15px)',
    }));
    return (
      <SwipeableDrawer
        className="z-20 bottom-footer-theTop"
        disableDiscovery={true}
        disableSwipeToOpen={true}
        onClose={() => {
          props.onClose();
        }}
        onOpen={() => {
          props.onOpen();
        }}
        open={open}
        anchor="bottom"
      >
        <div className="h-[96vh]">
          <Puller></Puller>
          <PostGroupDetail
            topicName={props.topicName}
            mutate={() => {
              mutate();
            }}
            isEdit={isEdit}
            data={props.data}
          ></PostGroupDetail>
        </div>
      </SwipeableDrawer>
    );
  };

  const Header = () => {
    return (
      <div className="w-screen h-[210px]">
        <div className="z-30 h-[210px] flex flex-col justify-between text-white text-lg pl-8 pr-8 pt-20">
          <div></div>
          <div
            className="absolute top-10"
            onClick={() => {
              router.back();
            }}
          >
            <ReturnBackIcon></ReturnBackIcon>
          </div>
          {data?.data?.user?.id === user?.id && (
            <div
              className="absolute top-10 right-4 mt-2 border border-[#fff] w-14 h-6 text-xs rounded-full text-[white] whitespace-nowrap	flex justify-center items-center"
              onClick={() => {
                router.push({
                  pathname: '/[campus]/post/addPost',
                  query: {
                    campus: router.query.campus,
                    id: data?.data?.id,
                    isEdit: true,
                    type: 'course_recommend',
                  },
                });
                // router.back();
              }}
            >
              {t('编辑')}
            </div>
          )}
          <div className="z-30 css2Overflow-ellipsis">{data?.data?.title}</div>
          {/* <div className="z-30">适用于UTSC校区</div> */}
          <div className="flex justify-between mt-3 mb-4">
            <div>
              <div className={classnames('flex items-center')}>
                <div className="avatar placeholder">
                  <div
                    onClick={() => {
                      // checkUser(data?.id);
                    }}
                    className="w-8 rounded-full bg-neutral-focus text-neutral-content"
                  >
                    <img src={`${Cons.BASEURL}${data?.data?.user?.avatar}`} />
                  </div>
                </div>
                <div
                  onClick={() => {
                    // checkUser(data?.id);
                  }}
                >
                  <div className="ml-2 text-sm  font-normal max-w-8 text-white ">
                    {/* {data?.user?.nickName} */}
                    {data?.data?.user?.nickName}
                  </div>
                  <div className="ml-2 text-xs text-white0">
                    {data?.data?.user?.education?.degree} ·{' '}
                    {data?.data?.user?.education?.major}
                    {/* {data?.data?.user?.nickName} */}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-2 text-white items-end">
              <div className="flex items-center  space-x-1">
                <PostGroupIcon2></PostGroupIcon2>
                <div className=" text-xs">
                  {data?.data?.interactInfo?.starCount}
                </div>
              </div>
              <div className="flex items-center  space-x-1">
                <PostGroupIcon3></PostGroupIcon3>
                <div className=" text-xs">3</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-screen h-[210px] absolute top-0 -z-10">
          <img
            height={'210px'}
            src={Imagebg.src}
            className=" h-[210px] w-full object-cover"
          ></img>
        </div>
      </div>
    );
  };

  const Recommend = () => {
    return (
      <div className="w-full p-2 mt-4">
        <div className="font-semibold text-lg text-[#37455C]">
          {t('选课')} <span className="text-[#2347D9]">{t('介绍')}</span>
        </div>
        <div className="mt-5 font-light px-1 text-[#37455C] text-sm">
          {data?.data?.body}
        </div>
        <div className="flex mt-4 px-1 items-center space-x-1">
          {data?.data?.topics.map((item) => {
            return (
              <div
                onClick={() => {
                  setOpenDetail(true);
                  setTopicName(item?.name);
                  setTopicId(item?.id);
                }}
                className=" text-[#2347D9] text-sm"
              >
                #{item?.name}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const MustStudy = (props) => {
    const { data: data1 }: { data: Course[] } = props;
    if (!data) return;
    const CourseSelector = (props) => {
      const { isSelect } = props;
      return (
        <div
          className={classnames(
            'flex justify-center  max-w-[1/2] relative items-center w-14 h-14  p-[1px] rounded-2xl',
            {
              'border-[2px] border-[#FFDEAD]': isSelect,
            },
          )}
        >
          <div
            className={classnames(
              'border-[#FFDEAD] bg-[#FFFAF0] flex flex-col justify-center items-center  border-[2px] rounded-2xl h-12 w-12',
            )}
          >
            <div className="text-[10px] text-[#ff9832] flex justify-center text-center items-center">
              {props.data.label}
            </div>
          </div>
          <div className="xueqiTag absolute rounded-[5px] p-[5px] text-[white] flex justify-center items-center text-[10px] w-4 h-4 bottom-0 right-0">
            {props.data?.term?.slice(0, 1)}
          </div>
        </div>
      );
    };
    return (
      <div className="min-w-[1/2] h-16 w-1/2  max-w-[1/2]">
        <div className="flex items-center justify-center">
          <div className="w-full h-[0.5px] bg-[#DCDDE1]"></div>
          <div className="whitespace-nowrap text-[#DCDDE1] text-xs mx-2">
            {t('必修课')}
          </div>
          <div className="w-full h-[0.5px] bg-[#DCDDE1]"></div>
        </div>
        <div className="flex items-center overflow-scroll space-x-4  max-w-[1/2]">
          {props?.data?.map((item) => {
            return <CourseSelector data={item}></CourseSelector>;
          })}
        </div>
        {/* //course list */}
      </div>
    );
  };

  const OptionalStudy = (props) => {
    const CourseSelector = (props) => {
      const { isSelect } = props;
      return (
        <div
          className={classnames(
            'flex justify-center  max-w-[1/2] relative items-center w-14 h-14  p-[1px] rounded-2xl',
            {
              'border-[2px] border-[#FFDEAD]': isSelect,
            },
          )}
        >
          <div
            className={classnames(
              'border-[#FFDEAD] bg-[#FFFAF0] flex flex-col justify-center items-center  border-[2px] rounded-2xl h-12 w-12',
            )}
          >
            <div className="text-[10px] text-[#ff9832] flex justify-center text-center items-center">
              {props.data.label}
            </div>
          </div>
          <div className="xueqiTag absolute rounded-[6px] p-[6px] text-[white] flex justify-center items-center text-xs w-4 h-4 bottom-0 right-0">
            {props.data?.term?.slice(0, 1)}
          </div>
        </div>
      );
    };
    return (
      <div className="min-w-[1/2] h-16 w-1/2  max-w-[1/2]">
        <div className="flex items-center justify-center">
          <div className="w-full h-[0.5px] bg-[#DCDDE1]"></div>
          <div className="whitespace-nowrap text-[#DCDDE1] text-xs mx-2">
            {t('选修课')}
          </div>
          <div className="w-full h-[0.5px] bg-[#DCDDE1]"></div>
        </div>
        <div className="flex items-center overflow-scroll space-x-4  max-w-[1/2]">
          {props?.data?.map((item) => {
            return <CourseSelector data={item}></CourseSelector>;
          })}
        </div>
        {/* //course list */}
      </div>
    );
  };

  const CourseRecommend = () => {
    return (
      <div className="w-full p-2 mt-4">
        <div className="font-semibold text-lg text-[#37455C]">
          {t('选课')} <span className="text-[#2347D9]">{t('推荐')}</span>
        </div>
        <div className="flex w-full justify-between mt-5 mb-3 items-center px-2 space-x-3">
          <MustStudy
            data={data?.data?.form?.courseData?.filter(
              (item) => item.type !== 'option',
            )}
          ></MustStudy>
          <OptionalStudy
            data={data?.data?.form?.courseData?.filter(
              (item) => item.type !== 'must',
            )}
          ></OptionalStudy>
        </div>
        {/* <div className="flex items-center space-x-2 mt-4">
          <div className="w-1 h-4 bg-yellow-300 rounded-full"></div>
          <div className="font-semibold">{data?.data?.form.term}</div>
        </div> */}
      </div>
    );
  };

  interface Course {
    id: number;
    label: string;
    professorMust: { id: number; label: string }[];
    professorOption: { id: number; label: string }[];
    type: string;
    note: string;
  }

  const CourseSelectFormItem = (props) => {
    const { data }: { data: Course } = props;
    console.log(data, 'CourseSelectFormItem');
    return (
      <>
        <div className="flex mt-4 items-top space-x-8 w-full">
          <div
            onClick={() => {
              router.push({
                pathname: '/[campus]/Course/[id]',
                query: {
                  campus: router.query.campus,
                  id: data.id,
                },
              });
            }}
            className="min-w-[44px] text-[#798195] w-11 flex items-center justify-center text-center h-11 bg-[#F7F8F9] rounded-lg text-xs"
          >
            {data.label}
          </div>
          <div className="w-full space-y-4">
            <div className="flex items-center space-x-10 h-10">
              <div className="text-blueTitle text-xs font-semibold">
                {t('优先')}
              </div>
              {data?.professorMust.map((item) => {
                return (
                  <div className="ml-10 w-10 text-center text-xs text-[#798195]">
                    {item.label}
                  </div>
                );
              })}
            </div>
            {data?.professorOption.length > 0 && (
              <div className="flex items-center space-x-10">
                <div className="text-blueTitle text-xs font-semibold">
                  {t('可选')}
                </div>

                {data?.professorOption.map((item) => {
                  return (
                    <div className="ml-10 w-10 text-center text-xs text-[#798195]">
                      {item.label}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {data.note && (
          <div className="rounded-sm bg-[#F7F8F9] text-[#798195] w-full p-4 mt-4 text-xs">
            {data?.note}
          </div>
        )}

        <div className="bg-[#F7F8F9] w-full h-[0.5px] mt-4"></div>
      </>
    );
  };

  const started = React.useMemo(
    () => data?.data?.interactInfo?.stared,
    [data?.data?.interactInfo?.stared],
  );

  const dispatch = useDispatch();
  const [topicName, setTopicName] = useState();

  /**
   * for preview 归类整理
   */
  const previewCourseData = React.useMemo(() => {
    const groupedCourses: { term; items }[] = [];
    data?.data?.form?.courseData.forEach((course, index) => {
      const group = groupedCourses.find((group) => group.term === course.term);
      if (group) {
        group.items.push(course);
      } else {
        groupedCourses.push({ term: course.term, items: [course] });
      }
    });
    return groupedCourses;
  }, [data?.data?.form?.courseData]);

  return (
    <div className="w-screen min-h-screen pb-20">
      <Header></Header>
      <div className="flex justify-between items-center mt-4 px-4 space-x-2">
        <div
          className={classnames(
            'w-full font-semibold space-x-2 h-10 rounded-lg  flex justify-center items-center ',
            {
              'bg-[#FF6E69] text-white': started,
              'text-[#FF6E69] bg-[#FFEBEB]': !started,
            },
          )}
        >
          {started ? <LoveIcon></LoveIcon> : <LoveIconx></LoveIconx>}
          <div
            className="text-sm"
            onClick={async () => {
              if (started) {
                await useRequest.post('/api/post/unstar', {
                  id: router.query.id,
                });
                Toast.success(t('取消收藏'));
                mutate();
              } else {
                if (!user) {
                  Dialog.confirm({
                    title: t('登录'),
                    confirmButtonText: t('确定'),
                    cancelButtonText: t('取消'),
                    message: t(
                      '您还未登录，登录YoUni，自由添加课表、一键导入学校课程、一键分享给朋友！',
                    ),
                  })
                    .then((res) => {
                      dispatch(setOpenLogin('login'));
                      // router.push("/Login/signin");
                      // console.log(res,"登录YoUni");
                    })
                    .catch((err) => {
                      // router.push(`/${campus}`);
                      //  dispatch(setOpenLogin('register'))
                    });

                  return;
                }
                await useRequest.post('/api/post/star', {
                  id: router.query.id,
                });
                Toast.success(t('收藏成功'));
                mutate();
                // setStarted((pre)=>!pre)
              }
            }}
          >
            {started ? t('已收藏') : t('收藏')}
          </div>
        </div>
        <div
          onClick={() => {
            try {
              navigator.clipboard.writeText(window.location.href);
              Toast.success(t('已复制到剪贴板，分享给好友吧！'));
            } catch (error) {
              Toast.fail(t('复制失败'));
            }
          }}
          className="bg-[#F3F4F6] w-full h-10 rounded-lg  flex justify-center items-center"
        >
          {t('分享')}
        </div>
      </div>
      <PostGroupDrawer
        topicName={topicName}
        onOpen={() => {
          setOpenDetail(true);
        }}
        onClose={() => {
          setOpenDetail(false);
        }}
        data={topicCourseList?.data?.items}
        open={openDetail}
      ></PostGroupDrawer>
      <Recommend></Recommend>
      <div className="bg-[#F6F6F6] w-full h-3 mt-4"> </div>
      {data?.data?.form?.courseData?.length > 1 ? (
        <CourseRecommend></CourseRecommend>
      ) : null}
      <div className="px-5 mt-3">
        {previewCourseData?.map((item: { items: Course[]; term: string }) => {
          return (
            <>
              <div className="flex items-center space-x-2 mt-6">
                <div className="w-1 h-4 bg-yellow-300 rounded-full"></div>
                <div className="font-semibold">{item?.term}</div>
              </div>
              {item?.items?.map((item) => {
                return (
                  <CourseSelectFormItem data={item}></CourseSelectFormItem>
                );
              })}
            </>
          );
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
