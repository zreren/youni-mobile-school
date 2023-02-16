import React, { useEffect, useMemo } from 'react';
import CommonLayout from '@/components/Layout/CommonLayout';
import Header from '@/components/Header';
import CategoryButton from '@/components/Button/CategoryButton';
import Title from '@/components/Title/Title';
import Search from '@/components/Input/Search';
import CButtonNoLine from '@/components/Button/CButtonNoLine';
import CourseScoreCard from '@/components/CourseScoreCard';
import { useRouter } from 'next/router';
import useFetch from '@/hooks/useFetch';
import { Flex, Loading } from 'react-vant';

export default function course(): JSX.Element {
  const router = useRouter();
  const { data: campusData, mutate: campusDataMutate } = useFetch(
    '/campus/query',
    'get',
    {
      name: router.query.campus,
    },
  );
  useEffect(() => {
    campusDataMutate();
  }, [router.query.campus]);
  const campusId = useMemo(() => {
    return campusData?.data[0]?.id;
  }, [campusData?.data[0]?.id]);
  const { data, error, mutate } = useFetch(`/subject/query`, 'get', {
    campusId: campusId,
    pageSize: 6,
  });
  useEffect(() => {
    mutate();
    hotMutate();
  }, [campusId]);
  const {
    data: hotCourseData,
    error: hotCourseDataError,
    mutate: hotMutate,
  } = useFetch(`${Cons.API.COURSE.HOT}`, 'get', {
    campusId: campusId,
  });

  console.log(data, 'data');
  const randomColor = ['red', 'blue', 'yellow', 'green', 'pink', 'purple'];
  return (
    <CommonLayout isBottom={true}>
      {data?.data ? (
        <>
          <Header title="课程评价" />
          <Title title="按学科查询"></Title>
          <Search placeholder="搜索课程"></Search>
          <div className="space-y-2 mt-4">
            <div className="grid grid-cols-2 gap-x-2 gap-y-1">
              {data ? (
                data?.data?.slice(0, 6)?.map((item, index) => {
                  return (
                    <CategoryButton
                      data={item}
                      key={item.id}
                      color={randomColor[index % 6]}
                    ></CategoryButton>
                  );
                })
              ) : (
                <>
                  <CategoryButton color="red"></CategoryButton>
                  <CategoryButton color="blue"></CategoryButton>
                  <CategoryButton color="yellow"></CategoryButton>
                  <CategoryButton color="green"></CategoryButton>
                  <CategoryButton color="pink"></CategoryButton>
                  <CategoryButton color="purple"></CategoryButton>
                </>
              )}
              {  data?.data?.length === 0?
                 <div className="text-gray-500">
                 该校区暂无学科喔~
               </div> :null
              }
            </div>
            <button
              onClick={() => {
                router.push({
                  pathname: '/[campus]/Course/AllSubject',
                  query: { campus: router.query.campus, campusId: campusId },
                });
              }}
              className="btn hover:bg-white border-none btn-sm w-full bg-white text-gray-400"
            >
              查看全部
            </button>
          </div>
          <Title title="热门课程">
            <CButtonNoLine
              onClick={() => {
                hotMutate();
              }}
            ></CButtonNoLine>
          </Title>
          <div className="space-y-3">
            {hotCourseData?.data?.length === 0 ? (
              <div className="artboard phone-1">
                {/* <label className="swap swap-flip text-9xl">
                  <input type="checkbox" />

                  <div className="swap-on">😈</div>
                  <div className="swap-off">😇</div>
                </label> */}
                <div className="text-gray-500">
                  该课程暂无数据喔~移步其他校区吧！
                </div>
              </div>
            ) : null}
            {hotCourseData
              ? hotCourseData?.data?.map((item, index) => {
                  return <CourseScoreCard data={item}></CourseScoreCard>;
                })
              : null}

            {/* <CourseScoreCard data={{ score: 0.8 }}></CourseScoreCard>
        <CourseScoreCard data={{ score: 0.8 }}></CourseScoreCard>
        <CourseScoreCard data={{ score: 0.8 }}></CourseScoreCard> */}
          </div>
        </>
      ) : (
        <div
          className="w-full flex justify-center items-center
      h-screen
      "
        >
          <Header title="课程评价" />
          <Loading type="spinner" color="#FED64B" />
        </div>
      )}
    </CommonLayout>
  );
}
