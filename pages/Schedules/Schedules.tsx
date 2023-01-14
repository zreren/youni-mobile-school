import React, { useEffect, useState } from 'react';
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
import Location from './location.svg';
import TimeIconActive from './icon_time.svg';
import SaveToLibButton from '@/components/Button/SaveToLibButton';
import Icon1 from './components/timeIcon/1.svg';
import Icon2 from './components/timeIcon/2.svg';
import Icon3 from './components/timeIcon/3.svg';
import Icon4 from './components/timeIcon/4.svg';
import Icon5 from './components/timeIcon/5.svg';
import FormControlLabel from '@mui/material/FormControlLabel';
import IOSSwitch from './components/ios';
import RightIcon from '@/components/PageComponents/Profile/right.svg';
import useFetch from '../../hooks/useFetch';
import { getCourses, addFullStartDate } from '@/libs/schedule';
import axios from 'axios';
import useLocalStorage from '../../hooks/useStore';
import { Cell, Dialog } from 'react-vant';
import { useRouter } from 'next/router';

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
const SetSchedule = (props) => {
  const Menu = () => {
    const [menu, setMenu] = useState(0);
    return (
      <div className="w-full px-2">
        <div className="border-[#DCDDE1] border rounded-lg overflow-hidden w-full h-[28px]  flex ">
          <div
            onClick={() => {
              setMenu(0);
            }}
            className={classnames(
              'w-full  flex justify-center items-center text-center text-[#A9B0C0]',
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
              'w-full  flex justify-center items-center text-center text-[#A9B0C0]',
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
            color="#3665FF"
            icon="wechat"
            title="保存到相册"
          ></SaveToLibButton>
          <SaveToLibButton
            color="#FFD036"
            icon="share"
            title="分享课表"
          ></SaveToLibButton>
        </div>
        <div className="w-full p-2 mt-2">
          <CCourseInput Icon={Icon1} title="打开时显示">
            <div className={'w-1/2'}>
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
const CourseDetailCard = (props) => {
  const { event, borderColor } = props;
  const [token, setToken] = useLocalStorage('token', '');
  const deleteCURRICULUM = async (id: number) => {
    const { data } = await global.request.post(
      `/api${Cons.API.CURRICULUM.DELETE}`,
      {
        id: Number(id),
      },
    );
  };
  if (!event) return;
  const { title, extendedProps } = event;
  console.log(props, 'CourseDetailCard');
  console.log(borderColor, 'backgroundColor');
  // if (!arg) return null;
  return (
    <div className="">
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
          <div className="flex justify-between w-full h-20 p-4 border border-purple-600 rounded-2xl">
            <div className="text-purple-600">
              <div className="flex items-center">
                {' '}
                <div
                  className={classnames(
                    'w-1 h-4 mr-2 text-lg font-medium bg-purple-500 rounded-full',
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
            <div className="flex flex-col ">
              <div className="-space-x-6 avatar-group">
                <div className="avatar border-1">
                  <div className="w-6">
                    <img src="https://placeimg.com/192/192/people" />
                  </div>
                </div>
                <div className="border avatar">
                  <div className="w-6">
                    <img src="https://placeimg.com/192/192/people" />
                  </div>
                </div>
                <div className="border avatar">
                  <div className="w-6">
                    <img src="https://placeimg.com/192/192/people" />
                  </div>
                </div>
                <div className="border avatar placeholder">
                  <div className="w-6 bg-neutral-focus text-neutral-content">
                    <span>+</span>
                  </div>
                </div>
              </div>
              <div className="text-xs">6 名同学</div>
            </div>
          </div>
          <div className="mt-4 mb-4">
            <div className="mb-4">
              <div className="flex items-center">
                <TimeIconActive></TimeIconActive>
                <div className="ml-3 text-sm text-gray-400">周二</div>
                <div className="ml-10 text-sm text-gray-400 ">
                  {extendedProps.time}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <Location></Location>
              <div className="ml-3 text-sm text-gray-400">地点</div>
              <div className="ml-10 text-sm text-gray-400 ">
                {extendedProps.classroom}
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col items-center space-y-2">
              <div className="flex flex-col avatar placeholder">
                <div className="bg-gray-300 rounded-full text-neutral-content w-14">
                  <span className="text-3xl"></span>
                </div>
              </div>
              <div className="text-xs text-[#798195]">课程评价</div>
            </div>
            {/* <div className="flex flex-col items-center space-y-2"> */}
            {/*   <div className="flex flex-col avatar placeholder"> */}
            {/*     <div className="bg-gray-300 rounded-full text-neutral-content w-14"> */}
            {/*       <span className="text-3xl"></span> */}
            {/*     </div> */}
            {/*   </div> */}
            {/*   <div className="text-xs text-[#798195]">课程评价</div> */}
            {/* </div> */}
            <div className="flex flex-col items-center space-y-2">
              <div className="flex flex-col avatar placeholder">
                <div className="bg-gray-300 rounded-full text-neutral-content w-14">
                  <span className="text-3xl"></span>
                </div>
              </div>
              <div className="text-xs text-[#798195]">编辑</div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex flex-col avatar placeholder">
                <div className="bg-gray-300 rounded-full text-neutral-content w-14">
                  <span className="text-3xl"></span>
                </div>
              </div>
              <div
                className="text-xs text-[#798195]"
                onClick={() => {
                  deleteCURRICULUM(event.id);
                }}
              >
                删除
              </div>
            </div>
          </div>
        </div>
      </SwipeableDrawer>
    </div>
  );
};

export default function Schedules() {
  const [visible, setVisible] = useState(false);
  const [scheduleVisible, setScheduleVisible] = useState(false);
  const [addCourse, setAddCourse] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  const { data, error } = useFetch(
    `${Cons.API.CURRICULUM.QUERY}?campusId=1`,
    'get',
  );
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
      new Date(Date.parse('2022-08-31T16:00:00.000Z')),
      new Date(Date.parse('2023-12-30T16:00:00.000Z')),
    );
    const all = addFullStartDate(courseData, weekDate);
    console.log(all, 'courseData');
  }
  const router = useRouter()
  React.useEffect(() => {
    if (!data) {
      setDialogVisible(true);
    }
  }, [data]);
  const [arg, setArg] = useState();
  const [setting, setSetting] = useState({
    view: 'day',
  });
  return (
    <div className="space-y-1 bg-bg">
      <Dialog
        visible={dialogVisible}
        title="登录"
        showCancelButton
        confirmButtonText="登录"
        cancelButtonText="注册"
        onConfirm={() => {
          router.push('/Login/signup');
        }}
        onCancel={() => 
          {  router.push('/Login/signin');}}
        className="shadow-xl h-[screen - 48px] backdrop-opacity-50  backdrop-filter backdrop-blur-2xl"
      >
        <div className="text-[#798195] text-sm p-8">
          登录YoUni，自由添加课表、一键导入学校课程、一键分享给朋友！
        </div>
      </Dialog>

      <div className="pl-5 text-left f-11 ">
        <div className="text-base font-bold text-blueTitle">第 7 周</div>
        <div className="text-xs text-gray-400">10月10日 - 10月16日</div>
      </div>
      <div className="flex items-center justify-between pl-5 pr-5 h-11 bg-bg">
        <div className="flex items-center justify-around w-2/3 h-8 bg-white rounded-xl">
          <button
            onClick={() => {
              setSetting({ ...setting, view: 'day' });
            }}
            className={classnames('"btn  p-1 text-sm    rounded-sm', {
              'text-yellow-300 bg-gray-50': setting.view === 'day',
            })}
          >
            近五天
          </button>
          <button
            onClick={() => {
              setSetting({ ...setting, view: 'week' });
            }}
            className={classnames('text-sm   rounded-sm text-gray-400', {
              'text-yellow-300 bg-gray-50': setting.view === 'week',
            })}
          >
            近一周
          </button>
          <button
            onClick={() => {
              setSetting({ ...setting, view: 'today' });
            }}
            className={classnames('text-sm  rounded-sm text-gray-400', {
              'text-yellow-300 bg-gray-50': setting.view === 'today',
            })}
          >
            今日
          </button>
          <button
            onClick={() => {}}
            className={classnames('text-sm  rounded-sm text-gray-400', {
              'text-yellow-300 bg-gray-50': setting.view === 'month',
            })}
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
      <SetSchedule
        visible={scheduleVisible}
        setVisible={setScheduleVisible}
      ></SetSchedule>
      <CourseDetailCard
        visible={visible}
        setVisible={setVisible}
        {...arg}
      ></CourseDetailCard>
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
  );
}
