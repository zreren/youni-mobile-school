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
import { DatetimePicker, Field } from 'react-vant';
import { Form, Selector } from 'react-vant';
// import { Button } from 'ppfish-mobile/es/components/index.js';

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
  const [value, setValue] = useState(new Date());
  const [time, setTime] = useState('12:00');
  return (
    <div className="w-full space-y-4 youni-form">
      <CCourseInput title="课程名称" isNess></CCourseInput>
      <div className="w-full h-12 p-4 bg-white rounded-lg">
        <div className="flex items-center justify-between h-full space-x-4">
          <div className="flex items-center">
            <NessIcon className="mr-1"></NessIcon>
            <div>日期</div>
          </div>
          <div className='youni-form'>
            <DatetimePicker
              popup={{
                round: true,
              }}
              type="date"
              title=""
              minDate={new Date(2021, 0, 1)}
              maxDate={new Date(2025, 10, 1)}
              value={value}
              onConfirm={setValue}
            >
              {(val, _, actions) => {
                return (
                  <Field
                    readOnly
                    clickable
                    label=""
                    value={val.toLocaleDateString()}
                    placeholder="请选择日期"
                    onClick={() => actions.open()}
                  />
                );
              }}
            </DatetimePicker>
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
            <div>时间</div>
          </div>
          <div>
            <DatetimePicker
              popup={{
                round: true,
              }}
              title=""
              defaultValue="12:00"
              type="time"
              minHour="10"
              maxHour="20"
              value={time}
              onConfirm={setTime}
            >
              {(val, _, actions) => {
                return (
                  <Field
                    readOnly
                    clickable
                    label=""
                    value={val}
                    placeholder="请选择日期"
                    onClick={() => actions.open()}
                  />
                );
              }}
            </DatetimePicker>
          </div>
        </div>
      </div>
      <div className="w-full h-12 p-4 bg-white rounded-lg">
        <div className="flex items-center justify-between h-full space-x-4">
          <div>颜色</div>
          <CCourseColor></CCourseColor>
        </div>
      </div>
      <div className='flex justify-center mx-10 space-x-4'>
        <div className='flex items-center justify-center w-full text-[#FFD036] font-semibold   bg-[#FFFCF3] h-10 rounded-lg'>关闭</div>
        <div className='flex items-center text-[#8C6008] font-semibold justify-center w-full bg-[#FFD036] h-10 rounded-lg'>添加日程</div>
      </div>
    </div>
  );
};
const AddCourse = () => {
  const [time, setTime] = useState('12:00');

  return (
    <div className="w-full space-y-4">
      <CCourseInput title="课程名称" isNess></CCourseInput>
      <div className="w-full pl-2 pr-2 bg-white ">
        <label className="w-full h-24 ">
          <div className="w-full p-3">
            {' '}
            <span className="flex items-center text-sm font-medium bg-white text-blueTitle">
            <NessIcon className="mr-1"></NessIcon>上课日期
            </span>
          </div>
          <div className="flex w-full pb-4 pl-4 pr-4 ">
            <Selector
              options={[
                {
                  label: '周一',
                  value: '1',
                },
                {
                  label: '周二',
                  value: '2',
                },
                {
                  label: '周三',
                  value: '3',
                },
                {
                  label: '周四',
                  value: '4',
                },
                {
                  label: '周五',
                  value: '5',
                },
                {
                  label: '周六',
                  value: '6',
                },
                {
                  label: '周日',
                  value: '7',
                },
              ]}
              style={{
                '--rv-selector-border-radius': '4px',
                '--rv-selector-color':'rgba(55, 69, 92, 0.04)',
                '--rv-selector-checked-border':
                  'solid var(--adm-color-primary) 1px',
                '--rv-selector-padding': '4px 4px',
                '--rv-selector-checked-text-color':"white",
              }}
              defaultValue={['2', '3']}
              multiple={true}
              showCheckMark={false}
              onChange={(arr, extend) => console.log(arr, extend.items)}
            />
            {/* <CCourseTime title="周一"></CCourseTime>
            <CCourseTime title="周一"></CCourseTime>
            <CCourseTime title="周一"></CCourseTime>
            <CCourseTime title="周一"></CCourseTime>
            <CCourseTime title="周一"></CCourseTime> */}
          </div>
        </label>
      </div>
      <div className="w-full h-12 p-4 bg-white rounded-lg">
        <div className="flex items-center justify-between h-full space-x-4">
          <div className="flex items-center">
          <NessIcon className="mr-1"></NessIcon>
            <div>时间</div>
          </div>
          <div>
            <DatetimePicker
              popup={{
                round: true,
              }}
              title=""
              defaultValue="12:00"
              type="time"
              minHour="10"
              maxHour="20"
              value={time}
              onConfirm={setTime}
            >
              {(val, _, actions) => {
                return (
                  <Field
                    readOnly
                    clickable
                    label=""
                    value={val}
                    placeholder="请选择日期"
                    onClick={() => actions.open()}
                  />
                );
              }}
            </DatetimePicker>
          </div>
        </div>
      </div>
      <CCourseInput title="教室" ></CCourseInput>
      <CCourseInput title="课程形式" ></CCourseInput>
      <CCourseInput title="Section" ></CCourseInput>
      <CCourseInput title="教授"></CCourseInput>
      <CCourseInput title="单双周" ></CCourseInput>
      <div className="w-full h-12 p-4 bg-white rounded-lg">
        <div className="flex items-center justify-between h-full space-x-4">
          <div>颜色</div>
          <CCourseColor></CCourseColor>
        </div>
      </div>
      <div className='flex justify-center mx-10 space-x-4'>
        <div className='flex items-center justify-center w-full text-[#FFD036] font-semibold   bg-[#FFFCF3] h-10 rounded-lg'>关闭</div>
        <div className='flex items-center text-[#8C6008] font-semibold justify-center w-full bg-[#FFD036] h-10 rounded-lg'>添加课程</div>
      </div>
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
    <CommonLayout className="p-0 mb-10">
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
