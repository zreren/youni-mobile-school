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

const CCourseTime = (props) => {
  return (
    <div className="w-full text-center rounded-md bg-bg text-blueTitle">
      {props.title}
    </div>
  );
};

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
  useEffect(()=>{
    // if(!colorId) return;
    console.log(colorId,"colorId")
    setSelect(colorId?.id)
    // setSelect(colorId?.id)
    // setColor(colorId?.dark);
  },[colorId])
  const [select, setSelect] = useState(colorId?.id);
  return (
    <div className="flex space-x-2">
      {colorList?.map((item) => {
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
    value: '0',
  },
];

export default function AddSchedule(props) {
  const router = useRouter();
  const [CourseId, setCourseId] = useState();
  const fetchData = (e) => {
    setCourseId(e);
  };
  const { data: courseData, mutate } = useFetch('/curriculum/item/detail', 'get', {
    id: router.query.id,
  });
  const submitCourse = async (values: any) => {
    const { data } = await instance.post('/api/curriculum/update', values);
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
    value?: string;
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
              value={value}
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
                  InputProps={{
                    ...params.InputProps,
                    disableUnderline: true,
                    endAdornment: null,
                  }}
                  value={value}
                />
              )}
            />
          )}
        </label>
      </div>
    );
  };

  const AddCourse = (props) => {
    const { data } = props;
    useEffect(() => {
      if (!data) {
        mutate();
        return;
      }
      console.log(data, 'datasetCURRICULUM');
      setCURRICULUM(data);
    }, [data]);
    const [time, setTime] = useState<any>();
    const [endTime, setEndTime] = useState<any>();
    interface Curriculum {
      id: number;
      name: string;
      curriculum: any[]; // curriculum属性可能包含任何类型的数组
      isShare: boolean;
      createdAt: string;
      updatedAt: string;
    }
    const [CURRICULUM, setCURRICULUM] = useState({
      name: '',
      color: null,
      period: 0,
      dayOfWeek: [],
      classroom: '',
      mode: '',
      courseId: null,
      sectionId: null,
      sectionName: null,
      professorName: '',
      time:{
        start:'',
        end:''
      },
      curriculum:{
        id:null,
      }
      // time:''
    });
    const [dayOfWeek, setDayOfWeek] = useState([String(data?.dayOfWeek)]);
    const timeStr = useMemo(()=>{
      return CURRICULUM.time.start + '-' + CURRICULUM.time.end
    },[CURRICULUM])
    const timeSpirit = useMemo(()=>{
      console.log(CURRICULUM.time,"courseTime")
      if(!CURRICULUM.time) return ["7:00","7:00"];
        const pattern =  /^(\d{1,2}:\d{2})-(\d{1,2}:\d{2})$/;
        const match = timeStr?.match(pattern);
        console.log(match,"match")
        if (!match) return ["7:00","7:00"];
        return [match[1], match[2]];
    },[CURRICULUM])
    useEffect(()=>{
      console.log(timeSpirit,"timeSpirit")
      setTime(timeSpirit[0]);
      setEndTime(timeSpirit[1]);
    },[timeSpirit])
    const { data: courseDetailData } = useFetch(
      `/course/detail?id=${CURRICULUM?.courseId}`,
      'get',
    );
    const courseFormat = useMemo(() => {
      return courseDetailData?.data?.sections.slice().filter((item) => {
        return item.id === CURRICULUM?.sectionId;
      })[0];
    }, [CURRICULUM?.sectionId]);

    const [value, setValue] = React.useState<Dayjs | null>(null);
    const { data: _courseData } = useFetch('/course/query?campusId=1',  'page',{
      pageSize: 100
    });
    const handleChange = useCallback((val: any, name: string) => {
      setCURRICULUM((preVal: any) => {
        return {
          ...preVal,
          [name]: val,
        };
      });
    }, []);

    const courseData = React.useMemo(
      () =>
        _courseData
          ? courseData
            ? [...courseData].concat(..._courseData)
            : [].concat(..._courseData)
          : null,
      [_courseData]
    );

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
      if(dayOfWeek.length > 1){
        Toast.fail('编辑模式只能添加一天的课程');
        return;
      }
      const requestQueen = dayOfWeek?.map(async (item) => {
        const data = await submitCourse({
          ...values,
          id: CURRICULUM?.curriculum.id,
          dayOfWeek: Number(item),
          time: translateTime(time, endTime),
        });
        return data;
      });
      Promise.all(requestQueen)
        .then((res) => {
          console.log(res, 'res');
          // if(res.every((item)=>item.code===200))
          if (res.some((item) => item.message !== 'success')) {
            Toast.fail('编辑失败');
          } else {
            Toast.success('编辑成功');
          }
          // if(res.)
          // Toast.success('添加成功');
        })
        .catch((err) => {
          Toast.fail('编辑失败');
        });
    };
    return (
      <div className="w-full space-y-4">
        <CCourseInput
          title="课程名称"
          isNess
          value={CURRICULUM?.name}
          change={(val) => {
            handleChange(val.label, 'name');
            handleChange(val.id, 'courseId');
          }}
          renderData={courseData?.data?.map((item) => item.ename)}
          data={courseData?.data}
        ></CCourseInput>
        <div>{CourseId}</div>
        <div className="w-full pl-2 pr-2 bg-white rounded-lg">
          <label className="w-full h-24 ">
            <div className="w-full p-3">
              {' '}
              <span className="flex items-center text-sm font-medium bg-white text-blueTitle">
                <NessIcon className="mr-1"></NessIcon>上课日期
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
        <div className="w-full h-12 p-4 bg-white rounded-lg">
          <div className="flex youni-form items-center justify-between h-full space-x-4">
            <div className="flex items-center">
              <NessIcon className="mr-1"></NessIcon>
              <div className="text-sm text-blueTitle">开始时间</div>
            </div>
            <div>
              <DatetimePicker
                popup={{
                  round: true,
                }}
                title=""
                defaultValue={timeSpirit[0]}
                type="time"
                minHour="7"
                maxHour="20"
                value={time}
                onConfirm={(val) => {
                  setTime(val);
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
        <div className="w-full h-12 p-4 bg-white rounded-lg">
          <div className="flex youni-form items-center justify-between h-full space-x-4">
            <div className="flex items-center">
              <NessIcon className="mr-1"></NessIcon>
              <div className="text-sm text-blueTitle">结束时间</div>
            </div>
            <div>
              <DatetimePicker
                popup={{
                  round: true,
                }}
                title=""
                defaultValue={timeSpirit[1]}
                type="time"
                minHour="7"
                maxHour="20"
                value={endTime}
                onConfirm={(val) => {
                  setEndTime(val);
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
        <CCourseInput
          title="Section"
          value={CURRICULUM?.sectionName}
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
          title="课程形式"
          value={CURRICULUM?.mode}
          change={(val) => {
            handleChange(val.label, 'mode');
          }}
          data={courseFormat?.mode}
          renderData={courseFormat?.mode?.map(
            (item) => item[useLanguage('name')],
          )}
        ></CCourseInput>
        <CCourseInput
          title="教授"
          value={CURRICULUM?.professorName}
          change={(val) => {
            handleChange(val.label, 'professorName');
            // handleChange(val.id, 'courseId');
          }}
          data={courseFormat?.professors}
          renderData={courseFormat?.professors?.map((item) => item.name)}
        ></CCourseInput>
        <CCourseInput
          title="教室"
          value={CURRICULUM?.classroom}
          change={(val) => {
            console.log(val, 'classroom');
            handleChange(val.label, 'classroom');
          }}
        ></CCourseInput>
        <div className="w-full h-12 p-4 bg-white rounded-lg">
          <div className="flex items-center justify-between h-full space-x-4">
            <div className="text-xs text-blueTitle">单双周</div>
            <div className="w-[250px] h-full flex items-center justify-end pr-1 rounded-lg">
              <div className="border-[#DCDDE1] border  overflow-hidden  rounded-lg  h-[28px]   flex ">
                <div
                  onClick={() => {
                    handleChange(0, 'period');
                  }}
                  className={classnames(
                    'w-full  flex justify-center px-2 items-center text-center text-[#A9B0C0]',
                    {
                      'bg-slate-50 text-[#FFD036]': CURRICULUM?.period === 0,
                    },
                  )}
                >
                  全部
                </div>
                <div
                  onClick={() => {
                    handleChange(1, 'period');
                  }}
                  className={classnames(
                    'w-full  flex justify-center px-2 items-center text-center text-[#A9B0C0]',
                    {
                      'bg-slate-50 text-[#FFD036]': CURRICULUM?.period === 1,
                    },
                  )}
                >
                  单周
                </div>
                <div
                  onClick={() => {
                    handleChange(2, 'period');
                  }}
                  className={classnames(
                    'w-full rounded-none flex  px-2 justify-center whitespace-nowrap items-center text-center text-[#A9B0C0]',
                    {
                      'bg-slate-50 text-[#FFD036]': CURRICULUM?.period === 2,
                    },
                  )}
                >
                  双周
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-12 p-4 bg-white rounded-lg">
          <div className="flex items-center justify-between h-full space-x-4">
            <div className="text-sm text-blueTitle">颜色</div>
            <CCourseColor
              value={CURRICULUM?.color}
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
            关闭
          </div>
          <div
            onClick={() => {
              submitForm(CURRICULUM);
            }}
            className="flex items-center text-[#8C6008]
          font-semibold justify-center w-full bg-[#FFD036]
          h-10 rounded-lg"
          >
            编辑课程
          </div>
        </div>
      </div>
    );
  };

  const menuList = [AddCourse];

  let id = 0;
  // if (!id) {
  //   id = 0;
  // }
  console.log(id, 'addid');
  const headerMenuList = [
    {
      label: '编辑课程',
    },
  ];
  const [menu, setMenu] = useState(id);
  const [value, setValue] = useState();
  return (
    <CommonLayout className="p-0 mb-10">
      <Header title="课程表"></Header>
      <HeaderMenu
        id={id}
        switchMenu={(val) => {
          setMenu(val);
        }}
        headerMenuList={headerMenuList}
      ></HeaderMenu>
      <div className="p-4">
        <AddCourse data={courseData?.data} fetchData={fetchData}></AddCourse>
      </div>
    </CommonLayout>
  );
}
