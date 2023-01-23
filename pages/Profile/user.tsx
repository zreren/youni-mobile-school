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
import { Sticky } from 'react-vant';
import { Picker, Toast } from 'react-vant';
import { setOpenLogin } from '@/stores/authSlice';
import { useDispatch } from 'react-redux';
import useFetch from '@/hooks/useFetch';
const PostGroup = () => {
  return (
    <div className="w-full px-5 py-4  rounded-lg border border-[#D9E7FF] bg-PostGroup">
      <div className="flex justify-between">
        {' '}
        <div className="flex items-center space-x-2">
          <div className="text-blueTitle text-sm font-semibold">测试文集1 </div>
          <div className="text-[10px] rounded-sm px-2 text-white bg-[#52C41A] flex justify-center items-center">
            公开
          </div>
        </div>
        <div className="rounded-full text-[#A9B0C0] flex justify-center items-center border w-14 bg-white border-[#F3F4F6]">
          编辑
        </div>
      </div>
      <div className="flex space-x-2">
        <div className="flex items-center">
          <PostGroupIcon1></PostGroupIcon1>
          <div className="text-[#798195] text-xs">24</div>
        </div>
        <div className="flex items-center">
          <PostGroupIcon2></PostGroupIcon2>
          <div className="text-[#798195] text-xs">24</div>
        </div>
        <div className="flex items-center">
          <PostGroupIcon3></PostGroupIcon3>
          <div className="text-[#798195] text-xs">24</div>
        </div>
      </div>
      <div className="mt-4 flex justify-between ">
        <Image
          width={64}
          height={64}
          src="/text.png"
          className="rounded-xl"
        ></Image>
        <Image
          width={64}
          height={64}
          src="/text.png"
          className="rounded-xl"
        ></Image>
        <Image
          width={64}
          height={64}
          src="/text.png"
          className="rounded-xl"
        ></Image>
        <Image
          width={64}
          height={64}
          src="/text.png"
          className="rounded-xl"
        ></Image>
      </div>
    </div>
  );
};

function index(props) {
  // const { user, loggedOut } = useUser();
  // const router = useRouter();

  // const 
  const Profile2 = () => {
    const [menu, setMenu] = useState(0);
    const { data } = useFetch('/post/list', 'get');
    return (
      <div className="h-full ">
        <div className="w-full px-2">
          <div className="border-[#DCDDE1] border rounded-lg	 w-full h-[28px]  flex mt-5 mb-4">
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
              贴文
            </div>
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
              文集
            </div>
          </div>
        </div>
        {menu === 0 ? (
          <div className="px-[10px]">
            <PostGroup></PostGroup>
          </div>
        ) : (
          <div></div>
          // <Waterfall postData={data?.data.map((item) => {
          //   return { ...item, student: { nickName: user.student.nickName } }
          // })}></Waterfall>
        )}
      </div>
    );
  };

  const Profile3 = () => {
    const [menu, setMenu] = useState(0);
    const { data: liked } = useFetch('/post/liked', 'get');
    const { data: stard } = useFetch('/post/stard', 'get');
    return (
      <div className="w-full">
        <div className="w-full px-2">
          <div className="border-[#DCDDE1] border rounded-lg	 w-full h-[28px]  flex mt-5 mb-4">
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
              贴文
            </div>
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
              文集
            </div>
          </div>
        </div>
        {menu === 0 ? (
          <div className="px-[10px]">
            <PostGroup></PostGroup>
          </div>
        ) : (
          <Waterfall postData={Object.assign(liked?.data, stard?.data.length > 0 ? stard?.data : null)}></Waterfall>
        )}
      </div>
    );
  };
  // const { user, loggedOut } = useUser();
  const router = useRouter();
  const {data:UserData} = useFetch('/user/info', 'get',{

  })
  const [school, setSchool] = useLocalStorage('school', 'York');
  const { i18n } = useTranslation('common');
  console.log(i18n, 'i18n');
  const [menuVal, setMenu] = useState(1);
  const headerList = [
    {
      icon: menuVal === 1 ? <Icon2Select></Icon2Select> : <Icon2></Icon2>,
      menu: <Profile2></Profile2>,
    },
    {
      icon: menuVal === 2 ? <Icon3Select></Icon3Select> : <Icon3></Icon3>,
      menu: <Profile3></Profile3>,
    },
  ];
  const container = React.useRef<any>(null);

  const dispatch = useDispatch()

  return (
    <div className="w-screen min-h-screen">
      <ProfileHeader data={UserData?.data}></ProfileHeader>
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
    </div>
  );
}
// export default withTranslation('common')(Identify)
export default index;
