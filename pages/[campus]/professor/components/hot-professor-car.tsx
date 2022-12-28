import React from 'react';
import Icon from '@/components/Icon';
import CScanRating from '@/components/Rating/CScanRating';
import { useRouter } from 'next/router';
const ProfessorItem = (props) => {
    const {id, score, name } = props;
    return (
      <div className="flex items-center space-x-3 ml-4">
        <Icon type={`top${id}`}></Icon>
        <div className="avatar placeholder">
          <div className="bg-neutral-focus text-neutral-content rounded-full w-6">
            <img src="https://placeimg.com/192/192/people" />
          </div>
        </div>
        <div className="text-sm font-normal text-gray-500">{name}</div>
        <CScanRating score={score}></CScanRating>
      </div>
    );
  };
export default function HotProfessorCar(props) {
  const router = useRouter()
  const { professorList } = props;
  return (
    <div onClick={()=>{
      router.push('/professor/detail/1')
    }} className="bg-white  w-full pt-4 pb-4 h-auto rounded-lg space-y-4">
      {professorList?.map((professor) => {
        return (
          <ProfessorItem
            name={professor.name}
            score={professor.score}
            id={professor.id}
          ></ProfessorItem>
        );
      })}
    </div>
  );
}
