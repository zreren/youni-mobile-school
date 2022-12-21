import React from 'react';
import Icon1 from './contact/1.svg';
import Icon2 from './contact/2.svg';
import Icon3 from './contact/3.svg';
import Icon4 from './contact/4.svg';

export default function index() {
  return (
    <div className="w-full bg-white h-44">
      <div className="flex items-center">
        <div className="avatar placeholder">
          <div className="w-12 rounded-full bg-neutral-focus text-neutral-content">
            <img src="https://placeimg.com/192/192/people" />
          </div>
        </div>
        <div>
          <div className="ml-4 text-sm font-medium max-w-8 text-blueTitle">
            测试用户
          </div>
          <div className="ml-4 text-xs text-gray-200">
            2022届 · B.Com Accounting
          </div>
        </div>
      </div>
      <div className="flex mt-4 space-x-3">
        <div className="flex items-center justify-center w-full h-10 space-x-2 text-sm font-semibold text-[#52C41A] rounded-full bg-bg">
          <Icon3></Icon3>
          <div>加微信</div>
        </div>
        <div className="flex items-center justify-center w-full h-10 space-x-2 text-sm font-semibold text-[#52C41A] rounded-full bg-bg">
          <Icon2></Icon2>
          <div>打电话</div>
        </div>
      </div>
      <div className="flex mt-3 space-x-3">
        <div className="flex items-center justify-center w-full h-10 space-x-2 text-sm font-semibold text-[#52C41A] rounded-full bg-bg">
          <Icon4></Icon4>
          <div>发短信</div>
        </div>
        <div className="flex items-center justify-center w-full h-10 space-x-2 text-sm font-semibold text-[#3665FF] rounded-full bg-bg">
          <Icon1></Icon1>
          <div>发邮件</div>
        </div>
      </div>
    </div>
  );
}
