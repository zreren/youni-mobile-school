import React from 'react';
import Header from '../../components/Header';
import ProfessorCard from '../../components/ProfessorListItem';
import { professorList } from '../../mock/data';
import Title from '../../components/Title/Title';
import CommonLayout from '../../components/Layout/CommonLayout';
import Search from '../../components/Input/Search';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { API_KEY } from '../api/api';
// import CourseScoreCard from '../components/CourseScoreCard'
export default function professorEvaluation() {
  const router = useRouter();
  // const { data, error } = useSWR(API_KEY.USER.get.list,fetcher);
  return (
    <CommonLayout isBottom={true}>
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
                router.push(`/professor/detail/${item.id}`);
              }}
            ></ProfessorCard>
          );
        })}
      </div>
    </CommonLayout>
  );
}
