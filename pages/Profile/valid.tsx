import React from 'react';
import HeaderMenu from '@/components/Menu/Header-menu';
import Header from '@/components/Header';
const InputComponent = (props) => {
  let { label, type } = props;
  if (!type) {
    type = 'input';
  }
  const Input = () => {
    return (
      <input
        type="text"
        placeholder="info@site.com"
        className="text-sm font-medium text-right text-gray-500 placeholder-gray-300 border-none input hover:outline-none"
      />
    );
  };
  return (
    <div className="w-full bg-white rounded-full ">
      <label className="flex justify-between w-full h-12 input-group">
        <span className="text-sm font-medium bg-white text-blueTitle">
          {label}
        </span>
        {type === 'input' ? <Input /> : <Input /> }
      </label>
    </div>
  );
};
const MailValid = () => {
  const form = [
    { label: '学校名称', Value: 1 },
    { label: '入学年份', Value: 2 },
    { label: '专业', Value: 3 },
    { label: 'Email', Value: 4 },
    { label: '验证码', Value: 5 },
  ];
  return (
    <div className="w-full space-y-4">
      {/* <div className="w-full bg-white rounded-full ">
        <label className="flex justify-between w-full h-12 input-group">
          <span className="text-sm font-medium bg-white text-blueTitle">
            课程代码
          </span>
          <input
            type="text"
            placeholder="info@site.com"
            className="text-sm font-medium text-right text-gray-500 placeholder-gray-300 border-none input hover:outline-none"
          />
        </label>
      </div>
      <div className="w-full bg-white rounded-full ">
        <label className="flex justify-between w-full h-12 input-group">
          <span className="text-sm font-medium bg-white text-blueTitle">
            入学年份
          </span>
          <input
            type="text"
            placeholder="info@site.com"
            className="text-sm font-medium text-right text-gray-500 placeholder-gray-300 border-none input hover:outline-none"
          />
        </label>
      </div>
      <div className="w-full bg-white rounded-full ">
        <label className="flex justify-between w-full h-12 input-group">
          <span className="text-sm font-medium bg-white text-blueTitle">
            专业
          </span>
          <input
            type="text"
            placeholder="info@site.com"
            className="text-sm font-medium text-right text-gray-500 placeholder-gray-300 border-none input hover:outline-none"
          />
        </label>
      </div> */}
      {form.slice(0,4).map((item,index) => {
        return (
          <InputComponent key={index} label={item.label} ></InputComponent>
        );
      })}
      <div className="relative w-full bg-white rounded-full">
        <label className="flex justify-between w-full h-12 input-group">
          <span className="text-sm font-medium bg-white text-blueTitle">
            验证码
          </span>
          <input
            type="text"
            placeholder="输入验证码"
            className="mr-20 text-sm font-medium text-right text-gray-500 placeholder-gray-300 border-none input hover:outline-none"
          />
        </label>
        <button className="absolute w-20 h-8 text-xs bg-yellow-400 rounded-full right-2 top-2">
          发送验证码
        </button>
      </div>
      <button className="w-full border-none rounded-full yellow-gradient btn">提交</button>
    </div>
  );
};
const CardValid = () => {
  const form = [
    { label: '学校名称', type: 'input', Value: 1 },
    { label: '学历', type: 'input', Value: 1 },
    { label: '专业', type: 'input', Value: 1 },
    { label: '专业', type: 'input', Value: 1 },
    { label: '学生卡验证', type: 'file', Value: 1 },
  ];
  return (
    <div className="w-full space-y-4">
      {form.slice(0,4).map((item) => {
        return (
          <InputComponent label={item.label} type={item.type}></InputComponent>
        );
      })}
      <div className='w-full p-4 bg-white rounded-lg h-36'>
        <div>学生卡验证</div>
        <div className='flex justify-between h-full pt-2 pb-8 space-x-4'>
          <div className='flex items-center justify-center w-full h-full text-center bg-bg'>正面</div>
          <div className='flex items-center justify-center w-full h-full text-center bg-bg'>反面</div>
        </div>
      </div>
      <button className="w-full border-none rounded-full yellow-gradient btn">提交</button>
    </div>
  );
};
export default function idValid() {
  const headerMenuList = [
    {
      label: '邮箱验证',
    },
    {
      label: '学生卡认证',
    },
  ];
  const menuList = [MailValid, CardValid];
  const [menu, setMenu] = React.useState(MailValid);
  return (
    <div className="h-screen bg-bg">
      <Header title="学生认证"></Header>
      <HeaderMenu
        headerMenuList={headerMenuList}
        switchMenu={(val) => {
          setMenu(menuList[val]);
        }}
      ></HeaderMenu>
      <div className="fixed w-full p-4 h-1/1">{menu}</div>
    </div>
  );
}
