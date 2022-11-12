import React, { useState } from 'react';
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
    <div className="rounded-lg w-full h-12  bg-white p-4">
      <div className="flex justify-between items-center h-full  space-x-4">
        <div className="flex items-center">
          <Icon className="mr-1"></Icon>{' '}
          <div className="text-blueTitle font-medium">{title}</div>
        </div>
        <div>{Children ? Children : null}</div>
      </div>
    </div>
  );
};
const SetSchedule = (props) => {
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
      <div className="w-full h-96	 bg-white p-4 mb-14">
        <div className="w-full flex space-x-2">
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
          <CCourseInput Icon={Icon1} title="打开时显示"></CCourseInput>
          <div className="divider m-0 pl-4 pr-4 opacity-30 h-1"></div>
          <CCourseInput title="课表视图显示日程" Icon={Icon2}>
            <div>
              <FormControlLabel
                control={<IOSSwitch defaultChecked />}
                label=""
              />
            </div>
          </CCourseInput>
          <div className="divider m-0 pl-4 pr-4 opacity-30 h-1"></div>
          <CCourseInput title="添加课程/日程" Icon={Icon3}>
            {' '}
            <RightIcon className="mr-2"></RightIcon>
          </CCourseInput>
          <div className="divider m-0 pl-4 pr-4 opacity-30 h-1"></div>
          <CCourseInput title="自定义背景" Icon={Icon4}>
            <RightIcon className="mr-2"></RightIcon>
          </CCourseInput>
          <div className="divider m-0 pl-4 pr-4 opacity-30 h-1"></div>
          <CCourseInput title="切换课表" Icon={Icon5}></CCourseInput>
          <div className="flex justify-between mt-4 pr-4 pl-4">
            <div className="flex flex-col items-center">
              <div className="avatar placeholder  flex flex-col">
                <div className="bg-gray-300 text-neutral-content rounded-full w-14">
                  <span className="text-3xl"></span>
                </div>
              </div>
              <div className="text-xs">课程评价</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="avatar placeholder  flex flex-col">
                <div className="bg-gray-300 text-neutral-content rounded-full w-14">
                  <span className="text-3xl"></span>
                </div>
              </div>
              <div className="text-xs">课程评价</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="avatar placeholder  flex flex-col">
                <div className="bg-gray-300 text-neutral-content rounded-full w-14">
                  <span className="text-3xl"></span>
                </div>
              </div>
              <div className="text-xs">课程评价</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="avatar placeholder  flex flex-col">
                <div className="bg-gray-300 text-neutral-content rounded-full w-14">
                  <span className="text-3xl"></span>
                </div>
              </div>
              <div className="text-xs">课程评价</div>
            </div>
          </div>
        </div>
      </div>
    </SwipeableDrawer>
  );
};
const CourseDetailCard = (props) => {
  const { arg } = props;
  if (!arg) return null;
  return (
    <div className="">
      {/* <div className='bg-gray-400 w-4 h-1 rounded-xs '></div> */}
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
        <div className="w-full h-80 rounded-full p-4">
          <Puller></Puller>
          <div
            className="border-purple-600	w-full 
            rounded-2xl
            p-4
            flex justify-between
            h-20 border"
          >
            <div className="text-purple-600">
              <div className="flex items-center">
                {' '}
                <div className="bg-purple-600 font-medium text-lg h-4 mr-2 w-1 rounded-full"></div>
                <div>{arg.event.title}</div>
              </div>
              <div className="text-xs font-normal mt-2">
                {' '}
                Section {arg.event.extendedProps.section}
                {arg.event.extendedProps.online ? '线上课程' : '线下课程'}
              </div>
            </div>
            <div className="flex flex-col ">
              <div className="avatar-group  -space-x-6">
                <div className="avatar border-1">
                  <div className="w-6">
                    <img src="https://placeimg.com/192/192/people" />
                  </div>
                </div>
                <div className="avatar border">
                  <div className="w-6">
                    <img src="https://placeimg.com/192/192/people" />
                  </div>
                </div>
                <div className="avatar border">
                  <div className="w-6">
                    <img src="https://placeimg.com/192/192/people" />
                  </div>
                </div>
                <div className="avatar border placeholder">
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
                <div className="text-sm text-gray-400 ml-3">周二</div>
                <div className="ml-10 text-sm text-gray-400 ">7:30 - 9:30</div>
              </div>
            </div>
            <div className="flex items-center">
              <Location></Location>
              <div className="text-sm text-gray-400 ml-3">地点</div>
              <div className="ml-10 text-sm text-gray-400 ">HNE 038</div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col items-center">
              <div className="avatar placeholder  flex flex-col">
                <div className="bg-gray-300 text-neutral-content rounded-full w-14">
                  <span className="text-3xl"></span>
                </div>
              </div>
              <div className="text-xs">课程评价</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="avatar placeholder  flex flex-col">
                <div className="bg-gray-300 text-neutral-content rounded-full w-14">
                  <span className="text-3xl"></span>
                </div>
              </div>
              <div className="text-xs">课程评价</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="avatar placeholder  flex flex-col">
                <div className="bg-gray-300 text-neutral-content rounded-full w-14">
                  <span className="text-3xl"></span>
                </div>
              </div>
              <div className="text-xs">课程评价</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="avatar placeholder  flex flex-col">
                <div className="bg-gray-300 text-neutral-content rounded-full w-14">
                  <span className="text-3xl"></span>
                </div>
              </div>
              <div className="text-xs">课程评价</div>
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
  const [arg, setArg] = useState();
  const [setting, setSetting] = useState({
    view: 'day',
  });
  return (
    <div className="bg-bg space-y-1">
      <div className="f-11 text-left pl-5 ">
        <div className="font-bold text-blueTitle text-base">第 7 周</div>
        <div className="text-xs text-gray-400">10月10日 - 10月16日</div>
      </div>
      <div className="h-11 flex items-center justify-between pl-5 pr-5 bg-bg">
        <div className="rounded-xl bg-white h-8 w-2/3 flex items-center justify-around">
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
        arg={arg}
      ></CourseDetailCard>
      <Calendar
        setting={setting}
        clickEvent={(arg) => {
          setArg(arg);
          setVisible(true);
        }}
      ></Calendar>
    </div>
  );
}
