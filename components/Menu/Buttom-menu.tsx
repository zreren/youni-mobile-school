import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Add from './add.svg';
import Icon from '../Icon';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import UserAddMenu from '@/components/UserAddMenu';
import { selectAuthState, setAuthState } from '@/stores/authSlice';
import IconClose from "./close.svg";
export default function LabelBottomNavigation(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const routerTable = [
    '///',
    '/York/home',
    '/Schedules/Schedules',
    '/Course/evaluation',
    '/York/Course/course',
    '/Profile',
  ];
  const [value, setValue] = React.useState(1);
  React.useEffect(() => {
    console.log(router.pathname);
    routerTable.map((item, index) => {
      console.log(item);
      if (item === router.pathname) {
        setValue(index);
      }
    });
  }, [router]);
  let body = document.body;
  const overflowState =  body.style.overflow;
  const handleChange = (event: React.SyntheticEvent, newValue: any) => {


    if (newValue === 3) {
      setValue(newValue);
      // let body = document.body;
      body.style.overflow = 'hidden';
      // body.style.height = "100vh"
      // props.stopScroll();
      return
    };
    if(newValue === 0){
      const oldValue = value;
      setValue(1);
      body.style.overflow = 'scroll';
      // body.style.height = "auto"
      // router.back();
      return
    }
    setValue(newValue);
    router.push(routerTable[newValue]);
  };
  const MyAction = styled(BottomNavigationAction)(
    `color: rgba(169, 176, 192, 1);
    font-size:1.25rem;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 1150ms;
    &.Mui-selected {
      color: rgba(55, 69, 92, 1);
      transform:scale(1.15)
    }
  `,
  );
  return (
    <div>
      {value === 3 ? (
        <div>
          <UserAddMenu close={()=>{setValue(0)}}></UserAddMenu>
          <BottomNavigation
            className="fixed -bottom-1 left-0 z-30 w-full text-sm transition-all bg-transparent"
            value={value}
            showLabels={true}
            onChange={handleChange}
          >
            <MyAction className="transition-all " label="" value={1} />
            <MyAction label="" value={2} />
            <MyAction
              className="transition ease-in-out duration-2000"
              label=" "
              icon={<IconClose type="add"></IconClose>}
              value={0}
            />
            <MyAction label="" value={4} />
            <MyAction label="" value={5} />
          </BottomNavigation>
        </div>
      ) : (
        <BottomNavigation
          className="fixed -bottom-1 left-0 z-30 w-full text-sm transition-all"
          value={value}
          showLabels={true}
          onChange={handleChange}
        >
          <MyAction className="transition-all " label="看看" value={1} />
          <MyAction label="课表" value={2} />
          <MyAction
            className="transition ease-in-out duration-2000"
            label=" "
            icon={<Icon type="add"></Icon>}
            value={3}
          />
          <MyAction label="课评" value={4} />
          <MyAction label="我" value={5} />
        </BottomNavigation>
      )}
    </div>
  );
}
