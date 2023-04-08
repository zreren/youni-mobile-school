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
import { useTranslation } from 'next-i18next';

const Icon = new Array(3).map((item, index) =>
  require('@/public/assets/setting/' + index + 1 + '.svg'),
);
const IconRender = (props) => {
  const IconGetter = Icon[props];
  return <IconGetter></IconGetter>;
};

export default function index() {
  const router = useRouter();
  const { t } = useTranslation();
  const InputSelect = (props) => {
    return (
      <div className="flex items-center text-gray-400">
       <div>{t('未设置')}</div>
  
        <RightIcon></RightIcon>
      </div>
    );
  };
  const List5 = [
    {
      Icon: Icon1,
      title: t('退出账户'),
      intro: '',
      action: <RightIcon></RightIcon>,
      event: async () => {
        const { data } = await useRequest.get('/api/account/logout');
        if (data?.message === 'success') {
          Toast.success('Logout successfully');
          router.push('/Profile');
        } else {
          Toast.fail('network error');
        }
      },
    },
  ];
  const List1 = [
    {
      Icon: Icon1,
      title: t('账户管理'),
      intro: '',
      action: <RightIcon></RightIcon>,
      event: () => {
        router.push('/Setting/account');
      },
    },
    {
      Icon: Icon2,
      title: t('积分余额'),
      intro: '',
      action: <RightIcon></RightIcon>,
    },
    {
      Icon: Icon3,
      title: t('分享个人资料'),
      intro: '',
      action: <RightIcon></RightIcon>,
    },
  ];
  const List2 = [
    {
      Icon: Icon12,
      title: t('语言'),
      intro: '',
      event: () => {
        router.push('/Setting/language');
      },
      action: <RightIcon></RightIcon>,
    },
    {
      Icon: Icon13,
      title: t('历史记录'),
      intro: '',
      action: <RightIcon></RightIcon>,
    },
  ];

  const List3 = [
    {
      Icon: Icon4,
      title: t('清除缓存'),
      intro: '',
      action: <InputSelect></InputSelect>,
    },
    {
      Icon: Icon5,
      title: t('报告问题'),
      intro: '',
      action: <RightIcon></RightIcon>,
    },
    {
      Icon: Icon6,
      title: t('新功能请求'),
      intro: '',
      action: <RightIcon></RightIcon>,
    },
    {
      Icon: Icon7,
      title: t('帮助中心'),
      intro: '',
      action: <RightIcon></RightIcon>,
    },
  ];

  const List4 = [
    {
      Icon: Icon8,
      title: t('YoUni社区指南'),
      intro: '',
      action: <RightIcon></RightIcon>,
    },
    {
      Icon: Icon9,
      title: t('服务条款'),
      intro: '',
      action: <RightIcon></RightIcon>,
    },
    {
      Icon: Icon10,
      title: t('隐私政策'),
      intro: '',
      action: <RightIcon></RightIcon>,
    },
    {
      Icon: Icon11,
      title: t('版权政策'),
      intro: '',
      action: <RightIcon></RightIcon>,
    },
  ];
  return (
    <CommonLayout className="overflow-hidden bg-white pb-10">
      <Header title={t('设置')}></Header>
      <Form header={t('账户')} List={List1}></Form>
      <Form header={t('内容')} List={List2}></Form>
      <Form header={t('缓存 & 支持')} List={List3}></Form>
      <Form header={t('关于')} List={List4}></Form>
      <Form header={t('认证')} List={List5}></Form>
      {/* <Form header="翻译" List={List2}></Form> */}
    </CommonLayout>
  );
}
