import React from 'react';
import Header from '@/components/Header';
import CommonLayout from '@/components/Layout/CommonLayout';
import Form from '@/components/Form/Form';
import IOSSwitch from '@/components/Input/ios';
import RightIcon from '@/public/assets/right.svg';
import useUser from '@/hooks/useUser';
import { useTranslation } from 'next-i18next';

export default function account() {
  const { user } = useUser();
  const { i18n } = useTranslation();
  // const {extraInfo } = user;
  const InputSelect = (props) => {
    return (
      <div className="flex items-center text-gray-400">
        <div>{props.label?props.label:i18n.t("get.authentication")}</div>
        <RightIcon></RightIcon>
      </div>
    );
  };
  const List1 = [
    {
      title: '账号',
      intro: '',
      action: <InputSelect label={user?.nickName}></InputSelect>,
    },
    {
      title: 'YoUni ID',
      intro: '',
      action: <InputSelect label={user?.userId}></InputSelect>,
    },
    {
      title: '性别',
      intro: '',
      action: <InputSelect label={user?.gender===0?'男':'女'}></InputSelect>,
    },
  ];
  const List2 = [
    {
      title: '角色',
      intro: '',
      action: <InputSelect label={user?.education?'认证用户':'用户'}></InputSelect>,
    },
    {
      title: '学校',
      intro: '',
      action: <InputSelect label={user?.campus?.ename ||'未认证'}></InputSelect>,
    },
    {
      title: '学历',
      intro: '',
      action: <InputSelect label={user?.education?.degree ||'未认证'}></InputSelect>,
    },
    {
      title: '专业',
      intro: '',
      action: <InputSelect label={user?.education?.major ||'未认证'}></InputSelect>,
    },
    {
      title: '入学年份',
      intro: '',
      action: <InputSelect label={user?.education?.year ||'未认证'}></InputSelect>,
    },
  ];
  return (
    <CommonLayout className="overflow-hidden">
      <Header title="编辑资料"></Header>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="avatar">
          <div className="w-24 rounded-full overflow-hidden">
            <img src={`${Cons.BASEURL}${user?.avatar}`} />
          </div>
        </div>
        <div className="mt-4 text-xs text-gray-500">修改头像</div>
      </div>
      <Form header="关于我" List={List1}></Form>
      <Form header="教育认证" List={List2}></Form>
    </CommonLayout>
  );
}
