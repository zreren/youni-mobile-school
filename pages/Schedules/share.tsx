import React, { useEffect, useState, useRef } from 'react';
import Calendar from '@/components/Calendar/Calendar';
import Header from '@/components/Header';
import CButton from '@/components/Button/CButton';
import Icon from './setting.svg';
import Tooltips from './components/Tooltips';
import classnames from 'classnames';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Location from './location';
import TimeIconActive from './icon_time';
import SaveToLibButton from '@/components/Button/SaveToLibButton';
import Icon1 from './components/timeIcon/1.svg';
import Icon2 from './components/timeIcon/2.svg';
import Icon3 from './components/timeIcon/3.svg';
import Icon4 from './components/timeIcon/4.svg';
import Icon5 from './components/timeIcon/5.svg';
import getCampusId from '@/hooks/useId';
import exportAsImage from '@/libs/exportImage';
import Polygon from './polygon.svg';
import FormControlLabel from '@mui/material/FormControlLabel';
import IOSSwitch from './components/ios';
import RightIcon from '@/components/PageComponents/Profile/right.svg';
import useFetch from '../../hooks/useFetch';
import { Popup, Toast } from 'react-vant';
import { getCourses, addFullStartDate } from '@/libs/schedule';
import axios from 'axios';
import useLocalStorage from '../../hooks/useStore';
import { Cell, Dialog } from 'react-vant';
import { useRouter } from 'next/router';
import BgSVG from './bg.svg';
import ArrowRight from './arrow-right.svg';
import { setOpenLogin, selectOpen ,setAuthState} from '../../stores/authSlice';
import { useDispatch } from 'react-redux';
import { Loading } from 'react-vant';
import CourseIcon1 from './courseIcon1.svg';
import CourseIcon2 from './courseIcon2.svg';
import CourseIcon3 from './courseIcon3.svg';
import CourseIcon4 from './courseIcon4.svg';
import useRequest from '@/libs/request';
import { useSelector } from 'react-redux';
import useUser from '@/hooks/useUser';
import SchedulesIcon from './schedulesIcon.svg';
import LoveIcon from './heart.svg';
// import classnames from 'classnames';
import LovedIcon from './hearted.svg';

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

const CCourseInput = (props) => {
  const { title, Icon, children: Children } = props;
  return (
    <div className="w-full h-12 p-4 bg-white rounded-lg">
      <div className="flex w-full items-center justify-between h-full space-x-4">
        <div className="flex items-center">
          <Icon className="mr-1"></Icon>{' '}
          <div className="font-medium text-blueTitle">{title}</div>
        </div>
        {Children ? Children : null}
      </div>
    </div>
  );
};

