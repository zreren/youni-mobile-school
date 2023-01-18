import React from 'react';
import Image from 'next/image';
import useUser from '@/hooks/useUser';
export default function PostDiscussionInput() {
  const { user } = useUser();
  return (
    <div className="flex w-full h-9">
      <div className="rounded-full w-9 min-w-[2.25rem] h-9 bg-slate-400">
        {user?.student.avatar ? (
          <Image
            placeholder="blur"
            objectFit="cover"
            className='rounded-full'
            blurDataURL={`${Cons.BASEURL}${user?.student.avatar }`}
            width={'80px'}
            height={'80px'}
            src={`${Cons.BASEURL}${user?.student.avatar }`}
          />
        ) : (
          <span className="text-3xl">K</span>
        )}
      </div>
      <input
        placeholder="看到这了，要不要说点什么..."
        className="px-4 w-full ml-2 h-full bg-[#F7F8F9] rounded-full"
      ></input>
    </div>
  );
}
