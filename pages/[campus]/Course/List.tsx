import React, { useEffect, useState } from 'react';
import CommonLayout from '@/components/Layout/CommonLayout';
import Header from '@/components/Header';
import CategoryButton from '@/components/Button/CategoryButton';
import Title from '@/components/Title/Title';
import Search from '@/components/Input/Search';
import CButtonNoLine from '@/components/Button/CButtonNoLine';
import CourseScoreCard from '@/components/CourseScoreCard';
import { useRouter } from 'next/router';
import useFetch from '@/hooks/useFetch';
import useRequest from '@/libs/request';

export default function course() {
  const router = useRouter()
  const subjectId = router.query.subjectId
  console.log(subjectId,"subjectId")
  const [hotCourseData,setHotCourseData] =  useState(null)
  const { data, error } = useFetch(`${Cons.API.SUBJECT.QUERY}?campusId=1`,"get");
  useEffect(()=>{
   useRequest().post(`/api/subject/course`,{id:subjectId})
  },[router.query.subjectId])  

  console.log(data,"data")
  const randomColor = ['red', 'blue', 'yellow', 'green', 'pink', 'purple']
  return (
    <CommonLayout isBottom={true}>
      <Header title="课程评价" />
      <Title title="按专业查询"></Title>
      <Search placeholder="搜索课程"></Search>
      <div className='space-y-2 mt-4'>
        {hotCourseData?hotCourseData.data.map((item,index) => {
          return (
            <CourseScoreCard data={item}></CourseScoreCard>
          )
        }):null}

        {/* <CourseScoreCard data={{ score: 0.8 }}></CourseScoreCard>
        <CourseScoreCard data={{ score: 0.8 }}></CourseScoreCard>
        <CourseScoreCard data={{ score: 0.8 }}></CourseScoreCard> */}
      </div>
    </CommonLayout>
  );
}
