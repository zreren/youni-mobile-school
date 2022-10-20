import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/timegrid'; // a plugin!
import CommonLayout from '../Layout/CommonLayout';
import './index.module.css';
function Calendar() {
  return (
    <CommonLayout>
      <FullCalendar
        plugins={[dayGridPlugin]}
        headerToolbar={false}
        initialEvents={[{ title: 'nice event', start: new Date() ,}]}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }}
       
        slotLabelFormat={{
          hour: 'numeric',
          minute: '2-digit',
          hour12: false,
        }}
        allDaySlot={false}
        slotMinTime="07:00:00"
        slotMaxTime="22:00:00"
        slotDuration="00:30:00"
        slotLabelInterval="00:30"
        weekends={false}
        viewClassNames="
    h-screen"
      />
    </CommonLayout>
  );
}
export default Calendar;
