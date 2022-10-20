import React from 'react';
import Header from '../../components/Header';
import ProfessorCard from '../../components/ProfessorListItem';
import { professorList } from '../../mock/data';
import Title from '../../components/Title/Title';
import CommonLayout from '../../components/Layout/CommonLayout';
import Search from '../../components/Input/Search';
import { useRouter } from 'next/router';
// import CourseScoreCard from '../components/CourseScoreCard'
export default function professorEvaluation() {
  const router = useRouter();
  return (
    <CommonLayout>
      <Header title="教授列表"></Header>
      <Search placeholder="搜索教授"></Search>
      <Title title="教授列表"></Title>
      <div className="space-y-4">
        {professorList.map((item) => {
          return (
            <ProfessorCard
              data={item}
              key={item.id}
              onClick={() => {
                router.push(`./detail/${item.id}`)
              }}
            ></ProfessorCard>
          );
        })}
      </div>
    </CommonLayout>
  );
}
