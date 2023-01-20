import React, { useState } from 'react';
import StarIcon from './star.svg';
import DiscussionIcon from './DiscussionIcon.svg';
export default function FooterDiscussionInput(props) {
  const [comment, setComment] = useState<string>('');
  const { data } = props;
  const send = ()=>{
    props.send(comment)
  }
  return (
    <div className="sticky  z-30 bottom-0 flex   items-center w-full p-5 bg-white h-[60px]">
      <div className="absolute flex  items-center font-medium left-7 text-sm text-[#798195]">
        <DiscussionIcon></DiscussionIcon>
        {data?.comments?.length}
      </div>
      <input
        placeholder="说点什么"
        value={comment}
        className="px-4 pl-12 w-full   h-9 bg-[#F7F8F9] rounded-full"
        onChange={(e) => {
          setComment(e.target.value);
        }}
      ></input>
      {comment?.length === 0 ? (
        <div className="flex items-center ml-4 space-x-1">
          <StarIcon></StarIcon>
          <div className="text-sm text-[#798195]">
            {' '}
            {data?.interactInfo?.likeCount}
          </div>
        </div>
      ) : (
        <div className="text-sm text-[#798195] whitespace-nowrap" onClick={()=>{send()}}>发送</div>
      )}
    </div>
  );
}
