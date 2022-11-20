import React from 'react';
import RightIcon from './right.svg';
import Subtract from './Subtract.svg';
import Button from './Button.svg';
const UserData = () => {
  return (
    <div className='flex items-center justify-between p-4'>
      <div className="flex space-x-5 ">
      <div className="flex flex-col items-center justify-center">
        <div className="font-bold text-blueTitle">31</div>
        <div className='text-gray-400'>关注</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="font-bold text-blueTitle">31</div>
        <div className='text-gray-400'>关注</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="font-bold text-blueTitle">31</div>
        <div className='text-gray-400'>关注</div>
      </div>
    </div>
    <Button></Button>
    </div>
  );
};
export default function ProfileHeader() {
  return (
    <div
      className="w-full h-auto pt-10 pb-10 bg-gradient-to-tr from-red-50 via-yellow-50 to-red-100"
    >
      <div className="flex h-20 p-4">
        <div className="avatar placeholder">
          <div className="w-20 h-20 bg-white rounded-full text-neutral-content">
            <span className="text-3xl">K</span>
          </div>
        </div>
        <div className="flex items-center justify-between w-full h-full ml-5">
          <div className="flex flex-col justify-between w-full h-full pt-2">
            <div className="text-lg font-500">测试用户</div>
            <div className="text-xs text-gray-300 font-400">
              约克大学 (加拿大)
            </div>
            <div className="flex flex-shrink space-x-2 text-xs rounded-full font-500">
              <div className="flex items-center p-1 space-x-1 bg-white rounded-full">
                <Subtract></Subtract>
                <div className="text-xs text-blueTitle">学生认证</div>
              </div>
              <div className="flex items-center p-1 space-x-1 bg-white rounded-full">
                <Subtract></Subtract>
                <div>学生认证</div>
              </div>
            </div>
          </div>
          <div className='pt-6'>
          <RightIcon></RightIcon>
          </div>
        </div>
      </div>
      <div className="h-10 mt-10">
        <UserData></UserData>
      </div>
    </div>
  );
}
