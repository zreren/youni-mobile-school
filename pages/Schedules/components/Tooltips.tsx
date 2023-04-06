import React, { Children, useEffect, useState } from 'react';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#ffffff',
    color: 'rgba(121, 129, 149, 1)',
    Width: 144,
    marginRight: '10px',
    textAlign: 'center',
    fontSize: theme.typography.pxToRem(14),
    // border: '1px solid #F3F4F6',
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
  const {t} = useTranslation();
  const router = useRouter();
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
                <List sx={style} component="nav" aria-label="mailbox folders">
                  <ListItem button onClick={props.add}>
                    <ListItemText
                      className="order-opacity-40"
                      onClick={() => {
                        router.push({
                          pathname: '/Schedules/reorganize',
                          query: { campus: router.query.campus },
                        });
                      }}
                      primary={t('一键导入课表')}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem
                    button
                    onClick={() => {
                      router.push('/Schedules/AddCourse?id=1');
                    }}
                    className="border-opacity-40"
                  >
                    <ListItemText
                      className=" border-opacity-40 "
                      primary={t('_添加课程')}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem
                    button
                    onClick={() => {
                      router.push('/Schedules/AddCourse?id=2');
                    }}
                  >
                    <ListItemText className="" primary={t('添加日程')} />
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
            className="rounded-2xl shadow-lg "
          >
            <div
              onClick={() => {
                setOpen(true);
              }}
            >
              {children}
            </div>
          </HtmlTooltip>
        </div>
      </ClickAwayListener>
    </div>
  );
}
