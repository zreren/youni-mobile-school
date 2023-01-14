import React, { useEffect, useState,useRef } from 'react';
import PostCategory from '@/components/Menu/add-post-category';
import Header from '@/components/Header';
import YouniForm from '@/components/Form/Form';
import CateGoryIcon from './categoryIcon.svg';
import RightIcon from '@/public/assets/right.svg';
import { Uploader } from 'react-vant';
import AddUploaderIcon from './addUploaderIcon.svg';
import { DatetimePicker, Field } from 'react-vant';
import { Input, Form, Cell } from 'react-vant';
import { Button, Picker, Space } from 'react-vant';
import Org from './assets/actives/org.svg';
import { useWindowSize } from 'react-use';
import dynamic from 'next/dynamic';
import { Switch } from 'react-vant';
import StartTime from './assets/actives/startTime.svg';
import EndTime from './assets/actives/endTime.svg';
import DraftIcon from './draft.svg';
import NoteIcon1 from './note1.svg';
import NoteIcon2 from './note2.svg';
import NoteIcon3 from './note3.svg';
// const useWindowSize = dynamic(() => import('react-use').then(mod=>mod.useWindowSize), {
//   ssr: false,
// });
// const
export default function addPost() {
  const Footer = () => {
    return (
      <div className="w-full bg-white h-[60px] space-x-4 flex justify-between fixed -bottom-1 px-5 py-2">
        <div className="flex flex-col items-center  w-[40px]">
          <DraftIcon></DraftIcon>
          <div className="text-[10px] text-[#798195] whitespace-nowrap">
            存草稿
          </div>
        </div>
        <div
          onClick={form.submit}
          className="bg-[#FFD036] cursor-pointer  text-white rounded-full w-full h-10 flex justify-center items-center"
        >
          发布
        </div>
      </div>
    );
  };

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

  /** 活动的动态表单 */
  const dynamicForm = [
    {
      type: 'input',
      label: '主办方',
      value: 0,
      dataIndex: 'title',
      Icon: <Org></Org>,
    },
    {
      type: 'time',
      label: '开始时间',
      Icon: <StartTime></StartTime>,
      dataIndex: 'startTime',
    },
    {
      type: 'time',
      label: '结束时间',
      value: new Date(),
      dataIndex: 'endTime',
      Icon: <EndTime></EndTime>,
    },
    {
      type: 'location',
      label: '地点',
      value: new Date(),
      dataIndex: 'location',
      Icon: <EndTime></EndTime>,
    },
    {
      type: 'prices',
      label: '价格',
      value: new Date(),
      dataIndex: 'prices',
      Icon: <EndTime></EndTime>,
    },
    {
      type: 'input',
      label: '报名链接',
      value: new Date(),
      dataIndex: 'link',
      Icon: <EndTime></EndTime>,
    },
    {
      type: 'input',
      label: '联系方式',
      value: new Date(),
      dataIndex: 'contact',
      Icon: <EndTime></EndTime>,
    },
    {
      type: 'Switch',
      label: '地图',
      dataIndex: 'map',
      Icon: <EndTime></EndTime>,
    },
  ];
  const [title, setTitle] = React.useState('');
  const [form] = Form.useForm();

  const customComponents = {
    input: <Input placeholder="请输入"></Input>,
    time: (
      <DatetimePicker popup type="datetime">
        {(val: Date) => (val ? val.toDateString() : '请选择日期')}
      </DatetimePicker>
    ),
    location: (
      <div className="flex flex-col justify-end">
        <Input placeholder="请输入"></Input>
        <Input placeholder="请输入"></Input>
      </div>
    ),
    prices: <div></div>,
    Switch: <Switch activeColor="#FFD036" size={20} inactiveColor="#dcdee0" />,
  };
  // const judgeDeviceType = function () {
  //   var ua = window.navigator.userAgent.toLocaleLowerCase();
  //   var isIOS = /iphone|ipad|ipod/.test(ua);
  //   var isAndroid = /android/.test(ua);

  //   return {
  //     isIOS: isIOS,
  //     isAndroid: isAndroid
  //   }
  // }()
  // if (judgeDeviceType.isAndroid) {
  //   var originHeight = document.documentElement.clientHeight || document.body.clientHeight;
  //   window.addEventListener('resize', function () {
  //     var resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
  //     if (originHeight < resizeHeight) {
  //       console.log('Android 键盘收起啦！')
  //       // Android 键盘收起后操作
  //     } else {
  //       console.log('Android 键盘弹起啦！');
  //       // Android 键盘弹起后操作
  //     }

  //     originHeight = resizeHeight;
  //   }, false)
  // }
  const Keyboard = () => {
    return (
      <div className="bg-[#F9FAFB] text-[#798195] w-screen h-12  z-30 fixed bottom-0 flex justify-around items-center">
        <div
          className="flex items-center space-x-1"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <NoteIcon1></NoteIcon1>
          <div>地点</div>
        </div>
        <div className="flex items-center space-x-1">
          {' '}
          <NoteIcon1></NoteIcon1>
          <div>快捷模版</div>
        </div>
        <div className="flex items-center space-x-1">
          <NoteIcon1></NoteIcon1>
          <div>其他人</div>
        </div>
      </div>
    );
  };
  const { width, height } = useWindowSize();
  const [KeyboardShow, setKeyboardShow] = useState(false);
  type Callback<T> = (prev: T | undefined) => void;
  type Config = {
    immediate: boolean;
  };

  function useWatch<T>(
    dep: T,
    callback: Callback<T>,
    config: Config = { immediate: false },
  ) {
    const { immediate } = config;

    const prev = useRef<T>();
    const inited = useRef(false);
    const stop = useRef(false);

    useEffect(() => {
      const execute = () => callback(prev.current);

      if (!stop.current) {
        if (!inited.current) {
          inited.current = true;
          if (immediate) {
            execute();
          }
        } else {
          execute();
        }
        prev.current = dep;
      }
    }, [dep]);

    return () => {
      stop.current = true;
    };
  }
  useWatch(height,(pre)=>{
    if(pre && pre < height){
      setKeyboardShow(true)
    }else{
      setKeyboardShow(false)
    }
  });
  return (
    <div className="mb-14">
      {KeyboardShow ? <Keyboard></Keyboard> : null}
      {/* <Keyboard></Keyboard> */}
      <Header className="shadow-none"></Header>
      {/* <div>
        <div>width: {width}</div>
        <div>height: {height}</div>
      </div> */}
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
      <div className="px-5 py-3">
        <Uploader
          accept="*"
          uploadIcon={<AddUploaderIcon></AddUploaderIcon>}
          defaultValue={defaultValue}
          onChange={(v) => console.log(v)}
        />
      </div>
      <div className="px-5 post-title">
        <Input
          placeholder="填写标题获得更多流量～"
          value={title}
          onChange={setTitle}
          clearable
          clearTrigger="always"
          className="text-2xl font-bold"
        />
      </div>
      <div className="h-[1px] w-full  px-5 bg-[#F3F4F6]"></div>
      <div className="px-5 mt-4">
        <Input.TextArea
          placeholder="添加正文"
          autoSize={{ minHeight: 180, maxHeight: 180 }}
        />
      </div>
      <div className="h-[1px] w-full  px-5 bg-[#F3F4F6]"></div>
      <div className="px-5 mt-4 post-form">
        <Form
          form={form}
          onFinish={(v) => {
            console.log(v);
          }}
        >
          {dynamicForm.map((item) => {
            const Node = customComponents[item.type];
            const Label = () => {
              return (
                <div className="flex items-center space-x-4">
                  {item.Icon ? item.Icon : null}
                  <div>{item.label}</div>
                </div>
              );
            };

            return (
              // <div className="flex justify-between">
              //   <div>
              //     <div></div>
              //     <div>{item.label}</div>
              //   </div>
              //   <div className="youni-form">{customComponents[item.type]}</div>
              // </div>
              <Form.Item
                name={item.dataIndex}
                label={<Label></Label>}
                valuePropName="checked"
                onClick={
                  item.type === 'time'
                    ? (_, action) => {
                        action.current?.open();
                      }
                    : null
                }
              >
                {customComponents[item.type]}
              </Form.Item>
            );
          })}
        </Form>
      </div>
      <Footer></Footer>
    </div>
  );
}
