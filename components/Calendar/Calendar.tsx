import FullCalendar from '@fullcalendar/react'; // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid'; // a plugin!
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import CommonLayout from '../Layout/CommonLayout';
import { styled } from '@mui/material/styles';
import interactionPlugin from '@fullcalendar/interaction';
import React, { useMemo } from 'react';
import './index.module.css';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import Icon from './Icon';
import BgSVG from './bg.svg';
import classnames from 'classnames';
import Polygon from './polygon.svg';
import ArrowRight from './arrow-right.svg';
import { createRef, useEffect, useRef, useState } from 'react';
import Location from './location';
import TimeIconActive from './icon_time';
import SaveToLibButton from '@/components/Button/SaveToLibButton';
import useLanguage from '@/hooks/useLanguage';
import useLocalStorage from '@/hooks/useStore';
import type { CourseData } from '@/types/course';
import { useTranslation } from 'next-i18next';

// import { url } from 'inspector';

function Calendar(props) {
  const {t} = useTranslation()

  interface Event {
    dayOfWeek: number;
    // other properties
  }
  function formatTimestamps(startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    return `${start.getUTCHours() + 8}.${start.getUTCMinutes()}-${
      end.getUTCHours() + 8
    }.${end.getUTCMinutes()}`;
  }

  /**
   * @description 获取星期几
   * @param date 2023-02-04T01:00:00.000Z
   * @returns 0-6
   */
  const getDayOfWeek = (date) => {
    // date是这样的格式，返回对应的星期几，星期日是0，星期一是1，星期六是6
    const day = new Date(date).getUTCDay();
    return day;
  };

  /**
   * @description 时间格式转换
   * @param _date 2023-02-04T01:00:00.000Z
   * @returns '2023-01-29T11:30:00'
   */
  const translateTimeFormat = (_date) => {
    // "2023-02-04T01:00:00.000Z" to '2023-01-29T11:30:00'
    const date = new Date(_date);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  /**
   * @description 日程表转课程表数据转换
   * @param {Array} props.timeTable
   * @returns {Array}
   */
  const timeTable = useMemo(() => {
    if (!props.timeTable) return [];
    return props?.timeTable?.slice().map((item) => {
      return {
        ...item,
        name: item.name,
        sectionName: '',
        dayOfWeek: getDayOfWeek(item.startTime),
        period: 0,
        time: formatTimestamps(item.startTime, item.endTime),
        classroom: '日程',
        color: item.color,
        term: null,
        section: null,
        title: item.name,
        extendedProps: {
          section: '',
          department: '日程',
        },
        start: translateTimeFormat(item.startTime),
        end: translateTimeFormat(item.endTime),
        description: '',
        borderColor: 'rgba(58,102,255,1)',
        textColor: 'rgba(58,102,255,1)',
        backgroundColor: 'rgb(235,240,255)',
      };
    });
  }, [props.timeTable]);

  const days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];
  const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
  }));
  const Card = (props) => {
    const { title, extendedProps, dayOfWeek, students, color } = props;
    const rgba = (hex, opacity) => {
      hex = hex.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      const result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
      console.log(result, 'result');
      return result;
    };
    const background = `linear-gradient(180deg, ${rgba(
      color,
      0.1,
    )} -117.9%, #FFFFFF 125.31%)`;
    return (
      <div className="w-full p-4  my-3 bg-white rounded-lg h-[176px]">
        <div
          style={{ background: background, borderColor: color }}
          className="flex justify-between w-full h-20 p-4 border  rounded-2xl"
        >
          <div style={{ color: color }}>
            <div className="flex items-center">
              {' '}
              <div
                style={{ background: color }}
                className={classnames(
                  'w-1 h-4 mr-2 text-lg font-medium  rounded-full',
                )}
              ></div>
              <div>{title}</div>
            </div>
            <div className="mt-2 text-xs font-normal">
              {' '}
              Section {extendedProps?.section?.name}{' '}
              {extendedProps?.online ? '线上课程' : '线下课程'}
            </div>
          </div>
          <div className="flex flex-col items-end w-1/2">
            <div className="-space-x-2 avatar-group">
              {students?.slice(0, 3).map((item, index) => {
                return (
                  <div className="avatar border-[1px]">
                    <div className="w-6">
                      <img src={`${Cons.BASEURL}${item.avatar}`} />
                    </div>
                  </div>
                );
              })}
              {/* <div className="avatar border-[1px]">
                <div className="w-6">
                  <img src="https://placeimg.com/192/192/people" />
                </div>
              </div> */}
              {/* <div className="border avatar placeholder">
                  <div className="w-6 bg-neutral-focus text-neutral-content">
                    <span>+</span>
                  </div>
                </div> */}
            </div>
            <div className="text-xs text-[#798195]">
              {students?.length > 0 ? `${students?.length}名同学` : null}
            </div>
          </div>
        </div>
        <div className="mt-4 pb-4">
          <div className="mb-2">
            <div className="flex items-center">
              <TimeIconActive color={color}></TimeIconActive>
              <div className="ml-3 text-sm text-gray-400 w-10">
                {useLanguage('l') === 'el'
                  ? '周' + dayOfWeek
                  : '周' + dayOfWeek}
              </div>
              <div className="ml-8 text-sm text-gray-400 ">
                {extendedProps.time}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <Location color={color}></Location>
            <div className="ml-3 text-sm text-gray-400 w-10">地点</div>
            <div className="ml-8 text-sm text-gray-400 ">
              {extendedProps.classroom}
            </div>
          </div>
        </div>
      </div>
    );
  };

  /**
   * @description 将对象数组根据时间放进timeArray中生成新的数组
   * @param timeArray {string[]}
   * @param dataObject {object}
   * @returns
   */
  function generateNewArray(timeArray: string[], dataObject: object) {
    if (!dataObject) return [];
    const newArray = [];
    timeArray.forEach((time) => {
      const children = dataObject[timeArray.indexOf(time)];
      if (children) {
        newArray.push({
          time: time,
          children: children,
        });
      }
    });
    return newArray;
  }

  /**
   * @description 将课程数据按照时间分组
   * @param timeArray {string[]}
   */
  const groupedEvents: { [day: string]: Event[] } = props?.courseData?.reduce(
    (acc, event) => {
      const day = event.dayOfWeek;
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(event);
      return acc;
    },
    {},
  );

  /**
   * @description 将日程数据按照时间分组
   * @param timeArray {string[]}
   */
  const dayTimeEvents = timeTable.reduce((acc, event) => {
    const day = event.dayOfWeek;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(event);
    return acc;
  }, {});

  /**
   * @description 获取本周日期
   * @returns {string[]} 本周日期
   */
  const getWeekDates = () => {
    const weekDates = [];
    const currentDate = new Date();
    const day = currentDate.getUTCDay();
    const diff = currentDate.getUTCDate() - day;
    for (let i = 0; i < 1; i++) {
      const newDate = new Date(currentDate.setUTCDate(diff + i));
      const dateString = newDate.toISOString().slice(0, 10);
      weekDates.push(dateString);
    }
    const weekDates2 = [weekDates[0]];
    const startDate = new Date(weekDates[0]);
    for (let i = 1; i <= 6; i++) {
      const nextDate = new Date(startDate);
      nextDate.setDate(startDate.getDate() + i);
      weekDates2.push(nextDate.toISOString().split('T')[0]);
    }
    return weekDates2;
  };

  /**
   * @description 判断日期是否是今天
   * @param dateString 日期字符串
   * @returns  {boolean} 是否是今天
   */
  function isToday(dateString: string) {
    let date = new Date(dateString);
    let today = new Date();
    return date.toDateString() === today.toDateString();
  }

  /**
   * @description 列表视图
   * @returns {JSX.Element}
   */
  const ListView = () => {
    const colorMap = ['#FFD036', '#798195', '#FF7978'];
    const YearCard = (props) => {
      const { title } = props;
      return (
        <div className="flex  p-4 card-shadow items-center my-4 justify-between bg-white w-full h-20 rounded-lg">
          <div className="space-y-2">
            <div className="flex items-center  space-x-2 ">
              <div className="text-xs font-medium text-[#13C2C2] h-5 rounded whitespace-nowrap bg-[#E6FFFB] px-[6px] py-1">
                校历
              </div>
              <div className="text-[#37455C] text-sm font-semibold overflow-wrap">
                {title ||
                  'Last date to announce components of final grades (TERM F)'}
              </div>
            </div>
            <div className="text-[#A9B0C0] text-xs ">2022年9月7日</div>
          </div>
          <div>
            {' '}
            <ArrowRight></ArrowRight>
          </div>
        </div>
      );
    };
    const Dayliy = (props) => {
      const { title, data } = props;
      const Time = new Date(data.start);
      const dateTime =
        Time.getUTCFullYear() + Time.getUTCMonth() + Time.getUTCDate();
      return (
        <div className="flex p-4 card-shadow items-center my-4 justify-between bg-white w-full h-20 rounded-lg">
          <div>
            <div className="flex items-center pb-2 space-x-2">
              <div className="text-xs text-[#FAAD14] h-5 rounded whitespace-nowrap bg-[#FFFAE6] px-[6px] py-1">
                日程
              </div>
              <div className="text-[#37455C] text-sm font-semibold">
                {data.title || title || '日程日程日程'}
              </div>
            </div>
            <div className="text-[#A9B0C0] text-xs ">{data.start}</div>
          </div>
          <ArrowRight></ArrowRight>
        </div>
      );
    };
    const Identify = (props) => {
      const { title, index } = props;
      function getDayOfWeek(dateString: string) {
        const date = new Date(dateString);
        const edays = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ];
        const cdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        const days = {
          cdays: cdays,
          edays: edays,
        };
        return days[useLanguage('days')][date.getUTCDay()];
      }
      function getMonthDay(dateString: string) {
        const date = new Date(dateString);
        // Fri Nov 04 2022 08:00:00 GMT+0800 (中国标准时间) 获得月份和日
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        return `${month}-${day}`;
        // console.log(date,"getMonthDaydate")
        // return `${month}-${day}`;
      }
      return (
        <div
          style={{ background: colorMap[index % 3] }}
          className="relative flex items-center justify-between w-full h-12 p-4 pt-0 pb-0 rounded text-gold"
        >
          <div className="flex items-end ">
            <Polygon className="absolute top-0 left-0 h-20"></Polygon>
            <div className="pl-1 font-bold text-white">
              {getDayOfWeek(title)}
            </div>
            <div className="pl-1 text-xs font-light text-white">
              {getMonthDay(title)}
            </div>
          </div>
          <BgSVG className="absolute h-12 scale-125  w-18 right-2"></BgSVG>
        </div>
      );
    };
    const todayItemCount = useMemo(() => {
      console.log(groupedEvents,"groupedEvents")
      return generateNewArray(getWeekDates(), groupedEvents)?.filter(
        (item, index) => {
          console.log(item, 'generateNewArray list item');
          if (setting.view === 'today' && !isToday(item.time)) {
            return;
          }
          return item;
        },
      );
    }, [groupedEvents]);
    useEffect(() => {
      console.log(groupedEvents,dayTimeEvents,mergeObjects([groupedEvents, dayTimeEvents]), 'dayTimeEvents');
    }, [groupedEvents]);
    type ObjectType = { [key: string]: any };
    function mergeObjects(objects: ObjectType[]): ObjectType {
      console.log(objects,"objects,dayTimeEvents")
      if(!objects[1] || !objects[0]) return {}
      return objects.reduce((prev, curr) => {
        Object.keys(curr).forEach((key) => {
          if (Array.isArray(prev[key]) && Array.isArray(curr[key])) {
            prev[key] = prev[key].concat(curr[key]);
          } else if (prev[key] && typeof prev[key] === 'object') {
            prev[key] = mergeObjects([prev[key], curr[key]]);
          } else {
            prev[key] = curr[key];
          }
        });
        return prev;
      }, {});
    }
    return (
      <div className="w-full pb-10  min-h-screen p-5 z-30">
        {generateNewArray(
          getWeekDates(),
          mergeObjects([groupedEvents, dayTimeEvents]),
        ).map((item, index) => {
          console.log(item, 'list item');
          if (setting.view === 'today' && !isToday(item.time)) return null;
          const color = colorMap[index % 3];
          if(!item) return;
          return (
            <>
              <Identify title={item.time} index={index}></Identify>
              {item?.children?.map((item, index) => {
                if (item.type === 2) {
                  return <Dayliy data={item}></Dayliy>;
                }
                return (
                  <Card
                    color={color}
                    title={item?.name}
                    students={item?.section?.user}
                    dayOfWeek={item?.dayOfWeek}
                    extendedProps={{
                      section: { name: item.section?.name },
                      online: true,
                      time: item.time,
                      classroom: item.classroom,
                    }}
                  ></Card>
                );
              })}
            </>
          );
        })}
        {
          <>
            {todayItemCount?.length === 0 && timeTable.length === 0 ? (
              <div className="w-full text-center bg-white rounded-lg p-4 text-[#A9B0C0] text-sm font-medium">
                     {t('今日暂无课程或日程安排')}
              </div>
            ) : null}
            {/* <div className='btn btn-primary w-full '>前往添加</div> */}
          </>
        }
        {/* <Identify></Identify> */}
        {/* <YearCard title="Classes start"></YearCard> */}
      </div>
    );
    // };
  };

  const [setting, setSetting] = useState(props.setting);
  const [customImg, setCustomImg] = useLocalStorage('customImg', '');
  const viewMap = {
    day: 'timeGridWeek',
    week: 'timeGridWeek',
    today: 'dayGrid',
    month: 'dayGridMonth',
  };
  const calendarRef = createRef<any>();
  useEffect(() => {
    if (setting.view === 'today') {
      setView(false);
      return;
    }
    setView(true);
  }, [setting]);
  useEffect(() => {
    setSetting(props.setting);
  }, [props.setting.view]);
  useEffect(() => {
    calendarRef.current.getApi().changeView(viewMap[setting.view]);
    setSetting(setting);
  }, [setting]);
  const day = {
    en: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    cn: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
  };
  const [calendarView, setView] = useState<boolean>(true);

  /**
   * 切换日历视图
   */
  const changeView = () => {
    // if(typeof window === 'undefined') return;
    const body = document.getElementsByClassName(
      'fc-scrollgrid-section-body',
    )[0] as HTMLElement;
    console.log(body.style, 'body style');
    if (body.style.display === '') {
      body.style.display = 'none';
      setView(false);
    } else {
      body.style.display = '';
      setView(true);
    }
  };
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const body = document.getElementsByClassName(
      'fc-scrollgrid-section-body',
    )[0] as HTMLElement;
    if (!calendarView || setting.view === 'today') {
      console.log(body, 'body');
      body.style.display = 'none';
    } else {
      body.style.display = '';
      // body.removeAttribute('style');
    }
  }, [calendarView]);
  useEffect(() => {
    console.log(timeTable, 'timeTable');
  }, [timeTable]);
  const { courseData }: { courseData: CourseData[] } = props;

  const ALLEvents = useMemo(() => {
    // 两个数组合并
    if (!courseData && timeTable) return timeTable;
    if (!timeTable && courseData) return courseData;
    return [...courseData, ...timeTable];
  }, [courseData, timeTable]);

  const TimeTableEvent = (props) => {
    const { arg } = props;
    return (
      <div
        onClick={() => {
          props?.clickEvent(arg);
        }}
        className="flex flex-col overflow-hidden justify-center h-full w-full items-center"
      >
        <svg
          height={'14px'}
          width={'100%'}
          className="z-30 relative"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <text
            font-size="10px"
            x="50%"
            text-anchor="middle"
            y="10"
            fill={arg.textColor}
          >
            {arg.event.title}
          </text>
        </svg>
      </div>
    );
  };
  const CourseEvent = (props) => {
    const { arg } = props;
    const timeGap = useMemo(() => {
      const [start, end] = arg.event.extendedProps.time.split('-');
      const startDate = new Date();
      startDate.setHours(start.split(':')[0], start.split(':')[1]);
      const endDate = new Date();
      endDate.setHours(end.split(':')[0], end.split(':')[1]);
      const diff = endDate.getTime() - startDate.getTime();
      const diffHours = diff / (1000 * 60 * 60);
      return diffHours;
    }, [arg]);
    return (
      <div
        onClick={() => {
          props?.clickEvent(arg);
        }}
        className="flex overflow-hidden flex-col justify-center h-full w-full items-center"
      >
        <svg
          height={'12px'}
          width={'100%'}
          className="z-30 relative"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <text
            font-size="6px"
            x="50%"
            className="font-bold "
            text-anchor="middle"
            y="10"
            fill={arg.textColor}
          >
            {arg.event.title}
          </text>
        </svg>
        {timeGap >= 1 ? (
          <svg
            height={'14px'}
            width={'100%'}
            className="z-30 relative"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
          >
            <text
              className="font-bold  leading-none truncate"
              font-size="7px"
              x="50%"
              text-anchor="middle"
              y="10"
              fill={arg.textColor}
            >
              Section {arg.event.extendedProps?.section?.name}
            </text>
          </svg>
        ) : null}

        {timeGap >= 1.2 ? (
          <svg
            height={'14px'}
            width={'100%'}
            className="z-30 relative"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
          >
            <text
              className="font-bold  leading-none truncate"
              font-size="7px"
              x="50%"
              text-anchor="middle"
              y="10"
              fill={arg.textColor}
            >
              {arg.event.extendedProps.classroom}
            </text>
          </svg>
        ) : (
          // <div className="font-bold leading-none truncate	whitespace-nowrap scale-[0.7]		text-10 ">
          //   {arg.event.extendedProps.classroom}
          // </div>
          ''
        )}
        {/* {} */}
        {timeGap >= 1.5 ? (
          <div className="font-light leading-none	 scale-90	  ">
            {arg.event.extendedProps.online ? '线上' : '线下'}
          </div>
        ) : null}
      </div>
    );
  };
  const DayCourseEvent = (props) => {
    const { arg } = props;
    const timeGap = useMemo(() => {
      const [start, end] = arg.event.extendedProps.time.split('-');
      const startDate = new Date();
      startDate.setHours(start.split(':')[0], start.split(':')[1]);
      const endDate = new Date();
      endDate.setHours(end.split(':')[0], end.split(':')[1]);
      const diff = endDate.getTime() - startDate.getTime();
      const diffHours = diff / (1000 * 60 * 60);
      return diffHours;
    }, [arg]);
    return (
      <div
        onClick={() => {
          props.clickEvent(arg);
        }}
        className="flex flex-col overflow-hidden justify-center h-full w-full items-center"
      >
        <svg
          height={'14px'}
          width={'100%'}
          className="z-30 relative"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <text
            font-size="10px"
            x="50%"
            text-anchor="middle"
            y="10"
            fill={arg.textColor}
          >
            {arg.event.title}
          </text>
        </svg>
        {
          timeGap >= 1 ? (
            <svg
          height={'14px'}
          width={'100%'}
          className="z-30 relative"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <text
            className="font-light leading-none	text-10  truncate"
            font-size="10px"
            x="50%"
            text-anchor="middle"
            y="10"
            fill={arg.textColor}
          >
            Section {arg.event.extendedProps?.section?.name}
          </text>
        </svg>
          ):null
        }
        
        {
          timeGap >= 1.2 ? (
            <svg
          height={'14px'}
          width={'100%'}
          className="z-30 relative"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <text
            font-size="10px"
            x="50%"
            text-anchor="middle"
            y="10"
            fill={arg.textColor}
            className="font-light text-ellipsis	truncate whitespace-nowrap leading-none	 "
          >
            {arg.event.extendedProps.classroom}
          </text>
        </svg>
          ):null
        }
        {
          timeGap >= 1.5 ? (
            <svg
            height={'14px'}
            width={'100%'}
            className="z-30 relative"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
          >
            <text
              font-size="10px"
              x="50%"
              text-anchor="middle"
              y="10"
              fill={arg.textColor}
              className="font-light leading-none	text-10	  "
            >
              {arg.event.extendedProps.online ? '线上课程' : '线下课程'}
            </text>
          </svg>
          ):null
        }
       
        {/*  
    <div className="font-bold	 scale-75 text-xs text-center  whitespace-nowrap">
      {arg.event.title}
    </div> */}
        {/* <div  className="font-light leading-none	text-10  truncate">
      Section {arg.event.extendedProps.section.name}
    </div> */}
        {/* <div className="font-light text-ellipsis	truncate whitespace-nowrap leading-none	 scale-90	  ">
      {arg.event.extendedProps.classroom}
    </div> */}
        {/* <div className="font-light leading-none	text-10	  ">
      {arg.event.extendedProps.online ? '线上课程' : '线下课程'}
    </div> */}
      </div>
    );
  };
  useEffect(() => {
    const el = document.getElementsByClassName(
      'fc-timegrid-slots',
    )[0] as HTMLElement;
    if (el) {
      const ele = el.getElementsByTagName('table')[0] as HTMLElement;
      el.style.paddingTop = '10px';
      el.style.backgroundImage = `url(${customImg})`;
      el.style.backgroundSize = 'cover';
      el.style.objectFit = 'cover';
      // el.style.height = `calc(100vh - 190px)`;
    }
  }, [customImg, calendarView]);
  return (
    <div>
      <div className="h-full w-full  ">
        {/* <img src={customImg} className="absolute object-cover" alt="" /> */}
        <FullCalendar
          plugins={[timeGridPlugin, dayGridPlugin]}
          ref={calendarRef}
          slotEventOverlap={true}
          viewDidMount={(view: any) => {
            setting.view === 'week' || setting.view === 'day'
              ? ReactDOM.render(
                  <div
                    onClick={() => {
                      changeView();
                    }}
                    className={classnames("w-full pl-2 h-full flex justify-center items-center",{
                      'pl-2 ml-1': !calendarView
                    })} 
                  >
                    <Icon></Icon>
                  </div>,
                  view.el.getElementsByClassName('fc-timegrid-axis')[0],
                )
              : '';
            // find('.fc-timegrid-axis').html('<span>Your content</span>');
          }}
          headerToolbar={false}
          displayEventTime={false}
          dayHeaderContent={(arg) => {
            console.log(arg);
            if (setting.view === 'month') {
              return <div></div>;
            }
            return (
              <div
                className={arg.isToday ? 'text-yellow-400' : 'text-gray-400'}
              >
                <div>{day.cn[arg.date.getDay()]}</div>
                <div className="flex items-center">
                  <div
                    className={classNames(
                      arg.isToday ? 'text-yellow-400' : 'text-blueTitle',
                      ' text-xs scale-90',
                    )}
                  >
                    {arg.date.getMonth() + 1}/
                  </div>
                  <div
                    className={classNames(
                      arg.isToday ? 'text-yellow-400' : 'text-blueTitle',
                      ' text-sm  ',
                    )}
                  >
                    {arg.date.getDate()}
                  </div>
                </div>
              </div>
            );
          }}
          events={ALLEvents}
          eventContent={(arg: any) => {
            console.log(arg, 'course arg');
            if (arg.event.extendedProps.type === 2) {
              return <TimeTableEvent arg={arg}></TimeTableEvent>;
            }
            return setting.view === 'day' ? (
              <DayCourseEvent
                clickEvent={props?.clickEvent}
                arg={arg}
              ></DayCourseEvent>
            ) : (
              <CourseEvent
                clickEvent={props?.clickEvent}
                arg={arg}
              ></CourseEvent>
            );
          }}
          // eventBackgroundColor="#EBE5FE"
          // eventTextColor="#A972F0"
          // eventBorderColor="#A972F0"
          editable={true}
          // initialEvents={props.courseData}
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }}
          height="auto"
          slotLabelFormat={{
            hour: 'numeric',
            minute: '2-digit',
            hour12: false,
          }}
          locale="en"
          allDaySlot={false}
          slotMinTime="07:00:00"
          slotMaxTime="24:00:00"
          slotDuration="00:30:00"
          slotLabelInterval="00:30"
          weekends={setting.isWeekend}
        />
      </div>
      <div className="bg-gray-50 z-20 relative mt-1">
        {!calendarView ? <ListView></ListView> : null}
      </div>
    </div>
  );
}
export default Calendar;
