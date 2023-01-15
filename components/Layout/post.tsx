import React from 'react';
import UserHeader from '@/components/UserHeader';
import { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import Discussion from '@/components/Discussion';
import UserInfo from '@/components/UserInfo';
import Image from 'next/image';
import MapIcon from "./mapIcon.svg";
import PostDiscussionInput from '@/components/Input/PostDiscussionInput';
import FooterDiscussionInput from '@/components/Input/FooterDiscussionInput';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
export default function index() {
  const Map = () => {
    return (
      <div className="w-full relative h-[185px] bg-white px-5 py-4 rounded-xl overflow-hidden 	">
        <div className="w-full h-full overflow-hidden rounded-xl">
          <img
            src="/assets/map.png"
            className='w-full h-full '
          ></img>
        </div>
        <div className='absolute px-3 items-center  flex justify-between left-0 right-0 mx-auto z-30 w-[80%] h-[48px] bg-white/70 backdrop-blur-sm		 bottom-10 rounded-lg'>
          <div className='flex items-center w-[90%]'>
            <div className='mr-2'>
            <MapIcon className="w-[14px] h-[14px]"></MapIcon>
            </div>
            <div className='text-xs text-[#798195]'>8 Northtown Way, Toronto, Ontario M2N 7A1, Canada</div>
          </div>
          <div className='bg-[#FFD036] w-12 h-6 text-xs rounded-full text-[#8C6008] whitespace-nowrap	flex justify-center items-center'>
            导航
          </div>
        </div>
      </div>
    );
  };
  const PostTag =()=>{
    return (
      <div className='mt-2 text-[#2347D9] text-sm'>#约克大学 #多伦多大学 #多伦多</div>
    )
  }
  // const UserHeader = ()=>{
  //   return (
  //     <div className="flex items-center mb-4">
  //       <div className="avatar placeholder">
  //         <div className="w-8 rounded-full bg-neutral-focus text-neutral-content">
  //           <img src="https://placeimg.com/192/192/people" />
  //         </div>
  //       </div>
  //       <div>
  //         <div className="ml-4 text-sm FONT_MEDIUM max-w-8 text-blueTitle">
  //           测试用户
  //         </div>
  //         <div className="ml-4 text-xs text-gray-200">2022届 · B.Com Accounting</div>
  //       </div>
  //     </div>
  //   )
  // }
  return (
    <div className="mb-10">
      <UserHeader></UserHeader>
      <div className="min-h-[380px]">
        <Swiper
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          height={520}
          className="mySwiper"
        >
          <SwiperSlide>
            <Image
              layout='fill'
              src="https://fakeimg.pl/250x280"
              className="w-full"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              height={500}
              width={'100%'}
              objectFit="cover"
              // sizes="100%"
              src="https://fakeimg.pl/250x280"
              className="w-full"
              alt=""
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="p-5 bg-white">
        <div className="text-lg font-bold text-blueTitle">
          出闲置AirPods耳机二代
        </div>
        <div className="flex items-end mt-2 space-x-1 text-sm">
          <div className="text-2xl font-bold text-price"> 200</div>
          <div className="text-sm text-price">CAD</div>
          <div className="text-sm text-priceGray dele">348CAD</div>
        </div>
        <div className="mt-4 post-content">
          AirPods pro
          2，全新未拆封的，朋友送给我的，但是我有其他耳机，这个就出，挂个试试吧！赔太多就不出了。凑合用。
        </div>
        <PostTag></PostTag>
        <div className='flex justify-end'>
        <div className='mt-2 border border-[#DCDDE1] w-14 h-6 text-xs rounded-full text-[#A9B0C0] whitespace-nowrap	flex justify-center items-center'>
            举报
          </div>
        </div>
      </div>
      <div className="w-full h-2 bg-bg"></div>
      <div className="p-5 pt-4 pb-2">
        <UserInfo></UserInfo>
      </div>
      <div className="w-full h-2 bg-bg"></div>
      <div>
        <Map></Map>
      </div>
      <div className="w-full h-2 bg-bg"></div>
      <div className="p-5">
        <PostDiscussionInput></PostDiscussionInput>
        <Discussion></Discussion>
      </div>
      <FooterDiscussionInput></FooterDiscussionInput>
    </div>
  );
}
