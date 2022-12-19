import React from 'react';
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
        <div className="flex items-center justify-center w-full h-10 text-sm font-semibold text-green-500 rounded-full bg-bg">加微信</div>
        <div className="flex items-center justify-center w-full h-10 text-sm font-semibold text-green-500 rounded-full bg-bg">打电话</div>
      </div>
      <div className="flex mt-3 space-x-3">
        <div className="flex items-center justify-center w-full h-10 text-sm font-semibold text-green-500 rounded-full bg-bg">发短信</div>
        <div className="flex items-center justify-center w-full h-10 text-sm font-semibold text-blue-500 rounded-full bg-bg">发邮件</div>
      </div>
    </div>
  );
}
