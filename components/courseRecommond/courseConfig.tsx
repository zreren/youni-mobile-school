import React from 'react';
import CateGoryIcon from './categoryIcon.svg';
import IOSSwitch from '../Input/ios';
import classnames from 'classnames';
export default function config() {
  const CourseSelector = (props) => {
    const { isSelect } = props;
    return (
      <div
        onClick={() => {
          props.onClick();
        }}
        className={classnames('flex justify-center items-center w-14 h-14  p-[1px] rounded-2xl', {
          'border-[2px] border-[#FFF4B0]': isSelect,
        })}
      >
        <div
          className={classnames(
            'border-[#DCDDE1] flex justify-center items-center  border-[2px] rounded-2xl h-12 w-12',
          )}
        ></div>
      </div>
    );
  };
  const [current, setCurrent] = React.useState(0);
  const courseList = new Array(10).fill(1);
  return (
    <div className="items-start justify-between  py-0 bg-white p-5">
      <div className="flex justify-between mb-6 mt-2">
        <div className="flex items-center space-x-2">
          <CateGoryIcon></CateGoryIcon>
          {/* {item.Icon ? <Icon className="mt-1"></Icon> : null} */}
          <div className="text-blueTitle">课程配置</div>
        </div>
        {/* <div>{item.action}</div> */}
      </div>
      <div className="grid grid-cols-5 grid-rows-2 gap-y-2 gap-x-2">
        {courseList?.map((item, index) => {
          return (
            <CourseSelector
              onClick={() => {
                setCurrent(index);
              }}
              isSelect={current === index}
              key={index}
            ></CourseSelector>
          );
        })}
      </div>
    </div>
  );
}
