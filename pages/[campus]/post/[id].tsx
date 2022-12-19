import React from 'react';
import UserHeader from '@/components/UserHeader';
import  { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import UserComment from '@/components/user-comment';
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
export default function index() {
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
    <div>
      <UserHeader returnClick={true}></UserHeader>
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
        <img height={500} src="https://fakeimg.pl/250x280" className='w-full' alt="" />
        </SwiperSlide>
        <SwiperSlide>
         <img height={500} src="https://fakeimg.pl/250x280" className='w-full' alt="" />
        </SwiperSlide>
      </Swiper>
      <div className='p-5'>
        <div className='text-lg font-bold text-blueTitle'>出闲置AirPods耳机二代</div>
        <div className="flex items-end mt-2 space-x-1 text-sm">
          <div className="text-2xl font-bold text-price"> 200</div>
          <div className="text-sm text-price">CAD</div>
          <div className="text-sm text-priceGray dele">348CAD</div>
        </div>
        <div className='mt-4 post-content'>
        AirPods pro 2，全新未拆封的，朋友送给我的，但是我有其他耳机，这个就出，挂个试试吧！赔太多就不出了。凑合用。 
        </div>
        <UserComment></UserComment>
      </div>
    </div>
  );
}
