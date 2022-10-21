import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/timegrid'; // a plugin!
import { type } from 'os';
import CommonLayout from '../Layout/CommonLayout';
import './index.module.css';
function Calendar() {
  // const
  return (
    <div>
      <div className="h-full w-full">
        <FullCalendar
          plugins={[dayGridPlugin]}
          headerToolbar={false}
          displayEventTime={false}
          events={[
            {
              id: 'a',
              title: 'ADMS',
              content:'111',
              start: '2022-10-19T10:30:00',
              end: '2022-10-19T12:30:00',
              extendedProps: {
                department: 'HNE 038',
                online:true,
                section:'S',
              },
              description: 'Lecture',
              type: 0
            },
          ]}
          eventContent={
            (arg:any)=>(
            <div className='flex flex-col justify-center h-full items-center'>
              <div className='font-light text-xs overflow-hidden'>{arg.event.title}</div>
               <div className='font-light'>Section {arg.event.extendedProps.section}</div>
               <div className='font-light'>{arg.event.extendedProps.department}</div>
               <div className='font-light'>{arg.event.extendedProps.online?'线上课程':'线下课程'}</div>

            </div>
            )
          }
          eventBackgroundColor="#EBE5FE"
          eventTextColor="#A972F0"
          eventBorderColor="#A972F0"
          editable={true}
          initialEvents={[{ title: 'nice event', start: new Date() }]}
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }}
          height="auto"
          slotLabelFormat={{
            hour: 'numeric',
            minute: '2-digit',
            hour12: false,
          }}
          locale="en"
          allDaySlot={false}
          slotMinTime="07:00:00"
          slotMaxTime="22:00:00"
          slotDuration="00:30:00"
          slotLabelInterval="00:30"
          weekends={false}
          //     viewClassNames="
          // h-screen"
        />
      </div>
    </div>
  );
}
export default Calendar;
