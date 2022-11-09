import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Add from './add.svg';
import Icon from '../Icon';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
export default function LabelBottomNavigation() {
  const router = useRouter();
  const routerTable = [
    '///',
    '/School/York',
    '/Schedules/Schedules',
    '/Course/evaluation',
    '/Course/course',
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
  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
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
    <BottomNavigation
      className="fixed transition-all	 w-full text-sm bottom-0	left-0 z-30"
      value={value}
      showLabels={true}
      onChange={handleChange}
    >
      <MyAction className="transition-all	" label="看看" value={1} />
      <MyAction label="课表" value={2} />
      <MyAction
        className="transition duration-2000 ease-in-out"
        label=" "
        icon={<Icon type="add"></Icon>}
        value={3}
      />
      <MyAction label="课评" value={4} />
      <MyAction label="我" value={5} />
    </BottomNavigation>
  );
}