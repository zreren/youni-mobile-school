import React from 'react';
import Header from '@/components/Header';
import CommonLayout from '@/components/Layout/CommonLayout';
import Form from '@/components/Form/Form';
import IOSSwitch from '@/components/Input/ios';
import RightIcon from '@/public/assets/right.svg';
import Icon1 from '@/public/assets/setting/1.svg';
import Icon2 from '@/public/assets/setting/2.svg';
import Icon3 from '@/public/assets/setting/3.svg';
import Icon4 from '@/public/assets/setting/4.svg';
import Icon5 from '@/public/assets/setting/5.svg';
import Icon6 from '@/public/assets/setting/6.svg';
import Icon7 from '@/public/assets/setting/7.svg';
import Icon8 from '@/public/assets/setting/8.svg';
import Icon9 from '@/public/assets/setting/9.svg';
import Icon10 from '@/public/assets/setting/10.svg';
import Icon11 from '@/public/assets/setting/11.svg';
import Icon12 from '@/public/assets/setting/2-12.svg';
import Icon13 from '@/public/assets/setting/2-13.svg';
import useRequest from '@/libs/request';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Toast } from 'react-vant';
const Icon =new Array(3).map((item,index) => require("@/public/assets/setting/" + index + 1 + ".svg"));
const IconRender = (props) =>{
    const IconGetter= Icon[props]
    return (<IconGetter></IconGetter>)
}
const InputSelect = (props) => {
  return (
    <div className="flex items-center text-gray-400">
      <div>未设置</div>
      <RightIcon></RightIcon>
    </div>
  );
};
export default function index() {
  const router = useRouter();
  const List5 = [
    {
      Icon: Icon1,
      title: 'Account logout',
      intro: '',
      action: <RightIcon></RightIcon>,
      event:async() => {
        const {data} = await useRequest.get('/api/account/logout')
        if(data?.message === 'success'){
          Toast.success('Logout successfully')
          router.push('/Profile')
        }else{
          Toast.fail('network error')
        }
      }
    },
  ]
  const List1 = [
    {
      Icon: Icon1,
      title: 'Manage account',
      intro: '',
      action: <RightIcon></RightIcon>,
      event:() => {router.push('/Setting/account')}
    },
    {
      Icon: Icon2,
      title: 'Point balance',
      intro: '',
      action: <RightIcon></RightIcon>,
    },
    {
      Icon: Icon3,
      title: 'Share profile ',
      intro: '',
      action: <RightIcon></RightIcon>,
    },
  ];
  const List2 = [
    {
      Icon: Icon12,
      title: 'Language',
      intro: '',
      event:()=>{
        router.push('/Setting/language')
      },
      action: <RightIcon></RightIcon>,
    },
    {
      Icon: Icon13,
      title: 'History',
      intro: '',
      action: <RightIcon></RightIcon>,
    },
  ];
  const List3 = [
    {
      Icon: Icon4,
      title: 'Clear cache',
      intro: '',
      action: <InputSelect></InputSelect>,
    },
    {
      Icon: Icon5,
      title: 'Report a problem',
      intro: '',
      action: <RightIcon></RightIcon>,
    },
    {
      Icon: Icon6,
      title: 'New function request',
      intro: '',
      action: <RightIcon></RightIcon>,
    },
    {
      Icon: Icon7,
      title: 'Help center ',
      intro: '',
      action: <RightIcon></RightIcon>,
    },
  ];
  const List4 = [
    {
      Icon: Icon8,
      title: 'YoUni community guidelines',
      intro: '',
      action: <RightIcon></RightIcon>,
    },
    {
      Icon: Icon9,
      title: 'Terms of service',
      intro: '',
      action: <RightIcon></RightIcon>,
    },
    {
      Icon: Icon10,
      title: 'Privacy policy',
      intro: '',
      action: <RightIcon></RightIcon>,
    },
    {
      Icon: Icon11,
      title: 'Copyright policy',
      intro: '',
      action: <RightIcon></RightIcon>,
    },
  ];
  return (
    <CommonLayout className="overflow-hidden bg-white pb-10">
      <Header title="Setting"></Header>
      <Form header="Account" List={List1}></Form>
      <Form header="Content" List={List2}></Form>
      <Form header="Cache & support" List={List3}></Form>
      <Form header="About" List={List4}></Form>
      <Form header="Auth" List={List5}></Form>
      {/* <Form header="翻译" List={List2}></Form> */}

    </CommonLayout>
  );
}
