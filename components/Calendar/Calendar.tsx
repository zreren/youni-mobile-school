import FullCalendar from '@fullcalendar/react'; // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid'; // a plugin!
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import CommonLayout from '../Layout/CommonLayout';
import { styled } from '@mui/material/styles';
import interactionPlugin from '@fullcalendar/interaction';
import React from 'react';
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

function Calendar(props) {
  interface Event {
    dayOfWeek: number;
    // other properties
  }

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
    const { title, extendedProps, dayOfWeek,students,color} = props;
    const rgba = (hex, opacity) => {
      hex = hex.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      const result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
      console.log(result,"result");
      return result;
    }
    const background =
    `linear-gradient(180deg, ${rgba(color,0.1)} -117.9%, #FFFFFF 125.31%)`;
    return (
      <div className="w-full p-4  my-3 bg-white rounded-lg h-[176px]">
        <div
          style={{ background: background ,borderColor:color}}
          className="flex justify-between w-full h-20 p-4 border  rounded-2xl"
        >
          <div style={{color:color}}>
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
              {
                students?.slice(0,3).map((item,index)=>{
                  return (
                    <div className="avatar border-[1px]">
                      <div className="w-6">
                        <img src={`${Cons.BASEURL}${item.avatar}`} />
                      </div>
                    </div>
                  )
                })
              }
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
            <div className="text-xs text-[#798195]">{students?.length }名同学</div>
          </div>
        </div>
        <div className="mt-4 pb-4">
          <div className="mb-2">
            <div className="flex items-center">
              <TimeIconActive  color={color}></TimeIconActive>
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
  function generateNewArray(timeArray: string[], dataObject: object) {
    if(!dataObject) return [];
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
    console.log(newArray);
    return newArray;
  }
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
  const getWeekDates = () => {
    const weekDates = [];
    const currentDate = new Date();
    let day = currentDate.getUTCDay();
    const diff = currentDate.getUTCDate() - day;
    for (let i = 0; i < 7; i++) {
      const newDate = new Date(currentDate.setUTCDate(diff + i));
      const dateString = newDate.toISOString().slice(0, 10);
      weekDates.push(dateString);
    }
    return weekDates;
  };
  function isToday(dateString: string) {
    let date = new Date(dateString);
    let today = new Date();
    return date.toDateString() === today.toDateString();
  }
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
      const { title } = props;
      return (
        <div className="flex p-4 card-shadow items-center my-4 justify-between bg-white w-full h-20 rounded-lg">
          <div>
            <div className="flex items-center pb-2 space-x-2">
              <div className="text-xs text-[#FAAD14] h-5 rounded whitespace-nowrap bg-[#FFFAE6] px-[6px] py-1">
                日程
              </div>
              <div className="text-[#37455C] text-sm font-semibold">
                {title || '日程日程日程'}
              </div>
            </div>
            <div className="text-[#A9B0C0] text-xs ">2022年9月7日</div>
          </div>
          <ArrowRight></ArrowRight>
        </div>
      );
    };
    const Identify = (props) => {
      const { title, index } = props;
      // const router = useRouter();
      // const { t } = useTranslation('translations');
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
        const cdays = [
          '周日',
          '周一',
          '周二',
          '周三',
          '周四',
          '周五',
          '周六',
        ]
        const days = {
          cdays: cdays,
          edays: edays,
        }
        return days[useLanguage('days')][date.getUTCDay()];
      }
      function getMonthDay(dateString: string) {
        const date = new Date(dateString);
        const month = ("0" + (date.getMonth() + 1)).slice(-2); // getMonth() returns 0 for January and 11 for December
        const day = ("0" + date.getDate()).slice(-2);
        return `${month}-${day}`;
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
            <div className="pl-1 text-xs font-light text-white">{getMonthDay(title)}</div>
          </div>
          <BgSVG className="absolute h-12 scale-125  w-18 right-2"></BgSVG>
        </div>
      );
    };
    // const Month = () => {
    return (
      <div className="w-full min-h-screen p-5 ">
        {generateNewArray(getWeekDates(), groupedEvents).map((item, index) => {
          console.log(item, 'item');
          if(setting.view === 'today' && !isToday(item.time)) return null;
          const color = colorMap[index % 3];
          return (
            <>
              <Identify title={item.time} index={index}></Identify>
              {item?.children?.map((item, index) => {
                return (
                  <Card
                    color={color}
                    title={item?.name}
                    students={item?.section?.students}
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
        {/* <Identify></Identify> */}
        {/* <YearCard title="Classes start"></YearCard> */}
      </div>
    );
    // };
  };

  console.log(getWeekDates(), 'getWeekDates');
  console.log(groupedEvents, 'groupedEventscourseData');
  const [setting, setSetting] = useState(props.setting);
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
  const [calendarView, setView] = useState(true);
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
  return (
    <div>
      <div className="h-full w-full  bg-white">
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
                    className="w-full h-full flex justify-center items-center"
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
          events={props.courseData}
          eventContent={(arg: any) => {
            console.log(arg, 'course arg');
            return setting.view === 'day' ? (
              <div
                onClick={() => {
                  props.clickEvent(arg);
                }}
                className="flex flex-col overflow-hidden justify-center h-full w-full items-center"
              >
                <div className="font-bold	 scale-75 text-xs text-center  whitespace-nowrap">
                  {arg.event.title}
                </div>
                <div className="font-light leading-none	text-10  truncate">
                  Section {arg.event.extendedProps.section.name}
                </div>
                <div className="font-light text-ellipsis	truncate whitespace-nowrap leading-none	 scale-90	  ">
                  {arg.event.extendedProps.classroom}
                </div>
                <div className="font-light leading-none	text-10	  ">
                  {arg.event.extendedProps.online ? '线上课程' : '线下课程'}
                </div>
              </div>
            ) : (
              <div  onClick={() => {
                props.clickEvent(arg);
              }} className="flex overflow-hidden flex-col justify-center h-full w-full items-center">
                <div className="font-bold scale-[0.7]		text-10   text-center  whitespace-nowrap">
                  {arg.event.title}
                </div>
                <div className="font-bold 	text-center scale-[0.7]		text-10 leading-none whitespace-nowrap	 ">
                  Section {arg.event.extendedProps.section.name}
                </div>
                <div className="font-bold leading-none truncate	whitespace-nowrap scale-[0.7]		text-10 ">
                  {arg.event.extendedProps.classroom}
                </div>
                <div className="font-light leading-none	 scale-90	  ">
                  {arg.event.extendedProps.online ? '线上' : '线下'}
                </div>
              </div>
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
          //     viewClassNames="
          // h-screen"
        />
      </div>
      <div className="bg-gray-50 z-30 relative -translate-y-3">
        {!calendarView ? <ListView></ListView> : null}
      </div>
    </div>
  );
}
export default Calendar;
