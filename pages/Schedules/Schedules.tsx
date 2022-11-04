import React, { useState } from 'react';
import Calendar from '@/components/Calendar/Calendar';
import Header from '@/components/Header';
import CButton from '@/components/Button/CButton';
import Icon from '@/components/Icon';
import Tooltips from './components/Tooltips';
import classnames from 'classnames';
export default function Schedules() {
  const [addCourse,setAddCourse] = useState(false);
  const [setting,setSetting] = useState({
    view: "day",
  });
  return (
    <div className="bg-bg space-y-1">
      <div className="f-11 text-left pl-5 ">
        <div className="font-bold text-blueTitle text-base">第 7 周</div>
        <div className="text-xs text-gray-400">10月10日 - 10月16日</div>
      </div>
      <div className="h-11 flex items-center justify-between pl-5 pr-5 bg-bg">
        <div className="rounded-xl bg-white h-8 w-2/3 flex items-center justify-around">
          <button onClick={()=>{setSetting({...setting,view:"day"})}} className={classnames('"btn  p-1 text-sm  bg-gray-50  rounded-sm',{'text-yellow-300':setting.view==="day"})}>
            近五天
          </button>
          <button onClick={()=>{setSetting({...setting,view:"week"})}} className={classnames("text-sm bg-white  text-gray-400",{'text-yellow-300':setting.view==="week"})}>
          近一周
          </button>
          <button  onClick={()=>{setSetting({...setting,view:"today"})}} className={classnames("text-sm bg-white text-gray-400",{'text-yellow-300':setting.view==="today"})} >
          今日
          </button>
          <button onClick={()=>{setSetting({...setting,view:"month"})}} className={classnames("text-sm bg-white text-gray-400",{'text-yellow-300':setting.view==="month"})}>
          校历
          </button>
        </div>
        <div className='flex items-center space-x-2'>
          <Icon type="menu1"></Icon>
          <Tooltips open={addCourse} 
          add={()=>{console.log('addCourse')}}
          
          >
          <CButton size="normal" >添加</CButton>
          </Tooltips>
        </div>
      </div>
      <Calendar setting={setting}></Calendar>
    </div>
  );
}
