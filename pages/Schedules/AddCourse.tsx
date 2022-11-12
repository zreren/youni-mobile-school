import React, { useState } from 'react';
import HeaderMenu from '@/components/Menu/Header-menu';
import Header from '@/components/Header';
import CommonLayout from '@/components/Layout/CommonLayout';
import NessIcon from '@/components/PageComponents/Course/addEvaluation/ness.svg';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import IOSSwitch from './components/ios';
const CCourseTime = (props) => {
  return (
    <div className="w-full rounded-md bg-bg text-center text-blueTitle">
      {props.title}
    </div>
  );
};
const CCourseColor = (props) => {
  const colorList = ['#D9E7FF', '#FFE7E3', '#FFF0D6', '#FFFBD9', '#E7CCFF'];
  return (
    <div className="flex space-x-2">
      {colorList.map((item) => {
        return (
          <div
            style={{ background: item }}
            className="rounded-full w-6 h-6 "
          ></div>
        );
      })}
    </div>
  );
};
const CCourseInput = (props) => {
  const { title, isNess } = props;
  return (
    <div className="rounded-full bg-white w-full ">
      <label className="input-group h-12  w-full flex justify-between  ">
        <span className="bg-white  font-medium text-blueTitle text-sm">
          {isNess === true ? <NessIcon className="mr-1"></NessIcon> : null}
          {title}
        </span>
        <input
          type="text"
          placeholder="info@site.com"
          className="input placeholder-gray-300 font-medium	text-gray-500 text-sm hover:outline-none	border-none text-right"
        />
      </label>
    </div>
  );
};
const AddDaySchedule = (props) => {
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  });
  const [value, setValue] = React.useState(null);
  return (
    <div className="w-full space-y-4">
      <CCourseInput title="课程名称" isNess></CCourseInput>
      <div className="rounded-lg w-full h-12  bg-white p-4">
        <div className="flex justify-between items-center h-full  space-x-4">
          <div className="flex items-center">
            <NessIcon className="mr-1"></NessIcon>
            <div>日期</div>
          </div>
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={props.value}
                onChange={(newValue) => {
                  props.setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
      </div>
      <div className="rounded-lg w-full h-12  bg-white p-4">
        <div className="flex justify-between items-center h-full  space-x-4">
          <div className="flex items-center">
            <div>日期</div>
          </div>
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Basic example"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
      </div>
      <div className="rounded-lg w-full h-12  bg-white p-4">
        <div className="flex justify-between items-center h-full  space-x-4">
          <div>颜色</div>
          <CCourseColor></CCourseColor>
        </div>
      </div>
    </div>
  );
};
const AddCourse = () => {
  return (
    <div className="w-full space-y-4">
      <CCourseInput title="课程名称" isNess></CCourseInput>
      <div className=" bg-white w-full pr-2 pl-2">
        <label className=" w-full h-24">
          <div className="w-full  p-4">
            {' '}
            <span className="bg-white  font-medium text-blueTitle text-sm">
              日程名称
            </span>
          </div>
          <div className="w-full flex pr-1 pl-1 pb-4 space-x-2">
            <CCourseTime title="周一"></CCourseTime>
            <CCourseTime title="周一"></CCourseTime>
            <CCourseTime title="周一"></CCourseTime>
            <CCourseTime title="周一"></CCourseTime>
            <CCourseTime title="周一"></CCourseTime>
          </div>
        </label>
      </div>
      <CCourseInput title="教室" isNess></CCourseInput>
      <CCourseInput title="课程形式" isNess></CCourseInput>
      <CCourseInput title="Section" isNess></CCourseInput>
    </div>
  );
};

export default function AddSchedule() {
  const router = useRouter();
  const [value, setValue] = React.useState<Dayjs | null>(null);
  const menuList = [AddCourse, AddDaySchedule];
  let id = Number(router.query.id) - 1;
  if (!id) {
    id = 0;
  }
  console.log(id, 'addid');
  const headerMenuList = [
    {
      label: '课程',
    },
    {
      label: '日程',
    },
  ];
  const [menu, setMenu] = useState(id);
  return (
    <CommonLayout className="p-0">
      <Header title="添加"></Header>
      <HeaderMenu
        id={id}
        switchMenu={(val) => {
          setMenu(val);
        }}
        headerMenuList={headerMenuList}
      ></HeaderMenu>
      <div className="p-4">
        {menu === 0 ? (
          <AddCourse></AddCourse>
        ) : (
          <AddDaySchedule value={value} setValue={setValue}></AddDaySchedule>
        )}
      </div>
    </CommonLayout>
  );
}
