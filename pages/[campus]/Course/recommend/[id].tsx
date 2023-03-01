import React from 'react';
import Image from 'next/image';
import Imagebg from '../bg.png';
import PostGroupIcon1 from './post-group/icon1.svg';
import PostGroupIcon2 from './post-group/icon2.svg';
import PostGroupIcon3 from './post-group/icon3.svg';
import classnames from 'classnames';
import LoveIcon from './heart.svg';

export default function recommend() {
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
        <div className="z-30 text-white text-lg pl-8 pr-8 pt-20">
          <div className="z-30">BBA 非COOP </div>
          <div className="z-30">适用于UTSC校区</div>
          <div className="flex justify-between mt-3">
            <div>
              <div className={classnames('flex items-center')}>
                <div className="avatar placeholder">
                  <div
                    onClick={() => {
                      // checkUser(data?.id);
                    }}
                    className="w-8 rounded-full bg-neutral-focus text-neutral-content"
                  >
                    {/* <img src={`${Cons.BASEURL}${data?.user?.avatar}`} /> */}
                  </div>
                </div>
                <div
                  onClick={() => {
                    // checkUser(data?.id);
                  }}
                >
                  <div className="ml-2 text-sm  font-normal max-w-8 text-white ">
                    {/* {data?.user?.nickName} */}
                    nickName
                  </div>
                  <div className="ml-2 text-xs text-white0">
                    {/* {data?.user?.education?.year} · {data?.user?.education?.major} */}
                    2022届 · B.Com Accounting
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-2 text-white items-end">
              <div className="flex items-center  space-x-1">
                <PostGroupIcon2></PostGroupIcon2>
                <div className=" text-xs">2</div>
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
          BBA-non coop (Bachelor of Business Administration)
          Acorn上系统自动添加Lecture，需要手动选择tut，切记不可drop课程，因为部分课程无法手动添加。
        </div>
        <div className="flex mt-4 px-1 items-center space-x-1">
          <div className=" text-[#2347D9] text-sm">#dld</div>
          <div className=" text-[#2347D9] text-sm">#dld</div>
        </div>
      </div>
    );
  };
  const MustStudy = () => {
    return (
      <div className="w-full">
        <div className="flex items-center justify-center">
          <div className="w-full h-[0.5px] bg-[#DCDDE1]"></div>
          <div className="whitespace-nowrap text-[#DCDDE1] text-xs mx-2">必修课</div>
          <div className="w-full h-[0.5px] bg-[#DCDDE1]"></div>
        </div>
        <CourseSelector></CourseSelector>
        {/* //course list */}
      </div>
    );
  };
  const OptionalStudy = () => {
    return (
      <div className="w-full">
        <div className="flex items-center justify-center">
          <div className="w-full h-[0.5px] bg-[#DCDDE1]"></div>
          <div className="whitespace-nowrap text-[#DCDDE1] text-xs mx-2">必修课</div>
          <div className="w-full h-[0.5px] bg-[#DCDDE1]"></div>
        </div>
        <div>
          <CourseSelector></CourseSelector>
        </div>
        {/* //course list */}
      </div>
    );
  };
  const CourseRecommend = () => {
    return (
      <div className="w-full p-2 mt-4">
        <div className="font-semibold text-lg text-[#37455C]">
          选课 <span className="text-[#2347D9]">介绍</span>
        </div>
        <div className="flex w-full justify-between mt-5 items-center px-2 space-x-3">
          <MustStudy></MustStudy>
          <OptionalStudy></OptionalStudy>
        </div>
        <div className="flex items-center space-x-2 mt-4">
          <div className="w-1 h-4 bg-yellow-300 rounded-full"></div>
          <div className="font-semibold">秋季学期 Fall 2023</div>
        </div>
      </div>
    );
  };
  // #F7F8F9
  const CourseSelectFormItem = () => {
    return (
      <>
        <div className="flex items-top space-x-8 w-full">
          <div className="min-w-[44px] text-[#798195] w-11 flex items-center justify-center text-center h-11 bg-[#F7F8F9] rounded-lg text-xs">
            MAT 302
          </div>
          <div className="w-full space-y-4">
            <div className="flex items-center space-x-10 h-10">
              <div className="text-blueTitle text-xs font-semibold">优先</div>
              <div className="ml-10 w-10 text-center text-xs text-[#798195]">
                Raymond Grinnel
              </div>
            </div>
            <div className="flex items-center space-x-10">
            <div className="text-blueTitle text-xs font-semibold">可选</div>
              <div className="ml-10 w-10 text-center text-xs text-[#798195]">
                Raymond Grinnel
              </div>
            </div>
          </div>
        </div>
        <div className='rounded-sm bg-[#F7F8F9] text-[#798195] w-full p-4 mt-4 text-xs'>
        推荐理由: 341为后面大量专业课程的前置课，也是大三必修课，适合秋季学期进行学习。冬季学期的选课空间会大大增加，秋季学期333教授较好，可以进行选择，冬季学期如果想进行Marketing专业课程学习，选择面会大大增加。
        </div>
        <div className="bg-[#F7F8F9] w-full h-[0.5px] mt-4"></div>
      </>
    );
  };
  return (
    <div className="w-screen min-h-screen pb-20">
      <Header></Header>
      <div className="flex justify-between items-center mt-4 px-4 space-x-2">
        <div
          className={classnames(
            'w-full font-semibold space-x-2 h-10 rounded-lg  flex justify-center items-center  bg-[#FFD036]',
            {
              'bg-[#FF6E69] text-white': true,
            },
          )}
        >
          <LoveIcon></LoveIcon>
          <div className="text-sm" onClick={() => {}}>
          已收藏
          </div>
        </div>
        <div className="bg-[#F3F4F6] w-full h-10 rounded-lg  flex justify-center items-center">
          分享
        </div>
      </div>
      <Recommend></Recommend>
      <div className="bg-[#F6F6F6] w-full h-3 mt-4"> </div>
      <CourseRecommend></CourseRecommend>
      <div className="px-5 mt-3">
        <CourseSelectFormItem></CourseSelectFormItem>
      </div>
    </div>
  );
}
