import React, { useEffect, useState } from 'react';
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
import { Input, Sticky } from 'react-vant';
import { Picker, Toast } from 'react-vant';
import { setOpenLogin } from '@/stores/authSlice';
import { useDispatch } from 'react-redux';
import useFetch from '@/hooks/useFetch';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { Switch } from 'react-vant';
import useRequest from "@/libs/request";
// import Waterfall from '@/components/Layout/Waterfall';

const PostGroupDetail = (props) => {
  const { data,isEdit,mutate } = props;
  const cancelStarPost = async (id)=>{
    console.log("PostGroupDetail",id,data?.id)
    await  useRequest.post("/api/post/unstar",{
      id:id,
      collectionId:data?.id
    })
    Toast.success("移除成功")
    mutate()
  }
  useEffect(()=>{
    console.log(isEdit,"isEdit")
  },[isEdit])
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
          {
            isEdit ?
           <div className='ml-4'>
            <Input className=" text-[#37455C]  underline  font-semibold text-lg" value={data?.name}></Input>
            <div className='mt-2 flex items-center'>
              <div className='w-[4px] h-4 bg-[#FFCE00] mr-2 rounded-full'></div>
              <div className='mr-4 text-blueTitle'>是否公开</div>
              <Switch  size="24px" activeColor="#FED440"></Switch></div>
           </div>:
            <div className="ml-4 text-[#37455C] font-semibold text-lg">
            {data?.name}
          </div>
          }
          
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
                  <img src={`${Cons.BASEURL}${data?.student?.avatar}`} />
                </div>
              </div>
              <div
                onClick={() => {
                  // checkUser(data?.id);
                }}
              >
                <div className="ml-4 text-sm  font-normal max-w-8 text-[#37455C] ">
                  {data?.student?.nickName}
                </div>
                <div className="ml-4 text-xs text-gray-200">
                  {data?.student?.education?.year} · {data?.student?.education?.major}
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
            isEdit={isEdit}
            key={data?.id + data?.posts?.length}
            cancelStarPost={(id)=>{cancelStarPost(id)}}
            postData={data?.posts?.map((item) => {
              return { ...item, student: { nickName: data?.student?.nickName } };
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

const PostGroup = (props) => {
  const { data,isEdit } = props;
  const [id, setId] = useState(data?.id);
  const [isEditMethod,setIsEditMethod] = useState(isEdit)
  return (
    <div
      className="w-full px-5 py-4  rounded-lg border border-[#D9E7FF] bg-PostGroup"
    >
      <div className="flex justify-between">
        {' '}
        <div className="flex items-center space-x-2">
          <div className="text-blueTitle text-sm font-semibold">
            {data?.name}
          </div>
          <div
            className={classnames(
              'text-[10px] rounded-sm px-2  flex justify-center items-center',
              {
                'text-white bg-[#52C41A]': data?.isPublic,
                'text-blueTitle bg-[#D9E7FF]': !data?.isPublic,
              },
            )}
          >
            {data?.isPublic ? '公开' : '私密'}
          </div>
        </div>
        <div onClick={(e)=>{
          e.preventDefault();
          props.check(id,true);
        }} className="rounded-full  text-[#A9B0C0] flex justify-center items-center border w-14 bg-white border-[#F3F4F6]">
          编辑
        </div>
      </div>
      <div className="flex space-x-2"       onClick={(e) => {
        e.preventDefault();
        console.log(id, 'data?.id');
        props.check(id,false);
      }}>
        <div className="flex items-center space-x-2">
          <PostGroupIcon1></PostGroupIcon1>
          <div className="text-[#798195] text-xs">{data?.postCount}</div>
        </div>
        <div className="flex items-center space-x-2">
          <PostGroupIcon2></PostGroupIcon2>
          <div className="text-[#798195] text-xs">{data?.followCount}</div>
        </div>
        <div className="flex items-center space-x-2">
          <PostGroupIcon3></PostGroupIcon3>
          <div className="text-[#798195] text-xs">{data?.viewCount}</div>
        </div>
      </div>
      <div className="mt-4 flex space-x-4"
            onClick={(e) => {
              e.preventDefault();
              console.log(id, 'data?.id');
              props.check(id,false);
            }}
      >
        {
          data?.posts?.length > 0 ? data?.posts?.slice(0,4).map((item,index)=>{
            return (
             <div>
               <Image
              width={64}
              height={64}
              placeholder="blur"
              blurDataURL={`${Cons.BASEURL}${item.preview[0]}`}
              src={`${Cons.BASEURL}${item.preview[0]}`}
              className="rounded-xl"
            ></Image>
             </div>
            )
          }): <div className='w-full h-16 text-[#798195] flex justify-center items-center'>
              在校园广场添加贴文到文集中
          </div>
        }
      </div>
    </div>
  );
};
const Identify = () => {
  const router = useRouter();
  const { t } = useTranslation('translations');
  return (
    <div
      onClick={() => {
        router.push('./Profile/valid');
      }}
      className="relative flex items-center justify-between w-full h-16 p-4 pt-0 pb-0 youni-vip rounded-xl text-gold"
    >
      <div className="flex items-center space-x-2">
        <ValidIcon className="absolute left-0"></ValidIcon>
        {/* <div>{t("profile.identify.student.certification")}</div> */}
        <div className="pl-10 font-bold text-brown">学生认证</div>
      </div>
      <div className="flex flex-col items-center text-xs text-brown">
        <div>30秒认证在校生身份</div> <div>解锁YoUni全部功能</div>
      </div>
      <BgSVG className="absolute h-10 scale-125 w-18 -right-0"></BgSVG>
    </div>
  );
};
const ProfileMenu = () => {
  return (
    <div className="flex justify-between p-4  relative">
      <div className="flex flex-col items-center  space-y-3">
        <MenuIcon1></MenuIcon1>
        <div className="text-xs text-[#798195]">每日签到</div>
      </div>
      <div className="flex flex-col items-center space-y-3">
        <MenuIcon2></MenuIcon2>
        <div className="text-xs text-[#798195]">评论和@</div>
      </div>
      <div className="flex flex-col items-center space-y-3">
        <MenuIcon3></MenuIcon3>
        <div className="text-xs text-[#798195]">赞&收藏</div>
      </div>
    </div>
  );
};
const Setting = () => {
  return (
    <div className="w-full rounded-lg card bg-base-100 ">
      <div className="p-4 pl-0 pr-0 card-body space-y-3">
        <div className="grid grid-cols-4 ">
          <Link href="/Setting/account">
            <div className="flex flex-col items-center space-y-3">
              <SettingIcon1></SettingIcon1>
              <div className="text-xs text-[#798195]">账号</div>
            </div>
          </Link>
          <div className="flex flex-col items-center space-y-3">
            <SettingIcon2></SettingIcon2>
            <Link href="/Setting/">
              <div className="text-xs text-[#798195]">草稿箱</div>
            </Link>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <SettingIcon3></SettingIcon3>
            <div className="text-xs text-[#798195]">历史</div>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <SettingIcon4></SettingIcon4>
            <Link href="/Setting">
              <div className="text-xs text-[#798195]">功能请求</div>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-4 ">
          <div className="flex flex-col items-center space-y-3">
            <SettingIcon5></SettingIcon5>
            <div className="text-xs text-[#798195]">邀请好友</div>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <SettingIcon6></SettingIcon6>
            <div className="text-xs text-[#798195]">客服</div>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <SettingIcon7></SettingIcon7>
            <div className="text-xs text-[#798195]">我的积分</div>
          </div>
          <Link href="/Setting/contact">
            <div className="flex flex-col items-center space-y-3">
              <SettingIcon8></SettingIcon8>
              <div className="text-xs text-[#798195]">联系方式</div>
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-4 ">
          <div className="flex flex-col items-center space-y-3">
            <SettingIcon9></SettingIcon9>
            <div className="text-xs text-[#798195]">加入有你</div>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <SettingIcon10></SettingIcon10>
            <div className="text-xs text-[#798195]">社团入驻</div>
          </div>
          <Link href="/Setting">
            <div className="flex flex-col items-center space-y-3">
              <SettingIcon11></SettingIcon11>
              <div className="text-xs text-[#798195]">系统设置</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

function index(props) {
  const { user, loggedOut } = useUser();
  const Profile1 = () => {
    return (
      <div className="h-[calc(100vh-320px)] overflow-x-hidden relative w-full overflow-y-scroll">
        <div className="w-full p-5 pb-1 bg-white ">
          <Identify></Identify>
        </div>
        <Sticky offsetTop={280}>
          <div className="w-full p-5 pb-1 bg-white ">
            <ProfileMenu></ProfileMenu>
          </div>
          <div className="w-full h-[10px] bg-bg"></div>
        </Sticky>
        <div className="w-full bg-white">
          <Setting></Setting>
        </div>
      </div>
    );
  };
  const Profile2 = () => {
    const [menu, setMenu] = useState(1);
    const { data } = useFetch('/post/list', 'get');
    const [detailId, setDetailId] = useState();
    const { data: collectionData, mutate } = useFetch(
      '/collection/detail',
      'get',
      {
        id: detailId,
      },
    );
    useEffect(() => {
      console.log(detailId, 'detailId');
      // if(!detailId) return;
      mutate();
    }, [detailId]);
    const { data: PostGroupData } = useFetch('/collection/list', 'get');
    const [openDetail, setOpenDetail] = useState(false);
    const [isEdit,setIsEdit] = useState(false);
    const checkPostGroupDetail = (id,isEdit?) => {
      setOpenDetail(true);
      setIsEdit(isEdit);
      console.log(isEdit,"checkPostGroupDetail")
      console.log(id, 'checkPostGroupDetail');
      setDetailId(id);
    };

    return (
      <div className="h-full mb-20">
        <PostGroupDrawer
          data={collectionData?.data}
          mutate={()=>{mutate()}}
          onOpen={() => {
            setOpenDetail(true);
          }}
          onClose={() => {
            setOpenDetail(false);
          }}
          isEdit={isEdit}
          id={detailId}
          open={openDetail}
        ></PostGroupDrawer>
        <div className="w-full px-2">
          <div className="border-[#DCDDE1] border rounded-lg	 w-full h-[28px]  flex mt-5 mb-4">
            <div
              onClick={() => {
                setMenu(1);
              }}
              className={classnames(
                'w-full  flex justify-center items-center text-center text-[#A9B0C0]',
                {
                  'bg-slate-50 text-[#FFD036]': menu === 1,
                },
              )}
            >
              贴文
            </div>
            <div
              onClick={() => {
                setMenu(0);
              }}
              className={classnames(
                'w-full  flex justify-center items-center text-center text-[#A9B0C0]',
                {
                  'bg-slate-50 text-[#FFD036]': menu === 0,
                },
              )}
            >
              文集
            </div>
          </div>
        </div>
        {menu === 0 ? (
          <div className="px-[10px] space-y-3">
            {PostGroupData?.data?.map((item) => {
              return (
                <PostGroup
                  check={(id,isEdit) => {
                    checkPostGroupDetail(id,isEdit);
                  }}
                  data={item}
                ></PostGroup>
              );
            })}
          </div>
        ) : (
          <Waterfall
            postData={data?.data.map((item) => {
              return { ...item, student: { nickName: user?.nickName } };
            })}
          ></Waterfall>
        )}
      </div>
    );
  };

  const Profile3 = () => {
    const [menu, setMenu] = useState(1);
    const [detailId, setDetailId] = useState();
    const { data: liked } = useFetch('/post/liked', 'get');
    const { data: stard } = useFetch('/post/stard', 'get');
    const { data: PostGroupData } = useFetch('/collection/followed', 'get');
    if (!liked || !stard) return null;
    // const { data: collectionData, mutate } = useFetch(
    //   '/collection/detail',
    //   'get',
    //   {
    //     id: detailId,
    //   },
    // );
    // useEffect(() => {
    //   mutate();
    // }, [detailId]);


    // const [openDetail, setOpenDetail] = useState(false);
    // const checkPostGroupDetail = (id) => {
    //   setOpenDetail(true);
    //   setDetailId(id);
    // };
    return (
      <div className="w-full ">
        {/* <PostGroupDrawer
          data={collectionData?.data}
          mutate={()=>{mutate()}}
          onOpen={() => {
            setOpenDetail(true);
          }}
          onClose={() => {
            setOpenDetail(false);
          }}
          id={detailId}
          open={openDetail}
        ></PostGroupDrawer> */}
        <div className="w-full px-2">
          <div className="border-[#DCDDE1] border rounded-lg	 w-full h-[28px]  flex mt-5 mb-4">
            <div
              onClick={() => {
                setMenu(1);
              }}
              className={classnames(
                'w-full  flex justify-center items-center text-center text-[#A9B0C0]',
                {
                  'bg-slate-50 text-[#FFD036]': menu === 1,
                },
              )}
            >
              贴文
            </div>
            <div
              onClick={() => {
                setMenu(0);
              }}
              className={classnames(
                'w-full flex justify-center items-center text-center text-[#A9B0C0]',
                {
                  'bg-slate-50 text-[#FFD036]': menu === 0,
                },
              )}
            >
              文集
            </div>
          </div>
        </div>
        {menu === 0 ? (
          <div className="px-[10px]">
            {PostGroupData?.data?.map((item) => {
              return (
                <PostGroup
                  check={(id) => {
                    // checkPostGroupDetail(id);
                  }}
                  data={item}
                ></PostGroup>
              );
            })} 
              <>
             {PostGroupData?.data.length === 0 ?
             <div className='flex justify-center text-[#929396]'>
              暂无关注文集
             </div>:null
             }
             </> 
          </div>
        ) : (
          <Waterfall
            postData={Object.assign(liked?.data, stard?.data)}
          ></Waterfall>
        )}
      </div>
    );
  };
  // const { user, loggedOut } = useUser();
  const router = useRouter();
  const [school, setSchool] = useLocalStorage('school', 'York');
  const { i18n } = useTranslation('common');
  console.log(i18n, 'i18n');
  const [menuVal, setMenu] = useState(0);
  const headerList = [
    {
      icon: menuVal === 0 ? <Icon1Select></Icon1Select> : <Icon1></Icon1>,
      menu: <Profile1></Profile1>,
    },
    {
      icon: menuVal === 1 ?  <Icon3Select></Icon3Select> : <Icon3></Icon3>,
      menu: <Profile2></Profile2>,
    },
    {
      icon: menuVal === 2 ?<Icon2Select></Icon2Select> : <Icon2></Icon2>,
      menu: <Profile3></Profile3>,
    },
  ];
  useEffect(() => {
    if (loggedOut) {
      setMenu(4);
    } else {
      setMenu(0);
    }
  }, [loggedOut, user]);
  const container = React.useRef<any>(null);
  const EmptyData = () => {
    const columns = [
      { text: '帮你定位最好的教授', value: '0' },
      { text: '一键导入大学课表', value: '1' },
      { text: '便捷计算自己的GPA', value: '2' },
    ];
    const [value, setValue] = useState('1');
    useEffect(() => {
      const interval = setInterval(() => {
        const _value = Number(value);
      }, 2000);
      return () => clearInterval(interval);
    }, [value]);
    return (
      <div className="w-full h-[400px]  p-5">
        <div className="relative">
          {' '}
          <Picker
            placeholder=""
            defaultValue={value}
            showToolbar={false}
            columns={columns}
            value={value}
            className="h-[220px]"
            onCancel={() => Toast.info('点击取消按钮')}
            swipeDuration={10}
            onConfirm={() => Toast.info('点击确认按钮')}
          />
        </div>
        <button
          onClick={() => {
            dispatch(setOpenLogin('login'));
          }}
          className={classnames(
            'w-full text-[#8C6008]  bg-yellow-400 border-0 rounded-full btn hover:bg-yellow-400',
          )}
        >
          登录或注册
        </button>
      </div>
    );
  };
  const dispatch = useDispatch();

  return (
    <div className="w-screen min-h-screen   pb-36">
      <ProfileHeader data={{ student: user }}></ProfileHeader>
      <div className="w-full overflow-hidden rounded-full ">
        {menuVal !== 4 ? (
          <HeaderMenu
            headerMenuList={headerList}
            switchMenu={(val) => {
              setMenu(val);
            }}
          ></HeaderMenu>
        ) : null}
      </div>
      <div className="relative overflow-x-hidden overflow-y-scroll w-full">
        {menuVal !== 4 ? headerList[menuVal].menu : <EmptyData></EmptyData>}
      </div>
    </div>
  );
}
// export default withTranslation('common')(Identify)
export default index;
