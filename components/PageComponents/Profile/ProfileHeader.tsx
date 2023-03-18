import React, { useEffect, useState } from 'react';
import RightIcon from './right.svg';
import Subtract from './Subtract.svg';
import Button from './Button.svg';
import Image from 'next/image';
import Link from 'next/link';
import LikeActive from './LikeActive.svg';
import Like from './Like.svg';
import Dislike from './dislike.svg';
import useLanguage from '@/hooks/useLanguage';
import useRequest from '@/libs/request';
import { useRouter } from 'next/router';
import { Toast } from 'react-vant';
import classnames from "classnames";
import useUser from '@/hooks/useUser';
export default function ProfileHeader(props) {
  const {data,myProfile,mutate} = props;
  // const data = {
  //   student: props.data,
  // }
  const router = useRouter();
  const {loggedOut} = useUser();
  const UserData = (props) => {
    // const {data} = props;
    const data = props.data
    // const data = {
    //   student: props.data,
    // }
    const follow = async (id:number):Promise<void>=>{
      if(!isFollow){
        const {data} = await useRequest.post('/api/friend/follow',{studentId:id});
        console.log(data,"data")
        if(data?.message){
          Toast.success('关注成功');
          mutate()
        }
      }
      if(isFollow){
        const {data} = await useRequest.post('/api/friend/unfollow',{studentId:id});
        // console.log(data,"data")
        if(data?.message){
          Toast.success('取消关注成功');
          mutate()
        }
      }
      
    };
    useEffect(()=>{
      console.log(data,"UserData")
    },[data])
    const [isFollow,setIsFollow] = useState(data?.user?.extraInfo?.followed)
    // if(!data?.extraInfo) return 
    return (
      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex items-center space-x-2 ">
          <div className="flex flex-col items-center justify-center">
            <div className="font-bold text-blueTitle">{data?.user?.extraInfo?.following || 0 }</div>
            <div className="text-xs text-gray-400">关注</div>
          </div>
          <div>
            <svg
              width="2"
              height="15"
              viewBox="0 0 2 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                opacity="0.1"
                x="0.125"
                y="0.5"
                width="1"
                height="14"
                fill="#37455C"
                fill-opacity="0.85"
              />
            </svg>
          </div>
          <div className="flex flex-col items-center">
            <div className="font-bold text-blueTitle">{data?.user?.extraInfo?.followers || 0}</div>
            <div className="text-xs text-gray-400">粉丝</div>
          </div>
          <div>
            <svg
              width="2"
              height="15"
              viewBox="0 0 2 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                opacity="0.1"
                x="0.125"
                y="0.5"
                width="1"
                height="14"
                fill="#37455C"
                fill-opacity="0.85"
              />
            </svg>
          </div>
          <div className="flex flex-col items-center">
            <div className="font-bold text-blueTitle">{data?.user?.extraInfo?.likeAndStar || 0}</div>
            <div className="text-xs text-gray-400">赞&收藏</div>
          </div>
        </div>
        { myProfile === false ? <div onClick={()=>{follow(Number(router.query.id))}} className={
          classnames(
            ' text-xs h-6 flex justify-center items-center  rounded-full w-12',
            {
            'bg-[#FFD036] text-[#8C6008]': !isFollow,
            'bg-[#E5E5E5] text-[#808080]': isFollow,
            })
        }>{isFollow?'已关注':'关注'}</div> : !loggedOut && <Link href="/Setting"><Button></Button></Link>}
      </div>
    );
  };
  return (
    <div className="w-full h-auto pt-10 pb-8 bg-gradient-to-tr from-red-50 via-yellow-50 to-red-100">
      <div className="flex h-20 p-4">
        <div className="avatar placeholder">
          <div className="w-20 h-20 bg-white rounded-full text-neutral-content">
            {data?.user?.avatar? <Image placeholder='blur' objectFit='cover' blurDataURL={`${Cons.BASEURL}${data?.user?.avatar}`}
             width={'80px'} height={'80px'}  src={`${Cons.BASEURL}${data?.user?.avatar}`} />
              :<span className="text-3xl"></span>
            }
          </div>
        </div>
        <div className="flex items-center justify-between w-full h-full ml-5">
          <div className="flex flex-col justify-between w-full h-full pt-2">
            <div className="text-lg font-500">{data?.user?.nickName?data?.user?.nickName:"username"}</div>
            <div className="text-xs text-[#798195] font-400">
              {data?.user?.campus ?data?.user?.campus[useLanguage('name')]:!loggedOut ?<div className='w-10 h-2 rounded-lg bg-bg animate-pulse'></div>:null}
            </div>
            <div className="text-[10px] text-[#798195] font-400 mb-1">
               {myProfile? data?.user?.id?`YoID:${data?.user.id}`: !loggedOut?
               <div className='w-10 h-2 rounded-lg bg-bg animate-pulse'></div> :"":""
               }
             {/* {'约克大学 (加拿大)'} */}
            </div>
            <div className="flex flex-shrink space-x-2 text-xs rounded-full font-500">
              {data?.user?.education?(
               <>
                 <div className="flex items-center p-1 space-x-1 bg-white rounded-full px-2">
                <Subtract></Subtract>
                <div className="text-xs text-blueTitle font-medium ">学生认证</div>
              </div>
                </>
              ):null}
              {
                data?.user?  <div className="flex items-center p-1 pl-2 pr-2 space-x-1 bg-white rounded-full">
                <div className='font-medium px-1'>用户</div>
              </div>:null
              }
            </div>
          </div>
          <div onClick={()=>{
            router.push('/Setting/profile')
          }} className="pt-6">
            <RightIcon></RightIcon> 
          </div>
        </div>
      </div>
      <div className="h-10 mt-10">
        <UserData data={data}></UserData>
      </div>
    </div>
  );
}
