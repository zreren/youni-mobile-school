import '../styles/globals.css';
import '../styles/calendar.css';
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import LabelBottomNavigation from '@/components/Menu/Buttom-menu';
import type { AppProps } from 'next/app';
import { wrapper } from '../stores/store';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { selectAuthState, setAuthState } from '../stores/authSlice';
import { useDispatch, useSelector } from 'react-redux';
function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();
  const authState = useSelector(selectAuthState);
  const router = useRouter();
  const routerTable = [
    '/School/',
    '/Schedules/Schedules',
    '/Course/evaluation',
    '/Course/course',
    '/Profile',
  ];
  useEffect(() => {
    console.log(router.pathname);
      if (routerTable.indexOf(router.pathname) > -1) {
        dispatch(setAuthState(true));
      }
  }, [router.pathname]);
  return (
    <>
      {authState ? <LabelBottomNavigation /> : null}
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
