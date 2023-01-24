import React from 'react';
import Button from '@mui/material/Button';
import Icon from '../Icon';
import { styled } from '@mui/material/styles';
import classnames from 'classnames';
export default function SaveToLibButton(props) {
  const { color, icon, title,onClick } = props;
  const MyButton = styled(Button)(({ theme }) => ({
    backgroundColor: color + '!important',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: color,
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
  }));
  return (
    <div className="w-full h-10" onClick={()=>{onClick()}}>
      <MyButton
        startIcon={<Icon type={icon} />}
        variant="contained"
        className={classnames('w-full h-10 btn')}
      >
        {title}
      </MyButton>
    </div>
  );
}
