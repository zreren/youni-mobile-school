import React from 'react';
import Calendar from '@/components/Calendar/Calendar';
import Header from '@/components/Header';
import CButton from '@/components/Button/CButton';
import Icon from '@/components/Icon';
export default function Schedules() {
  return (
    <div className="bg-bg space-y-1">
      <div className="f-11 text-left pl-5 ">
        <div className="font-bold text-blueTitle text-base">第 7 周</div>
        <div className="text-xs text-gray-400">10月10日 - 10月16日</div>
      </div>
      <div className="h-11 flex items-center justify-between pl-5 pr-5 bg-bg">
        <div className="rounded-xl bg-white h-8 w-2/3 flex items-center justify-around">
          <button className='"btn  p-1 text-sm btn-active bg-gray-50 text-yellow-300 rounded-sm'>
            近五天
          </button>
          <button className='"btn text-sm   text-gray-400'>
          近一周
          </button>
          <button className='"btn text-sm  text-gray-400'>
          今日
          </button>
          <button className='"btn text-sm  text-gray-400'>
          校历
          </button>
        </div>
        <div className='flex items-center space-x-2'>
          <Icon type="menu1"></Icon>
          <CButton size="normal">添加</CButton>
        </div>
      </div>
      <Calendar></Calendar>
    </div>
  );
}
