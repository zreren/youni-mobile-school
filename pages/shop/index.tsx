import React from 'react';
import Header from '@/components/Header';
export default function index() {
  return (
    <div className="w-full h-screen ">
      <Header title="积分商城" className="text-white bg-transparent border-none shadow-none"></Header>
      <div className="absolute top-0 w-full h-64 org-gradient"></div>
      <div className="absolute w-full h-64 top-64 bg-bg z-bg"></div>
      <div className="z-30 w-full p-4 pt-6">
        <div className="text-xs text-white ">我的YoUni积分</div>
        <div className="mb-2 text-4xl text-white">4500</div>
        <div className="w-full p-2 text-xs text-white rounded-t-lg h-7 red-full-gradient">
          已经连续签到 3 天
        </div>
        <div className="z-30 w-full p-3 bg-white h-44">
          <div className="flex mb-2 space-x-2">
            <div className="w-10 h-16 bg-bg"></div>
            <div className="w-10 h-16 bg-bg"></div>
            <div className="w-10 h-16 bg-bg"></div>
            <div className="w-10 h-16 bg-bg"></div>
            <div className="w-10 h-16 bg-bg"></div>
            <div className="w-10 h-16 bg-bg"></div>
            <div className="w-10 h-16 bg-bg"></div>
          </div>
          <button className="w-full rounded-full btn-md btn btn-warning yellow-gradient">
            立即签到
          </button>
        </div>
      </div>
    </div>
  );
}
