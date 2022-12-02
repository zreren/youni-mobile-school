import React from 'react';
import Header from '@/components/Header';
import CommonLayout from '@/components/Layout/CommonLayout';
import Form from '@/components/Form/Form';
import IOSSwitch from '@/components/Input/ios';
import RightIcon from '@/public/assets/right.svg';
export default function account() {
  const LanguageSelect = () => {
    return (
      <div className="flex items-center text-gray-400">
        <div>简体中文</div>
        <RightIcon></RightIcon>
      </div>
    );
  };
  const List1 = [
    {
      title: '应用语言',
      intro: '选择默认应用语言',
      action: <LanguageSelect></LanguageSelect>,
    },
    {
      title: '偏好语言',
      intro: '选择你熟悉的语言，以这些语言发布的内容将不会自动翻译。',
      action: <RightIcon></RightIcon>,
    },
  ];
  const List2 = [
    {
      title: '翻译语言',
      intro: '你希望内容被翻译成哪一种语言',
      action: <LanguageSelect></LanguageSelect>,
    },
    {
      title: '始终显示翻译',
      intro: '开启后，支持翻译的内容将始终以所选的翻译语言显示。',
      action: <IOSSwitch></IOSSwitch>,
    },
  ];
  return (
    <CommonLayout className="overflow-hidden">
      <Header title="语言"></Header>
      <Form header="语言设置" List={List1}></Form>
      <Form header="翻译" List={List2}></Form>
    </CommonLayout>
  );
}
