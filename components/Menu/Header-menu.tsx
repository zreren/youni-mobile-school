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
  className: 'w-1/5 min-w-0 fill-yellow-500',
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
    color: 'rgba(255, 208, 54, 1)',
    fill: 'red',
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
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    props.switchMenu(newValue);
  };
  const getIcon = (props) => {
    const Icon = props;
    return <Icon></Icon>;
  };
  return (
    <Box
      sx={{ bgcolor: '#fff', width: '100%' }}
      className={classnames('sticky z-10 top-11 text-xs', className)}
    >
      <StyledTabs
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        aria-label="styled tabs example"
        className="max-w-screen"
      >
        {headerMenuList.map((item) => {
          return (
            <StyledTab
              sx={{ padding: '0px' }}
              icon={item.icon}
              label={item.label}
            />
          );
        })}

        {/* <StyledTab sx={{ padding: '0px' }} label="教授 " />
        <StyledTab sx={{ padding: '0px' }} label="课评" />
        <StyledTab sx={{ padding: '0px' }} label="群聊" />
        <StyledTab sx={{ padding: '0px' }} label="资料库" /> */}
      </StyledTabs>
    </Box>
  );
}
