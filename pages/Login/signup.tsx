import React from 'react';
import backgroundImage1 from './assets/background2.png';
import backgroundImage2 from './assets/1.png';
import Image from 'next/image';
import Logo from './assets/logo.png';
import Button from '@mui/material/Button';
import WeChat from './assets/wechat.svg';
import CommonLayout from '@/components/Layout/CommonLayout';
import Youni from './assets/youni.svg';
import Wechat from './assets/wechatlogin.svg';
import Google from './assets/google.svg';
import Stroke from './assets/stroke.svg';
import { useState } from 'react';
const SignUpButton = (props) => {
  const { title, icon: Icon, label } = props;
  return (
    <div className="z-50 flex items-center justify-between h-12 p-4 rounded-xl bg-bg">
      <div className="z-50 flex items-center space-x-2">
        <Icon></Icon>
        <div>{label}</div>
      </div>
      <div>
        <Stroke></Stroke>
      </div>
    </div>
  );
};
const SelectSignUpWay = () => {
  return (
    <div className="z-10 flex flex-col w-full mt-11">
      {/* <Image src={Logo} alt=""></Image> */}
      <div className="z-10 pl-8 pr-8 text-2xl">Sign up for YoUni</div>
      <div className="z-10 pl-8 pr-8 mb-20 text-md">
        Create a profile to unlock full functions.
      </div>
      <div>
        <div className="absolute z-0 w-full top-32">
          <Image
            className="absolute z-0 w-10 h-10 opacity-80"
            src={backgroundImage2}
            alt="Picture of the author"
          />
        </div>
      </div>
      <div className="w-full h-44"></div>
      <div className="z-50 pl-8 pr-8 space-y-4">
        <SignUpButton
          icon={Youni}
          label="Use phone or school email"
        ></SignUpButton>
        <SignUpButton icon={Google} label="Continue with Google"></SignUpButton>
        <SignUpButton
          icon={Wechat}
          label="Continue with WeChat/Weixin"
        ></SignUpButton>
      </div>
      {/* <Button variant="outlined" startIcon={<WeChat />}>
    Delete
  </Button> */}
    </div>
  );
};
const SelectLanguage = () => {
  return (
    <div className="z-10 flex flex-col w-full mt-11">
      {/* <Image src={Logo} alt=""></Image> */}
      <div className="z-10 pl-8 pr-8 text-2xl">Select Language</div>
      <div className="z-10 pl-8 pr-8 mb-20 text-md">
        Choose the language you speak most often. Changing this selection is
        possible at any time.
      </div>
      <div>
        <div className="absolute z-0 w-full top-32">
          <Image
            className="absolute z-0 w-10 h-10 opacity-80"
            src={backgroundImage2}
            alt="Picture of the author"
          />
        </div>
      </div>
      <div className="w-full h-44"></div>
      <div className="z-50 pl-8 pr-8 space-y-4" >
        <SignUpButton
          icon={Youni}
          label="Use phone or school email"
        ></SignUpButton>
        <SignUpButton icon={Google} label="Continue with Google"></SignUpButton>
        <SignUpButton
          icon={Wechat}
          label="Continue with WeChat/Weixin"
        ></SignUpButton>
      </div>
      {/* <Button variant="outlined" startIcon={<WeChat />}>
    Delete
  </Button> */}
    </div>
  );
};
export default function SignUp(props) {
  const [progress, setProgress] = useState(0);
  const ProgressList = [SelectSignUpWay, SelectLanguage];
  return (
    <div className="relative w-full h-screen bg-fixed" onClick={()=>{setProgress(1)}}>
      <div className="absolute inset-0 z-0 w-full -top-24">
        <Image
          className="z-0"
          src={backgroundImage1}
          alt="Picture of the author"
        />
      </div>
      <div>{ProgressList[progress]()}</div>
    </div>
  );
}
