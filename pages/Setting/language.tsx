import React from 'react';
import Header from '@/components/Header';
import CommonLayout from '@/components/Layout/CommonLayout';
import Form from '@/components/Form/Form';
import IOSSwitch from '@/components/Input/ios';
export default function account() {
  const LanguageSelect = ()=>{
    return (
        <div className="text-gray-400">
            简体中文
        </div>
    )
  }
  const List = [
    {
      title: '应用语言',
      intro: '选择默认应用语言',
      action: <IOSSwitch></IOSSwitch>,
    },
    {
        title: '应用语言',
        intro: '选择默认应用语言',
        action: <LanguageSelect></LanguageSelect>,
      },
  ];
  return (
    <CommonLayout className="overflow-hidden">
      <Header title="语言"></Header>
      <Form header="语言设置" List={List}></Form>
    </CommonLayout>
  );
}
