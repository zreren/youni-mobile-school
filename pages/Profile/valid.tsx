import React from 'react';
import HeaderMenu from '@/components/Menu/Header-menu';
import Header from '@/components/Header';

const MailValid = () => {
  const form = [
    { label: '学校名称', Value: 1 },
    { label: '入学年份', Value: 1 },
    { label: '专业', Value: 1 },
    { label: 'Email', Value: 1 },
    { label: '验证码', Value: 1 },
  ];
  return (
    <div className="w-full space-y-4">
      <div className="rounded-full bg-white w-full ">
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
      </div>
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
        <button className='bg-yellow-400 rounded-full h-8 w-20 right-0  absolute '>发送验证码</button>
      </div>
    </div>
  );
};
const CardValid = () => {
  return <div></div>;
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
