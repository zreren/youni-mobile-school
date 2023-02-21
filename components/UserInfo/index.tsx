import React, { useEffect } from 'react';
import { Toast } from 'react-vant';
import Icon1 from './contact/1.svg';
import Icon2 from './contact/2.svg';
import Icon3 from './contact/3.svg';
import Icon4 from './contact/4.svg';

interface userInfo {
  data: {
    nickName: string;
    education: {
      year: string;
      major: string;
    };
    avatar: string;
  };
  contact: any[];
}
export default function index(props: userInfo) {
  const { data, contact } = props;
  const getContactValue = (type: string) => {
    return contact?.map((item: any) => {
      if (item.type === type) {
        return item.value;
      }
    })[0]
  }
  const openURL = (type: string) => {
    if (type === '微信') {
      Toast.success('已复制微信号,跳转到微信...');
      const res = getContactValue('微信');
      try {
        navigator.clipboard.writeText(res);
        window.location.href = `weixin://`;
      } catch (error) {
        Toast.fail('复制失败,请手动复制');
        console.log(error,"error") 
      }
      
    }
    if(type === '电话'){
      Toast.success('已复制电话号码,跳转到电话...');
      const res = getContactValue('电话');
      window.location.href = `tel://${res}`;
    }
    if(type === '短信'){
      Toast.success('已复制电话号码,跳转到短信...');
      const res = getContactValue('电话');
      window.location.href = `sms://${res}`;  
    }
  }
  useEffect(()=>{
    console.log(contact,"contact")
  },[contact])
  return (
    <div className="w-full bg-white py-4">
      <div className="flex items-center">
        <div className="avatar placeholder">
          <div className="w-12 rounded-full bg-neutral-focus text-neutral-content">
            <img src={`${Cons.BASEURL}${data?.avatar}`} />
          </div>
        </div>
        <div>
          <div className="ml-4 text-sm font-medium max-w-8 text-blueTitle">
            {data?.nickName}
          </div>
          <div className="ml-4 text-xs text-gray-200">
            {data?.education?.year} · {data?.education?.major}
          </div>
        </div>
      </div>
      <div className="grid mt-4 grid-cols-2 gap-4">
        {contact?.map((item: any) => {
          if (item.type === '电话') {
            return (
              <div onClick={()=>{openURL('电话')}} className="flex items-center justify-center w-full h-10 space-x-2 text-sm font-semibold text-[#52C41A] rounded-full bg-bg">
                <Icon2></Icon2>
                <div>打电话</div>
              </div>
            );
          }
          if (item.type === '微信') {
            return (
              <div onClick={()=>{openURL('微信')}} className="flex items-center justify-center w-full h-10 space-x-2 text-sm font-semibold text-[#52C41A] rounded-full bg-bg">
              <Icon3></Icon3>
              <div>加微信</div>
            </div>
            );
          }
          if (item.type === '短信') {
            return (
              <div onClick={()=>{openURL('短信')}} className="flex items-center justify-center w-full h-10 space-x-2 text-sm font-semibold text-[#52C41A] rounded-full bg-bg">
              <Icon4></Icon4>
              <div>发短信</div>
            </div>
            );
          }
          if(item.type === '邮件'){
            <div onClick={()=>{openURL('邮件')}}  className="flex items-center justify-center w-full h-10 space-x-2 text-sm font-semibold text-[#3665FF] rounded-full bg-bg">
            <Icon1></Icon1>
            <div>发邮件</div>
          </div>
          }
        })}
        {contact?.indexOf('wechat') > -1 ? (
          <div  onClick={()=>{openURL('微信')}} className="flex items-center justify-center w-full h-10 space-x-2 text-sm font-semibold text-[#52C41A] rounded-full bg-bg">
            <Icon3></Icon3>
            <div>加微信</div>
          </div>
        ) : null}
        {contact?.indexOf('phone') > -1 ? (
          <div onClick={()=>{openURL('电话')}} className="flex items-center justify-center w-full h-10 space-x-2 text-sm font-semibold text-[#52C41A] rounded-full bg-bg">
            <Icon2></Icon2>
            <div>打电话</div>
          </div>
        ) : null}
        {contact?.indexOf('message') > -1 ? (
          <div onClick={()=>{openURL('短信')}} className="flex items-center justify-center w-full h-10 space-x-2 text-sm font-semibold text-[#52C41A] rounded-full bg-bg">
            <Icon4></Icon4>
            <div>发短信</div>
          </div>
        ) : null}
        {contact?.indexOf('email') > -1 ? (
          <div onClick={()=>{openURL('邮件')}}  className="flex items-center justify-center w-full h-10 space-x-2 text-sm font-semibold text-[#3665FF] rounded-full bg-bg">
            <Icon1></Icon1>
            <div>发邮件</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
