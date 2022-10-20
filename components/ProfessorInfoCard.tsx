import React from 'react';
import { professorList } from '@/mock/data';
import EvaluationTags from './Tags/EvaluationTags';
import CScoreCard from './Rating/CScoreCard';
import Title from './Title/Title';
export default function ProfessorInfoCard() {
  return (
    <div className="bg-white w-full h-80 space-y-3  p-4 flex-wrap rounded-xl">
      <div className="flex items-center">
        <div className="avatar placeholder">
          <div className="bg-neutral-focus text-neutral-content rounded-full w-14">
            <img src="https://placeimg.com/192/192/people" />
          </div>
        </div>
        <div className="text-lg ml-4 font-medium max-w-8 text-blueTitle">
          Leonard<br></br>EliKarakowsky
        </div>
      </div>
      <div className="flex  flex-wrap w-3/4">
        {professorList[0].evaluation.map((item) => {
          return <EvaluationTags key={item.id} content={item.content} />;
        })}
      </div>
      <div className="flex space-x-4 justify-between">
        <CScoreCard type={1} color="blue"></CScoreCard>
        <CScoreCard type={1} color="purple"></CScoreCard>
      </div>
      <div className="flex justify-between">
        <CScoreCard type={2}></CScoreCard>
        <CScoreCard type={2}></CScoreCard>
        <CScoreCard type={2}></CScoreCard>
      </div>
    </div>
  );
}
