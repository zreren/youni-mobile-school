import React, { useEffect, useMemo, useState } from 'react';
import CommonLayout from '@/components/Layout/CommonLayout';
import Header from '@/components/Header';
import ProfessorInfoCard from '@/components/ProfessorInfoCard';
import Title from '@/components/Title/Title';
import CProgress from '@/components/Progress/CProgress';
import CButton from '@/components/Button/CButton';
import CButton2 from '@/components/Button/CButton2';
import { professorList } from '@/mock/data';
import UserComment from './user-comment';
import { useRouter } from 'next/router';
import useFetch from '@/hooks/useFetch';
import { Loading } from 'react-vant';
export default function ProfessorDetail() {
  const [currentSelectId, setCurrentSelectId] = useState<null|number>(0);
  // const [CourseID, setCourseID] = useState<null|number>(null);
  const router = useRouter();
  const Id = router.query.id;
  const { data, error } = useFetch(`/professor/detail?id=${Id}`, 'get');
  const { data: professorDataList, error: professorError } = useFetch(
    `/professor/course?id=${Id}`,
    'get',
  );
  const {data:professorCommentList,error:professorCommentError} = useFetch(`/professor/evaluation?id=${Id}${currentSelectId !== 0?`&courseId=${currentSelectId}`:''}`,'get')
  const professorListCopy = useMemo(() => {
    if (!professorDataList?.data) return [{ id: 0, ename: '查看全部' }];
    const newval = professorDataList?.data.slice()
    return [{ id: 0, ename: '查看全部' }, ...newval];
  }, [professorDataList]);
  useEffect(()=>{
    console.log(professorListCopy,"professorListCopy")
  },[professorListCopy])
  // professorListCopy?.unshift({
  //   id: 0,
  //   ename: '查看全部',
  // });
  interface ScoreDistribution {
    [key: string]: number;
  }
  const total = useMemo(() => {
    const totalData: ScoreDistribution = data?.data
      ?.scoreDistribution as ScoreDistribution;
    if (!totalData) return 0;
    return Object.values(totalData).reduce(
      (acc: number, value: number) => acc + value,
      0,
    );
  }, [data?.data?.scoreDistribution]);
  const scoreDistribution = [
    {
      item: '非常糟糕',
      value: data?.data.scoreDistribution[1],
      percent: data?.data.scoreDistribution[1] / total,
    },
    {
      item: '勉勉强强',
      value: data?.data.scoreDistribution[2],
      percent: data?.data.scoreDistribution[2] / total,
    },
    {
      item: '感觉还行',
      value: data?.data.scoreDistribution[3],
      percent: data?.data.scoreDistribution[3] / total,
    },
    {
      item: '感觉不错',
      value: data?.data.scoreDistribution[4],
      percent: data?.data.scoreDistribution[4] / total,
    },
    {
      item: '强烈推荐',
      value: data?.data.scoreDistribution[5],
      percent: data?.data.scoreDistribution[5] / total,
    },
  ];
  return (
    <CommonLayout className="min-h-screen pb-14">
      <Header title="教授评价"></Header>
      <ProfessorInfoCard data={data?.data}></ProfessorInfoCard>
      <Title title="分值分布"></Title>
      <div className="bg-white w-full h-auto space-y-3  p-4 flex-wrap rounded-xl">
        {scoreDistribution.map((item, index) => {
          return <CProgress key={index} data={item}></CProgress>;
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
                {item.ename}
              </CButton2>
            </div>
          );
        })}
      </div>
      <div className="mb-4"></div>
      {professorCommentList?.data?professorCommentList?.data.map((item,index) => {
        return (
          <UserComment  data={item} key={index}></UserComment>
        )
      }): <Loading type="spinner" color="#FED64B" />}
      {/* <UserComment></UserComment> */}
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
