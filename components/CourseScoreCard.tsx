import React from 'react';
import CCircleRanking from './Rating/CCircleRanking';
interface ICourseScoreCard {
  data: {
    score: number;
  };
}
export default function CourseScoreCard(props: ICourseScoreCard) {
  const { score } = props.data;
  return (
    <div className="flex p-6 items-align bg-white justify-between">
      <div className="h-1/1 flex flex-col content-between  ">
        <div className="text-xl ">ECON 1000</div>
        <div className="text-gray-400 text-sm flex-grow">
          Introduction to Microeconomics
        </div>
        <div className="flex text-gray-300 w-full justify-between">
          <div className="space-x-1 text-xs">
            <span>评价数</span>
            <span>{14}</span>
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
      <CCircleRanking score={score}></CCircleRanking>
    </div>
  );
}
