import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CommonLayout from '@/components/Layout/CommonLayout';
import Header from '@/components/Header';
import classnames from 'classnames';
import HeaderMenu from '@/components/Menu/Header-menu';
import Link from 'next/link';
import ProfileHeader from '@/components/PageComponents/Profile/ProfileHeader';
import Icon1 from './1.svg';
import Icon1Select from './1-select.svg';
import Icon2 from './2.svg';
import Icon2Select from './2-select.svg';
import Icon3Select from './3-select.svg';
import Icon3 from './3.svg';
import PrivateIcon from './private.svg';
import Icon4 from './4.svg';
import ValidIcon from './validstu.svg';
import MenuIcon1 from './menu/menu1.svg';
import MenuIcon2 from './menu/menu2.svg';
import MenuIcon3 from './menu/menu3.svg';
import MenuIcon4 from './menu/menu4.svg';
import SettingIcon1 from './setting/setting@2x.svg';
import SettingIcon2 from './setting/setting@2x-1.svg';
import SettingIcon3 from './setting/setting@2x-2.svg';
import SettingIcon4 from './setting/setting@2x-3.svg';
import SettingIcon5 from './setting/setting@2x-4.svg';
import SettingIcon6 from './setting/setting@2x-5.svg';
import SettingIcon7 from './setting/setting@2x-6.svg';
import SettingIcon8 from './setting/setting@2x-7.svg';
import SettingIcon9 from './setting/setting@2x-8.svg';
import SettingIcon10 from './setting/setting@2x-9.svg';
import SettingIcon11 from './setting/setting@2x-10.svg';
import BgSVG from './bg.svg';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { withTranslation } from 'next-i18next';
import Image from 'next/image';
import Waterfall from '@/components/Layout/Waterfall';
import PostGroupIcon1 from './post-group/icon1.svg';
import PostGroupIcon2 from './post-group/icon2.svg';
import PostGroupIcon3 from './post-group/icon3.svg';
import useUser from '@/hooks/useUser';
import useLocalStorage from '@/hooks/useStore';
import { Sticky } from 'react-vant';
import { Picker, Toast } from 'react-vant';
import { setOpenLogin } from '@/stores/authSlice';
import { useDispatch } from 'react-redux';
import useFetch from '@/hooks/useFetch';
import LockIcon from './lock.svg';
import LockActiveIcon from './lock_active.svg';
import StarGroup from './stargroup.svg';
import RightIcon from './right.svg';
import useRequest from "@/libs/request";
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { use } from 'i18next';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';


