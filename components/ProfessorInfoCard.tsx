import React from 'react';
import { professorList } from '@/mock/data';
import EvaluationTags from './Tags/EvaluationTags';
import CScoreCard from './Rating/CScoreCard';
import Title from './Title/Title';
export default function ProfessorInfoCard(props) {
  const {data} = props;
  return (
    <div className="bg-white w-full  space-y-3  p-4 flex-wrap rounded-xl">
      <div className="flex items-center">
        <div className="avatar placeholder">
          <div className="bg-neutral-focus text-neutral-content rounded-full w-14">
            <img className='rounded-full' style={{objectFit:"cover",width:"100%",height:"100%"}} src={`${Cons.BASEURL}${data?.avatar}`}  />
          </div>
        </div>
        <div className="text-lg ml-4 font-medium max-w-8 text-blueTitle">
          {data?.name}
        </div>
      </div>
      <div className="flex  flex-wrap w-3/4">
        {data?.tags.map((item) => {
          return <EvaluationTags key={item.id} content={item.name} />;
        })}
      </div>
      <div className="flex space-x-4 justify-between">
        <CScoreCard score={data?.rating?.professorRating} title="教授综合评分" type={1} color="blue"></CScoreCard>
        <CScoreCard score={data?.rating?.overallRatting}  title="课程综合评分" type={1} color="purple"></CScoreCard>
      </div>
      <div className="flex justify-between">
        <CScoreCard title="内容评分" score={data?.rating?.contentRating} type={2}></CScoreCard>
        <CScoreCard title="作业评分" score={data?.rating?.homeworkRating} type={2}></CScoreCard>
        <CScoreCard title="考试评分" score={data?.rating?.examRating} type={2}></CScoreCard>
      </div>
    </div>
  );
}
