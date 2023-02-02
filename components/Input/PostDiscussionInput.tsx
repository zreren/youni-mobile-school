import React from 'react';
import Image from 'next/image';
import useUser from '@/hooks/useUser';
import { useDispatch } from 'react-redux';
import { setOpenLogin } from '../../stores/authSlice';

export default function PostDiscussionInput() {
  const dispatch = useDispatch()
  const { user,loggedOut} = useUser();
  const callLogin =()=>{
    if(loggedOut){
      dispatch(setOpenLogin('login'))
    }
  }
  return (
    <div className="flex w-full h-9" onClick={()=>{callLogin()}}>
      <div className="rounded-full w-9 min-w-[2.25rem] h-9 bg-slate-400">
        {user?.avatar ? (
          <Image
            placeholder="blur"
            objectFit="cover"
            className='rounded-full'
            blurDataURL={`${Cons.BASEURL}${user?.avatar }`}
            width={'80px'}
            height={'80px'}
            src={`${Cons.BASEURL}${user?.avatar }`}
          />
        ) : (
          <span className="text-3xl"></span>
        )}
      </div>
      <input
        placeholder={loggedOut?"立即登录，参与讨论":"看到这了，要不要说点什么..."}
        className="px-4 w-full ml-2 h-full bg-[#F7F8F9] rounded-full"
      ></input>
    </div>
  );
}
