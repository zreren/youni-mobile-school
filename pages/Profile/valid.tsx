import React, { useContext, useEffect, useState } from 'react';
import HeaderMenu from '@/components/Menu/Header-menu';
import Header from '@/components/Header';
import { Input } from 'react-vant';
import useRequest from '@/libs/request';
import { Toast, Uploader } from 'react-vant';
// import { demoData, upload } from './utils';
// import './style.less';
export default function idValid() {
  interface ValidForm {
    schoolName: string;
    enrollYear: number | string;
    major: string;
    email: string;
    code: string;
    degree: string;
  }
  interface CardValidForm {
    schoolName: string;
    enrollYear: number | string;
    major: string;
    degree: string;
    frontImg: string;
    backImg: string;
  }
  const upload = async (file: File) => {
    try {
      const body = new FormData()
      body.append('source', file)
      const resp = await fetch('', {
        method: 'POST',
        body,
      })
      const json = await resp.json()
      // return包含 url 的一个对象 例如: {url:'https://img.yzcdn.cn/vant/sand.jpg'}
      return json.image
    } catch (error) {
      return { url: `demo_path/${file.name}` }
    }
  }
  
  const demoData = [
    {
      url: 'https://img.yzcdn.cn/vant/sand.jpg',
      filename: '图片名称',
    },
    {
      url: 'https://img.yzcdn.cn/vant/tree.jpg',
      filename: '图片名称',
    },
  ]
  const InputComponent = (props) => {
    let { label, type, dataIndex, children } = props;
    if (!type) {
      type = 'input';
    }
    // const data = useContext(ValidForm)
    // const updateData = (val) => {
    //   setValidFormData({ ...ValidFormData, [dataIndex]: text });
    // };

    return (
      <div className="w-full bg-white rounded-full ">
        <label className="flex justify-between w-full h-12 input-group">
          <span className="text-sm font-medium bg-white text-blueTitle whitespace-nowrap">
            {label}
          </span>
          {type === 'input' ? (
            // <Input
            //   align='right'
            //   value={text}
            //   onBlur={updateData}
            //   onChange={val => updateState(val)}
            //   placeholder="请输入文本"
            //   className="text-sm font-medium w-[50px] text-right text-gray-500 placeholder-gray-300 border-none input hover:outline-none"
            // />
            <> {children}</>
          ) : (
            <Input />
          )}
        </label>
      </div>
    );
  };
  const MailValid = () => {
    const form = [
      { label: '学校名称', Value: 1, dataIndex: 'schoolName' },
      { label: '入学年份', Value: 2, dataIndex: 'enrollYear' },
      { label: '专业', Value: 3, dataIndex: 'major' },
      { label: 'Email', Value: 4, dataIndex: 'email' },
      { label: '验证码', Value: 5, dataIndex: 'code' },
    ];
    const sendCode = () => {
      console.log(ValidFormData, 'ValidFormData.email');
      useRequest.post('/api/send_email_code', {
        email: ValidFormData.email,
      });
    };

    const [ValidFormData, setValidFormData] = useState<ValidForm>({
      schoolName: '',
      enrollYear: '',
      degree: '',
      major: '',
      email: '',
      code: '',
    });

    const submitValid = (ValidFormData: ValidForm) => {
      useRequest.post('/api/profile/verify/email', {
        ...ValidFormData,
      });
    };
    const updateData = React.useCallback((name: string, val: any) => {
      setValidFormData((preVal: any) => {
        return {
          ...preVal,
          [name]: val,
        };
      });
    }, []);
    return (
      <div className="w-full space-y-4">
        <InputComponent label={'学校名称'}>
          <Input
            align="right"
            value={ValidFormData.schoolName}
            // onBlur={updateData}
            key={'schoolName'}
            onChange={(val) => {
              updateData('schoolName', val);
            }}
            placeholder="请输入文本"
            className="text-sm font-medium w-[50px] text-right text-gray-500 placeholder-gray-300 border-none input hover:outline-none"
          />
        </InputComponent>
        <InputComponent label={'专业'}>
          <Input
            align="right"
            value={ValidFormData.major}
            // onBlur={updateData}
            key={'major'}
            onChange={(val) => {
              updateData('major', val);
            }}
            placeholder="请输入文本"
            className="text-sm font-medium w-[50px] text-right text-gray-500 placeholder-gray-300 border-none input hover:outline-none"
          />
        </InputComponent>
        <InputComponent label={'专业'}>
          <Input
            align="right"
            value={ValidFormData.major}
            // onBlur={updateData}
            key={'major'}
            onChange={(val) => {
              updateData('major', val);
            }}
            placeholder="请输入文本"
            className="text-sm font-medium w-[50px] text-right text-gray-500 placeholder-gray-300 border-none input hover:outline-none"
          />
        </InputComponent>
        <InputComponent label={'入学年份'}>
          <Input
            align="right"
            value={ValidFormData.enrollYear as string}
            // onBlur={updateData}
            key={'enrollYear'}
            onChange={(val) => {
              updateData('enrollYear', val);
            }}
            placeholder="请输入文本"
            className="text-sm font-medium w-[50px] text-right text-gray-500 placeholder-gray-300 border-none input hover:outline-none"
          />
        </InputComponent>
        <InputComponent label={'Email'}>
          <Input
            align="right"
            value={ValidFormData.email}
            // onBlur={updateData}
            onChange={(val) => {
              updateData('email', val);
            }}
            placeholder="请输入文本"
            className="text-sm font-medium w-[50px] text-right text-gray-500 placeholder-gray-300 border-none input hover:outline-none"
          />
        </InputComponent>
        <div className="relative w-full bg-white rounded-full">
          <label className="flex justify-between w-full h-12 input-group">
            <span className="text-sm font-medium bg-white text-blueTitle whitespace-nowrap">
              验证码
            </span>
            <input
              type="text"
              placeholder="输入验证码"
              value={ValidFormData.code}
              // onBlur={updateData}
              onChange={(val) => {
                updateData('code', val.target.value);
              }}
              className="mr-20 text-sm font-medium text-right text-gray-500 placeholder-gray-300 border-none input hover:outline-none"
            />
          </label>
          <button
            onClick={() => {
              sendCode();
            }}
            className="absolute w-20 h-8 text-xs bg-yellow-400 rounded-full right-2 top-2"
          >
            发送验证码
          </button>
        </div>
        <button
          onClick={() => {
            submitValid(ValidFormData);
          }}
          className="w-full border-none rounded-full yellow-gradient btn"
        >
          提交
        </button>
      </div>
    );
  };
  const CardValid = () => {
    const [ValidFormData, setValidFormData] = useState<CardValidForm>({
      schoolName: '',
      enrollYear: '',
      major: '',
      degree: '',
      frontImg: '',
      backImg: '',
    });
    const form = [
      { label: '学校名称', type: 'input', Value: 1 },
      { label: '学历', type: 'input', Value: 1 },
      { label: '专业', type: 'input', Value: 1 },
      { label: '专业', type: 'input', Value: 1 },
      { label: '学生卡验证', type: 'file', Value: 1 },
    ];
    const updateData = React.useCallback((name: string, val: any) => {
      setValidFormData((preVal: any) => {
        return {
          ...preVal,
          [name]: val,
        };
      });
    }, []);
    return (
      <div className="w-full space-y-4">
        <InputComponent label={'学校名称'}>
          <Input
            align="right"
            value={ValidFormData.schoolName}
            // onBlur={updateData}
            key={'schoolName'}
            onChange={(val) => {
              updateData('schoolName', val);
            }}
            placeholder="请输入文本"
            className="text-sm font-medium w-[50px] text-right text-gray-500 placeholder-gray-300 border-none input hover:outline-none"
          />
        </InputComponent>
        <InputComponent label={'入学年份'}>
          <Input
            align="right"
            value={ValidFormData.enrollYear as string}
            // onBlur={updateData}
            key={'enrollYear'}
            onChange={(val) => {
              updateData('enrollYear', val);
            }}
            placeholder="请输入文本"
            className="text-sm font-medium w-[50px] text-right text-gray-500 placeholder-gray-300 border-none input hover:outline-none"
          />
        </InputComponent>
        <InputComponent label={'专业'}>
          <Input
            align="right"
            value={ValidFormData.major}
            // onBlur={updateData}
            key={'major'}
            onChange={(val) => {
              updateData('major', val);
            }}
            placeholder="请输入文本"
            className="text-sm font-medium w-[50px] text-right text-gray-500 placeholder-gray-300 border-none input hover:outline-none"
          />
        </InputComponent>
        <div className="w-full p-4 bg-white rounded-lg h-36">
          <div>学生卡验证</div>
          <div className="flex justify-between h-full pt-2 pb-8 space-x-4">
            <div className="flex items-center justify-center w-full h-full text-center bg-bg">
              <Uploader
                multiple
                upload={upload}
                defaultValue={[demoData[0]]}
                maxCount={1}
                maxSize={15 * 1024}
                onOversize={() => Toast.info('文件大小不能超过15kb')}
              />
            </div>
            <div className="flex items-center justify-center w-full h-full text-center bg-bg">
              反面
            </div>
          </div>
        </div>
        <button className="w-full border-none rounded-full yellow-gradient btn">
          提交
        </button>
      </div>
    );
  };
  const headerMenuList = [
    {
      label: '邮箱验证',
    },
    {
      label: '学生卡认证',
    },
  ];
  // const menuList = [MailValid, CardValid];
  const [menu, setMenu] = React.useState(0);
  const [form, setFrom] = React.useState({});

  return (
    <div className="h-screen bg-bg">
      <Header title="学生认证"></Header>
      <HeaderMenu
        headerMenuList={headerMenuList}
        switchMenu={(val) => {
          setMenu(val);
        }}
      ></HeaderMenu>
      <div className="fixed w-full p-4 h-1/1">
        {menu === 0 ? <MailValid></MailValid> : <CardValid></CardValid>}
      </div>
    </div>
  );
}
