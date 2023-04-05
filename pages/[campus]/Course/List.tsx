import React, { useEffect, useState, useMemo } from 'react';
import CommonLayout from '@/components/Layout/CommonLayout';
import Header from '@/components/Header';
import CategoryButton from '@/components/Button/CategoryButton';
import Title from '@/components/Title/Title';
import Search from '@/components/Input/Search';
import CButtonNoLine from '@/components/Button/CButtonNoLine';
import CourseScoreCard from '@/components/CourseScoreCard';
import { useRouter } from 'next/router';
import useFetch from '@/hooks/useFetch';
import useRequest from '@/libs/request';
import { InfiniteScroll, List } from 'antd-mobile';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';


export default function course() {
  const router = useRouter();
  const subjectId = useMemo(
    () => router.query.subjectId,
    [router.query.subjectId],
  );
  const {t} = useTranslation();
  console.log(subjectId, 'subjectId');
  const [hotCourseData, setHotCourseData] = useState(null);
  // const { data, error } = useFetch(
  //   `${Cons.API.SUBJECT.QUERY}?campusId=1`,
  //   'get',
  // );
  const {
    data: _courseData,
    error: courseError,
    mutate,
    setSize,
    isLoading,
    size,
  } = useFetch(`/subject/courses`, 'page', {
    id: subjectId,
    pageSize: 20,
  });
  const isEmpty = useMemo(() => _courseData?.[0]?.length === 0, [_courseData]);
  const isReachingEnd = useMemo(() => isEmpty || (_courseData && _courseData[_courseData.length - 1]?.length < 10), [_courseData,isEmpty])
  useEffect(() => {
    mutate();
  }, [subjectId]);

  const courseData = useMemo(
    () => (_courseData ? courseData? [...courseData].concat(..._courseData) : [].concat(..._courseData) : null),
    [_courseData,size,isLoading,subjectId],
  );
  useEffect(() => {
    console.log(courseData, 'courseData');
  }, [courseData]);
  const [isLoadingMoreState, setIsLoadingMore] = useState(false);

  return (
    <CommonLayout isBottom={true}>
   <Header title={t('课程评价')} />
<Title title={t('按学科查询')}></Title>
<Search placeholder={t('搜索课程')}></Search>
      <div className="space-y-3 mt-4">
        {courseData?.map((item, index) => {
          return <CourseScoreCard data={item}></CourseScoreCard>;
        })}
      </div>
      <InfiniteScroll
        threshold={50}
        loadMore={async () => {
          if (isLoadingMoreState) {
            return;
          }
          setIsLoadingMore(true);
          await setSize(size + 1);
          setIsLoadingMore(false);
        }}
        hasMore={!isReachingEnd}
      />
    </CommonLayout>
  );
}


export async function getServerSideProps({
  locale,
  }){

  return {
      props: {
          ...(await serverSideTranslations(locale, ['common',]))
      },
    }
  }