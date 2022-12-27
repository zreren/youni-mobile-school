import React from 'react';
import StarIcon from './star.svg';
import DiscussionIcon from './DiscussionIcon.svg';
export default function FooterDiscussionInput() {
  return (
    <div className="sticky  z-30 bottom-0 flex   items-center w-full p-5 bg-white h-[60px]">
      <div className='absolute flex  items-center font-medium left-7 text-sm text-[#798195]'>
        <DiscussionIcon></DiscussionIcon>
        23</div>
      <input
        placeholder="说点什么"
        className="px-4 pl-12 w-full   h-9 bg-[#F7F8F9] rounded-full"
      ></input>
      <div className="flex items-center ml-4 space-x-1">
        <StarIcon></StarIcon>
        <div className="text-sm text-[#798195]">1234</div>
      </div>
    </div>
  );
}
