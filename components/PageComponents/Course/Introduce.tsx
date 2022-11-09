import React from 'react';
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
const Section = () => {
  return (
    <Accordion className="rounded-lg">
      <AccordionSummary expandIcon={<DownIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <div className="flex w-full justify-between">
          <div className="flex items-center space-x-2">
            <div
              className="w-4 h-5   text-white text-xs rounded-sm
          text-center bg-red-400"
            >
              1
            </div>
            <div>Indira Somwaru</div>
            <CScanRating score={4.5}></CScanRating>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="text-gray-300">线下课程ACE 036</div>
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
export default function Introduce() {
  return (
    <CommonLayout>
      <Search></Search>
      <div className="flex items-center mt-3">
        <RedIcon className="mr-2"></RedIcon>
        <Title className="mb-0 mt-0" title="ADMS 1000"></Title>
      </div>
      <Title className="mt-0" title="Introduction to Business"></Title>
      <CourseIntroCard></CourseIntroCard>
      <Title title="数据概览"></Title>
      <CDataGrip></CDataGrip>
      <Title title="Section"></Title>
      <Section></Section>
      <CourseModel></CourseModel>
    </CommonLayout>
  );
}