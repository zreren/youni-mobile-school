import useLanguage from '@/hooks/useLanguage';
import { useRouter } from 'next/router';
import React from 'react';
import useLocalStorage from '../hooks/useStore';
import CCircleRanking from './Rating/CCircleRanking';
interface ICourseScoreCard {
  data: {
    score: number;
    ename?: string;
    cname?: string;
    code?: string;
    desc?: string;
    evaluation?:any;
    extraInfo?:any;
    id:number;
    [key:string]:any
  };
}
export default function CourseScoreCard(props: ICourseScoreCard) {
  const { score,id } = props.data;
  const [school,setSchool ] = useLocalStorage('school','')
  // console.log(props,'CourseScoreCardprops')
  const router = useRouter()
  const slug = router.query;
  console.log(slug,"slug")
  return (
    <div onClick={()=>{
      console.log(router.basePath)
      setTimeout(()=>{
        router.push({pathname:'/[campus]/Course/[id]',query:{id:id,campus:school}})
      },1000)
    }} className="flex p-6 items-align bg-white justify-between rounded-xl">
      <div className="h-1/1 flex flex-col content-between  ">
        <div className="text-xl ">{props.data.subject[useLanguage('name')].toUpperCase()} {props.data.code}</div>
        <div className="text-gray-400 text-sm flex-grow">
          {/* Introduction to Microeconomics */}
          {props.data[useLanguage('name')]}
        </div>
        <div className="flex text-gray-300 w-full justify-between space-x-1">
          <div className="space-x-1 text-xs">
            <span>评价数</span>
            <span>{props.data.extraInfo?.evaluationCount?props.data.extraInfo?.evaluationCount:0}</span>
          </div>
          <div className="space-x-1 text-xs">
            <span>内容</span>
            <span>{props.data.extraInfo?.contentRating?props.data.extraInfo?.contentRating:0}</span>
          </div>
          <div className="space-x-1 text-xs">
            <span>作业</span>
            <span>{props.data.extraInfo?.homeworkRating?props.data.extraInfo?.homeworkRating:0}</span>
          </div>
          <div className="space-x-1 text-xs">
            <span>考试</span>
            <span>{props.data.extraInfo?.examRating?props.data.extraInfo?.examRating:0}</span>
          </div>
        </div>
      </div>
      <div className='h-full'>
      <CCircleRanking score={props.data.extraInfo?.overallRatting}></CCircleRanking>
      </div>
    </div>
  );
}
