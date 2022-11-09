import React, { useEffect, useState } from 'react';
import CommonLayout from '@/components/Layout/CommonLayout';
import Header from '@/components/Header';
import ProfessorInfoCard from '@/components/ProfessorInfoCard';
import Title from '@/components/Title/Title';
import CProgress from '@/components/Progress/CProgress';
import CButton from '@/components/Button/CButton';
import CButton2 from '@/components/Button/CButton2';
import { professorList } from '@/mock/data';
import UserComment from './user-comment';
export default function ProfessorDetail() {
  const [currentSelectId, setCurrentSelectId] = useState(0);
  const professorListCopy = professorList[0].course.slice();
  professorListCopy.unshift({
    id: 0,
    name: '查看全部',
  });

  return (
    <CommonLayout className="min-h-screen pb-14">
      <Header title="教授评价"></Header>
      <ProfessorInfoCard></ProfessorInfoCard>
      <Title title="分值分布"></Title>
      <div className="bg-white w-full h-auto space-y-3  p-4 flex-wrap rounded-xl">
        {professorList[0].scoreList.map((item) => {
          return <CProgress key={item.id} data={item}></CProgress>;
        })}
      </div>
      <Title title="教授评价"></Title>
      <div className="flex flex-wrap">
        {professorListCopy?.map((item) => {
          return (
            <div
              onClick={() => {
                setCurrentSelectId(item.id);
              }}
            >
              <CButton2
                isSelect={currentSelectId === item.id}
                key={item.id}
                className={{
                  'text-yellow-500': currentSelectId == item.id,
                  'text-blueTitle': currentSelectId !== item.id,
                }}
              >
                {item.name}
              </CButton2>
            </div>
          );
        })}
      </div>
      <div className="mb-4"></div>
      <UserComment></UserComment>
      <UserComment></UserComment>
    </CommonLayout>
  );
}

export async function getServerSideProps({ params }) {
  const post = {
    title: 'FatCoupon Refer-A-Friend: Give $15; Get $10',
    details: 'jjj',
  };
  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  };
}
