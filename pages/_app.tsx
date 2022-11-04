import '../styles/globals.css'
import '../styles/calendar.css'
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import LabelBottomNavigation from '@/components/Menu/Buttom-menu';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
  <LabelBottomNavigation></LabelBottomNavigation>
  <Component {...pageProps} />
  </>
}

export default MyApp
