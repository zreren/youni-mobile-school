import React from 'react';
import CommonLayout from '@/components/Layout/CommonLayout';
import Header from '@/components/Header';
import CategoryButton from '@/components/Button/CategoryButton';
import Title from '@/components/Title/Title';
import Search from '@/components/Input/Search';
import CButtonNoLine from '@/components/Button/CButtonNoLine';
import CourseScoreCard from '@/components/CourseScoreCard';
export default function course() {
  return (
    <CommonLayout>
      <Header title="课程评价" />
      <Title title="按专业查询"></Title>
      <Search placeholder="搜索课程"></Search>
      <div className="space-y-4 mt-4">
        <div className="flex space-x-4">
          <CategoryButton color="red"></CategoryButton>
          <CategoryButton color="blue"></CategoryButton>
        </div>
        <div className="flex space-x-4">
          <CategoryButton color="yellow"></CategoryButton>
          <CategoryButton color="green"></CategoryButton>
        </div>
        <div className="flex space-x-4">
          <CategoryButton color="pink"></CategoryButton>
          <CategoryButton color="purple"></CategoryButton>
        </div>
      </div>
      <Title title="热门课程">
        <CButtonNoLine></CButtonNoLine>
      </Title>
      <div className='space-y-2'>
        <CourseScoreCard data={{ score: 3.5 }}></CourseScoreCard>
        <CourseScoreCard data={{ score: 0.8 }}></CourseScoreCard>
        <CourseScoreCard data={{ score: 0.8 }}></CourseScoreCard>
        <CourseScoreCard data={{ score: 0.8 }}></CourseScoreCard>
      </div>
    </CommonLayout>
  );
}
