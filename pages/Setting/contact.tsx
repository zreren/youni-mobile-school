import React, { useEffect, useMemo, useState } from 'react';
import Header from '@/components/Header';
import CommonLayout from '@/components/Layout/CommonLayout';
// import Form from '@/components/Form/Form';
import useUser from '@/hooks/useUser';
import IOSSwitch from '@/components/Input/ios';
import RightIcon from '@/public/assets/right.svg';
import useFetch from '@/hooks/useFetch';
import { Cell, Input, hooks, Toast } from 'react-vant';
import useLanguage from '@/hooks/useLanguage';
import useRequest from "@/libs/request";
import classnames from 'classnames';
import { useTranslation } from 'next-i18next';

export default function account() {
  const {t} = useTranslation()
  const { data: contactList } = useFetch('/profile/contact', 'get');
  const phoneItem = useMemo(() => {
    return contactList?.data?.filter((item, index) => {
      return item.type === 'phone';
    })[0];
  }, [contactList]);
  const emailItem = useMemo(() => {
    return contactList?.data?.filter((item, index) => {
      return item.type === 'email';
    })[0];
  }, [contactList]);
  const messageItem = useMemo(() => {
    return contactList?.data?.filter((item, index) => {
      return item.type === 'message';
    })[0];
  }, [contactList]);
  useEffect(() => {
    console.log(contactList, 'contactList');
    console.log(phoneItem, 'phoneItem');
  }, [phoneItem]);
  function Form(props) {
    let { header, List } = props;
    if (!List) {
      List = [
        {
          title: '标题',
          action: 'text',
          intro: '请输入',
          Icon: null,
        },
      ];
    }
    return (
      <div className="w-full h-full">
        <div className="mb-4 text-xs text-[#798195]">{header}</div>
        {List?.map((item, index) => {
          const Icon = item.Icon;
          return (
            <div
              className="items-start text-sm justify-between mb-4"
              onClick={item.event}
            >
              <div className="flex justify-between">
                <div className="flex space-x-2">
                  {item.Icon ? <Icon className="mt-1"></Icon> : null}
                  <div className="mb-2 text-sm font-medium  text-[#798195]">
                    {item.title}
                  </div>
                </div>
                <div>{item.action}</div>
              </div>
              <div className="text-xs text-[#37455C]">{item.intro}</div>
            </div>
          );
        })}
        <div className="h-1 m-0 divider opacity-30"></div>
      </div>
    );
  }
  const { user } = useUser();
  const InputSelect = (props) => {
    return (
      <div className="flex items-center text-gray-400">
        <div>{props?.label ? props?.label : '未设置'}</div>
        <RightIcon></RightIcon>
      </div>
    );
  };
  const PhoneComponent = (props) => {
    const { data, type } = props;
    const dataFetch = useMemo(() => {
      if (data) return;
      return contactList?.data?.filter((item, index) => {
        return item.type === type;
      })[0];
    }, [data]);
    const [value, setValue] = useState(data?.value || dataFetch?.value);
    const [isPublic,setPublic] = useState<boolean>(data?.public || dataFetch?.public);
    // useEffect(()=>{
    //   updateContactItem()
    // },[isPublic])
    const updateContactItem =(bool?:boolean)=>{
      console.log(bool,"bool")

      if(!value){
        Toast.fail(`请输入${type}`);
        setPublic(false)
        return;
      }
      if(!data && !dataFetch){
        useRequest.post("/api/profile/contact/create",{
          type:type,
          value:value,
          public: bool !== null?bool:isPublic
        })
      }
      if(data && !dataFetch){
        useRequest.post("/api/profile/contact/update",{
          type:type,
          value:value,
          public:bool !== null?bool:isPublic,
          id:data?.id
        })
      }
      if(dataFetch && !data){
        useRequest.post("/api/profile/contact/update",{
          type:dataFetch?.type,
          value:value,
          public:bool !== null?bool:isPublic,
          id:dataFetch?.id
        })
      }
    }
    return (
      <div className={classnames("flex space-x-2 contact",
      {
        'contact':isPublic,
        'contact-false':!isPublic
      }
      )}>
        <Input
          value={value}
          type="tel"
          onChange={(tel) => setValue(tel)}
          placeholder={
            useLanguage('name') === 'ename'
              ? `Please enter your ${type}`
              : `请输入${type}`
          }
          onBlur={() => {
            updateContactItem()
          }}
          align="right"
          className="text-blueTitle font-medium"
          // className='align-right'
        />
        <IOSSwitch onChange={(e)=>{
          // e.preventDefault();
          if(isPublic){
            updateContactItem(false)
            setPublic(false)
          }else{
            updateContactItem(true)
            setPublic(true)
          }
        }} value={isPublic}></IOSSwitch>
      </div>
    );
  };
  const List1 = [
    {
      title: '电话',
      intro: '',
      action: <PhoneComponent type={'电话'} data={phoneItem}></PhoneComponent>,
    },
    {
      title: '短信',
      intro: '',
      action: <PhoneComponent type={'短信'}></PhoneComponent>,
    },
    {
      title: '邮箱',
      intro: '',
      action: <PhoneComponent type={'邮箱'} data={emailItem}></PhoneComponent>,
    },
    {
      title: '微信',
      action: <PhoneComponent type={'微信'}></PhoneComponent>,
    },
    {
      title: 'WhatsApp',
      action: <PhoneComponent type={'WhatsApp'}></PhoneComponent>,
    },
    {
      title: 'Discord',
      action: <PhoneComponent type={'Discord'}></PhoneComponent>,
    },
    {
      title: 'Telegram',
      action: <PhoneComponent type={'Telegram'}></PhoneComponent>,
    },
  ];
  return (
    <CommonLayout className="overflow-hidden bg-white">
      <Header title="联系方式"></Header>
      <div className="text-xs mt-2 font-medium text-[#A9B0C0] ">如何找到我</div>
      <div className="text-xs text-[#A9B0C0]  mt-2">
        你可以在此页面设置自己希望公开的联系方式，该联系方式将
        会在转闲置、Carpooli页面中向其他用户公开显示。
      </div>
      <Form header="" List={List1}></Form>
    </CommonLayout>
  );
}
