import React, { useEffect } from 'react';
import Image from 'next/image';
import Imagebg from './bg.png';
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
import { setOpenLogin } from '@/stores/authSlice';
import { Cell, Dialog } from 'react-vant';

export default function recommend(props) {
  const router = useRouter();
  const {user} = useUser();
  const campus = router.query.campus;
  const id = React.useMemo(() => router.query.id || props.id, [router,props])
  const { data,mutate } = useFetch(`/post/detail?id=${id}`, 'get');
  useEffect(()=>{
    window.history.replaceState({}, '', `/${campus}/recommend/${id}`);
  },[data])
  const CourseSelector = (props) => {
    const { isSelect } = props;
    return (
      <div
        className={classnames(
          'flex justify-center relative items-center w-14 h-14  p-[1px] rounded-2xl',
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
          <svg height={'14px'} width={'100%'}>
            <text
              x="50%"
              text-anchor="middle"
              y="10"
              fill="#ff9832"
              color="#ff9832"
              fontSize={'10px'}
            >
              {' '}
              MAT
            </text>
          </svg>
          <svg height={'14px'} width={'100%'}>
            <text
              x="50%"
              text-anchor="middle"
              y="10"
              fill="#ff9832"
              fontWeight={600}
              color="#ff9832"
              fontSize={'10px'}
            >
              {' '}
              321
            </text>
          </svg>
        </div>
        <div className="xueqiTag absolute rounded-[6px] p-[6px] text-[white] flex justify-center items-center text-xs w-5 h-5 bottom-0 right-0">
          秋
        </div>
      </div>
    );
  };
  const Header = () => {
    return (
      <div className="w-screen h-[210px]">
        <div className="z-30 h-[210px] flex flex-col justify-between text-white text-lg pl-8 pr-8 pt-20">
          <div></div>
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
          选课 <span className="text-[#2347D9]">介绍</span>
        </div>
        <div className="mt-5 font-light px-1 text-[#37455C] text-sm">
          {data?.data?.body}
        </div>
        <div className="flex mt-4 px-1 items-center space-x-1">
          {data?.data?.topics.map((item) => {
            return <div className=" text-[#2347D9] text-sm">{item}</div>;
          })}
        </div>
      </div>
    );
  };
  const MustStudy = (props) => {
    const { data:data1 }: { data: Course[] } = props;
    if(!data) return
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
            {/* <svg className='whitespace-wrap' height={'14px'} width={'100%'}>
              <text
                x="50%"
                text-anchor="middle"
                y="10"
                fill="#ff9832"
                color="#ff9832"
                fontSize={'10px'}
              >
                {' '}
                {props.data.label}
              </text>
            </svg> */}
          </div>
          <div className="xueqiTag absolute rounded-[5px] p-[5px] text-[white] flex justify-center items-center text-[10px] w-4 h-4 bottom-0 right-0">
            {data?.data?.form?.term?.slice(0,1)}
          </div>
        </div>
      );
    };
    return (
      <div className="min-w-[1/2] h-16 w-1/2  max-w-[1/2]">
        <div className="flex items-center justify-center">
          <div className="w-full h-[0.5px] bg-[#DCDDE1]"></div>
          <div className="whitespace-nowrap text-[#DCDDE1] text-xs mx-2">
            必修课
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
          <div className="xueqiTag absolute rounded-[6px] p-[6px] text-[white] flex justify-center items-center text-xs w-5 h-5 bottom-0 right-0">
          {data?.data?.form?.term?.slice(0,1)}
          </div>
        </div>
      );
    };
    return (
      <div className="min-w-[1/2] h-16 w-1/2  max-w-[1/2]">
        <div className="flex items-center justify-center">
          <div className="w-full h-[0.5px] bg-[#DCDDE1]"></div>
          <div className="whitespace-nowrap text-[#DCDDE1] text-xs mx-2">
            选修课
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
          选课 <span className="text-[#2347D9]">推荐</span>
        </div>
        <div className="flex w-full justify-between mt-5 items-center px-2 space-x-3">
        <MustStudy data={data?.data?.form?.courseData?.filter((item)=>item.type !== 'option')}></MustStudy>
        <OptionalStudy  data={data?.data?.form?.courseData?.filter((item)=>item.type !== 'must')}></OptionalStudy>
        </div>
        <div className="flex items-center space-x-2 mt-4">
          <div className="w-1 h-4 bg-yellow-300 rounded-full"></div>
          <div className="font-semibold">{data?.data?.form.term}</div>
        </div>
      </div>
    );
  };
  // #F7F8F9
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
    return (
      <>
        <div className="flex mt-4 items-top space-x-8 w-full">
          <div className="min-w-[44px] text-[#798195] w-11 flex items-center justify-center text-center h-11 bg-[#F7F8F9] rounded-lg text-xs">
            {data.label}
          </div>
          <div className="w-full space-y-4">
            <div className="flex items-center space-x-10 h-10">
              <div className="text-blueTitle text-xs font-semibold">优先</div>
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
                <div className="text-blueTitle text-xs font-semibold">可选</div>
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
  const started =  React.useMemo(()=>data?.data?.interactInfo?.stared,[data?.data?.interactInfo?.stared])

  const dispatch = useDispatch();

  return (
    <div className="w-screen min-h-screen pb-20">
      <Header></Header>
      <div className="flex justify-between items-center mt-4 px-4 space-x-2">
        <div
          className={classnames(
            'w-full font-semibold space-x-2 h-10 rounded-lg  flex justify-center items-center ',
            {
              'bg-[#FF6E69] text-white': started,
              'text-[#FF6E69] bg-[#FFEBEB]' : !started
            },
          )}
        >
          {
           started ? <LoveIcon></LoveIcon> : <LoveIconx></LoveIconx>
          } 
          <div
            className="text-sm"
            onClick={async() => {
              if(started){
                await useRequest.post('/api/post/unstar',{
                  id: id
                })
                Toast.success('取消收藏');
                mutate()
                // setStarted((pre)=>!pre)
              }else{
                if(!user) {
                  Dialog.confirm({
                    title: '登录',
                    message: '您还未登录，登录YoUni，自由添加课表、一键导入学校课程、一键分享给朋友！',
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
                await useRequest.post('/api/post/star',{
                  id: id
                })
                Toast.success('收藏成功');
                mutate()
                // setStarted((pre)=>!pre)
              }
              

            }}
          >
            { started ? '已收藏' : '收藏'}
          </div>
        </div>
        <div
          onClick={() => {
            try {
              navigator.clipboard.writeText(window.location.href);
              Toast.success('已复制到简介板，分享给好友吧！');

            } catch (error) {
              Toast.fail('复制失败')
            }
          }}
          className="bg-[#F3F4F6] w-full h-10 rounded-lg  flex justify-center items-center"
        >
          分享
        </div>
      </div>
      <Recommend></Recommend>
      <div className="bg-[#F6F6F6] w-full h-3 mt-4"> </div>
      {
        data?.data?.form?.courseData?.length > 1 ? <CourseRecommend></CourseRecommend> : null
      }
      <div className="px-5 mt-3">
        {data?.data?.form?.courseData?.map((item: any) => {
          return <CourseSelectFormItem data={item}></CourseSelectFormItem>;
        })}
      </div>
    </div>
  );
}
