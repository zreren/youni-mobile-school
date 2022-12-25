import React, { useState } from 'react';
import HeaderMenu from '@/components/Menu/Header-menu';
import Header from '@/components/Header';
import CommonLayout from '@/components/Layout/CommonLayout';
import NessIcon from '@/components/PageComponents/Course/addEvaluation/ness.svg';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import IOSSwitch from './components/ios';
// import { DatePicker } from 'ppfish-mobile/es/components/index.js';

// import { View, Text, Picker } from '@tarojs/components';
// import { AtList, AtListItem } from 'taro-ui'
const CCourseTime = (props) => {
  return (
    <div className="w-full text-center rounded-md bg-bg text-blueTitle">
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
            className="w-6 h-6 rounded-full "
          ></div>
        );
      })}
    </div>
  );
};
const CCourseInput = (props) => {
  const { title, isNess } = props;
  return (
    <div className="w-full bg-white rounded-full ">
      <label className="flex justify-between w-full h-12 input-group ">
        <span className="text-sm font-medium bg-white text-blueTitle">
          {isNess === true ? <NessIcon className="mr-1"></NessIcon> : null}
          {title}
        </span>
        <input
          type="text"
          placeholder="info@site.com"
          className="text-sm font-medium text-right text-gray-500 placeholder-gray-300 border-none input hover:outline-none"
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
      <div className="w-full h-12 p-4 bg-white rounded-lg">
        <div className="flex items-center justify-between h-full space-x-4">
          <div className="flex items-center">
            <NessIcon className="mr-1"></NessIcon>
            <div>日期</div>
          </div>
          <div>
            {/* <DatePicker
              mode="date"
              title="选择日期"
              extra="请选择日期"
              value={value}
              onChange={(date) => setValue(date)}
            ></DatePicker> */}
          </div>
        </div>
      </div>
      <div className="w-full h-12 p-4 bg-white rounded-lg">
        <div className="flex items-center justify-between h-full space-x-4">
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
      <div className="w-full h-12 p-4 bg-white rounded-lg">
        <div className="flex items-center justify-between h-full space-x-4">
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
      <div className="w-full pl-2 pr-2 bg-white ">
        <label className="w-full h-24 ">
          <div className="w-full p-4">
            {' '}
            <span className="text-sm font-medium bg-white text-blueTitle">
              日程名称
            </span>
          </div>
          <div className="flex w-full pb-4 pl-1 pr-1 space-x-2">
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
