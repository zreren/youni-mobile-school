import React from 'react';
import HeaderLayout from '@/components/PageComponents/Home/HeaderLayout';
import MenuAtSchool from '@/components/PageComponents/Home/MenuAtSchool';
import ad from './components/ad.png';
import Image from 'next/image';
import { useState } from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
const CourseDetailCard = (props) => {
  const { arg } = props;
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
        <div className="w-screen h-screen">
          <button onClick={()=>{props.setVisible(false)}} className="btn btn-primary ">exit</button>
        </div>
      </SwipeableDrawer>
    </div>
  );
};
function SchoolPage(props) {
  console.log(props, 'SchoolPage');
  const [isSelect, setIsSelect] = useState(false);
  return (
    <div className="h-screen w-screen">
      <CourseDetailCard
        setVisible={setIsSelect}
        visible={isSelect}
      ></CourseDetailCard>
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
