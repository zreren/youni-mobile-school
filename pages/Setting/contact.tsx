import React from 'react';
import Header from '@/components/Header';
import CommonLayout from '@/components/Layout/CommonLayout';
// import Form from '@/components/Form/Form';
import useUser from '@/hooks/useUser';
import IOSSwitch from '@/components/Input/ios';
import RightIcon from '@/public/assets/right.svg';
export default function account() {
  function Form(props) {
    let { header, List } = props;
    if (!List) {
      List = [
        {
          title: '标题',
          action: 'text',
          intro: '请输入',
          Icon: null,
        },
      ];
    }
    return (
      <div className="w-full h-full">
        <div className="mb-4 text-xs text-[#798195]">{header}</div>
        {List?.map((item, index) => {
          const Icon = item.Icon;
          return (
            <div
              className="items-start text-sm justify-between mb-4"
              onClick={item.event}
            >
              <div className="flex justify-between">
                <div className="flex space-x-2">
                  {item.Icon ? <Icon className="mt-1"></Icon> : null}
                  <div className="mb-2 text-sm font-medium  text-[#798195]">{item.title}</div>
                </div>
                <div>{item.action}</div>
              </div>
              <div className="text-xs text-[#37455C]">{item.intro}</div>
            </div>
          );
        })}
        <div className="h-1 m-0 divider opacity-30"></div>
      </div>
    );
  }
  const { user } = useUser();
  const InputSelect = (props) => {
    return (
      <div className="flex items-center text-gray-400">
        <div>{props?.label ? props?.label : '未设置'}</div>
        <RightIcon></RightIcon>
      </div>
    );
  };
  const List1 = [
    {
      title: '电话',
      intro: '',
      action: <IOSSwitch></IOSSwitch>,
    },
    {
      title: '短信',
      intro: '',
      action: <IOSSwitch></IOSSwitch>,
    },
    {
      title: '邮箱',
      intro: '',
      action: <IOSSwitch></IOSSwitch>,
    },
    {
        title: '微信',
        action: <IOSSwitch></IOSSwitch>,
    },{
        title: 'WhatsApp',
        action: <IOSSwitch></IOSSwitch>,
    },{
        title: 'Discord',
        action: <IOSSwitch></IOSSwitch>,
    },{
        title: 'Telegram',
        action: <IOSSwitch></IOSSwitch>,
    }
  ];
  return (
    <CommonLayout className="overflow-hidden bg-white">
      <Header title="联系方式"></Header>
      <div className="text-xs mt-2 font-medium text-[#A9B0C0] ">如何找到我</div>
      <div className="text-xs text-[#A9B0C0]  mt-2">
        你可以在此页面设置自己希望公开的联系方式，该联系方式将
        会在转闲置、Carpooli页面中向其他用户公开显示。
      </div>
      <Form header="" List={List1}></Form>
    </CommonLayout>
  );
}
