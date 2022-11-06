import React from 'react';

export default function ProfileHeader() {
  return (
    <div
      className="h-auto bg-gradient-to-tr
    from-red-50 via-yellow-50 to-red-100 w-full p-4"
    >
      <div className="h-20  flex">
        <div className="avatar placeholder">
          <div className="bg-white text-neutral-content rounded-full h-20 w-20">
            <span className="text-3xl">K</span>
          </div>
        </div>
        <div className='ml-5 flex justify-between items-center w-full'>
            <div className='flex flex-col justify-between h-full'>
                <div className='font-500 text-lg' >测试用户</div>
                <div className='font-400  text-xs text-gray-300'>约克大学 (加拿大)</div>
                <div className='flex-shrink	 text-xs   rounded-full font-500'>
                    <div className='bg-white'>学生认证</div>
                </div>
            </div>
            <div>{">"}</div>
        </div>
      </div>
      <div className="h-10 mt-10">2</div>
    </div>
  );
}
