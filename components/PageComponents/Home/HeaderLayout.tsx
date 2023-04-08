import React from 'react';
import SearchInSchool from './SearchAtSchool';
import SwiperAtSchool from './SwiperAtSchool';
import SchoolIcon from './school.svg';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
export default function HeaderLayout(props) {
  const { school } = props;
  const { t} = useTranslation()
  if(!school) return null
  return (
    <div
      className="w-full h-auto pb-2 bg-gradient-to-r from-green-50 to-yellow-50 "
    >
      <div onClick={()=>{props.selectSchool()}} className='flex items-center p-4 pb-0 mb-3'>
        <SchoolIcon className="mr-4 "></SchoolIcon>
        <div className="text-lg font-medium ">{school}</div>
      </div>
      <SearchInSchool placeholder={t('搜索教授/课程')}></SearchInSchool>
{/* <SwiperAtSchool></SwiperAtSchool> */}
    </div>
  );
}
