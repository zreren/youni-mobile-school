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
import useCurriculum from '@/hooks/useCurriculum';
import useRequest from '@/libs/request';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CCourseTime = (props) => {
  return (
    <div className="w-full text-center rounded-md bg-bg text-blueTitle">
      {props.title}
    </div>
  );
};

const CCourseColor = ({ setColor }) => {
  const [select, setSelect] = useState(1);
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

const dayOfWeekList = [
  {
    label: '周日',
    value: '0',
  },
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
];

export default function AddSchedule() {
  const router = useRouter();
  const [CourseId, setCourseId] = useState();
  const { data: campusData } = useFetch(`/campus/query`, 'get', {
    params: {
      name: router.query.campus,
    },
  });
  const fetchData = (e) => {
    setCourseId(e);
  };

  const {t} = useTranslation()
  const submitCourse = async (values: any) => {
    const { data } = await instance.post('/api/curriculum/item/create', values);
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
  }
  const CCourseInput = (props: CCourseInput) => {
    const { title, isNess, children, data, renderData } = props;
    // if(!)
    const selectItem = (e) => {
      console.log(e,data, 'selectItem');
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
          if (value.code === e) {
            props.change({
              id: value.id,
              label: value.code,
            });
            console.log(value," !Object?.values(data)?.some")
            return true;
          }
          return false;
        })
      )
      if (
        !Object?.values(data)?.some((value: any) => {
          if (value.ename === e) {
            props.change({
              id: value.id,
              label: value.ename,
            });
            console.log(value," !Object?.values(data)?.some")
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
              console.log(value," !Object?.values(data)?.some")
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
                    console.log(e.target.value,'event')
                    selectItem(e.target.value);
                  }}
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
    const { register, handleSubmit } = useForm({
      shouldUseNativeValidation: true,
    });
    const [value, setValue] = useState(new Date());
    const [time, setTime] = useState('10:00');
    const [endTime, setEndTime] = useState('12:00');
    const [timetable, setTimetable] = useState({
      name: '',
      color: null,
    });
    const handleChange = useCallback((val: any, name: string) => {
      setTimetable((preVal: any) => {
        return {
          ...preVal,
          [name]: val,
        };
      });
    }, []);
    const submitTime = async (values) => {
      console.log(values, 'submit values');
      if (values.name && values.color && values.startTime && values.endTime) {
        const { data } = await useRequest.post('/api/timetable/create', values);
        return data;
      } else {
        Toast.fail('请填写完整信息');
        return;
      }
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
      console.log(values, 'submit values');
      // const requestQueen = [0].map(async (item) => {
      const data = await submitTime({
        ...values,
        startTime: `${getYYMMDD(value)} ${time}:00`,
        endTime: `${getYYMMDD(value)} ${endTime}:00`,
        // dayOfWeek: Number(item),
        // time: translateTime(time, endTime),
      });
      // if()
      console.log(data, 'getYYMMDDdata');
      // return data;
      // });
      if (data?.message === 'success') {
        Toast.success('添加成功');
      } else {
        Toast.fail('添加失败');
      }
      // Promise.all(requestQueen)
      //   .then((res) => {
      //     console.log(res, 'res');
      //     // if(res.every((item)=>item.code===200))
      //     if (res.some((item) => item.message !== 'success')) {
      //       Toast.fail('添加失败');
      //     } else {
      //       Toast.success('添加成功');
      //     }
      //     // if(res.)
      //     // Toast.success('添加成功');
      //   })
      //   .catch((err) => {
      //     Toast.fail('添加失败');
      //   });
    };
    return (
      <div className="w-full space-y-4 youni-form">
        <CCourseInput
          change={(val) => {
            handleChange(val.label, 'name');
          }}
          title="日程名称"
          isNess
        ></CCourseInput>
        <div className="w-full h-12 p-4 bg-white rounded-lg">
          <div className="flex items-center justify-between h-full space-x-4">
            <div className="flex items-center">
              <NessIcon className="mr-1"></NessIcon>
              <div>日期</div>
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
              <div>开始时间</div>
            </div>
            <div>
              <DatetimePicker
                popup={{
                  round: true,
                }}
                title=""
                defaultValue="10:00"
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
              <div>结束时间</div>
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
            <CCourseColor
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
            className="flex items-center justify-center w-full text-[#FFD036] font-semibold   bg-[#FFFCF3] h-10 rounded-lg"
          >
            关闭
          </div>
          <div
            onClick={() => {
              submitForm(timetable);
            }}
            className="flex items-center text-[#8C6008] font-semibold justify-center w-full bg-[#FFD036] h-10 rounded-lg"
          >
            添加日程
          </div>
        </div>
      </div>
    );
  };
  const { defaultCurriculum } = useCurriculum();
  const AddCourse = (props) => {
    const [dayOfWeek, setDayOfWeek] = useState([]);
    const [dayOfWeekListData, setDayOfWeekListData] = useState({
      1: { label: '星期一', startTime: '', endTime: '' },
      2: { label: '星期二', startTime: '', endTime: '' },
      3: { label: '星期三', startTime: '', endTime: '' },
      4: { label: '星期四', startTime: '', endTime: '' },
      5: { label: '星期五', startTime: '', endTime: '' },
      6: { label: '星期六', startTime: '', endTime: '' },
      0: { label: '星期日', startTime: '', endTime: '' },
    });
    const [time, setTime] = useState();
    const [endTime, setEndTime] = useState();
    const [CURRICULUM, setCURRICULUM] = useState({
      name: '',
      color: null,
      period: 0,
      dayOfWeek: [],
      classroom: '',
      courseId: null,
      sectionId: null,
      sectionName: null,
      professorName: '',
    });
    const { data: courseDetailData } = useFetch(
      `/course/detail?id=${CURRICULUM.courseId}`,
      'get',
    );
    const courseFormat = useMemo(() => {
      return courseDetailData?.data?.sections.slice().filter((item) => {
        return item.id === CURRICULUM.sectionId;
      })[0];
    }, [CURRICULUM.sectionId]);
    const campusId = React.useMemo(
      () => campusData?.data[0]?.id,
      [campusData, router],
    );
    const { data: _courseFormat } = useFetch(
      `/course_mode/list?campusId=${campusId}`,
      'get',
    );
    const [value, setValue] = React.useState<Dayjs | null>(null);
    const { data: _courseData } = useFetch('/course/query', 'page', {
      campusId: campusId,
      pageSize: 100,
    });
    const courseData = useMemo(() => {
      return _courseData
        ? courseData
          ? [...courseData].concat(..._courseData)
          : [].concat(..._courseData)
        : [];
    }, [_courseData]);
    const handleChange = useCallback((val: any, name: string) => {
      setCURRICULUM((preVal: any) => {
        return {
          ...preVal,
          [name]: val,
        };
      });
    }, []);
    const translateTime = (time, endTime) => {
      if (!time || !endTime) return;
      // time:"12:00-18:00 转 time:"12.00-18.00
      const timeArr = time?.split(':');
      const endTimeArr = endTime?.split(':');
      const timeStr = timeArr?.join('.');
      const endTimeStr = endTimeArr.join('.');
      return `${timeStr}-${endTimeStr}`;
    };
    const submitForm = async (values: any) => {
      if (!values || !values.name || !values.color || !dayOfWeek) {
        Toast.fail('请填写完整信息');
        return;
      }
      // if (time === endTime) {
      //   Toast.fail('开始时间和结束时间不能相同');
      //   return;
      // }
      const requestQueen = dayOfWeek.map(async (item) => {
        if (dayOfWeekListData?.[item].startTime === dayOfWeekListData?.[item].endTime) {
          Toast.fail('开始时间和结束时间不能相同');
          return;
        }
        const data = await submitCourse({
          ...values,
          dayOfWeek: Number(item),
          time: {
            start: dayOfWeekListData?.[item].startTime,
            end: dayOfWeekListData?.[item].endTime,
          },
          curriculumId: defaultCurriculum.id,
          // translateTime(time, endTime),
        });
        return data;
      });
      Promise.all(requestQueen)
        .then((res) => {
          console.log(res, 'res');
          // if(res.every((item)=>item.code===200))
          if (res.some((item) => item.message !== 'success')) {
            Toast.fail('添加失败');
          } else {
            Toast.success('添加成功');
          }
          // if(res.)
          // Toast.success('添加成功');
        })
        .catch((err) => {
          Toast.fail('添加失败');
        });
    };
    return (
      <div className="w-full space-y-4 pb-10">
        <CCourseInput
          title={t("课程名称")}
          isNess
          change={(val) => {
            handleChange(val.label, 'name');
            handleChange(val.id, 'courseId');
          }}
          renderData={courseData?.map((item) => item?.code)}
          data={courseData}
        ></CCourseInput>
        <div>{CourseId}</div>
        <div className="w-full pl-2 pr-2 bg-white rounded-lg">
          <label className="w-full h-24 ">
            <div className="w-full p-3">
              {' '}
              <span className="flex items-center text-sm font-medium bg-white text-blueTitle">
              <NessIcon className="mr-1"></NessIcon>{t("上课日期")}
              </span>
            </div>
            <div className="flex youni-form w-full pb-4 pl-4 pr-4 ">
              <Selector
                options={dayOfWeekList}
                style={{
                  '--rv-selector-border-radius': '4px',
                  '--rv-selector-color': 'rgba(55, 69, 92, 0.04)',
                  '--rv-selector-checked-border':
                    'solid var(--adm-color-primary) 1px',
                  '--rv-selector-padding': '4px 4px',
                  '--rv-selector-checked-text-color': 'white',
                }}
                value={dayOfWeek}
                defaultValue={['2']}
                multiple={true}
                showCheckMark={false}
                onChange={(arr, extend) => {
                  setDayOfWeek(arr);
                  console.log(arr, dayOfWeek);
                }}
              />
            </div>
          </label>
        </div>
        {dayOfWeek?.map((item) => {
          return (
            <div className="p-4 bg-white rounded-lg pb-2">
              <div className="flex space-x-1 items-center">
                <div className="bg-[#FFC400] rounded-full w-1 h-4"></div>
                <div className="text-sm text-blueTitle">
                  {dayOfWeekList[item].label}
                </div>
              </div>
              <div className="w-full h-10 ">
                <div className="flex youni-form items-center justify-between h-full space-x-4">
                  <div className="flex items-center">
                    <NessIcon className="mr-1"></NessIcon>
                    <div className="text-sm text-blueTitle">{t("开始时间")}</div>
                  </div>
                  <div>
                    <DatetimePicker
                      popup={{
                        round: true,
                      }}
                      title=""
                      defaultValue="10:00"
                      type="time"
                      minHour="10"
                      maxHour="20"
                      value={dayOfWeekListData[item].startTime}
                      onConfirm={(val) => {
                        const newDayOfWeekList = { ...dayOfWeekListData };
                        dayOfWeekListData[item].startTime = val;
                        setDayOfWeekListData(newDayOfWeekList);
                      }}
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
              <div className="w-full h-10  ">
                <div className="flex youni-form items-center justify-between h-full space-x-4">
                  <div className="flex items-center">
                    <NessIcon className="mr-1"></NessIcon>
                    <div className="text-sm text-blueTitle">{t('结束时间')}</div>
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
                      value={dayOfWeekListData[item].endTime}
                      onConfirm={(val) => {
                        const newDayOfWeekList = { ...dayOfWeekListData };
                        dayOfWeekListData[item].endTime = val;
                        setDayOfWeekListData(newDayOfWeekList);
                      }}
                    >
                      {(val, _, actions) => {
                        return (
                          <Field
                            readOnly
                            clickable
                            label=""
                            value={val}
                            placeholder={t('请选择日期')}
                            onClick={() => actions.open()}
                          />
                        );
                      }}
                    </DatetimePicker>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <CCourseInput
          title="Section"
          change={(val) => {
            handleChange(val.label, 'sectionName');
            handleChange(val.id, 'sectionId');
          }}
          data={courseDetailData?.data?.sections}
          renderData={courseDetailData?.data?.sections?.map(
            (item) => item.name,
          )}
        ></CCourseInput>
        <CCourseInput
          title={t('课程形式')}
          change={(val) => {
            handleChange(val.label, 'mode');
          }}
          data={_courseFormat?.data}
          renderData={_courseFormat?.data?.map(
            (item) => item[useLanguage('name')],
          )}
        ></CCourseInput>
        <CCourseInput
            title={t('教授')}
          change={(val) => {
            handleChange(val.label, 'professorName');
            // handleChange(val.id, 'courseId');
          }}
          data={courseFormat?.professors}
          renderData={courseFormat?.professors?.map((item) => item.name)}
        ></CCourseInput>
        <CCourseInput
            title={t('教室')}
          change={(val) => {
            console.log(val, 'classroom');
            handleChange(val.label, 'classroom');
          }}
        ></CCourseInput>
        <div className="w-full h-12 p-4 bg-white rounded-lg">
          <div className="flex items-center justify-between h-full space-x-4">
          <div className="text-xs text-blueTitle">{t('单双周')}</div>
            <div className="w-[250px] h-full flex items-center justify-end pr-1 rounded-lg">
              <div className="border-[#DCDDE1] border  overflow-hidden  rounded-lg  h-[28px]   flex ">
                <div
                  onClick={() => {
                    handleChange(0, 'period');
                  }}
                  className={classnames(
                    'w-full  flex justify-center px-2 items-center text-center text-[#A9B0C0]',
                    {
                      'bg-slate-50 text-[#FFD036]': CURRICULUM.period === 0,
                    },
                  )}
                >
                  {t('全部')}
                </div>
                <div
                  onClick={() => {
                    handleChange(1, 'period');
                  }}
                  className={classnames(
                    'w-full  flex justify-center px-2 items-center text-center text-[#A9B0C0]',
                    {
                      'bg-slate-50 text-[#FFD036]': CURRICULUM.period === 1,
                    },
                  )}
                >
                   {t('单周')}
                </div>
                <div
                  onClick={() => {
                    handleChange(2, 'period');
                  }}
                  className={classnames(
                    'w-full rounded-none flex  px-2 justify-center whitespace-nowrap items-center text-center text-[#A9B0C0]',
                    {
                      'bg-slate-50 text-[#FFD036]': CURRICULUM.period === 2,
                    },
                  )}
                >
                  {t('双周')}
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-12 p-4 bg-white rounded-lg">
          <div className="flex items-center justify-between h-full space-x-4">
          <div className="text-sm text-blueTitle">{t("颜色")}</div>
            <CCourseColor
              setColor={(val) => {
                console.log(val), handleChange(val, 'color');
              }}
            ></CCourseColor>
          </div>
        </div>
        <div className="flex justify-center mx-10 space-x-4">
          <div
            onClick={() => {
              router.back();
            }}
            className="flex items-center
          justify-center w-full text-[#FFD036]
          font-semibold   bg-[#FFFCF3] h-10 rounded-lg"
          >
            {t('关闭')}
          </div>
          <div
            onClick={() => {
              submitForm(CURRICULUM);
            }}
            className="flex items-center text-[#8C6008]
          font-semibold justify-center w-full bg-[#FFD036]
          h-10 rounded-lg"
          >
            {t("添加课程")}
          </div>
        </div>
      </div>
    );
  };

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
  const [value, setValue] = useState();
  return (
    <CommonLayout className="p-0 mb-10">
      <Header title={t("添加")}></Header>
      <HeaderMenu
        id={id}
        switchMenu={(val) => {
          setMenu(val);
        }}
        headerMenuList={headerMenuList}
      ></HeaderMenu>
      <div className="p-4">
        {menu === 0 ? (
          <AddCourse fetchData={fetchData}></AddCourse>
        ) : (
          <AddDaySchedule value={value} setValue={setValue}></AddDaySchedule>
        )}
      </div>
    </CommonLayout>
  );
}


export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
