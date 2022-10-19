import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import Calendar from '../components/Calendar/Calendar';
import CButton from '../components/Button/CButton';
import CProgress from '../components/Progress/CProgress';
import CRating from '../components/Rating/CRating';
import ProfessorCard from '../components/professorCard';
import CCircleRanking from '../components/Rating/CCircleRanking';
import CourseScoreCard from '../components/CourseScoreCard';
const Home: NextPage = () => {
  enum TSize {
    normal,
    full,
  }
  const avatarList = [
    { avatar: '', name: 'Test Prof 1', score: 1.1 },
    { avatar: '', name: 'Test Prof 2', score: 3.1 },
    { avatar: '', name: 'Test Prof 3', score: 4.1 },
  ];
  return (
    <div className='bg-gray-50 p-4 flex flex-col space-y-8'>
      <CButton size="normal">添加</CButton>
      <CButton size="full">添加</CButton>
      <div className="flex space-x-2 ">
        <CRating score={1}></CRating>
        <CRating score={2.1}></CRating>
        <CRating score={3.1}></CRating>
        <CRating score={4.1}></CRating>
        <CRating score={undefined}></CRating>
      </div>
      {avatarList.map((item) => {
        return <ProfessorCard data={item}></ProfessorCard>;
      })}
      <div className='p-5'>
      <CProgress></CProgress>
      </div>
      <div>
      <CCircleRanking  score={4.1}></CCircleRanking>
      <CCircleRanking  score={3.1}></CCircleRanking>
      <CCircleRanking  score={2.1}></CCircleRanking>
      <CCircleRanking  score={1.1}></CCircleRanking>
      <div className='mb-10'></div>
      <CourseScoreCard data={{score:3.1}}></CourseScoreCard>
      </div>
      <Calendar></Calendar>
    </div>
  );
};

export default Home;
