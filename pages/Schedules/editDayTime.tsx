import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { DatetimePicker, Field, Toast } from 'react-vant';
import { Form, Selector } from 'react-vant';
// import { Button } from 'ppfish-mobile/es/components/index.js';
import Autocomplete from '@mui/material/Autocomplete';
import instance from '@/libs/request';
import classnames from 'classnames';
import useFetch from '../../hooks/useFetch';
import useLanguage from '@/hooks/useLanguage';
import { useTranslation } from 'next-i18next';

const CCourseTime = (props: any) => {
  return (
    <div className="w-full text-center rounded-md bg-bg text-blueTitle">
      {props.title}
    </div>
  );
};

export default function AddSchedule() {
  const router = useRouter();
  const [CourseId, setCourseId] = useState();
  const { t } = useTranslation();
  const fetchData = (e) => {
    setCourseId(e);
  };
  const { data: dayTimeData, mutate } = useFetch('/timetable/detail', 'get', {
    id: router.query.id,
  });
  const CCourseColor = (props) => {
    const { setColor, value } = props;
    const colorList = [
      {
        light: '#D9E7FF',
        dark: '#3A66FF',
        id: 1,
      },
      {
        light: '#FFE7E3',
        dark: '#FF8A00',
        id: 2,
      },
      {
        light: '#FFF0D6',
        dark: '#FFB800',
        id: 3,
      },
      {
        light: '#FFFBD9',
        dark: '#FFD800',
        id: 4,
      },
      {
        light: '#E7CCFF',
        dark: '#A800FF',
        id: 5,
      },
    ];
    const colorId = useMemo(() => {
      if (!value) return;
      console.log(value, 'value');
      return colorList?.filter((item) => {
        return item.dark === value;
      })[0];
    }, [value]);
    const [select, setSelect] = useState(colorId?.id);
    useEffect(() => {
      // if(!colorId) return;
      console.log(colorId, 'colorId');
      setSelect(colorId?.id);
      // setSelect(colorId?.id)
      // setColor(colorId?.dark);
    }, [colorId]);
    useEffect(() => {
      setColor(colorList[0].dark);
    }, []);
    return (
      <div className="flex space-x-2">
        {colorList.map((item) => {
          return (
            <div
              onClick={() => {
                setSelect(item.id);
                setColor(item.dark);
              }}
              style={{
                background: item.light,
                border: item.id === select ? '1px solid #FFD036' : 'none',
              }}
              className="w-6 h-6 rounded-full "
            ></div>
          );
        })}
      </div>
    );
  };

  const submitCourse = async (values: any) => {
    const { data } = await instance.post('/api/curriculum/create', values);
    return data;
  };
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
    value?: any;
  }
  const CCourseInput = (props: CCourseInput) => {
    const { title, isNess, children, data, renderData, value } = props;
    const selectItem = (e) => {
      console.log(e, 'selectItem');
      if (!data) {
        props.change({
          id: null,
          label: e,
        });
        return;
      }
      // let allValuesGreaterThanZero = true;
      if (
        !Object?.values(data)?.some((value: any) => {
          if (value.ename === e) {
            props.change({
              id: value.id,
              label: value.ename,
            });
            return true;
          }
          return false;
        })
      )
        if (
          !Object?.values(data)?.some((value: any) => {
            if (value.name === e) {
              props.change({
                id: value.id,
                label: value.name,
              });
              return true;
            }
            return false;
          })
        )
          if (typeof e === 'string') {
            props.change({
              id: null,
              label: e,
            });
            return;
          }

      // if (!allValuesGreaterThanZero) {
      //   // execute code
      //   props.change({
      //     courseId: null,
      //     courseName: e,
      //   });
      // }
      // if(!Object.values(data).every((item:any) => { item})
      // Object.values(data).every((item:any) => {
      //   if(item.ename === e){
      //     props.change({
      //       courseId:item.id,
      //       courseName:item.ename
      //     })
      //   }
      // })
      // props.change({
      //   courseId:null,
      //   courseName:e
      // })
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
          ) : (
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              onChange={(event: any, newValue: string | null) => {
                console.log(event, 'event');
                console.log(newValue, 'event');
                selectItem(newValue);
              }}
              value={value}
              sx={{
                display: 'inline-block',
                width: 200,
                border: 'none',
                borderRadius: 'none',
                padding: 0,
                outline: 'none',
                boxShadow: 'none',
                textAlign: 'right',
              }}
              options={renderData ? renderData?.map((option) => option) : []}
              renderInput={(params) => (
                <TextField
                  sx={{
                    '& label.Mui-focused': {
                      color: 'transparent',
                      border: 0,
                      'border-width': 0,
                      'border-color': 'transparent',
                      outline: 'none',
                    },
                    textAlign: 'right',
                    outline: 'none',
                    input: { textAlign: 'right' },
                    '& fieldset': { border: 'none' },
                    '& legend': {
                      display: 'none',
                    },
                  }}
                  {...params}
                  onChange={(e) => {
                    selectItem(e.target.value);
                  }}
                  value={value}
                  InputProps={{
                    ...params.InputProps,
                    disableUnderline: true,
                    endAdornment: null,
                  }}
                />
              )}
            />
          )}
        </label>
      </div>
    );
  };
  const AddDaySchedule = (props) => {
    const { data } = props;
    if (!mutate) {
      mutate();
    }
    const { register, handleSubmit } = useForm({
      shouldUseNativeValidation: true,
    });
    const [value, setValue] = useState(new Date());
    const [time, setTime] = useState('12:00');
    const [endTime, setEndTime] = useState('12:00');
    useEffect(() => {
      const date = new Date(data?.startTime);
      const endDate = new Date(data?.endTime);
      setValue(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
      setTime(
        `${date.getHours().toString().padStart(2, '0')}:${date
          .getMinutes()
          .toString()
          .padStart(2, '0')}`,
      );
      setEndTime(
        `${endDate.getHours().toString().padStart(2, '0')}:${endDate
          .getMinutes()
          .toString()
          .padStart(2, '0')}`,
      );
    }, []);
    const [timetable, setTimetable] = useState(data);
    const handleChange = useCallback((val: any, name: string) => {
      setTimetable((preVal: any) => {
        return {
          ...preVal,
          [name]: val,
        };
      });
    }, []);
    const submitTime = async (values) => {
      const { data } = await instance.post('/api/timetable/update', values);
      return data;
    };
    const getYYMMDD = (date: Date) => {
      // function formatDate(date: string): string {
      const d = new Date(date);
      let month = (d.getMonth() + 1).toString();
      let day = d.getDate().toString();
      const year = d.getFullYear();

      if (month.length < 2) {
        month = `0${month}`;
      }
      if (day.length < 2) {
        day = `0${day}`;
      }

      return `${year}-${month}-${day}`;
      // }
    };
    const submitForm = async (values: any) => {
      const requestQueen = [0].map(async (item) => {
        const data = await submitTime({
          ...values,
          startTime: `${getYYMMDD(value)} ${time}:00`,
          endTime: `${getYYMMDD(value)} ${endTime}:00`,
          // dayOfWeek: Number(item),
          // time: translateTime(time, endTime),
        });
        return data;
      });
      Promise.all(requestQueen)
        .then((res) => {
          console.log(res, 'res');
          // if(res.every((item)=>item.code===200))
          if (res.some((item) => item.message !== 'success')) {
            Toast.fail(`${t('添加失败')}`);
          } else {
            Toast.success(`${t('添加成功')}`);
          }
          // if(res.)
          // Toast.success(`${t('添加成功')}`);
        })
        .catch((err) => {
          Toast.fail(`${t('添加失败')}`);
        });
    };
    return (
      <div className="w-full space-y-4 youni-form">
        <CCourseInput
          change={(val) => {
            handleChange(val.label, 'name');
          }}
          value={data?.name}
          title={`${t('日程名称')}`}
          isNess
        ></CCourseInput>

        <div className="w-full h-12 p-4 bg-white rounded-lg">
          <div className="flex items-center justify-between h-full space-x-4">
            <div className="flex items-center">
              <NessIcon className="mr-1"></NessIcon>
              <div>{`${t('日期')}`}</div>
            </div>
            <div className="youni-form">
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
                      placeholder={`${t('请选择日期')}`}
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
              <div>{`${t('开始时间')}`}</div>
            </div>
            <div>
              <DatetimePicker
                popup={{
                  round: true,
                }}
                title=""
                defaultValue="12:00"
                type="time"
                minHour="7"
                maxHour="24"
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
            <div className="flex items-center">
              <div>{`${t('结束时间')}`}</div>
            </div>
            <div>
              <DatetimePicker
                popup={{
                  round: true,
                }}
                title=""
                defaultValue="12:00"
                type="time"
                minHour="7"
                maxHour="24"
                value={endTime}
                onConfirm={setEndTime}
              >
                {(val, _, actions) => {
                  return (
                    <Field
                      readOnly
                      clickable
                      label=""
                      value={val}
                      placeholder={`${t('请选择日期')}`}
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
            <div>{`${t('颜色')}`}</div>

            <CCourseColor
              value={data?.color}
              setColor={(val) => {
                handleChange(val, 'color');
              }}
            ></CCourseColor>
          </div>
        </div>
        <div className="flex justify-center mx-10 space-x-4">
          <div
            onClick={() => {
              router.back();
            }}
            className="flex items-center justify-center w-full text-[#FFD036] font-semibold bg-[#FFFCF3] h-10 rounded-lg"
          >
            {`${t('关闭')}`}
          </div>
          <div
            onClick={() => {
              submitForm(timetable);
            }}
            className="flex items-center text-[#8C6008] font-semibold justify-center w-full bg-[#FFD036] h-10 rounded-lg"
          >
            {`${t('编辑日程')}`}
          </div>
        </div>
      </div>
    );
  };

  const headerMenuList = [
    {
      label: `${t('编辑日程')}`,
    },
  ];
  const [value, setValue] = useState(dayTimeData?.data);
  return (
    <CommonLayout className="p-0 mb-10">
      <Header title={`${t('添加')}`}></Header>
      <HeaderMenu headerMenuList={headerMenuList}></HeaderMenu>
      <div className="p-4">
        <AddDaySchedule
          data={dayTimeData?.data}
          value={value}
          setValue={setValue}
        ></AddDaySchedule>
      </div>
    </CommonLayout>
  );
}
