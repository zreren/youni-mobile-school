import '../styles/globals.css';
import '../styles/calendar.css';
import '../styles/vant.css';
// import '../styles/picker.less'
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
// import 'ppfish-mobile/dist/ppfish-mobile.min.css';
import LabelBottomNavigation from '@/components/Menu/Buttom-menu';
import type { AppProps } from 'next/app';
import { wrapper } from '../stores/store';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  selectAuthState,
  setAuthState,
  selectOpen,
  setOpenLogin,
} from '../stores/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import classnames from 'classnames';
import { appWithTranslation } from 'next-i18next';
import UserAddMenu from '@/components/UserAddMenu';
import nexti18nConfig from '../i18n';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import SignIn from './Login/signin';
import SignUp from './Login/signup';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import '../cons';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import useLocalStorage from '../hooks/useStore';
function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();
  // const [language,setLanguage] = useLocalStorage('language','ename')
  const authState = useSelector(selectAuthState);
  const openLogin = useSelector(selectOpen);
  const [stopScroll, setStopScroll] = useState(false);
  const router = useRouter();
  const routerTable = [
    '/School/',
    '/[campus]/Schedules/Schedules',
    '/Course/evaluation',
    '/York/Course/course',
    '/Profile',
    'Schedules',
    'evaluation'
  ];
  const { i18n } = useTranslation();
  console.log(i18n);
  useEffect(() => {
    console.log(router.pathname);
    // setLanguage('ename')
    // if (routerTable.indexOf(router.pathname) > -1) {
      dispatch(setAuthState(true));
    // }
  }, [router.pathname]);
  const Puller = styled(Box)(({ theme }) => ({
    width: 33,
    height: 4,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
  }));
  const LoginModel = () => {
    return (
      <SwipeableDrawer
        className="topIndex"
        disableDiscovery={true}
        disableSwipeToOpen={true}
        onClose={() => {
          dispatch(setOpenLogin('close'));
          dispatch(setAuthState(true));
        }}
        onOpen={() => {}}
        open={openLogin!=='close'}
        anchor="bottom"
      >
        <div className="h-[96vh]">
          <Puller></Puller>
          {openLogin === 'login' ? <SignIn></SignIn> : null}
          {openLogin === 'register' ? <SignUp></SignUp> : null}
          {/* <SignIn></SignIn> */}
        </div>
      </SwipeableDrawer>
    );
  };
  return (
    <div className="overflow-hidden">
      <SwitchTransition mode="out-in">
        <CSSTransition
          in={openLogin !== 'close'}
          classNames="LoginModel"
          timeout={60}
          key={openLogin}
        >
          <div className={classnames({ 'hidden': openLogin !== 'close' })}>
            <LoginModel />
          </div>
        </CSSTransition>
      </SwitchTransition>
      {/* <LoginModel></LoginModel> */}
      {authState ? <LabelBottomNavigation /> : null}
      <Component {...pageProps} />
    </div>
  );
}

export default wrapper.withRedux(appWithTranslation(MyApp, nexti18nConfig));