export default function Schedules() {
  const calendarRef = useRef<any>();
  const router = useRouter();
  const [menu, setMenu] = useState(0);
  const curriculumId = React.useMemo(() => router.query.curriculumId, [router.query.curriculumId])
  useEffect(()=>{
    setStudentId(router.query.id)
  },[router.query.id])
  const { data, error, mutate } = useFetch(
    `/curriculum/view`,
    'get',
    {
      id:curriculumId
      // campusId: 1,
      // studentId: studentId,
      // termId: termInfo?.data?.id,
    }
  );
  const [isStart,setIsStart] = useState(data?.data?.interactInfo?.shared || false);
  const starCurriculum = async (id)=>{
    if(!isStart){
      setIsStart(true);
      // return;
      const {data} = await useRequest.get('/api/curriculum/star',{
        params:{
          id
        }
      });
      if(data?.message === 'success'){
        Toast.success('收藏成功');
      }
    }else{
      setIsStart(false);
      const {data} = await useRequest.get('/api/curriculum/unstar',{
        params:{
          id
        }
      });
      if(data?.message === 'success'){
        Toast.success('取消收藏成功');
      }
    }
    
  }
  const Footer = (props) => {
    if(isOwner){
      return (
       <div className='fixed space-x-2 bottom-0 shadow z-30 h-20 w-full bg-white px-4 flex justify-center '>
         <div className='w-full font-semibold space-x-2 h-10 mt-2 flex justify-center items-center  text-[#8C6008]  bg-[#FFD036]'>
            <SchedulesIcon></SchedulesIcon>
            <div className='text-sm' onClick={()=>{
              router.push({
                pathname: '/Schedules/Schedules',
                query: {
                  campus: router.query.campus,
                },
              })
            }}>返回我的课表</div>
        </div>
        <div className='w-full font-semibold space-x-2 h-10 mt-2 flex justify-center items-center  text-[#ffffff]  bg-[#3665FF]'>
            {/* <SchedulesIcon></SchedulesIcon> */}
            <div className='text-sm' onClick={()=>{
              try {
                navigator.clipboard.writeText(window.location.href);
                Toast.success('已复制到简介板，分享给好友吧！');
              } catch (error) {
                Toast.fail('复制失败')
              }
            }}>分享</div>
        </div>
       </div>
      )
    }else{

      return (
        <div className='fixed space-x-2 bottom-0 shadow z-30 h-20 w-full bg-white px-4 flex justify-center '>
        <div className='w-full font-semibold space-x-2 h-10 mt-2 flex justify-center items-center  text-[#8C6008]  bg-[#FFD036]'>
           <SchedulesIcon></SchedulesIcon>
           <div className='text-sm' onClick={()=>{
             router.push({
               pathname: '/Schedules/Schedules',
               query: {
                 campus: router.query.campus,
               },
             })
           }}>返回我的课表</div>
       </div>
       {/* 255,235,235 */}
       <div className={
          classnames('w-full font-semibold space-x-2 h-10 mt-2 flex justify-center items-center  bg-[#FFD036]',{
            'bg-[#FF6E69] text-white':isStart,
            'bg-[#FFEBEB] text-[#FF6E69]':!isStart,
          })
       } 
       onClick={()=>{
        // if(!isStart){
        starCurriculum(router.query.curriculumId)
      //  }}}
       }}
       >
        {isStart?<LovedIcon></LovedIcon>:<LoveIcon></LoveIcon>}
           <div className='text-sm' onClick={()=>{
           }}>
            {isStart?'已收藏课表':'收藏课表'}
           </div>
       </div>
      </div>
      )
    }
    return (
      <div className="w-full items-center space-x-2 flex h-20 bg-white z-30 px-2 fixed bottom-0 ">
        <div className="border-[#DCDDE1] border rounded-lg overflow-hidden w-full h-[32px]  flex ">
          <div
            onClick={() => {
              setSetting({
                view:'day',
                isWeekend:false,
              });
            }}
            className={classnames(
              'w-full  flex justify-center whitespace-nowrap items-center text-center text-[#A9B0C0]',
              {
                'bg-slate-50 text-[#FFD036]': setting.view === 'day',
              },
            )}
          >
            五天
          </div>
          <div
            onClick={() => {
              setSetting({
                view:'week',
                isWeekend:true,
              });
            }}
            className={classnames(
              'w-full  flex justify-center items-center text-center text-[#A9B0C0]',
              {
                'bg-slate-50 text-[#FFD036]': setting.view === 'week',
              },
            )}
          >
            周
          </div>
          <div
            onClick={() => {
              setSetting({
                view:'today',
                isWeekend:false,
              });
            }}
            className={classnames(
              'w-full  flex justify-center items-center text-center text-[#A9B0C0]',
              {
                'bg-slate-50 text-[#FFD036]': setting.view === 'today',
              },
            )}
          >
            日
          </div>
        </div>
        <SaveToLibButton
          onClick={() => {
            exportAsImage(calendarRef.current, '课表');
          }}
          color="#3665FF"
          icon="wechat"
          title="保存到相册"
        ></SaveToLibButton>
      </div>
    );
  };
  // const [campusIdMap, setCampusIdMap] = useLocalStorage(getCampusId(router.query.campus), props?.post?.id);
  const [defaultScheduleView, setDefaultScheduleView] = useLocalStorage(
    'defaultScheduleView',
    0,
  );
  const { data: termInfo } = useFetch('/campus/term/current', 'get', {
    campusId: 1,
  });
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
  // 给开始时间和结束时间，计算当前属于这个时间段的第几个星期
  const getWeekNumber = (start) => {
    const startDate = new Date(start);
    // const endDate = new Date(end);
    const today = new Date();
    const week =
      Math.floor((today.getTime() - startDate.getTime()) / 604800000) + 1;
    console.log(week);
    return week;
  };
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [scheduleVisible, setScheduleVisible] = useState(false);
  const [addCourse, setAddCourse] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [yearMethod, setYearMethod] = useState(false);
  const [studentId,setStudentId] = useState(router.query.id);

  useEffect(() => {
    dispatch(setAuthState(false));
    return ()=>{
      dispatch(setAuthState(true));
    }
  })
  useEffect(()=>{
    mutate()
  },[studentId,curriculumId])
  const tempData = React.useMemo(() => {
    if (!data?.data) return null;
    return data?.data?.items.map((item) => {
      return {
        ...item,
        // dayOfWeek: item?.time?.dayOfWeek,
        time: item?.time?.start + '-' + item?.time?.end,
      };
    });
  }, [data]);
  const weekDate = getPastWeekDates();

  const courseData = React.useMemo(() => {
      const res =  getCourses(
        tempData,
        new Date(termInfo?.data?.startDate),
        new Date(termInfo?.data?.endDate),
      );
      return addFullStartDate(res, weekDate)
      // const all = addFullStartDate(courseData, weekDate);
      console.log(courseData, 'courseData');
  },[data,,studentId,termInfo,weekDate,curriculumId])

  useEffect(()=>{
    console.log(tempData,'tempData')
  },[tempData])
  useEffect(()=>{
    console.log(courseData,"courseData")
  },[courseData])


  function getPastWeekDates(): [Date, Date] {
    const today = new Date();
    const startDate = new Date();
    const dayOfWeek = startDate.getDay();
    startDate.setDate(today.getDate() - dayOfWeek);
    const endDate = new Date();
    endDate.setDate(today.getDate() - dayOfWeek + 6);
    return [startDate, endDate];
  }
  const {user} = useUser();

  const isOwner = React.useMemo(() => {
    return user?.id === Number(router.query.id);
  }, [user, router.query.id])

  useEffect(()=>{
    console.log(isOwner,"isOwner")
  },[isOwner])
  // if (data?.data) {
  //   courseData = getCourses(
  //     data?.data?.item,
  //     new Date(termInfo?.data?.startDate),
  //     new Date(termInfo?.data?.endDate),
  //   );
  //   const all = addFullStartDate(courseData, weekDate);
  //   console.log(all, 'courseData');
  // }
  const openLogin = useSelector(selectOpen);
  React.useEffect(() => {
    if (!data) return;
    if (!data?.data) {
      setDialogVisible(true);
    }
    if (data?.data) {
      setDialogVisible(false);
    }
    // if (!data?.data) {
    //   setDialogVisible(true);
    // }
    console.log(data, 'data');
  }, [data]);
  const [arg, setArg] = useState<any>();
  const [setting, setSetting] = useState({
    view: 'day',
    isWeekend: false,
  });
  const ViewListMap = ['day', 'week', 'today', 'year'];
  useEffect(() => {
    setSetting({
      ...setting,
      view: ViewListMap[defaultScheduleView],
    });
  }, []);
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
  const YearCard = (props) => {
    const { title } = props;
    return (
      <div className="flex p-4 card-shadow items-center my-4 justify-between bg-white w-full h-20 rounded-lg">
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
  const Identify = () => {
    const router = useRouter();
    // const { t } = useTranslation('translations');
    return (
      <div className="relative flex items-center justify-between w-full h-12 p-4 pt-0 pb-0 bg-[#FF7978] rounded text-gold">
        <div className="flex items-center  ">
          <Polygon className="absolute top-0 left-0 h-20"></Polygon>
          {/* <ValidIcon className="absolute left-0"></ValidIcon> */}
          {/* <div>{t("profile.identify.student.certification")}</div> */}
          <div className="pl-1 font-bold text-white">九月</div>
        </div>
        {/* <div className="flex flex-col items-center text-xs text-brown">
          <div>30秒认证在校生身份</div> <div>解锁YoUni全部功能</div>
        </div> */}
        <BgSVG className="absolute h-12 scale-125  w-18 right-2"></BgSVG>
      </div>
    );
  };

  const Month = () => {
    return (
      <div className="w-full min-h-screen p-5">
        <Identify></Identify>
        <YearCard title="Classes start"></YearCard>
        <YearCard></YearCard>
        <YearCard></YearCard>
        <Dayliy></Dayliy>
        <Identify></Identify>
        <YearCard title="Classes start"></YearCard>
      </div>
    );
  };
  return (
    <div className="relative bg-bg schedule min-h-[840px]">
      <Footer></Footer>
      <Popup
        overlayClass={'Popup'}
        className="z-30 topIndexPlus rounded-full "
        visible={!data}
      >
        <div className="rounded-full w-10 h-10 flex overflow-hidden justify-center items-center">
          <Loading type="spinner" color="#FED64B" />
        </div>
      </Popup>
      <div className="pl-5 text-left f-11 yellow-gradient h-16 flex flex-col justify-center">
        <div className="text-base font-bold text-white">
          第 {getWeekNumber(termInfo?.data?.startDate)} 周
        </div>
        <div className="text-xs text-white opacity-80 flex space-x-2 items-center">
          <div>
            {getWeekDates()[0]} - {getWeekDates()[6]}
          </div>
          <div className="h-2 w-0.5 bg-white "></div>
          <div>{termInfo?.data?.name}</div>
        </div>
      </div>
      {setting.view === 'year' ? (
        <Month></Month>
      ) : (
        <div ref={calendarRef}>
          <Calendar
            setting={setting}
            courseData={courseData}
            clickEvent={(arg) => {
              setArg({ ...arg });
              console.log(arg, 'Calendar clcik');
              setVisible(true);
            }}
          ></Calendar>
        </div>
      )}
    </div>
  );
}
