import React from 'react';
import Icon from '@/components/Icon';
import CScanRating from '@/components/Rating/CScanRating';
import { useRouter } from 'next/router';
import useLanguage from '@/hooks/useLanguage';
import EmptyProfessorIcon from './emptyProfessor.svg';

export default function HotProfessorCar(props) {
  const router = useRouter();
  const { professorList } = props;
  const ProfessorItem = (props) => {
    const { id, score, name, index, data } = props;
    return (
      <div
        onClick={() => {
          router.push({
            pathname: `/[campus]/professor/detail/${data.id}`,
            query: { campus: router.query.campus },
          });
        }}
        className="flex items-center space-x-3 ml-4"
      >
        <Icon type={`top${index + 1}`}></Icon>
        <div className="avatar placeholder">
          <div className="bg-neutral-focus text-neutral-content rounded-full w-6">
            <img src={`${Cons.BASEURL}${data?.avatar}`} />
          </div>
        </div>
        <div className="text-sm font-normal text-gray-500">{name}</div>
        <CScanRating score={score}></CScanRating>
      </div>
    );
  };
  const EmptyProfessor = () => {
    return (
      <div className="flex w-full bg-white flex-col justify-center items-center py-8 h-[100vh-200px] rounded-lg">
        <EmptyProfessorIcon></EmptyProfessorIcon>
        <div className="flex text-xs mt-6 justify-center items-center text-[#A9B0C0]">
          {useLanguage('') === 'e' ? '目前还没有教授' : '目前还没有教授'}
        </div>
      </div>
    );
  };
  return (
    <div className="bg-white  w-full pt-4 pb-4 h-auto rounded-lg space-y-4">
      {professorList?.length > 0 ? (
        professorList
          ?.sort((a, b) => b?.rating - a?.rating)
          .slice(0, 3)
          .map((professor, index) => {
            return (
              <ProfessorItem
                index={index}
                name={professor.name}
                score={professor.rating}
                data={professor}
                id={professor.id}
              ></ProfessorItem>
            );
          })
      ) : (
        <EmptyProfessor></EmptyProfessor>
      )}
    </div>
  );
}
