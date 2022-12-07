import React from 'react';
import Header from '@/components/Header';
import CommonLayout from '@/components/Layout/CommonLayout';
import Form from '@/components/Form/Form';
import IOSSwitch from '@/components/Input/ios';
import RightIcon from '@/public/assets/right.svg';
export default function account() {
  const InputSelect = (props) => {
    return (
      <div className="flex items-center text-gray-400">
        <div>未设置</div>
        <RightIcon></RightIcon>
      </div>
    );
  };
  const List1 = [
    {
      title: '账号',
      intro: '',
      action: <InputSelect></InputSelect>,
    },
    {
      title: 'Email',
      intro: '',
      action: <RightIcon></RightIcon>,
    },
    {
      title: '密码',
      intro: '',
      action: <RightIcon></RightIcon>,
    },
  ];
  const List2 = [
    {
      title: '微信账号',
      intro: '',
      action: <InputSelect></InputSelect>,
    },
    {
      title: 'Google账号',
      intro: '',
      action: <InputSelect></InputSelect>,
    },
    {
      title: 'Apple账号',
      intro: '',
      action: <InputSelect></InputSelect>,
    },
  ];
  return (
    <CommonLayout className="overflow-hidden">
      <Header title="账号"></Header>
      <Form header="账号信息" List={List1}></Form>
      <Form header="绑定信息" List={List2}></Form>
    </CommonLayout>
  );
}