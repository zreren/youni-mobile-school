import React from 'react';
import RightIcon from './right.svg';
import Subtract from './Subtract.svg';
import Button from './Button.svg';
const UserData = () => {
  return (
    <div className='flex justify-between items-center p-4'>
      <div className="flex space-x-5 ">
      <div className="flex flex-col justify-center items-center">
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
      className="h-auto bg-gradient-to-tr 
    from-red-50 via-yellow-50 to-red-100 w-full pt-10 pb-10"
    >
      <div className="h-20  flex p-5">
        <div className="avatar placeholder">
          <div className="bg-white text-neutral-content rounded-full h-20 w-20">
            <span className="text-3xl">K</span>
          </div>
        </div>
        <div className="ml-5 flex justify-between items-center w-full h-full">
          <div className="flex flex-col justify-between w-full h-full">
            <div className="font-500 text-lg">测试用户</div>
            <div className="font-400  text-xs text-gray-300">
              约克大学 (加拿大)
            </div>
            <div className="flex-shrink	 text-xs  flex space-x-2  rounded-full font-500">
              <div className="bg-white flex p-1 items-center space-x-1 rounded-full">
                <Subtract></Subtract>
                <div className="text-xs text-blueTitle">学生认证</div>
              </div>
              <div className="bg-white flex  p-1 items-center space-x-1 rounded-full">
                <Subtract></Subtract>
                <div>学生认证</div>
              </div>
            </div>
          </div>
          <RightIcon></RightIcon>
        </div>
      </div>
      <div className="h-10 mt-10">
        <UserData></UserData>
      </div>
    </div>
  );
}
