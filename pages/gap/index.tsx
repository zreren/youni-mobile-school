import React from 'react';
// import Header from '@/components/Header';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import DownIcon from './down.svg';
import EditIcon from './edit.svg';
import Session from './sesion.svg';
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
const CScoreCard = () => {
  return (
    <div className="w-24 h-14">
      <div className="flex items-center justify-center w-full h-8 text-lg font-medium text-center bg-gray-200 rounded-t-lg text-blueTitle">
        3.2
      </div>
      <div className="w-full h-1.2/3 bg-gray-100 text-center text-gray-400">
        内容评分
      </div>
    </div>
  );
};

export default function index() {
  const router = useRouter();
  const Header = (props) => {
    const { children, title, className, returnClick } = props;
    return (
      <>
        <div
          className={classnames(
            'absolute  inset-0 top-0 z-50 flex items-center justify-between w-full p-5   h-11 ',
          )}
        >
          <div
            onClick={() => {
              returnClick ? returnClick() : router.back();
            }}
            className="w-1/6"
          >
            <svg
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.19531 0.328613L7.13812 1.27142L2.42408 5.98547L7.13812 10.6995L6.19531 11.6423L1.0099 6.45691C1.00988 6.45689 1.00986 6.45687 1.48127 5.98547L1.0099 6.45691L0.538458 5.98547L6.19531 0.328613Z"
                fill="#1D2129"
              />
            </svg>
          </div>
          <div className="w-2/3 text-lg font-medium text-center">{title}</div>
          <div className="flex justify-end w-1/6">{children}</div>
        </div>
        <div className="mb-11"></div>
      </>
    );
  };
  const CourseGap = () => {
    return (
      <div className="relative">
        <div className="bg-[#FF7978] rounded-full w-3 h-16"></div>
        <div className="w-full gap-card-shadow absolute top-0   items-center bg-white left-2 mr-4  h-16 z-30 flex justify-between">
          <div className={"mx-4"}>
            <div className="flex items-center space-x-4">
              <div>
                <div className="text-[10px] text-[#DCDDE1]">课程</div>
                <div className={"text-[14px]"}>ADMS1000</div>
              </div>
              <div>
                <div className="text-[10px] text-[#DCDDE1]">学分</div>
                <div className={"text-sm"}>3.0</div>
              </div>
              <div>
                <div className="text-[10px] text-[#DCDDE1]">成绩</div>
                <div className={"text-sm"}>A+</div>
              </div>
            </div>
            <div className="text-xs flex">
              <div className={"bg-[#F7F8F9] text-[#798195] text-xs px-2"}>选修</div>
            </div>
          </div>
          <div className="flex items-center mr-4 space-x-4">
            <div className={"text-xl bg-[#F7F8F9] rounded-md px-4"}>6.0</div>
            <EditIcon></EditIcon>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <div className="relative h-[280px] w-full gap-bg pt-4  bg-gradient-to-l to-[#EAE6FF] from-[#ECF5FF] ">
        <Header className="bg-transparent fixed top-0"></Header>
        <div className="absolute p-4 bg-white rounded-full left-8 rotate-220">
          {/* @ts-ignore */}
          <div
            className="radial-progress text-primary"  style={{ '--value': 70 }}
          >
            <div className="-rotate-220">
              <div className="flex flex-col items-center justify-center">
                {' '}
                <div className="font-medium text-[21px] text-blueTitle">
                  7.9
                </div>
                <div className="text-xs font-medium  text-[#A9B0C0]">总GPA</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full pt-10 pl-5 pr-5 ">
          <div className="rounded-t-lg pink-linergradient-bg h-14 flex space-x-2 justify-end items-center">
            <div className={"bg-[#FFFBD9] text-[#B38314] px-2 rounded-md py-0.5"}>成绩计算规则</div>
            <div className={"bg-[#FFFBD9] text-[#B38314] px-2 rounded-md py-0.5"}>校区政策</div>
          </div>
          <div className="h-24 bg-white rounded-b-lg">
            <div className="flex justify-between p-4">
              <CScoreCard></CScoreCard>
              <CScoreCard></CScoreCard>
              <CScoreCard></CScoreCard>
            </div>
          </div>

        </div>
      </div>
      <div className="px-0  ">
        <Accordion className="">
          <AccordionSummary
            expandIcon={<DownIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div className={"flex justify-between items-center mb-2 mt-5"}>
              <div className={"flex items-center space-x-2"}>
                <div className={"w-2 h-[14px] bg-[#ff7978] rounded-full "}></div>
                <div className={"text-blueTitle text-sm text-medium"}>2021-2022 秋季</div>
                <div className={"text-white bg-[#FF7978] text-xs px-2 rounded-sm"}>6.67</div>
              </div>
              <div></div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className='space-y-2'>
            <CourseGap></CourseGap>
            <CourseGap></CourseGap>
            </div>
          </AccordionDetails>
        </Accordion>
        <div className={"w-full h-12 "}>
          <div className={"bg-[#F7F8F9] space-x-2 rounded-lg  mx-5 h-12 text-sm text-[#798195] flex justify-center items-center"}>
            <Session></Session>
            <div>添加学期</div>
            </div>
        </div>
        {/* <div className={"flex justify-between items-center mb-7 mt-5"}> */}
        {/*   <div className={"flex items-center space-x-2"}> */}
        {/*     <div className={"w-2 h-[14px] bg-[#ff7978] rounded-full "}></div> */}
        {/*     <div className={"text-blueTitle text-sm text-medium"}>2021-2022 秋季</div> */}
        {/*     <div className={"text-white bg-[#FF7978] text-xs px-2 rounded-sm"}>6.67</div> */}
        {/*   </div> */}
        {/*   <div></div> */}
        {/* </div> */}

      </div>
    </div>
  );
}
