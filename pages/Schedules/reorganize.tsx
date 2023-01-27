import React from 'react'
import Header from '@/components/Header';
import NessIcon from '@/components/PageComponents/Course/addEvaluation/ness.svg';
interface ChangeType {
  id: number;
  label: string;
}
interface CCourseInput {
  title: string;
  isNess?: boolean;
  children?: any;
  data?: any;
  change?: (data: ChangeType) => void;
  renderData?: any;
}
export default function reorganize() {
  const CCourseInput = (props: CCourseInput) => {
    const { title, isNess, children, data, renderData } = props;
    const selectItem = (e) => {
    };
    return (
      <div className="w-full bg-white  text-right rounded-xl">
        <label className="flex justify-between w-full h-12 input-group ">
          <span className="text-sm font-medium bg-white text-blueTitle">
            {isNess === true ? <NessIcon className="mr-1"></NessIcon> : null}
            {title}
          </span>
          {/* <input */}
          {/*   type="text" */}
          {/*   placeholder="info@site.com" */}
          {/*   className="text-sm font-medium text-right text-gray-500 placeholder-gray-300 border-none input hover:outline-none" */}
          {/* /> */}
          {children ? (
            children
          ) : null}
        </label>
      </div>
    );
  };
  return (
    <div className='w-full min-h-screen bg-[#F6F6F6]'>
      <Header title="一键导入课表"></Header>
      <div className='p-4'>
        <CCourseInput title="学年&学期" ></CCourseInput>
      </div>
    </div>
  )
}
