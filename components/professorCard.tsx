import React from 'react';
import CRating from './Rating/CRating';
interface TProfessorCard {
    data:{
        avatar: string;
    name: string;
    score: number;
    }
}
export default function ProfessorCard(props: TProfessorCard) {
  const  {data}  = props;
  return (
    <div className="w-4/4 flex justify-between shadow rounded items-center m-4 overflow-hidden	">
      <div className="flex items-center space-x-3 ml-4">
        <div className="avatar placeholder">
          {/* <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
            <span>MX</span>
          </div> */}
          <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
            <img src="https://placeimg.com/192/192/people" />
          </div>
        </div>
        <div className="text-xl font-light text-gray-500">{data.name}</div>
      </div>
      <CRating score={data.score}></CRating>
    </div>
  );
}
