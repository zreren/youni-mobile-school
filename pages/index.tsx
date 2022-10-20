import type { NextPage } from 'next';
import React from 'react';
import Calendar from '../components/Calendar/Calendar';
import CButton from '../components/Button/CButton';
import CProgress from '../components/Progress/CProgress';
import CRating from '../components/Rating/CRating';
import ProfessorCard from '../components/ProfessorListItem';
import CCircleRanking from '../components/Rating/CCircleRanking';
import CourseScoreCard from '../components/CourseScoreCard';
import Header from '../components/Header';
import CButtonNoLine from '../components/Button/CButtonNoLine';
import Link from 'next/link';
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
    <div className="bg-gray-50 p-4 flex flex-col space-y-8">
      <Header title='临时展示页面'>
        <CButton size="normal">添加</CButton>
      </Header>
      <a className="link" href="./course-evaluation">
        course-evaluation
      </a>
      <Link href="/Schedules/Schedules">
    Schedules
      </Link>
      <a className="link" href="./professor/professor-evaluation">
      professor-evaluation
      </a>
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
      <div className="p-5">
        <CProgress data={{id:1,item:'text',percent:'3'}}></CProgress>
      </div>
      <div>
        <CCircleRanking score={4.1}></CCircleRanking>
        <CCircleRanking score={3.1}></CCircleRanking>
        <CCircleRanking score={2.1}></CCircleRanking>
        <CCircleRanking score={1.1}></CCircleRanking>
        <div className="mb-10"></div>
        <CourseScoreCard data={{ score: 3.1 }}></CourseScoreCard>
      </div>
      <div>
        <CButtonNoLine></CButtonNoLine>
      </div>
      {/* <Calendar></Calendar> */}
    </div>
  );
};
export const getStaticProps = async (context) => {
  console.log(context,'context')
  return {
    props: {
      deals: []
    },
  };
}
export default Home;
