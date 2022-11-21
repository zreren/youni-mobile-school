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
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState, setAuthState } from "@/stores/authSlice";

const RedCountyList = (props) => {
  const { arg } = props;
  const [select, setSelect] = useState('Canada');
  const CountryButton = (props1) => {
    const { title } = props1;
    return (
      <div onClick={()=>{
        props.setVisible(false);
        props.setSelectSchool(true)
      }} className="z-50 p-2 text-sm text-center h-9 bg-bg">{title}</div>
    );
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
        <div className="w-screen h-screen p-4 pt-6 space-y-4 bg-bg">
          <div className="w-full h-auto overflow-visible red-gradient card">
            <div className="relative w-full h-full p-4">
              <div className="absolute right-3 -top-3">
                <Image src="/assets/hot.png" width={73} height={83}></Image>
              </div>
              <div className="text-base font-medium text-white">
                热门国家和地区
              </div>
              <div className="z-50 grid grid-cols-3 gap-2 pt-2">
                <CountryButton title="美国"></CountryButton>
                <CountryButton title="美国"></CountryButton>
                <CountryButton title="美国"></CountryButton>
                <CountryButton title="美国"></CountryButton>
              </div>
            </div>
          </div>
          <div className="w-full h-auto overflow-visible bg-white card">
            <div className="relative w-full h-full p-4">
              <div className="text-base font-medium ">北美洲</div>
              <div className="z-50 grid grid-cols-3 gap-2 pt-2">
                <CountryButton title="美国"></CountryButton>
                <CountryButton title="美国"></CountryButton>
                <CountryButton title="美国"></CountryButton>
                <CountryButton title="美国"></CountryButton>
                <CountryButton title="美国"></CountryButton>
                <CountryButton title="美国"></CountryButton>
                <CountryButton title="美国"></CountryButton>
                <CountryButton title="美国"></CountryButton>
                <CountryButton title="美国"></CountryButton>
                <CountryButton title="美国"></CountryButton>
                <CountryButton title="美国"></CountryButton>
                <CountryButton title="美国"></CountryButton>
              </div>
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
                <div className="h-12 pt-3 pl-4" onClick={()=>{
                  props.setVisible(false);
                }}>
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
  const [schoolSelect,setSelectSchool] = useState(false);
  const dispatch = useDispatch()
  React.useEffect(()=>{
    dispatch(setAuthState(true))
  },[])
  return (
    <div className="w-screen h-screen">
      <RedCountyList
        setVisible={setIsSelect}
        visible={isSelect}
        setSelectSchool={setSelectSchool}
      ></RedCountyList>
      <SchoolList  setVisible={setSelectSchool}
        visible={schoolSelect && !isSelect}>
      </SchoolList>
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
