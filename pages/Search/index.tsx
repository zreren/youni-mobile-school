import React from 'react';
import CustomizedTabs from '@/components/Menu/Header-menu';
import Title from '@/components/Title/Title';
export default function index() {
  const headerMenuList = [
    {
      label: '教授',
    },
    {
      label: '教授',
    },
    {
      label: '教授',
    },
  ];
  return (
    <div className="w-screen h-screen">
      <div>
        <CustomizedTabs
          switchMenu={() => {}}
          headerMenuList={headerMenuList}
        ></CustomizedTabs>
      </div>
      <div className="w-full h-full pr-5 pl-5">
        <Title title="搜索历史"></Title>
      </div>
    </div>
  );
}
