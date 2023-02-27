import React from 'react';
import CateGoryIcon from './categoryIcon.svg';
import IOSSwitch from '../Input/ios';
export default function expiration() {
  return (
    <div className="items-start justify-between  py-0 bg-white p-5 pb-5">
      <div className="flex justify-between mb-6">
        <div className="flex items-center space-x-2">
          <CateGoryIcon></CateGoryIcon>
          {/* {item.Icon ? <Icon className="mt-1"></Icon> : null} */}
          <div className="text-blueTitle">有效期</div>
        </div>
        {/* <div>{item.action}</div> */}
      </div>
      <div className="flex justify-between mb-6">
        <div className="text-[#798195]">长期有效</div>
        <div>
          <IOSSwitch></IOSSwitch>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="text-[#798195]">适用学期</div>
        <div></div>
      </div>
    </div>
  );
}
