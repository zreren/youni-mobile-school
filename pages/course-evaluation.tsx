import React from 'react';
import Header from '../components/Header';
import ProfessorCard from '@/components/ProfessorListItem';
import CommonLayout from '@/components/Layout/CommonLayout';
import HeaderMenu from '@/components/Menu/Header-menu';
import Search from '@/components/Input/Search';
import Title from '@/components/Title/Title';
import { professorList } from '@/mock/data';
import HotProfessorCar from './professor/components/hot-professor-car';
import { useRouter } from 'next/router';
export default function courseEvaluation() {
  const professorRankList= [
    {
      id: 1,
      name: 'Leonard Eli Karakowsky',
      score:4.5
    },
    {
      id: 2,
      name: 'Test Professor 1',
      score: 3.2
    },
    {
      id: 3,
      name: 'Test Professor 1',
      score: 1.7
    }
  ]
  const router = useRouter()
  return (
    <div className='bg-bg w-full h-screen'>
      <Header title="课程评价"></Header>
      <HeaderMenu></HeaderMenu>
      {/* <div className='mt-6'></div> */}
      <CommonLayout>
      <Search></Search>
      <Title title="热门教授"></Title>
      <HotProfessorCar professorList={professorRankList}></HotProfessorCar>
      <Title title="教授列表"></Title>
      <div className="space-y-4">
        {professorList.map((item) => {
          return (
            <ProfessorCard
              data={item}
              key={item.id}
              onClick={() => {
                router.push(`/professor/detail/${item.id}`)
              }}
            ></ProfessorCard>
          );
        })}
      </div>
      </CommonLayout>
      
    </div>
  );
}
