import React, { useState } from 'react';
import CommonLayout from '@/components/Layout/CommonLayout';
import HeaderMenu from '@/components/Menu/Header-menu';
import Search from '@/components/Input/Search';
import RedIcon from '../../../public/red.svg';
import Title from '@/components/Title/Title';
import CourseIntroCard from './CourseIntroCard';
import CDataGrip from '@/components/CDataGrip';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import CScanRating from '@/components/Rating/CScanRating';
import { styled } from '@mui/material/styles';
import DownIcon from './down.svg';
import useLanguage from '@/hooks/useLanguage';
import classnames from 'classnames';
import { Tabs } from 'react-vant';
import PrefixIcon from './prefix.svg';
import RecommendIcon from './recommend.svg';
import { useRouter } from 'next/router';
import useFetch from '@/hooks/useFetch';
import { useTranslation } from 'next-i18next';


const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: ``,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));
type Course = {
  code: string;
  cname: string;
  ename: string;
  desc: string;
  prerequisites: any;
  exclusions: any;
  property: any;
  level: any;
  department: any;
  type: {
    cname: string;
    ename: string;
    desc: string;
  };
  subject: {
    cname: string;
    ename: string;
    shortName: string;
  };
  sections: Array<{
    name: string;
    startTime: string | null;
    endTime: string | null;
  }>;
  rating: {
    professorRating: number;
    homeworkRating: number;
    contentRating: number;
    examRating: number;
  };
  recommends: any;
};
export default function Introduce(props: {
  MyIntroduce: Course;
  recommendsData: any;
}) {
  if (!props.MyIntroduce) return;
  console.log(props.recommendsData, 'recommendsData');
  const { t } = useTranslation();
  const router = useRouter();
  let porpsIntroduce = props.MyIntroduce;
  const { code, sections, rating } = props.MyIntroduce;
  const { data } = useFetch(`/campus/query?name=${router.query.campus}`, 'get');
  if (!props) return;
  // const {  code, sections, rating } = porpsIntroduce;
  const Section = (props) => {
    const { name, startTime, endTime, professors, mode } = props.data;
    console.log(props.data, 'props.data Section');
    return (
      <Accordion className="rounded-lg">
        <AccordionSummary
          expandIcon={<DownIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="flex w-full justify-between">
            <div className="flex items-center space-x-2">
              <div
                className="w-4 h-5   text-white text-xs rounded-sm
          text-center bg-red-400"
              >
                {name.slice(0, 1)}
              </div>
              <div>{professors[0]?.name || '教授'}</div>
              <CScanRating score={professors[0]?.rating || 0}></CScanRating>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="text-gray-300">{mode[0]?.ename || 'unaligned'}</div>
        </AccordionDetails>
      </Accordion>
    );
  };
  const CourseModel = () => {
    return (
      <div>
       <Title title={t('课程模块')}></Title>

        <div className="card rounded-lg w-full bg-base-100 ">
          <div className="card-body p-4 ">
            <div className="flex justify-between space-x-3">
              <div>
                <div className="avatar">
                  <div className="w-24 h-16 rounded">
                    <img src="https://placeimg.com/192/192/people" />
                  </div>
                </div>
              </div>
              <div className="flex  flex-col justify-between">
                <div className="text-base tracking-widest  overflow-ellipsis">
                  {t('选课指导')}...
                </div>
                <div className="flex">
                  <div className="flex">
                    <div className="bg-green-200 h-5 w-10 text-center leading-5 rounded-sm pl-1 pr-1 text-xs text-green-400">
                      tag1
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const CourseSelector = (props) => {
    const { isSelect } = props;
    return (
      <div
        className={classnames(
          'flex justify-center relative items-center w-14 h-14  p-[1px] rounded-2xl',
          {
            'border-[2px] border-[#FFDEAD]': isSelect,
          },
        )}
      >
        <div
          className={classnames(
            'border-[#FFDEAD] bg-[#FFFAF0] flex flex-col justify-center items-center  border-[2px] rounded-2xl h-12 w-12',
          )}
        >
          <div
            className={classnames(
              'text-[10px] text-[#ff9832] flex justify-center text-center items-center',
              {},
            )}
          >
            {props.data.label}
          </div>
        </div>
        <div className="xueqiTag absolute rounded-[5px] p-[5px] text-[white] flex justify-center items-center text-[10px] w-4 h-4 overflow-hidden bottom-0 right-0">
          {props?.term?.slice(0, 1)}
        </div>
      </div>
    );
  };
  const RecommendCourse = (props) => {
    console.log(props, 'RecommendCourse');
    const { data } = props;
    function flatten(arr) {
      return arr.reduce(
        (acc, val) =>
          Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val),
        [],
      );
    }
    const recommends = React.useMemo(() => {
      const flattened = flatten(
        data?.recommends?.map((item) => item.form.courseData),
      );
      const filtered = flattened.filter(Boolean);
      const uniqueLabels = Array.from(
        new Set(filtered.map((item) => item.label)),
      );
      const deduplicated = uniqueLabels.map((label) =>
        filtered.find((item) => item.label === label),
      );
      return deduplicated;
    }, [data?.recommends]);
    console.log(recommends, 'recommends');
    const Item = (props) => {
      const { prerequisites, recommends } = props;
      if (!prerequisites && !recommends) return null;
      const course = 'MATH 1000';
      const parts = course.split(' ');
      console.log(parts); // Output: ['MATH', '1000']
      return (
        <div
          onClick={() => {
            router.push({
              pathname: '/[campus]/Course/[id]',
              query: {
                campus: router.query.campus,
                id: props?.prefix ? prerequisites?.id : recommends?.id,
              },
            });
          }}
          className="w-1/4 min-w-[25%] h-36 py-1 flex flex-col items-center justify-center border-gray-50 border-[0.5px] rounded-md"
        >
          {props?.prefix ? (
            <RecommendIcon></RecommendIcon>
          ) : (
            <PrefixIcon></PrefixIcon>
          )}
          <div className="text-blueTitle text-xs  font-semibold">
            {props?.prefix
              ? prerequisites?.subject?.ename?.toUpperCase()
              : recommends?.label.split(' ')?.[0]}
          </div>
          <div className="text-blueTitle text-xs font-semibold">
            {props?.prefix
              ? prerequisites?.no
              : recommends?.label.split(' ')?.[1]}
          </div>
          <div className="bg-[#F7F8F9] text-blueTitle text-xs h-8 min-w-[40px] w-2/3 rounded-lg flex justify-center items-center ">
            {props?.prefix ? t('前置课') : t('推荐课')}
          </div>
        </div>
      );
    };
    return (
      <div className="flex items-center space-x-2 overflow-x-scroll">
        {data?.prerequisites?.map((item) => {
          return <Item prerequisites={item} prefix></Item>;
        })}
        {recommends?.map((item) => {
          return <Item recommends={item}></Item>;
        })}
      </div>
    );
  };
  const Menu = () => {
    const [label, setLabel] = useState(0);
    return (
      <>
        <div className="w-screen  absolute px-4 top-[92px] left-0 -p-5 h-14 space-x-4 flex items-center mb-4 bg-white text-sm">
          <div
            onClick={() => {
              setLabel(0);
            }}
            className={classnames('flex justify-center  h-10 items-center', {
              'bg-[#FFFEF0] w-full text-[#B38314] font-semibold': label === 0,
              'bg-white w-full  text-[#A9B0C0]': label !== 0,
            })}
          >
            {t('课程简介')}
          </div>
          <div
            onClick={() => {
              setLabel(1);
            }}
            className={classnames('flex justify-center  h-10 items-center ', {
              'bg-[#FFFEF0] w-full  text-[#B38314]  font-semibold': label === 1,
              'bg-white w-full  text-[#A9B0C0]': label !== 1,
            })}
          >
            {t('课程攻略')}
          </div>
        </div>
        <div className="h-14 w-full"></div>
        {label === 0 ? (
          <div className="p-5">
            <Search></Search>
            <div className="flex items-center mt-3">
              <RedIcon className="mr-2"></RedIcon>
              <Title className="mb-0 mt-0" title={code}></Title>
            </div>
            <Title
              className="mt-0"
              title={porpsIntroduce[useLanguage('name')]}
            ></Title>
            <CourseIntroCard
              content={porpsIntroduce[useLanguage('desc')]}
            ></CourseIntroCard>
           <Title title={t('数据概览')}></Title>

            <CDataGrip data={rating}></CDataGrip>
            <Title title="Section"></Title>
            <div className={'space-y-2'}>
              {sections?.length > 0 ? (
                sections.map((item, index) => {
                  return <Section data={item} key={index}></Section>;
                })
              ) : (
                <div className="w-full flex justify-center rounded-lg bg-white h-12 items-center">
                  <div className="text-gray-300  text-xs text-center">
                    {useLanguage('') === 'e'
                      ? 'Contact administrator to add section'
                      : '暂无班级，联系管理员添加'}
                  </div>
                </div>
              )}
            </div>
            <CourseModel></CourseModel>
          </div>
        ) : null}
        {label === 1 ? (
          <div className="w-full mt-3">
            <Tabs
              titleActiveColor={'#000'}
              titleInactiveColor={'#798195'}
              defaultActive={2}
            >
              <Tabs.TabPane key={1} title={t('要求')}>
                <div>
                  <div className="w-full p-3  bg-white">
                    <div className="font-semibold mt-4 text-lg text-[#37455C]">
                      {t('选课')}{' '}
                      <span className="text-[#2347D9]">{t('要求')}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2 p-2">
                      <div className="w-[6px] h-4 bg-yellow-300 rounded-full"></div>
                      <div className="font-semibold ">{t('前置课')}</div>
                    </div>
                    <div className="w-full grid grid-rows-2 grid-cols-2 gap-3">
                      {props.MyIntroduce.prerequisites.map((item) => {
                        return (
                          <div className="bg-[#F7F8F9] font-semibold rounded-md w-full flex justify-center items-center h-8 text-xs text-[#798195]">
                            {item.code}
                          </div>
                        );
                      })}
                    </div>
                    {props.MyIntroduce.prerequisites.length === 0 ? (
                      <div className="text-xs flex text-[#798195] ml-4 -mt-2">
                        {t('暂无前置课')}
                      </div>
                    ) : null}
                    <Accordion
                      defaultExpanded
                      className="rounded-lg p-0"
                      sx={{ padding: 0 }}
                    >
                      <AccordionSummary
                        sx={{ padding: 0 }}
                        expandIcon={<DownIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <div className="flex items-center space-x-2 p-2">
                          <div className="w-[6px] h-4 bg-yellow-300 rounded-full"></div>
                          <div className="font-semibold">{t('学分排除')}</div>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails sx={{ paddingLeft: 0, paddingTop: 0 }}>
                        <div className="w-full grid grid-rows-2 grid-cols-2 gap-3">
                          {props?.MyIntroduce?.exclusions?.map((item) => {
                            return (
                              <div className="bg-[#F7F8F9] font-semibold rounded-md w-full flex justify-center items-center h-8 text-xs text-[#798195]">
                                {item.code}
                              </div>
                            );
                          })}
                          {/* <div className="bg-[#F7F8F9] rounded-md w-full flex justify-center items-center h-6 text-xs text-[#798195]">MAT 120</div>
                          <div className="bg-[#F7F8F9]  rounded-md w-full  flex justify-center items-center text-xs text-[#798195] h-6">MAT 120</div> */}
                        </div>
                        {props?.MyIntroduce?.exclusions?.length === 0 ? (
                          <div className="text-xs flex text-[#798195] ml-4 -mt-2">
                            {t('暂无排除学分')}
                          </div>
                        ) : null}
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane key={2} title={t('详情')}>
                <div className="w-full p-3 bg-white">
                  <div className="font-semibold mt-4 text-lg text-[#37455C]">
                    {t('选课')}{' '}
                    <span className="text-[#2347D9]">{t('详情')}</span>
                  </div>
                  {router.query.campus && (
                    <>
                      <div className="flex items-center space-x-2 mt-2 p-2">
                        <div className="w-[6px] h-4 bg-yellow-300 rounded-full"></div>
                        <div className="font-semibold">{t('校区')}</div>
                      </div>
                      <div className="p-2 text-sm text-[#798195]">
                        {data?.data?.[0].ename}
                      </div>
                    </>
                  )}
                  {props.MyIntroduce.department && (
                    <>
                      <div className="flex items-center space-x-2 mt-2 p-2">
                        <div className="w-[6px] h-4 bg-yellow-300 rounded-full"></div>
                        <div className="font-semibold">{t('学部')}</div>
                      </div>
                      <div className="p-2 text-sm text-[#798195]">
                        {props.MyIntroduce.department || t('default')}
                      </div>
                    </>
                  )}
                  {props.MyIntroduce.level && (
                    <>
                      <div className="flex items-center space-x-2 mt-2 p-2">
                        <div className="w-[6px] h-4 bg-yellow-300 rounded-full"></div>
                        <div className="font-semibold">{t('等级')}</div>
                      </div>
                      <div className="p-2 text-sm text-[#798195]">
                        {props.MyIntroduce.level || t('default')}
                      </div>
                    </>
                  )}
                  {props.MyIntroduce.property && (
                    <>
                      <div className="flex items-center space-x-2 mt-2 p-2">
                        <div className="w-[6px] h-4 bg-yellow-300 rounded-full"></div>
                        <div className="font-semibold">{t('属性')}</div>
                      </div>
                      <div className="p-2 text-sm text-[#798195]">
                        {props.MyIntroduce.property || t('default')}
                      </div>
                    </>
                  )}
                </div>
              </Tabs.TabPane>
            </Tabs>
            <div className="h-3 w-full bg-bg"></div>
            {props.recommendsData.length > 0 && (
              <div className="w-full p-3  bg-white">
                <div className="font-semibold mt-4 text-lg text-[#37455C]">
                  {t('选课')}{' '}
                  <span className="text-[#2347D9]">{t('推荐')}</span>
                </div>
                <div className="mt-2 space-y-2">
                  {props.recommendsData?.map((item, index) => {
                    return (
                      <div className="border border-[#F7F8F9] rounded-md w-full">
                        <Accordion
                          className="rounded-lg p-0"
                          sx={{ padding: 0 }}
                        >
                          <AccordionSummary
                            sx={{ padding: 0, paddingRight: 2 }}
                            expandIcon={<DownIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <div>
                              <div className="flex w-full p-3 space-x-3">
                                <div className="w-6 h-6 rounded-md bg-[#F7F8F9] flex items-center justify-center">
                                  {/* index */}
                                  {index + 1}
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-[#798195]">
                                    {item.title}
                                  </div>
                                  <div className="text-xs text-[#A9B0C0]">
                                    {t('由')} {item.user.nickName} {t('提供')}
                                  </div>
                                </div>
                              </div>
                              <div className="w-full px-2 flex overflow-x-scroll">
                                {item?.form?.courseData?.map((i) => {
                                  return (
                                    <CourseSelector
                                      data={i}
                                      term={item.form.term}
                                    ></CourseSelector>
                                  );
                                })}
                              </div>
                            </div>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div className="w-full h-10">
                              <div
                                onClick={() => {
                                  router.push({
                                    pathname: '/[campus]/Course/recommend/[id]',
                                    query: {
                                      campus: router.query.campus,
                                      id: item.post?.id,
                                    },
                                  });
                                }}
                                className="bg-[#FFFBD9] rounded-lg text-[#D9A823] w-full h-10 flex justify-center items-center"
                              >
                                {t('查看全文')}
                              </div>
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="h-3 w-full bg-bg"></div>
            {props.MyIntroduce.prerequisites.length > 0 ||
            props.MyIntroduce.recommends.length > 0 ? (
              <div className="w-full p-3 bg-white">
                <div className="font-semibold mt-4 text-lg text-[#37455C]">
                  {t('课程')}{' '}
                  <span className="text-[#D92B31]">{t('关联')}</span>
                </div>
                {/* <div className="flex items-center space-x-2 mt-2 p-2">
    <div className="w-[6px] h-4 bg-yellow-300 rounded-full"></div>
    <div className="font-semibold">{t('架构图')}</div>
  </div> */}
                <div className="flex items-center space-x-2 mt-2 p-2">
                  <div className="w-[6px] h-4 bg-yellow-300 rounded-full"></div>
                  <div className="font-semibold">{t('智能推荐')}</div>
                </div>
                <RecommendCourse data={props.MyIntroduce}></RecommendCourse>
              </div>
            ) : null}
          </div>
        ) : null}
      </>
    );
  };
  // console.log(useLanguage(), 'useLanguage');
  return (
    <CommonLayout className="mb-16 p-0">
      <Menu></Menu>
    </CommonLayout>
  );
}
