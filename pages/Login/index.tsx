import React from 'react';
import backgroundImage1 from './assets/background2.png';
import backgroundImage2 from './/assets/Background3.png';
import Image from 'next/image';
import Logo from './assets/logo.png';
import Button from '@mui/material/Button';
import WeChat from './assets/wechat.svg';
import CommonLayout from '@/components/Layout/CommonLayout';
export default function index(props) {
  return (
    <div className="relative w-full h-screen bg-fixed">
      <div className="absolute inset-0 z-0 ">
        <Image src={backgroundImage1} alt="Picture of the author" />
      </div>
      <div className="z-10 flex flex-col items-center mt-11">
        <Image src={Logo} alt=""></Image>
        <div>走进千家万户,共享轻松生活</div>
        {/* <Button variant="outlined" startIcon={<WeChat />}>
          Delete
        </Button> */}
      </div>
    </div>
  );
}
