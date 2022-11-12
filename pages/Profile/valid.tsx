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
        className="input placeholder-gray-300 font-medium	text-gray-500 text-sm hover:outline-none	border-none text-right"
      />
    );
  };
  return (
    <div className="rounded-full bg-white w-full ">
      <label className="input-group   w-full flex justify-between h-12">
        <span className="bg-white  font-medium text-blueTitle text-sm">
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
      {/* <div className="rounded-full bg-white w-full ">
        <label className="input-group   w-full flex justify-between h-12">
          <span className="bg-white  font-medium text-blueTitle text-sm">
            课程代码
          </span>
          <input
            type="text"
            placeholder="info@site.com"
            className="input placeholder-gray-300 font-medium	text-gray-500 text-sm hover:outline-none	border-none text-right"
          />
        </label>
      </div>
      <div className="rounded-full bg-white w-full ">
        <label className="input-group   w-full flex justify-between h-12">
          <span className="bg-white  font-medium text-blueTitle text-sm">
            入学年份
          </span>
          <input
            type="text"
            placeholder="info@site.com"
            className="input placeholder-gray-300 font-medium	text-gray-500 text-sm hover:outline-none	border-none text-right"
          />
        </label>
      </div>
      <div className="rounded-full bg-white w-full ">
        <label className="input-group   w-full flex justify-between h-12">
          <span className="bg-white  font-medium text-blueTitle text-sm">
            专业
          </span>
          <input
            type="text"
            placeholder="info@site.com"
            className="input placeholder-gray-300 font-medium	text-gray-500 text-sm hover:outline-none	border-none text-right"
          />
        </label>
      </div> */}
      {form.slice(0,4).map((item) => {
        return (
          <InputComponent label={item.label} ></InputComponent>
        );
      })}
      <div className="rounded-full bg-white w-full relative">
        <label className="input-group   w-full flex justify-between h-12">
          <span className="bg-white  font-medium text-blueTitle text-sm">
            验证码
          </span>
          <input
            type="text"
            placeholder=""
            className="input placeholder-gray-300 font-medium	text-gray-500 text-sm hover:outline-none	border-none text-right"
          />
        </label>
        <button className="bg-yellow-400 rounded-full h-8 w-20 right-0  absolute ">
          发送验证码
        </button>
      </div>
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
      <div className='rounded-lg h-36 w-full bg-white p-4'>
        <div>学生卡验证</div>
        <div className='flex justify-between h-full pb-8 pt-2 space-x-4'>
          <div className='w-full h-full bg-bg text-center'>正面</div>
          <div className='w-full h-full bg-bg text-center'>反面</div>
        </div>
      </div>
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
    <div className="bg-bg h-screen">
      <Header title="课程评价"></Header>
      <HeaderMenu
        headerMenuList={headerMenuList}
        switchMenu={(val) => {
          setMenu(menuList[val]);
        }}
      ></HeaderMenu>
      <div className="p-4 w-full h-1/1 fixed">{menu}</div>
    </div>
  );
}
