import React from 'react';
import PostCategory from '@/components/Menu/add-post-category';
import Header from '@/components/Header';
import Form from '@/components/Form/Form';
import CateGoryIcon from './categoryIcon.svg';
import RightIcon from '@/public/assets/right.svg';
import { Uploader } from 'react-vant';
import AddUploaderIcon from "./addUploaderIcon.svg";
export default function addPost() {
  const headerMenuList = [
    {
      label: '关注',
    },
    {
      label: '推荐',
    },
    {
      label: '闲置',
    },
    {
      label: '活动',
    },
    {
      label: '新闻',
    },
    {
      label: '转租',
    },
    {
      label: '转租',
    },
  ];
  const item = {
    title: '选择分类',
    intro: '',
    Icon: null,
    action: <RightIcon></RightIcon>,
  };
  const defaultValue = [
    {
      url: 'https://img.yzcdn.cn/vant/sand.jpg', // 图片文件
    },
    {
      url: 'https://img.yzcdn.cn/vant/sand.jpg', // 其他文件
    },
  ];
  return (
    <div>
      <Header className="shadow-none"></Header>
      <div className="items-start justify-between p-5 py-0 pt-6">
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <CateGoryIcon></CateGoryIcon>
            {/* {item.Icon ? <Icon className="mt-1"></Icon> : null} */}
            <div className="text-blueTitle">{item.title}</div>
          </div>
          <div>{item.action}</div>
        </div>
        <div className="text-xs text-gray-300">{item.intro}</div>
      </div>
      <div className="p-5 pt-3">
        <PostCategory
          headerMenuList={headerMenuList}
          className="mt-0"
        ></PostCategory>
      </div>
      <div className="h-[1px] w-full  px-5 bg-[#F3F4F6]"></div>
      <div className='px-5 py-3'>
        <Uploader
          accept="*"
          uploadIcon={<AddUploaderIcon></AddUploaderIcon>}
          defaultValue={defaultValue}
          onChange={(v) => console.log(v)}
        />
      </div>
    </div>
  );
}