const PostGroupItem = (props):JSX.Element =>{
  const {title,id} = props;
  return <div onClick={()=>{props.selectPostGroup()}} className='bg-[#F7F8F9] h-12 py-2 px-1 flex items-center rounded space-x-2'>
      <StarGroup></StarGroup>
      <div className='text-[#6D7486] text-xs'>
        {title}
      </div>
      <RightIcon></RightIcon>
  </div>
}
function index(props) {
  const { user } = useUser();
  const router = useRouter();
  const userId = Number(router.query.id);
  const { data } = useFetch('/user/post_stared_list', 'get', {
    id: userId,
  });
  const PostGroupDetail = (props) => {
    const { data,isEdit,mutate } = props;
    if (!data) return;
    return (
      <div className="w-full h-screen">
        <div className="w-full h-[156px] bg-[#F7F8F9] p-5 mb-4">
          <div className="flex items-center">
            <div className="grid grid-cols-2 gap-1 grid-rows-2    bg-white p-1 rounded-lg">
              {data?.posts?.length > 0? data?.posts?.slice(0, 4).map((item) => {
                return (
                  <div className="overflow-hidden  h-[26px] w-[26px]">
                    <img
                      width={'100%'}
                      style={{ objectFit: 'contain' }}
                      height={'100%'}
                      src={`${Cons.BASEURL}${item.preview[0]}`}
                    ></img>
                  </div>
                );
              }):<div className='h-[26px] w-[26px]'></div>}
            </div>         
          </div>
          <div className="flex justify-between mt-3">
            <div>
              <div className={classnames('flex items-center p-2')}>
                <div className="avatar placeholder">
                  <div
                    onClick={() => {
                      // checkUser(data?.id);
                    }}
                    className="w-8 rounded-full bg-neutral-focus text-neutral-content"
                  >
                    <img src={`${Cons.BASEURL}${data?.user?.avatar}`} />
                  </div>
                </div>
                <div
                  onClick={() => {
                    // checkUser(data?.id);
                  }}
                >
                  <div className="ml-4 text-sm  font-normal max-w-8 text-[#37455C] ">
                    {data?.user?.nickName}
                  </div>
                  <div className="ml-4 text-xs text-gray-200">
                    {data?.user?.education?.year} · {data?.user?.education?.major}
                    {/* 2022届 · B.Com Accounting */}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="flex items-center space-x-1">
                <PostGroupIcon1></PostGroupIcon1>
                <div className="text-[#798195] text-xs">{data?.postCount}</div>
              </div>
              <div className="flex items-center  space-x-1">
                <PostGroupIcon2></PostGroupIcon2>
                <div className="text-[#798195] text-xs">{data?.followCount}</div>
              </div>
              <div className="flex items-center  space-x-1">
                <PostGroupIcon3></PostGroupIcon3>
                <div className="text-[#798195] text-xs">{data?.viewCount}</div>
              </div>
            </div>
          </div>
          <div>
          </div>
        </div>
        {data?.posts?.length > 0 ?<Waterfall
              key={data?.id + data?.posts?.length}
              postData={data?.posts?.map((item) => {
                return { ...item, user: { nickName: data?.user?.nickName } };
              })}
            ></Waterfall>:<div className='text-[#898E97] flex justify-center'>该文集暂时没有内容</div>}
      </div>
    );
  };
  
  const PostGroupDrawer = (props) => {
    const { open,isEdit,mutate}: { open: boolean,isEdit:boolean,mutate:any} = props;
    const [id, setId] = useState(props?.id);
    const Puller = styled(Box)(({ theme }) => ({
      width: 33,
      height: 4,
      backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
      borderRadius: 3,
      position: 'absolute',
      top: 8,
      left: 'calc(50% - 15px)',
    }));
    return (
      <SwipeableDrawer
        className="z-20"
        disableDiscovery={true}
        disableSwipeToOpen={true}
        onClose={() => {
          props.onClose();
        }}
        onOpen={() => {
          props.onOpen();
        }}
        open={open}
        anchor="bottom"
      >
        <div className="h-[96vh]">
          <Puller></Puller>
          <PostGroupDetail mutate={()=>{mutate()}} isEdit={isEdit} data={props.data}></PostGroupDetail>
        </div>
      </SwipeableDrawer>
    );
  };
  const Profile2 = () => {
    const [menu, setMenu] = useState(0);
    const { data, mutate } = useFetch('/user/post_liked_list', 'get', {
      id: userId,
    });
    const {data:postGroup,mutate:groupMutate} = useFetch('/user/collection','get',{
      id:userId
    })

    useEffect(() => {
      mutate();
      groupMutate()
    }, [userId]);
    return (
      <div className="h-full ">
        <div className='flex p-2'>
          {
            postGroup?.data?.map((item)=>{
              return <PostGroupItem selectPostGroup={()=>{
                setDetailId(item.id);
                setOpenDetail(true);
              }} id={item.id} title={item.name}></PostGroupItem>
            })
          }
        </div>
        <Waterfall
          postData={data?.data?.map((item) => {
            return { ...item,  nickName: user.nickName  };
          })}
        ></Waterfall>
      </div>
    );
  };

  const Profile3 = () => {
    const [menu, setMenu] = useState(0);
    const { data, mutate } = useFetch('/student/post_stared_list', 'get', {
      id: userId,
    });
    useEffect(() => {
      mutate();
    }, [userId]);
    return (
      <div className="w-full">
        <Waterfall
          postData={data?.data?.map((item) => {
            return { ...item, nickName: user.nickName };
          })}
        ></Waterfall>
        {/* {menu === 0 ? (
          <div className="px-[10px]">
            <PostGroup></PostGroup>
          </div>
        ) : (
          <Waterfall postData={Object.assign(liked?.data, stard?.data.length > 0 ? stard?.data : null)}></Waterfall>
        )} */}
        {data?.code === 400 ? (
          <div className="w-full h-full mt-10 flex justify-center items-center flex-col">
            <PrivateIcon></PrivateIcon>
            <div className="text-[#A9B0C0] text-xs mt-4">
              该用户隐藏了自己的收藏
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  const { data: UserData, mutate } = useFetch('/user/info', 'get', {
    id: router.query.id,
  });
  useEffect(() => {
    if (user?.user?.id === Number(router.query.id)) {
      router.push('/Profile');
    } else {
      mutate();
    }
  }, [router.query.id]);
  // },[])
  const [school, setSchool] = useLocalStorage('school', 'York');
  const { i18n } = useTranslation('common');
  console.log(i18n, 'i18n');
  const [menuVal, setMenu] = useState(1);
  const StarIcon = useCallback(()=>{
    if(menuVal === 2 && !data?.data){
      return <LockActiveIcon></LockActiveIcon>
    }
    if(menuVal === 2 && data?.data){
      return <Icon2Select></Icon2Select>
    }
    if(menuVal !== 2 && !data?.data){
      return <LockIcon></LockIcon>
    }
    if(menuVal !== 2 && data?.data){
      return <Icon2></Icon2>
    }

  },[menuVal,data])
  const headerList = [
    {
      icon: menuVal === 1 ? <Icon3Select></Icon3Select> : <Icon3></Icon3>,
      menu: <Profile2></Profile2>,
    },
    {
      icon:  <StarIcon></StarIcon>,
      menu: <Profile3></Profile3>,
    },
  ];
  const container = React.useRef<any>(null);

  const dispatch = useDispatch();
  const [openDetail, setOpenDetail] = useState(false);
  const [detailId, setDetailId] = useState();
  const { data: collectionData, mutate:collectionDataMutate } = useFetch(
    '/collection/detail',
    'get',
    {
      id: detailId,
    },
  );
  useEffect(()=>{
    collectionDataMutate();
  },[detailId])
  return (
    <div className="w-screen min-h-screen">
      <PostGroupDrawer
          data={collectionData?.data}
          mutate={()=>{collectionDataMutate()}}
          onOpen={() => {
            setOpenDetail(true);
          }}
          onClose={() => {
            setOpenDetail(false);
          }}
          open={openDetail}
        ></PostGroupDrawer> 
      {/* <div className=''> */}
      <ProfileHeader
        mutate={() => {
          mutate();
        }}
        myProfile={(UserData?.data?.id !== user?.id)}
        data={{ user: UserData?.data }}
      ></ProfileHeader>
      <div className="w-full header-shadow overflow-hidden rounded-t-2xl -translate-y-[6px]">
        {menuVal !== 4 ? (
          <HeaderMenu
            headerMenuList={headerList}
            switchMenu={(val) => {
              setMenu(val + 1);
            }}
          ></HeaderMenu>
        ) : null}
      </div>
      <div>
        {menuVal === 1 ? <Profile2></Profile2> : null}
        {menuVal === 2 ? <Profile3></Profile3> : null}
      </div>
    </div>
  );
}
// export default withTranslation('common')(Identify)
export default index;
