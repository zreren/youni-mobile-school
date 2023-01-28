import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import classnames from 'classnames';
const AntTabs = styled(Tabs)({
  borderBottom: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: 'white',
  },
});

const AntTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(1),
  color: 'rgba(0, 0, 0, 0.85)',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    color: '#40a9ff',
    opacity: 1,
  },
  '&.Mui-selected': {
    color: '#1890ff',
    fontWeight: theme.typography.fontWeightMedium,
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#d1eaff',
  },
}));

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  variant?: string;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: any) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 20,
    width: '50%',
    backgroundColor: 'rgba(255, 208, 54, 1)',
  },
  variant: 'full',
  minWidth: 'none',
});

interface StyledTabProps {
  label?: any;
  icon?: any;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: 'none',
  backgroundColor: '#fff',
  width: 52,
  border:"1px solid #DCDDE1",
  height: "28px",
  className: 'w-1/5 h-4 min-w-0 fill-yellow-500',
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(16),
  color: 'rgba(0, 0, 0, 0.7)',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&.Mui-selected': {
    color: '#8C6008',
    fill: 'white',
    backgroundColor: '#FFD036',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
}));

export default function CustomizedTabs(props) {
  let { id } = props;
  if (!id) {
    id = 0;
  }
  const [value, setValue] = React.useState(id);
  const { headerMenuList, className } = props;
  const handleChange = (newValue: number) => {
    setValue(newValue);
    props.change(newValue);

  };
  React.useEffect(() => {
    // props.change(value);
    console.log(value,'index');
  },[value])
  const getIcon = (props) => {
    const Icon = props;
    return <Icon></Icon>;
  };
  return (
    <div className='flex w-full space-x-3 overflow-scroll scrollbar-hide '>
        {
            headerMenuList.map((item,index)=>{
                return (
                    <div onClick={()=>{handleChange(index)}} 
                    className={classnames('h-[28px]  text-sm min-w-[56px] w-14 flex justify-center  items-center rounded-full',
                    {"bg-[#FFD036] text-[#8C6008] " : value === index,
                    "text-[#A9B0C0] border-[#DCDDE1] border ":value !== index})}>{item.label}</div>
                )
            })
        }
    </div>
  );
}
