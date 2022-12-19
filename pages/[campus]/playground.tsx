import React from 'react';
import Waterfall from '@/components/Layout/Waterfall';
import SearchInSchool from './SearchAtSchool';
export default function playground() {
  return (
    <div className="w-full min-h-screen mx-0 ">
      <div className="w-full h-auto pb-1 bg-gradient-to-r from-green-50 to-yellow-50 ">
        <div className='h-10'></div>
      <SearchInSchool placeholder={'搜索闲置/活动/新闻/Carpool'}></SearchInSchool>
      <div className='flex items-center h-10 p-5 space-x-3'>
        <div className='px-3 py-1 text-sm bg-white rounded-md text-secondGray'>关注</div>
        <div className='px-3 py-1 text-sm bg-white rounded-md text-secondGray'>关注</div>
      </div>
      </div>
      <Waterfall></Waterfall>
    </div>
  );
}
