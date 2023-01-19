import React, { useEffect } from 'react';
import CommonLayout from '@/components/Layout/CommonLayout';
import Header from '@/components/Header';
import CButton from '@/components/Button/CButton';
import CourseInfo from '@/components/PageComponents/Course/addEvaluation/courseInfo';
import CourseData from '@/components/PageComponents/Course/addEvaluation/courseData';
import CourseIcon from '@/components/PageComponents/Course/addEvaluation/course.svg';
import NessIcon from '@/components/PageComponents/Course/addEvaluation/ness.svg';
const TextEvaluation = () => {
  return (
    <div className="bg-white pb-5 mt-4 pb-10">
      <label className="input-group bg-white w-full flex justify-between h-12 pl-4 ">
        <div className="flex items-center ">
          <CourseIcon className="mr-2"></CourseIcon>
          <div className="bg-white font-medium text-blueTitle text-base">
            文字评价
          </div>
        </div>
      </label>
      <div className="divider m-0 pl-4 pr-4 opacity-30 h-1"></div>
      <textarea
        placeholder="教授讲课风格你喜欢吗？感觉考试难吗？和上课的内容关联性强吗？你是否推荐这个教授？"
        className="p-2 whitespace-normal leading-none hover:outline-none  w-full h-20 "
      />
    </div>
  );
};
const myScoreList = [
  {
    label: `91-100`,
    value: 'A+',
  },
  {
    label: '91-100',
    value: 1,
  },
  {
    label: '91-100A+',
    value: 1,
  },
  {
    label: '91-100A+',
    value: 1,
  },
  {
    label: '91-100A+',
    value: 1,
  },
  {
    label: '91-100A+',
    value: 1,
  },
  {
    label: '91-100A+',
    value: 1,
  },
  {
    label: '91-100A+',
    value: 1,
  },
  {
    label: '91-100A+',
    value: 1,
  },
  {
    label: '91-100A+',
    value: 1,
  },
];
const ResultAndTagEvaluation = () => {
  return (
    <div className="bg-white  mt-4 ">
      <label className="input-group bg-white w-full flex justify-between h-12 pl-4 ">
        <div className="flex items-center ">
          <CourseIcon className="mr-2"></CourseIcon>
          <div className="bg-white font-medium text-blueTitle text-base">
            Results & Tag
          </div>
        </div>
      </label>
      <div className="divider m-0 pl-4 pr-4 opacity-30 h-1"></div>
      <label className="input-group">
        <span className="bg-white font-medium text-blueTitle text-sm pt-2">
          <NessIcon className="mr-1"></NessIcon> 我的最终成绩
        </span>
      </label>
      <div className="grid grid-cols-4 gap-2 p-2">
        {myScoreList.map((item) => {
          return (
            <div className="w-full bg-gray-100 h-14 pt-3	 text-xs font-normal text-center align-middle	">
              <div> {item.label}</div>
              <div>{item.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
const tagList = [
  {
    label: '课程讲的不错',
    value: 1,
  },
  {
    label: '课程讲的不错',
    value: 2,
  },
];
const ProfessorTag = () => {
  return (
    <div className="bg-white ">
      <label className="input-group">
        <span className="bg-white font-medium text-blueTitle text-sm pt-2">
          教授标签
        </span>
      </label>
      <div className='w-full flex flex-wrap p-4'>{tagList.map((item) => {
        return (
          <div className='bg-gray-100 text-xs p-2 mr-2'>
            {item.label}
          </div>
        )
      })}</div>
    </div>
  );
};
export default function evaluation() {

  return (
    <CommonLayout className="p-0 pb-14">
      <Header title="添加新评价">
        <CButton size="normal">提交</CButton>
      </Header>
      
      <CourseInfo></CourseInfo>
      <CourseData></CourseData>
      <TextEvaluation></TextEvaluation>
      <ResultAndTagEvaluation></ResultAndTagEvaluation>
      <ProfessorTag></ProfessorTag>
      <div className="p-4">
      <button className='btn text-white btn-primary 
      rounded-full
      w-full btn-sm h-10'>提交</button>
      </div>
      {/* <a href="/test">
     <div className="alert alert-info shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current flex-shrink-0 w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <div>该页面正在开发中...</div>
          <div>点击返回测试页面</div>
        </div>
      </div>
     </a> */}
    </CommonLayout>
  );
}
