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
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  selectLoginModelState,
  seLoginModelState,
  selectOpen,
} from '@/stores/authSlice';
import { useDispatch } from 'react-redux';

export default function course(props): JSX.Element {
  console.log(props,'course props');
  const router = useRouter();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data: campusData, mutate: campusDataMutate } = useFetch(
    '/campus/query',
    'get',
    {
      name: router.query.campus,
    },
  );
  useEffect(() => {
    dispatch(seLoginModelState(true));
  }, []);
  useEffect(() => {
    campusDataMutate();
  }, [router.query.campus]);
  const campusId = useMemo(() => {
    return campusData?.data[0]?.id;
  }, [campusData?.data[0]?.id]);
  const { data, error, mutate, isLoading } = useFetch(`/subject/query`, 'get', {
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
    isLoading: isHotLoading,
    mutate: hotMutate,
  } = useFetch(`${Cons.API.COURSE.HOT}`, 'get', {
    campusId: campusId,
  });

  console.log(data, 'data');
  const randomColor = ['red', 'blue', 'yellow', 'green', 'pink', 'purple'];
  const helloRef = React.useRef(null);
  const goodbyeRef = React.useRef(null);
  const nodeRef = data?.data ? helloRef : goodbyeRef;
  return (
    <CommonLayout isBottom={true}>
      <SwitchTransition mode="in-out">
        <CSSTransition
          in={data?.data}
          classNames="fade"
          timeout={60}
          key={data}
          addEndListener={(done) => {
            nodeRef?.current?.addEventListener('transitionend', done, false);
          }}
        >
          <div ref={nodeRef}>
            {data?.data ? (
              <>
                <Header title={t('课程评价')} />
                <Title title={t('按学科查询')}></Title>
                <Search placeholder={t('搜索课程')}></Search>

                <div className="space-y-2 mt-4">
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                    {data.data || !isLoading ? (
                      data?.data?.items?.slice(0, 6)?.map((item, index) => {
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
                        <CategoryButton color="gray"></CategoryButton>
                        <CategoryButton color="gray"></CategoryButton>
                        <CategoryButton color="gray"></CategoryButton>
                        <CategoryButton color="gray"></CategoryButton>
                        <CategoryButton color="gray"></CategoryButton>
                        <CategoryButton color="gray"></CategoryButton>
                      </>
                    )}
                    {data?.data?.length === 0 ? (
                      <div className="text-gray-500">
                        {t('该校区暂无学科喔~')}
                      </div>
                    ) : null}
                  </div>
                  <button
                    onClick={() => {
                      router.push({
                        pathname: '/[campus]/Course/AllSubject',
                        query: {
                          campus: router.query.campus,
                          campusId: campusId,
                        },
                      });
                    }}
                    className="btn hover:bg-white border-none btn-sm w-full bg-white text-gray-400"
                  >
                    {t('查看全部')}
                  </button>
                </div>
                <Title title={t('热门课程')}>
                  <CButtonNoLine
                    onClick={() => {
                      hotMutate();
                    }}
                  ></CButtonNoLine>
                </Title>

                <div className="space-y-3">
                  {hotCourseData?.data?.length === 0 ? (
                    <div className="artboard phone-1">
                      <div className="text-gray-500">
                      {t('该课程暂无数据喔~移步其他校区吧！')}
                      </div>
                    </div>
                  ) : null}
                  {hotCourseData || !isHotLoading ? (
                    hotCourseData?.data?.map((item, index) => {
                      return <CourseScoreCard data={item}></CourseScoreCard>;
                    })
                  ) : (
                    <>
                      <CourseScoreCard></CourseScoreCard>
                      <CourseScoreCard></CourseScoreCard>
                      <CourseScoreCard></CourseScoreCard>
                      <CourseScoreCard></CourseScoreCard>
                    </>
                  )}

                  {/* <CourseScoreCard data={{ score: 0.8 }}></CourseScoreCard>
        <CourseScoreCard data={{ score: 0.8 }}></CourseScoreCard>
        <CourseScoreCard data={{ score: 0.8 }}></CourseScoreCard> */}
                </div>
              </>
            ) : (
              <>
               <Header title={t('课程评价')} />
                <Title title={t('按学科查询')}></Title>
                <Search placeholder={t('搜索课程')}></Search>
                <div className="space-y-2 mt-4">
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                    <>
                      <CategoryButton color="gray"></CategoryButton>
                      <CategoryButton color="gray"></CategoryButton>
                      <CategoryButton color="gray"></CategoryButton>
                      <CategoryButton color="gray"></CategoryButton>
                      <CategoryButton color="gray"></CategoryButton>
                      <CategoryButton color="gray"></CategoryButton>
                    </>
                  </div>
                  <button
                    onClick={() => {
                      router.push({
                        pathname: '/[campus]/Course/AllSubject',
                        query: {
                          campus: router.query.campus,
                          campusId: campusId,
                        },
                      });
                    }}
                    className="btn hover:bg-white border-none btn-sm w-full bg-white text-gray-400"
                  >
                    {t('查看全部')}
                  </button>
                </div>
                <Title title={t('热门课程')} >
                  <CButtonNoLine
                    onClick={() => {
                      hotMutate();
                    }}
                  ></CButtonNoLine>
                </Title>
                <div className="space-y-3">
                  <CourseScoreCard></CourseScoreCard>
                  <CourseScoreCard></CourseScoreCard>
                  <CourseScoreCard></CourseScoreCard>
                  <CourseScoreCard></CourseScoreCard>
                </div>
              </>
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </CommonLayout>
  );
}


export async function getServerSideProps({
  locale,
  }){

  return {
      props: {
          ...(await serverSideTranslations(locale || 'en', ['common',]))
      },
    }
  }

