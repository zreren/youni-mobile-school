import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Add from './add.svg';
import Icon from '../Icon';
import { styled } from '@mui/material/styles';
import {useRouter} from 'next/router';

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState(1);
  const routerTable = [
    '/Course/course',
    '/Course/course',
    '/Course/course',
    '/Course/course',
    '/Course/course',
    '/Course/course',
  ]
  const router = useRouter();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    router.push(routerTable[newValue]);
  };
  const MyAction = styled(BottomNavigationAction)(
    `color: rgba(169, 176, 192, 1);
    font-size:1.25rem;
    &.Mui-selected {
      color: rgba(55, 69, 92, 1);
    }
  `,
  );
  return (
    <BottomNavigation
      className="fixed w-full  bottom-0	left-0"
      value={value}
      showLabels={true}
      onChange={handleChange}
    >
      <MyAction label="看看" value={1} />
      <MyAction label="课表" value={2} />
      <MyAction
        label=" "
        icon={<Icon type="add"></Icon>}
        value={3}
      />
      <MyAction label="课评" value={4} />
      <MyAction label="我" value={5} />
    </BottomNavigation>
  );
}
