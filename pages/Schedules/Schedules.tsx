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
import { setOpenLogin ,selectOpen} from '../../stores/authSlice';
import { useDispatch } from 'react-redux';
import { Loading } from 'react-vant';
import CourseIcon1 from './courseIcon1.svg';
import CourseIcon2 from './courseIcon2.svg';
import CourseIcon3 from './courseIcon3.svg';
import CourseIcon4 from './courseIcon4.svg';
import useRequest from '@/libs/request';
import {  useSelector } from 'react-redux';

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
  // const [campusIdMap, setCampusIdMap] = useLocalStorage(getCampusId(router.query.campus), props?.post?.id);
  const [defaultScheduleView, setDefaultScheduleView] = useLocalStorage(
    'defaultScheduleView',
    0,
  );
  const { data: termInfo } = useFetch('/campus/term/current', 'get', {
    campusId: 1,
  });
  const CourseDetailCard = (props) => {
    const { event, borderColor } = props;
    const [token, setToken] = useLocalStorage('token', '');
    const deleteCURRICULUM = async (id: number) => {
      Dialog.confirm({
        title: '删除课程',
        message: '确定删除该课程吗？',
      })
        .then(async () => {
          const { data } = await useRequest.post(
            `/api${Cons.API.CURRICULUM.DELETE}`,
            {
              id: Number(id),
            },
          );
          if (data.message === 'success') {
            props.setVisible(false);
            Toast.success('删除成功');
            mutate();
          } else {
            Toast.fail('删除失败');
          }
        })
        .catch(() => {
          console.log('catch');
        });

    };
    if (!event) return;
    const { title, extendedProps } = event;
    console.log(props, 'CourseDetailCard');
    console.log(borderColor, 'backgroundColor');
    // if (!arg) return null;
    const background = `linear-gradient(180deg, ${props.backgroundColor} -117.9%, #FFFFFF 125.31%)`;
    // const darkBackground = props.border

    return (
      <div className="topIndexPlus">
        {/* <div className='w-4 h-1 bg-gray-400 rounded-xs '></div> */}
        <SwipeableDrawer
          anchor="bottom"
          open={props.visible}
          onClose={() => {
            props.setVisible(false);
          }}
          onOpen={() => {
            props.setVisible(true);
          }}
          className="h-screen"
        >
          <div className="w-full p-4 rounded-full h-80">
            <Puller></Puller>
            <div
              style={{ background: background, borderColor: borderColor }}
              className="flex justify-between w-full h-20 p-4 border  rounded-2xl"
            >
              <div style={{ color: borderColor }}>
                <div className="flex items-center">
                  {' '}
                  <div
                    style={{ background: borderColor }}
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
                  {extendedProps?.section?.students
                    ?.slice(0, 3)
                    .map((item, index) => {
                      return (
                        <div className="avatar border-[1px]">
                          <div className="w-6">
                            <img src={`${Cons.BASEURL}${item.avatar}`} />
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className="text-xs text-[#798195]">
                  {extendedProps?.section?.students.length > 0? `${extendedProps?.section?.students.length}名同学`:null} 
                </div>
              </div>
            </div>
            <div className="mt-4 mb-4">
              <div className="mb-4">
                <div className="flex items-center">
                  <TimeIconActive color={borderColor}></TimeIconActive>
                  <div className="ml-3 text-sm text-gray-400">周二</div>
                  <div className="ml-10 text-sm text-gray-400 ">
                    {extendedProps.time}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Location color={borderColor}></Location>
                <div className="ml-3 text-sm text-gray-400">地点</div>
                <div className="ml-10 text-sm text-gray-400 ">
                  {extendedProps.classroom}
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div
                className="flex flex-col items-center space-y-2"
                onClick={() => {
                  const campus = router.query.campus;
                  if(!extendedProps?.section?.course?.id){
                    Dialog.alert({
                      message:'该课程为自定义课程'
                    })
                    return
                    // Toast.fail('该课程为自定义课程')
                  }
                  console.log(
                    extendedProps?.section?.course?.id,
                    'extendedProps?.section[0]?.course?.id',
                  );
                  router.push({
                    pathname: '/[campus]/Course/[id]',
                    query: {
                      campus: campus,
                      id: extendedProps?.section?.course?.id,
                    },
                  });
                }}
              >
                <div className="flex flex-col avatar placeholder">
                  <div className="bg-[#F7F8F9] rounded-full text-neutral-content w-14">
                    <CourseIcon1></CourseIcon1>
                  </div>
                </div>
                <div className="text-xs text-[#798195]">课程详情</div>
              </div>
              <div 
              onClick={()=>{
                if(!extendedProps?.section?.course?.id){
                  Dialog.alert({
                    message:'该课程为自定义课程'
                  })
                  return
                  // Toast.fail('该课程为自定义课程')
                }
                router.push({
                  pathname: '/[campus]/Course/evaluation',
                  query: { campus: 'York' },
                });
              }}
              className="flex flex-col items-center space-y-2">
                <div className="flex flex-col avatar placeholder">
                  <div className="bg-[#F7F8F9]  rounded-full text-neutral-content w-14">
                    <CourseIcon2></CourseIcon2>
                  </div>
                </div>
                <div className="text-xs text-[#798195]">写课评</div>
              </div>
              {/* <div className="flex flex-col items-center space-y-2"> */}
              {/*   <div className="flex flex-col avatar placeholder"> */}
              {/*     <div className="bg-gray-300 rounded-full text-neutral-content w-14"> */}
              {/*       <span className="text-3xl"></span> */}
              {/*     </div> */}
              {/*   </div> */}
              {/*   <div className="text-xs text-[#798195]">课程评价</div> */}
              {/* </div> */}
              <div
              onClick={()=>{
                router.push({
                  pathname: '/Schedules/editCourse',
                  query: { id: event.id },
                })
              }}
              className="flex flex-col items-center space-y-2">
                <div className="flex flex-col avatar placeholder">
                  <div className="bg-[#F7F8F9] rounded-full text-neutral-content w-14">
                    <CourseIcon3></CourseIcon3>
                  </div>
                </div>
                <div className="text-xs text-[#798195]">编辑</div>
              </div>
              <div
                className="flex flex-col items-center space-y-2"
                onClick={() => {
                  deleteCURRICULUM(event.id);
                }}
              >
                <div className="flex flex-col avatar placeholder">
                  <div className="bg-[#F7F8F9]  rounded-full text-neutral-content w-14">
                    <CourseIcon4></CourseIcon4>
                  </div>
                </div>
                <div className="text-xs text-[#798195]">删除</div>
              </div>
            </div>
          </div>
        </SwipeableDrawer>
      </div>
    );
  };

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

  // const currenTerm = React.useMemo(()=>{
  //   return termInfo?.data?.filter((item)=>item?.current)
  // },[termInfo])
  const SetSchedule = (props) => {
    const Menu = () => {
      const [menu, setMenu] = useState(defaultScheduleView);
      useEffect(() => {
        setDefaultScheduleView(menu);
      }, [menu]);
      return (
        <div className="w-full px-2">
          <div className="border-[#DCDDE1] border rounded-lg overflow-hidden w-full h-[28px]  flex ">
            <div
              onClick={() => {
                setMenu(0);
              }}
              className={classnames(
                'w-full  flex justify-center whitespace-nowrap items-center text-center text-[#A9B0C0]',
                {
                  'bg-slate-50 text-[#FFD036]': menu === 0,
                },
              )}
            >
              五天
            </div>
            <div
              onClick={() => {
                setMenu(1);
              }}
              className={classnames(
                'w-full  flex justify-center items-center text-center text-[#A9B0C0]',
                {
                  'bg-slate-50 text-[#FFD036]': menu === 1,
                },
              )}
            >
              周
            </div>
            <div
              onClick={() => {
                setMenu(2);
              }}
              className={classnames(
                'w-full  flex justify-center items-center text-center text-[#A9B0C0]',
                {
                  'bg-slate-50 text-[#FFD036]': menu === 2,
                },
              )}
            >
              日
            </div>
            <div
              onClick={() => {
                setMenu(3);
              }}
              className={classnames(
                'w-full  flex justify-center whitespace-nowrap items-center text-center text-[#A9B0C0]',
                {
                  'bg-slate-50 text-[#FFD036]': menu === 3,
                },
              )}
            >
              校历
            </div>
          </div>
        </div>
      );
    };
    return (
      <SwipeableDrawer
        anchor="bottom"
        open={props.visible}
        disableDiscovery={true}
        disableSwipeToOpen={true}
        onClose={() => {
          props.setVisible(false);
        }}
        onOpen={() => {
          props.setVisible(true);
        }}
        className="h-screen"
      >
        <div className="w-full p-4 bg-white h-96 mb-14">
          <div className="flex w-full space-x-2">
            <SaveToLibButton
              onClick={() => {
                exportAsImage(calendarRef.current, '课表');
              }}
              color="#3665FF"
              icon="wechat"
              title="保存到相册"
            ></SaveToLibButton>
            <SaveToLibButton
              onClick={() => {}}
              color="#FFD036"
              icon="share"
              title="分享课表"
            ></SaveToLibButton>
          </div>
          <div className="w-full p-2 mt-2">
            <CCourseInput Icon={Icon1} title="打开时显示">
              <div className={'w-[55%]'}>
                {' '}
                <Menu></Menu>
              </div>
            </CCourseInput>
            <div className="h-1 pl-4 pr-4 m-0 divider opacity-30"></div>
            <CCourseInput title="课表视图显示日程" Icon={Icon2}>
              <div>
                <FormControlLabel
                  control={<IOSSwitch defaultChecked />}
                  label=""
                />
              </div>
            </CCourseInput>
            <div className="h-1 pl-4 pr-4 m-0 divider opacity-30"></div>
            <CCourseInput title="添加课程/日程" Icon={Icon3}>
              {' '}
              <RightIcon className="mr-2"></RightIcon>
            </CCourseInput>
            <div className="h-1 pl-4 pr-4 m-0 divider opacity-30"></div>
            <CCourseInput title="自定义背景" Icon={Icon4}>
              <RightIcon className="mr-2"></RightIcon>
            </CCourseInput>
            <div className="h-1 pl-4 pr-4 m-0 divider opacity-30"></div>
            <CCourseInput title="切换课表" Icon={Icon5}></CCourseInput>
            <div className="flex justify-between pl-4 pr-4 mt-4">
              <div className="flex flex-col items-center">
                <div className="flex flex-col avatar placeholder">
                  <div className="bg-[#FFD03640] rounded-full text-neutral-content w-14">
                    <span className="text-xs font-medium text-[#FFD036]">
                      我的
                    </span>
                  </div>
                </div>
                {/* <div className="text-xs">我的课表</div> */}
              </div>
              <div className="flex flex-col items-center">
                <div className="flex flex-col avatar placeholder">
                  <div className="bg-[#F7F8F9] rounded-full text-neutral-content w-14">
                    <span className="text-xs font-medium text-[#A9B0C0]">
                      Test User
                    </span>
                  </div>
                </div>
                {/* <div className="text-xs">课表1</div> */}
              </div>
              <div className="flex flex-col items-center">
                <div className="flex flex-col avatar placeholder">
                  <div className="bg-gray-300 rounded-full text-neutral-content w-14">
                    <span className="text-3xl"></span>
                  </div>
                </div>
                {/* <div className="text-xs">课表2</div> */}
              </div>
              <div className="flex flex-col items-center">
                <div className="flex flex-col avatar placeholder">
                  <div className="bg-gray-300 rounded-full text-neutral-content w-14">
                    <span className="text-3xl"></span>
                  </div>
                </div>
                {/* <div className="text-xs">课表3</div> */}
              </div>
            </div>
          </div>
        </div>
      </SwipeableDrawer>
    );
  };
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const [scheduleVisible, setScheduleVisible] = useState(false);
  const [addCourse, setAddCourse] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [yearMethod, setYearMethod] = useState(false);
  const { data, error,mutate } = useFetch(
    `${Cons.API.CURRICULUM.QUERY}?campusId=1`,
    'get',
  );
  // const []
  // const currentDate = new Date();
  // currentDate.setDate(currentDate.getDate()+7)
  let courseData;
  function getPastWeekDates(): [Date, Date] {
    const today = new Date();
    const startDate = new Date();
    const dayOfWeek = startDate.getDay();
    startDate.setDate(today.getDate() - dayOfWeek);
    const endDate = new Date();
    endDate.setDate(today.getDate() - dayOfWeek + 6);
    return [startDate, endDate];
  }
  const weekDate = getPastWeekDates();
  if (data?.data) {
    courseData = getCourses(
      data.data,
      new Date(termInfo?.data?.startDate),
      new Date(termInfo?.data?.endDate),
    );
    const all = addFullStartDate(courseData, weekDate);
    console.log(all, 'courseData');
  }
  const openLogin = useSelector(selectOpen);
  React.useEffect(()=>{
    if(openLogin === 'login' || openLogin === 'register'){
      setDialogVisible(false)
    }
    if(openLogin === 'close'){
      setDialogVisible(true)
    }
  },[openLogin])
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
    <div className="space-y-1 bg-bg schedule">
      {/* div className="mb-10"> */}
      <Popup
        overlayClass={'Popup'}
        className="z-30 topIndexPlus rounded-full "
        visible={!data}
      >
        <div className="rounded-full w-10 h-10 flex overflow-hidden justify-center items-center">
          <Loading type="spinner" color="#FED64B" />
        </div>
      </Popup>
      <Dialog
        visible={dialogVisible}
        title="登录"
        showCancelButton
        confirmButtonText="登录"
        cancelButtonText="注册"
        onConfirm={() => {
          dispatch(setOpenLogin('login'));
          // setDialogVisible(false)
        }}
        onCancel={() => {
          dispatch(setOpenLogin('register'));
          // setDialogVisible(false)
        }}
        className="shadow-xl z-10  backdrop-opacity-50  backdrop-filter backdrop-blur-2xl"
      >
        <div className="text-[#798195] text-sm p-8">
          登录YoUni，自由添加课表、一键导入学校课程、一键分享给朋友！
        </div>
      </Dialog>

      <div className="pl-5 text-left f-11 ">
        <div className="text-base font-bold text-blueTitle">
          第 {getWeekNumber(termInfo?.data?.startDate)} 周
        </div>
        <div className="text-xs text-gray-400 flex space-x-2 items-center">
          <div>
            {getWeekDates()[0]} - {getWeekDates()[6]}
          </div>
          <div className="h-2 w-0.5 bg-gray-300 "></div>
          <div>{termInfo?.data?.name}</div>
        </div>
      </div>
      <div className="flex  px-2 items-center justify-between pl-5 pr-5 h-11 bg-bg">
        <div className="flex items-center justify-around w-2/3 h-8 bg-white rounded-lg">
          <button
            onClick={() => {
              setSetting({ ...setting, isWeekend: false, view: 'day' });
            }}
            className={classnames(
              '"btn  p-1 text-sm mx-0.5 text-gray-400 w-full rounded-lg',
              {
                'text-yellow-300 bg-gray-50': setting.view === 'day',
              },
            )}
          >
            近五天
          </button>
          <button
            onClick={() => {
              setSetting({ ...setting, isWeekend: true, view: 'week' });
            }}
            className={classnames(
              'text-sm  w-full  p-1 rounded-lg text-gray-400',
              {
                'text-yellow-300 bg-gray-50': setting.view === 'week',
              },
            )}
          >
            近一周
          </button>
          <button
            onClick={() => {
              setSetting({ ...setting, isWeekend: true, view: 'today' });
            }}
            className={classnames(
              'text-sm w-full p-1  rounded-lg text-gray-400',
              {
                'text-yellow-300 bg-gray-50': setting.view === 'today',
              },
            )}
          >
            今日
          </button>
          <button
            onClick={() => {
              setSetting({ ...setting, view: 'year' });
            }}
            className={classnames(
              'text-sm mx-0.5 w-full  p-1 rounded-lg text-gray-400',
              {
                'text-yellow-300 bg-gray-50': setting.view === 'year',
              },
            )}
          >
            校历
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <div
            onClick={() => {
              setScheduleVisible(true);
            }}
          >
            <Icon type="menu1"></Icon>
          </div>
          <Tooltips
            open={addCourse}
            add={() => {
              console.log('addCourse');
            }}
          >
            <CButton size="normal">添加</CButton>
          </Tooltips>
        </div>
      </div>
      <div className="topIndexPlus">
        <SetSchedule
          visible={scheduleVisible}
          setVisible={setScheduleVisible}
        ></SetSchedule>
      </div>
      <CourseDetailCard
        visible={visible}
        setVisible={setVisible}
        {...(arg as Object)}
      ></CourseDetailCard>
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
