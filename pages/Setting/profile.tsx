import React, { useRef,useState } from 'react';
import Header from '@/components/Header';
import CommonLayout from '@/components/Layout/CommonLayout';
import Form from '@/components/Form/Form';
import IOSSwitch from '@/components/Input/ios';
import RightIcon from '@/public/assets/right.svg';
import useUser from '@/hooks/useUser';
import { useTranslation } from 'next-i18next';
import useRequest from '@/libs/request';
import { Input, Sticky } from 'react-vant';

export default function account() {
  const { user,mutate } = useUser();
  const { i18n } = useTranslation();
  // const {extraInfo } = user;
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
      <div  onClick={() => {
        if (!props.editable) return;
        setIsEdit(true);
      }} className="flex items-center text-gray-400">
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
      action: <InputSelect dataIndex="nickName" editable={true} label={user?.nickName}></InputSelect>,
    },
    {
      title: 'YoUni ID',
      intro: '',
      action: <InputSelect label={user?.userId}></InputSelect>,
    },
    {
      title: '性别',
      intro: '',
      action: (
        <InputSelect label={user?.gender === 0 ? '男' : '女'}></InputSelect>
      ),
    },
  ];
  const List2 = [
    {
      title: '角色',
      intro: '',
      action: (
        <InputSelect
          label={user?.education ? '认证用户' : '用户'}
        ></InputSelect>
      ),
    },
    {
      title: '学校',
      intro: '',
      action: (
        <InputSelect label={user?.campus?.ename || '未认证'}></InputSelect>
      ),
    },
    {
      title: '学历',
      intro: '',
      action: (
        <InputSelect label={user?.education?.degree || '未认证'}></InputSelect>
      ),
    },
    {
      title: '专业',
      intro: '',
      action: (
        <InputSelect label={user?.education?.major || '未认证'}></InputSelect>
      ),
    },
    {
      title: '入学年份',
      intro: '',
      action: (
        <InputSelect label={user?.education?.year || '未认证'}></InputSelect>
      ),
    },
  ];
  const upload = async (file) => {
    console.log(file, 'file');
    try {
      const body = new FormData();
      body.append('file', file);
      const { data: resp } = await useRequest.post('/api/upload', body);
      const json = resp;
      console.log(json?.data, 'json');
      // return包含 url 的一个对象 例如: {url:'https://img.yzcdn.cn/vant/sand.jpg'}
      return {
        url: Cons.BASEURL + json?.data?.filename,
        name: json?.data?.filename,
      };
    } catch (error) {
      console.log(error, 'error');
      return { url: `demo_path/${file.name}` };
    }
  };
  const uploadEl = useRef(null);
  const updateCustomImg = async (e) => {
    console.log(e.target.files, 'e');
    const reader = new FileReader();
    const body = new FormData();
      body.append('image',  e.target.files[0]);
    const {data:res} = await useRequest.post('/api/upload', body);
    console.log(res, 'res');
    await useRequest.post('/api/profile/update/avatar',body),
    mutate()
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      const base64 = reader.result;
      // setCustomImg(String(base64));
      // Toast.success('设置成功，即将为您重新加载');
      // setTimeout(() => {
      //   router.reload();
      // }, 1500);
      // console.log(base64);
    };
  };
  return (
    <CommonLayout className="overflow-hidden">
      <Header title="编辑资料"></Header>
      <input
        ref={uploadEl}
        type="file"
        onChange={updateCustomImg}
        className="z-30 hidden w-screen bg-transparent h-2 absolute"
      />
      <div
        onClick={() => {
          uploadEl.current.click();
        }}
        className="flex flex-col items-center justify-center w-full"
      >
        <div className="avatar">
          <div className="w-24 rounded-full overflow-hidden">
            <img src={`${Cons.BASEURL}${user?.avatar}`} />
          </div>
        </div>
        <div onClick={() => {}} className="mt-4 text-xs text-gray-500">
          修改头像
        </div>
      </div>
      <Form header="关于我" List={List1}></Form>
      <Form header="教育认证" List={List2}></Form>
    </CommonLayout>
  );
}
