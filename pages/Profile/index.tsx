import React, { useState } from 'react';
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
import PostGroupIcon1 from "./post-group/icon1.svg";
import PostGroupIcon2 from "./post-group/icon2.svg";
import PostGroupIcon3 from "./post-group/icon3.svg";
const PostGroup = () => {
  return (
    <div className="w-full px-5 py-4  rounded-lg border border-[#D9E7FF] bg-PostGroup">
      <div className='flex justify-between'>
        {' '}
        <div className="flex items-center space-x-2">
          <div className='text-blueTitle text-sm font-semibold'>测试文集1 </div>
          <div className='text-[10px] rounded-sm px-2 text-white bg-[#52C41A] flex justify-center items-center'>公开</div>
        </div>
        <div className='rounded-full text-[#A9B0C0] flex justify-center items-center border w-14 bg-white border-[#F3F4F6]'>编辑</div>
      </div>
      <div className='flex space-x-2'>
        <div className='flex items-center'><PostGroupIcon1></PostGroupIcon1><div className='text-[#798195] text-xs'>24</div></div>
        <div className='flex items-center'><PostGroupIcon2></PostGroupIcon2><div className='text-[#798195] text-xs'>24</div></div>
        <div className='flex items-center'><PostGroupIcon3></PostGroupIcon3><div className='text-[#798195] text-xs'>24</div></div>
      </div>
      <div className='mt-4 flex justify-between '>
        <Image width={64} height={64} src="/text.png" className='rounded-xl'></Image>
        <Image width={64} height={64} src="/text.png" className='rounded-xl'></Image>
        <Image width={64} height={64} src="/text.png" className='rounded-xl'></Image>
        <Image width={64} height={64} src="/text.png" className='rounded-xl'></Image>
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
    <div className="flex justify-between p-4 ">
      <div className="flex flex-col items-center space-y-3">
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
      <div className="p-4 pl-0 pr-0 card-body ">
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
        <div className="grid grid-cols-4">
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
          <div className="flex flex-col items-center space-y-3">
            <SettingIcon8></SettingIcon8>
            <div className="text-xs text-[#798195]">联系方式</div>
          </div>
        </div>
        <div className="grid grid-cols-4">
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
const Profile1 = () => {
  return (
    <div className="h-[calc(100vh-320px)]">
      <div className="w-full p-5 pb-1 bg-white">
        <Identify></Identify>
        <ProfileMenu></ProfileMenu>
      </div>
      <div className="w-full h-[10px] bg-bg"></div>
      <div className="w-full bg-white">
        <Setting></Setting>
        <div className="mt-2 text-center text-[#798195]">
          <Link href="/Login/signup"> 临时进入登录页面</Link>
        </div>
      </div>
    </div>
  );
};
const Profile2 = () => {
  const [menu, setMenu] = useState(0);
  return (
    <div className="h-full ">
      <div className="w-full px-2">
        <div className="border-[#DCDDE1] border rounded-lg	 w-full h-[28px]  flex mt-5 mb-4">
          <div
            onClick={() => {
              setMenu(0);
            }}
            className={classnames('w-full  flex justify-center items-center text-center text-[#A9B0C0]', {
              'bg-slate-50 text-[#FFD036]': menu === 0,
            })}
          >
            贴文
          </div>
          <div
            onClick={() => {
              setMenu(1);
            }}
            className={classnames('w-full  flex justify-center items-center text-center text-[#A9B0C0]', {
              'bg-slate-50 text-[#FFD036]': menu === 1,
            })}
          >
            文集
          </div>
        </div>
      </div>
      {menu === 0 ? (
        <div className="px-[10px]">
          <PostGroup></PostGroup>
        </div>
      ) : (
        <Waterfall></Waterfall>
      )}
    </div>
  );
};
const Profile3 = () => {
  const [menu, setMenu] = useState(0);
  return (
    <div className="w-full">
      <div className="w-full px-2">
        <div className="border-[#DCDDE1] border rounded-lg	 w-full h-[28px]  flex mt-5 mb-4">
          <div
            onClick={() => {
              setMenu(0);
            }}
            className={classnames('w-full flex justify-center items-center text-center text-[#A9B0C0]', {
              'bg-slate-50 text-[#FFD036]': menu === 0,
            })}
          >
            贴文
          </div>
          <div
            onClick={() => {
              setMenu(1);
            }}
            className={classnames('w-full  flex justify-center items-center text-center text-[#A9B0C0]', {
              'bg-slate-50 text-[#FFD036]': menu === 1,
            })}
          >
            文集
          </div>
        </div>
      </div>
      {menu === 0 ? (
        <div className="px-[10px]">
          <PostGroup></PostGroup>
        </div>
      ) : (
        <Waterfall></Waterfall>
      )}
    </div>
  );
};
function index(props) {
  console.log(props, 'porps');
  const { i18n } = useTranslation('common');
  console.log(i18n, 'i18n');
  const [menuVal, setMenu] = useState(0);
  const headerList = [
    {
      icon: menuVal === 0 ? <Icon1Select></Icon1Select> : <Icon1></Icon1>,
      menu: <Profile1></Profile1>,
    },
    {
      icon: menuVal === 1 ? <Icon2Select></Icon2Select> : <Icon2></Icon2>,
      menu: <Profile2></Profile2>,
    },
    {
      icon: menuVal === 2 ? <Icon3Select></Icon3Select> : <Icon3></Icon3>,
      menu: <Profile3></Profile3>,
    },
  ];
  return (
    <div className="w-screen min-h-screen">
      <ProfileHeader></ProfileHeader>
      <div className="w-full overflow-hidden rounded-full ">
        <HeaderMenu
          headerMenuList={headerList}
          switchMenu={(val) => {
            setMenu(val);
          }}
        ></HeaderMenu>
      </div>
      <div className="overflow-scroll">{headerList[menuVal].menu}</div>
    </div>
  );
}
// export default withTranslation('common')(Identify)
export default index;
