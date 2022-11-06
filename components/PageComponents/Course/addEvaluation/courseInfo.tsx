import React from 'react';
import CourseIcon from './course.svg';
import NessIcon from './ness.svg';
export default function courseInfo() {
  return (
    <div className="bg-white pb-5">
      <label className="input-group bg-white w-full flex justify-between h-12 pl-4 ">
        <div className="flex items-center ">
          <CourseIcon className="mr-2"></CourseIcon>
          <div className="bg-white font-medium text-blueTitle text-base">
          课程分类
          </div>
        </div>
      </label>
      <div className="divider m-0 pl-4 pr-4 opacity-30 h-1"></div> 
      <label className="input-group bg-white w-full flex justify-between h-12">
        <span className="bg-white font-medium text-blueTitle text-sm">
        <NessIcon className="mr-1"></NessIcon>  课程分类
        </span>
        <select className="select  hover:outline-none text-right font-medium	 text-gray-500 text-xs ">
          <option  selected>
          例如: COMM
          </option>
          <option>COMM</option>
          <option>COMM</option>
        </select>
      </label>
      <div className="divider m-0 pl-4 pr-4 opacity-30 h-1"></div> 
      <label className="input-group bg-white w-full flex justify-between h-12">
        <span className="bg-white  font-medium text-blueTitle text-sm">
        <NessIcon className="mr-1"></NessIcon> 课程代码
        </span>
        <input
          type="text"
          placeholder="info@site.com"
          className="input placeholder-gray-300 font-medium	text-gray-500 text-sm hover:outline-none	border-none text-right"
        />
      </label>
      <div className="divider m-0 pl-4 pr-4 opacity-30 h-1"></div> 
      <label className="input-group bg-white w-full flex justify-between h-12">
        <span className="bg-white font-medium text-blueTitle text-sm">
        <NessIcon className="mr-1"></NessIcon>  课程类型
        </span>
        <input
          type="text"
          placeholder="info@site.com"
          className="input input-white placeholder-gray-300 font-medium	text-gray-500 text-sm hover:outline-none	border-none text-right"
        />
      </label>
      <div className="divider m-0 pl-4 pr-4 opacity-30 h-1"></div> 
    </div>
  );
}
