import React, { Children, useEffect, useState } from 'react';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#ffffff',
    color: 'rgba(121, 129, 149, 1)',
    Width: 144,
    borderRadius:'19px',
    fontSize: theme.typography.pxToRem(14),
    border: '1px solid #F3F4F6',
  },
}));
const style = {
  width: '100%',
  maxWidth: 144,
  bgcolor: 'white',
};

export default function Tooltips(props) {
  const { children } = props;
  const [open, setOpen] = useState(props.open);
  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);
  return (
    <div>
      {' '}
      <ClickAwayListener
        onClickAway={() => {
          setOpen(false);
        }}
      >
        <div>
          <HtmlTooltip
            title={
              <React.Fragment>
                <List sx={style} component="nav" aria-label="mailbox folders" className="rounded-3xl"> 
                    {

                    }
                  <ListItem button onClick={props.add}>
                    <ListItemText primary="一键导入课表" />
                  </ListItem>
                  <Divider />
                  <ListItem button divider>
                    <ListItemText primary="添加课程" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="添加日程" />
                  </ListItem>
                  <Divider light />
                </List>
              </React.Fragment>
            }
            open={open}
            onClose={() => {
              setOpen(false);
            }}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            PopperProps={{
              disablePortal: true,
            }}
            className="rounded-3xl"
          >
            <div onClick={()=>{setOpen(true)}}>{children}</div>
          </HtmlTooltip>
        </div>
      </ClickAwayListener>
    </div>
  );
}
