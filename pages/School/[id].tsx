import React from 'react';
import HeaderLayout from '@/components/PageComponents/Home/HeaderLayout';
import MenuAtSchool from '@/components/PageComponents/Home/MenuAtSchool';
import ad from './components/ad.png';
import Image from 'next/image';
import { useState } from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import classnames from 'classnames';
import Header from '@/components/Header';
const CountyList = (props) => {
  const { arg } = props;
  const [select, setSelect] = useState('Canada');
  return (
    <div className="">
      <SwipeableDrawer
        anchor="left"
        open={props.visible}
        onClose={() => {
          props.setVisible(false);
        }}
        onOpen={() => {
          props.setVisible(true);
        }}
        className="h-screen"
      >
         <div className="flex w-screen h-screen p-4 bg-bg">
            <div className='w-full h-48 red-gradient card'>
              <div className='p-0 card-body'>
                <Image src="/assets/hot.png"  width={13} height={83} className="absolute z-99"></Image>
              </div>
            </div>
         </div>
      </SwipeableDrawer>
    </div>
  );
};
const SchoolList = (props) => {
  const { arg } = props;
  const [select, setSelect] = useState('Canada');
  const countryList = [
    { label: '中国', value: 'Canada' },
    { label: '中国', value: 'China' },
  ];
  const chinaSchoolList = [
    {
      label: 'York Unviersity (Canada)',
      cnLabel: '多伦多大学密西沙加校区',
      value: 1,
      short: 'YU',
      belong: 'Canada',
    },
    {
      label: 'York Unviersity (Canada)',
      cnLabel: '多伦多大学密西沙加校区',
      value: 1,
      short: 'YU',
    },
    {
      label: 'York Unviersity (Canada)',
      cnLabel: '多伦多大学密西沙加校区',
      value: 1,
      short: 'YU',
    },
  ];
  const schoolList = [
    {
      label: 'York Unviersity (Canada)',
      cnLabel: '多伦多大学密西沙加校区',
      value: 1,
      short: 'YU',
      belong: 'Canada',
    },
    {
      label: 'York Unviersity (Canada)',
      cnLabel: '多伦多大学密西沙加校区',
      value: 1,
      short: 'YU',
    },
    {
      label: 'York Unviersity (Canada)',
      cnLabel: '多伦多大学密西沙加校区',
      value: 1,
      short: 'YU',
    },
    {
      label: 'York Unviersity (Canada)',
      cnLabel: '多伦多大学密西沙加校区',
      value: 1,
      short: 'YU',
    },
  ];
  const countrySchoolList = {
    Canada: schoolList,
    China: chinaSchoolList,
  };
  return (
    <div className="">
      <SwipeableDrawer
        anchor="left"
        open={props.visible}
        onClose={() => {
          props.setVisible(false);
        }}
        onOpen={() => {
          props.setVisible(true);
        }}
        className="h-screen"
      >
        <div className="flex w-screen h-screen">
          <Header
            returnClick={() => {
              props.setVisible(false);
            }}
            title={select}
            className="shadow-none"
          ></Header>
          <div className="w-1/5 h-full pt-10 min-w-30 bg-bg">
            {countryList?.map((item) => {
              return (
                <div
                  onClick={() => {
                    setSelect(item.value);
                  }}
                  className={classnames('p-4 h-14', {
                    'text-yellow-400': select === item.value,
                  })}
                >
                  {item.label}
                </div>
              );
            })}
          </div>
          <div className="w-4/5 h-full">
            {countrySchoolList[select].map((item) => {
              return (
                <div className="h-12 pt-3 pl-4">
                  <div className="flex items-center h-4 space-x-2">
                    <div> {item.cnLabel}</div>
                    <div className="p-1 text-xs bg-bg">{item.short}</div>
                  </div>
                  <div className="text-xs text-lightGray">{item.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </SwipeableDrawer>
    </div>
  );
};
function SchoolPage(props) {
  console.log(props, 'SchoolPage');
  const [isSelect, setIsSelect] = useState(false);
  return (
    <div className="w-screen h-screen">
      <CountyList setVisible={setIsSelect} visible={isSelect}></CountyList>
      {/* <SchoolList
        setVisible={setIsSelect}
        visible={isSelect}
      ></SchoolList> */}
      <HeaderLayout
        selectSchool={() => {
          setIsSelect(true);
        }}
        school={props.post.school}
      ></HeaderLayout>
      <MenuAtSchool></MenuAtSchool>
      <div className="w-full pl-5 pr-5">
        <Image
          src={ad}
          width="100%"
          height="20rem"
          layout="responsive"
          alt=""
          objectFit="contain"
        ></Image>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const School = [
    {
      id: 1,
      school: '约克大学 (加拿大)',
    },
    {
      id: 2,
      school: '牛津大学 (英国)',
    },
    {
      id: 3,
      school: '斯坦福大学 (美国)',
    },
  ];
  const map = {
    York: School[0],
    Harvard: School[1],
    Stanford: School[2],
  };
  return {
    props: {
      post: map[params.id],
    },
  };
}
export default SchoolPage;
