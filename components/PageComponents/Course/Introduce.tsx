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
};
export default function Introduce(props: Course) {
  console.log(props, 'props');

  let porpsIntroduce = props;
  if (!props) {
    porpsIntroduce = {
      ename: 'default',
      code: '1000',
      cname: '数学',
      desc: '',
      rating: {
        professorRating: 1,
        homeworkRating: 1,
        contentRating: 1.2,
        examRating: 1.2,
      },
      sections: [
        {
          name: 'default',
          startTime: 'default',
          endTime: 'default',
        },
      ],
      subject: {
        cname: 'default',
        ename: 'default',
        shortName: 'default',
      },
      type: {
        cname: 'default',
        ename: 'default',
        desc: 'default',
      },
    };
  }
  const { ename, code, sections, subject, type, rating, cname } =
    porpsIntroduce;
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
        <Title title="课程模块"></Title>
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
                  选课指导选课指导选课指导选课指导选课指导选课指...
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
            课程简介
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
            课程攻略
          </div>
        </div>
        <div className="h-14 w-full"></div>
        {label === 0 ? (
          <div className="p-5">
            <Search></Search>
            <div className="flex items-center mt-3">
              <RedIcon className="mr-2"></RedIcon>
              <Title
                className="mb-0 mt-0"
                title={`${porpsIntroduce.subject[
                  useLanguage('name')
                ]?.toUpperCase()} ${code}`}
              ></Title>
            </div>
            <Title
              className="mt-0"
              title={porpsIntroduce[useLanguage('name')]}
            ></Title>
            <CourseIntroCard
              content={porpsIntroduce[useLanguage('desc')]}
            ></CourseIntroCard>
            <Title title="数据概览"></Title>
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
            <Tabs titleActiveColor={"#000"} titleInactiveColor={"#798195"} defaultActive={2}>
              <Tabs.TabPane key={1} title={`要求`}>
                <div>
                  <div className="w-full p-3  bg-white">
                    <div className="font-semibold mt-4 text-lg text-[#37455C]">
                      选课 <span className="text-[#2347D9]">介绍</span>
                    </div>
                    {/* <div className="flex w-full justify-between mt-5 items-center px-2 space-x-3"></div> */}
                    <div className="flex items-center space-x-2 mt-2 p-2">
                      <div className="w-[6px] h-4 bg-yellow-300 rounded-full"></div>
                      <div className="font-semibold ">前置课</div>
                    </div>
                    <div className="p-2 text-[#798195]  text-sm">Grade 12 Calculus and Vectors</div>
                    <Accordion className="rounded-lg p-0" sx={{ padding: 0 }}>
                      <AccordionSummary
                        sx={{ padding: 0 }}
                        expandIcon={<DownIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <div className="flex items-center space-x-2 p-2">
                          <div className="w-[6px] h-4 bg-yellow-300 rounded-full"></div>
                          <div className="font-semibold">学分排除</div>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="w-full grid grid-rows-2 grid-cols-2 gap-3">
                          <div className="bg-[#F7F8F9] w-full h-6">1</div>
                          <div className="bg-[#F7F8F9] w-full h-6">1</div>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane key={2} title={`详情`}>
                <div>
                  <div className="w-full p-3  bg-white">
                    <div className="font-semibold mt-4 text-lg text-[#37455C]">
                      选课 <span className="text-[#2347D9]">详情</span>
                    </div>
                    {/* <div className="flex w-full justify-between mt-5 items-center px-2 space-x-3"></div> */}
                    <div className="flex items-center space-x-2 mt-2 p-2">
                      <div className="w-[6px] h-4 bg-yellow-300 rounded-full"></div>
                      <div className="font-semibold">校区</div>
                    </div>
                    <div className="p-2  text-sm text-[#798195]">
                      Grade 12 Calculus and Vectors
                    </div>
                    <div className="flex items-center space-x-2 mt-2 p-2">
                      <div className="w-[6px] h-4 bg-yellow-300 rounded-full"></div>
                      <div className="font-semibold">学部</div>
                    </div>
                    <div className="p-2  text-sm text-[#798195]">
                      Grade 12 Calculus and Vectors
                    </div>
                    <div className="flex items-center space-x-2 mt-2 p-2">
                      <div className="w-[6px] h-4 bg-yellow-300 rounded-full"></div>
                      <div className="font-semibold">等级</div>
                    </div>
                    <div className="p-2 text-sm text-[#798195]">
                      Grade 12 Calculus and Vectors
                    </div>
                    <div className="flex items-center space-x-2 mt-2 p-2">
                      <div className="w-[6px] h-4 bg-yellow-300 rounded-full"></div>
                      <div className="font-semibold">属性</div>
                    </div>
                    <div className="p-2  text-sm text-[#798195]">
                      Grade 12 Calculus and Vectors
                    </div>
                  </div>
                </div>
              </Tabs.TabPane>
            </Tabs>
            <div className="h-3 w-full bg-bg"></div>
            <div className="w-full p-3  bg-white">
              <div className="font-semibold mt-4 text-lg text-[#37455C]">
                选课 <span className="text-[#2347D9]">推荐</span>
              </div>
              <div className="mt-2">
                <div className="border border-[#F7F8F9] rounded-md w-full">
                  <Accordion className="rounded-lg p-0" sx={{ padding: 0 }}>
                    <AccordionSummary
                      sx={{ padding: 0, paddingRight: 2 }}
                      expandIcon={<DownIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <div className="flex p-3 space-x-3">
                        <div className="w-6 h-6 rounded-md bg-[#F7F8F9] flex items-center justify-center">
                          1
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-[#798195]">
                            选课方案2
                          </div>
                          <div className="text-xs text-[#A9B0C0]">
                            由 testuser 提供
                          </div>
                        </div>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="w-full h-10">
                        <div className="bg-[#FFFBD9] rounded-lg text-[#D9A823] w-full h-10 flex justify-center items-center">
                          查看全文
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
            </div>
            <div className="h-3 w-full bg-bg"></div>
            <div className="w-full p-3  bg-white">
              <div className="font-semibold mt-4 text-lg text-[#37455C]">
                课程 <span className="text-[#D92B31]">关联</span>
              </div>
              <div className="flex items-center space-x-2 mt-2 p-2">
                <div className="w-[6px] h-4 bg-yellow-300 rounded-full"></div>
                <div className="font-semibold">架构图</div>
              </div>
              <div className="flex items-center space-x-2 mt-2 p-2">
                <div className="w-[6px] h-4 bg-yellow-300 rounded-full"></div>
                <div className="font-semibold">智能推荐</div>
              </div>
            </div>
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
