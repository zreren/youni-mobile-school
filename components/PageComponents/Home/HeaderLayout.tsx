import React from 'react';
import SearchInSchool from './SearchAtSchool';
import SwiperAtSchool from './SwiperAtSchool';
import SchoolIcon from './school.svg';
import Link from 'next/link';
export default function HeaderLayout(props) {
  const { school } = props;
  return (
    <div
      className="h-auto bg-gradient-to-r
     from-green-50 to-yellow-50 w-full
     pb-4
     "
    >
      <div className='flex items-center p-4 pb-0 mb-3'>
        <SchoolIcon className=" mr-4"></SchoolIcon>
        <div className="text-lg font-medium ">{school}</div>
      </div>
      <SearchInSchool placeholder={'搜索教授/课程'}></SearchInSchool>
      <SwiperAtSchool></SwiperAtSchool>
    </div>
  );
}
