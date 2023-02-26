import React ,{useMemo,useEffect}from 'react';
import Header from '@/components/Header';
import ProfessorCard from '@/components/ProfessorListItem';
// import { professorList } from '@/mock/data';
import Title from '@/components/Title/Title';
import CommonLayout from '@/components/Layout/CommonLayout';
import Search from '@/components/Input/Search';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import useFetch from '../../../hooks/useFetch';
import { Flex, Loading } from 'react-vant';
// import CourseScoreCard from '../components/CourseScoreCard'
export default function professorEvaluation() {
  const router = useRouter();
  const { data: _professorList, error } = useFetch(
    `/professor/list`,
    'page',
    {
      campusId: 1,
      pageSize: 20,
    }
  );
  const professorList = useMemo(() => _professorList? professorList?[...professorList].concat(..._professorList):[].concat(..._professorList) : [] , [_professorList])
  useEffect(() => {
    console.log(professorList,"professorList")
  }, [professorList])
  
  // const { data, error } = useSWR(API_KEY.USER.get.list,fetcher);
  return (
    <CommonLayout isBottom={true}>
      <Header title="教授列表"></Header>
      <Search placeholder="搜索教授"></Search>
      <Title title="教授列表"></Title>
      <div className="space-y-4">
        <>
          {professorList ? (
            professorList?.map((item) => {
              return (
                <ProfessorCard
                  data={item}
                  key={item.id}
                  onClick={() => {
                    const { campus } = router.query;
                    router.push({
                      pathname: `/[campus]/professor/detail/${item.id}`,
                      query: { campus: campus },
                    });
                  }}
                ></ProfessorCard>
              );
            })
          ) : (
            <div className='w-full flex justify-center items-center'><Loading type="spinner" color="#FED64B" /></div>
          )}
        </>
      </div>
    </CommonLayout>
  );
}
