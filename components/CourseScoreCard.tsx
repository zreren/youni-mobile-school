import { useRouter } from 'next/router';
import React from 'react';
import CCircleRanking from './Rating/CCircleRanking';
interface ICourseScoreCard {
  data: {
    score: number;
    ename?: string;
    cname?: string;
    code?: string;
    desc?: string;
    evaluation?:any;
  };
}
export default function CourseScoreCard(props: ICourseScoreCard) {
  const { score } = props.data;
  const router = useRouter()
  return (
    <div onClick={()=>{
      router.push('/course-evaluation')
    }} className="flex p-6 items-align bg-white justify-between rounded-xl">
      <div className="h-1/1 flex flex-col content-between  ">
        <div className="text-xl ">{props.data.ename} {props.data.code}</div>
        <div className="text-gray-400 text-sm flex-grow">
          {/* Introduction to Microeconomics */}
          {props.data.desc}
        </div>
        <div className="flex text-gray-300 w-full justify-between">
          <div className="space-x-1 text-xs">
            <span>评价数</span>
            <span>{props.data.evaluation.count}</span>
          </div>
          <div className="space-x-1 text-xs">
            <span>内容</span>
            <span>{3.8}</span>
          </div>
          <div className="space-x-1 text-xs">
            <span>作业</span>
            <span>{4.2}</span>
          </div>
          <div className="space-x-1 text-xs">
            <span>考试</span>
            <span>{2.7}</span>
          </div>
        </div>
      </div>
      <div className='h-full'>
      <CCircleRanking score={props.data.evaluation.contentRating}></CCircleRanking>
      </div>
    </div>
  );
}
