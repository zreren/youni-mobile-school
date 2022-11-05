import React from 'react';
import CommonLayout from '@/components/Layout/CommonLayout';
import HeaderMenu from '@/components/Menu/Header-menu';
import Search from '@/components/Input/Search';
import RedIcon from '../../../public/red.svg';
import Title from '@/components/Title/Title';
import CourseIntroCard from './CourseIntroCard';
import CDataGrip from '@/components/CDataGrip';
export default function Introduce() {
  return (
    <CommonLayout>
      <Search></Search>
      <div className="flex items-center mt-3">
        <RedIcon className="mr-2"></RedIcon>
        <Title className="mb-0 mt-0" title="ADMS 1000"></Title>
      </div>
      <Title  className="mt-0"  title="Introduction to Business"></Title>
      <CourseIntroCard></CourseIntroCard>
      <Title title="数据概览"></Title>
      <CDataGrip></CDataGrip>
    </CommonLayout>
  );
}
