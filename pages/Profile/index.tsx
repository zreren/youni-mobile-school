import React, { useState } from 'react';
import CommonLayout from '@/components/Layout/CommonLayout';
import Header from '@/components/Header';
import HeaderMenu from '@/components/Menu/Header-menu';
import ProfileHeader from '@/components/PageComponents/Profile/ProfileHeader';
import Icon1 from './1.svg';
import Icon2 from './2.svg';
import Icon3 from './3.svg';
import Icon4 from './4.svg';
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

import { useRouter } from 'next/router';
const Identify = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push('./Profile/valid');
      }}
      className="w-full p-4 h-16 bg-black rounded-xl text-gold flex justify-between items-center"
    >
      <div className="flex space-x-2 items-center">
        <Icon4></Icon4>
        <div>学生认证</div>
      </div>
      <div className="text-xs">
        <div>30秒认证在校生身份</div> <div>解锁YoUni全部功能</div>
      </div>
    </div>
  );
};
const ProfileMenu = () => {
  return (
    <div className="flex justify-between p-4  ">
      <div className="flex flex-col items-center space-y-3">
        <MenuIcon1></MenuIcon1>
        <div className="text-xs">每日签到</div>
      </div>
      <div className="flex flex-col items-center space-y-3">
        <MenuIcon2></MenuIcon2>
        <div className="text-xs">每日签到</div>
      </div>
      <div className="flex flex-col items-center space-y-3">
        <MenuIcon3></MenuIcon3>
        <div className="text-xs">每日签到</div>
      </div>
      <div className="flex flex-col items-center space-y-3">
        <MenuIcon4></MenuIcon4>
        <div className="text-xs">每日签到</div>
      </div>
    </div>
  );
};
const Setting = () => {
  return (
    <div className="card rounded-lg w-full bg-base-100 ">
      <div className="card-body  p-4  pl-0 pr-0 ">
        <div className="grid  grid-cols-4	">
          <div className="flex  flex-col items-center space-y-3">
            <SettingIcon1></SettingIcon1>
            <div className="text-xs">账号</div>
          </div>
          <div className="flex   flex-col items-center space-y-3">
            <SettingIcon2></SettingIcon2>
            <div className="text-xs">语言</div>
          </div>
          <div className="flex   flex-col items-center space-y-3">
            <SettingIcon3></SettingIcon3>
            <div className="text-xs">客服</div>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <SettingIcon4></SettingIcon4>
            <div className="text-xs">设置</div>
          </div>
        </div>
        <div className="grid  grid-cols-4">
          <div className="flex  flex-col items-center space-y-3">
            <SettingIcon5></SettingIcon5>
            <div className="text-xs">草稿箱</div>
          </div>
          <div className="flex   flex-col items-center space-y-3">
            <SettingIcon6></SettingIcon6>
            <div className="text-xs">历史</div>
          </div>
          <div className="flex  flex-col items-center space-y-3">
            <SettingIcon7></SettingIcon7>
            <div className="text-xs">邀请好友</div>
          </div>
          <div className="flex    flex-col items-center space-y-3">
            <SettingIcon8></SettingIcon8>
            <div className="text-xs">功能请求</div>
          </div>
        </div>
      </div>
    </div>
  );
};
const Profile1 = () => {
  return (
    <div className="bg-bg w-full h-screen p-5">
      <Identify></Identify>
      <ProfileMenu></ProfileMenu>
      <Setting></Setting>
    </div>
  );
};
const Profile2 = () => {
  return <div>2</div>;
};
const Profile3 = () => {
  return <div>3</div>;
};
export default function index() {
  const headerList = [
    {
      icon: <Icon1></Icon1>,
      menu: <Profile1></Profile1>,
    },
    {
      icon: <Icon2></Icon2>,
      menu: <Profile2></Profile2>,
    },
    {
      icon: <Icon3></Icon3>,
      menu: <Profile3></Profile3>,
    },
  ];
  const [menu, setMenu] = useState(Profile1);
  return (
    <div className="w-screen h-screen">
      <ProfileHeader></ProfileHeader>
      <div className="rounded-full w-full overflow-hidden  ">
        <HeaderMenu
          headerMenuList={headerList}
          switchMenu={(val) => {
            setMenu(headerList[val].menu);
          }}
        ></HeaderMenu>
      </div>
      <div>{menu}</div>
    </div>
    //  <CommonLayout>
    //   <Header title="我的"></Header>
    //   <div className="alert alert-info shadow-lg">
    //       <div>
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           className="stroke-current flex-shrink-0 w-6 h-6"
    //         >
    //           <path
    //             stroke-linecap="round"
    //             stroke-linejoin="round"
    //             stroke-width="2"
    //             d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    //           ></path>
    //         </svg>
    //         <span>等待高保真</span>
    //       </div>
    //     </div>
    //  </CommonLayout>
  );
}
