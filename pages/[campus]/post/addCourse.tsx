import React, { useEffect, useState } from 'react'
import Expiration from '@/components/courseRecommond/expiration';
import CourseConfig from '@/components/courseRecommond/courseConfig';
import DraftIcon from './draft.svg';

export default function addCourse(props) {
  const [term,setTerm] = useState([]);
  const [year,setYear] = useState();
  const [termValue,setTermValue] = useState();

  const [courseList, setCourseList] = useState({
    0: {
      id: null,
      label: null,
      type: null,
      professorMust: [],
      professorOption: [],
      note: null,
    },
    1: {
      id: null,
      label: null,
      type: null,
      professorMust: [],
      professorOption: [],
      note: null,
    },
    2: {
      id: null,
      label: null,
      type: null,
      professorMust: [],
      professorOption: [],
      note: null,
    },
    3: {
      id: null,
      label: null,
      type: null,
      professorMust: [],
      professorOption: [],
      note: null,
    },
    4: {
      id: null,
      label: null,
      type: null,
      professorMust: [],
      professorOption: [],
      note: null,
    },
    5: {
      id: null,
      label: null,
      type: null,
      professorMust: [],
      professorOption: [],
      note: null,
    },
    6: {
      id: null,
      label: null,
      professorMust: [],
      professorOption: [],
      note: null,
    },
    7: {
      id: null,
      label: null,
      type: null,
      professorMust: [],
      professorOption: [],
      note: null,
    },
    8: {
      id: null,
      label: null,
      type: null,
      professorMust: [],
      professorOption: [],
      note: null,
    },
    9: {
      id: null,
      label: null,
      type: null,
      professorMust: [],
      professorOption: [],
      note: null,
    },
  });

  const Course = React.useCallback(
    () => {
     return (
      <CourseConfig setTermValue={setTermValue} termValue={termValue} courseList={courseList} setCourseList={setCourseList} year={year} term={term}></CourseConfig>
     )
    },
    [courseList],
  )

  useEffect(()=>{
    console.log(year,'year')
  },[year])
  const filteredData = React.useMemo(
    () =>
      Object.values(
        Object.fromEntries(
          Object.entries(courseList)
            .filter(([_, value]) => value.id !== null)
            .map(([key, value]) => [key, value]),
        ),
      ),
    [courseList],
  );

  const submitPost = async (form, draft) => {};
  const Footer = () => {
    return (
      <div className="w-full shadow-footer bg-white h-[60px] space-x-4 flex justify-between fixed bottom-12 px-5 py-2">
        <div
          className="flex flex-col items-center  w-[40px]"
          onClick={() => {
            console.log(filteredData,term,termValue,year,'courseList')
          }}
        >
          <DraftIcon></DraftIcon>
          <div className="text-[10px] text-[#798195] whitespace-nowrap">
            存草稿
          </div>
        </div>
        <div
          onClick={() => {
            props.submit({
              form:{
                courseData : filteredData,
                termList : term,
                year:year,
                isLongTerm: year ? false : true,
                term: termValue,
                courseIds: filteredData.map((item)=>item.id)
              },
              
            })
            // console.log(filteredData,term,termValue,year,'courseList')
          }}
          className="bg-[#FFD036] cursor-pointer  text-white rounded-full w-full h-10 flex justify-center items-center"
        >
          发布
        </div>
      </div>
    );
  };
  return (
    <div className=' pt-3'>
        <Expiration setTermList={(e)=>{
          if(term.some((i)=>i===e)){
            setTerm([...term.filter((item)=>item.id !== e.id)])
            return
          }
          console.log('Expiration setTermList',e,term)
          setTerm((pre)=>[...pre,e])}} year={year} term={term} selectTerm={(e)=>{setTerm(e)}} select={(e)=>{setYear(e)}}></Expiration>
        <div className='bg-[#F6F6F6] w-full h-3'></div>
        <Course></Course>
        <Footer></Footer>
    </div>
  )
}
