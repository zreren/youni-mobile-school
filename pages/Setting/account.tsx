import React, { useState } from 'react';
import Header from '@/components/Header';
import CommonLayout from '@/components/Layout/CommonLayout';
import Form from '@/components/Form/Form';
import useUser from '@/hooks/useUser';
import IOSSwitch from '@/components/Input/ios';
import RightIcon from '@/public/assets/right.svg';
import { Input, Sticky } from 'react-vant';
import useRequest from '@/libs/request';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function account() {
  const { user, mutate } = useUser();
  const {t} = useTranslation()

  const InputSelect = (props) => {
    const [isEdit, setIsEdit] = useState(false);
    const [value, setValue] = useState(props?.label);
    const updateInfo = async (v, k) => {
      if (!props.editable) return;
      if (props.dataIndex === 'nickName') {
        const { data } = await useRequest.post('/api/profile/update/nickName', {
          nickName: v,
        });
        if (data?.message === 'success') {
          setIsEdit(false);
          mutate();
        }
      }
    };
    return (
      <div
        className="flex items-center text-gray-400"
        onClick={() => {
          if (!props.editable) return;
          setIsEdit(true);
        }}
      >
        {isEdit ? (
          <Input
            align="right"
            onChange={(e) => {
              setValue(e);
            }}
            onBlur={() => {
              updateInfo(value, props.dataIndex);
            }}
            className=" text-[#37455C]  underline  font-semibold text-xs"
            value={value}
          ></Input>
        ) : (
          <div>{props?.label ? props?.label : '未设置'}</div>
        )}
        <RightIcon></RightIcon>
      </div>
    );
  };
  const List1 = [
    {
      title: '账号',
      intro: '',
      action: (
        <InputSelect dataIndex="nickName" editable={true} label={user?.nickName}></InputSelect>
      ),
    },
    {
      title: 'Email',
      intro: '',
      action: <InputSelect label={user?.email}></InputSelect>,
    },
    {
      title: '性别',
      intro: '',
      action: <RightIcon></RightIcon>,
    },
  ];
  const List2 = [
    {
      title: '微信账号',
      intro: '',
      action: <InputSelect></InputSelect>,
    },
    {
      title: 'Google账号',
      intro: '',
      action: <InputSelect></InputSelect>,
    },
    {
      title: 'Apple账号',
      intro: '',
      action: <InputSelect></InputSelect>,
    },
  ];
  return (
    <CommonLayout className="overflow-hidden bg-white">
      <Header title="账号"></Header>
      <Form header="账号信息" List={List1}></Form>
      <Form header="绑定信息" List={List2}></Form>
    </CommonLayout>
  );
}


export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
