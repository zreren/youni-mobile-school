import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/timegrid'; // a plugin!
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import CommonLayout from '../Layout/CommonLayout';
import './index.module.css';
import Icon from './Icon';
function Calendar() {
  const day = {
    en: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    cn: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
  };
  return (
    <div>
      <div className="h-full w-full  bg-white">
        <FullCalendar
          plugins={[dayGridPlugin]}
          viewDidMount={(view: any) => {
            ReactDOM.render(
              <div className="w-full h-full flex justify-center items-center">
                <Icon></Icon>
              </div>,
              view.el.getElementsByClassName('fc-timegrid-axis')[0],
            );
            // find('.fc-timegrid-axis').html('<span>Your content</span>');
          }}
          headerToolbar={false}
          displayEventTime={false}
          dayHeaderContent={(arg) => {
            console.log(arg);
            return (
              <div
                className={arg.isToday ? 'text-yellow-400' : 'text-gray-400'}
              >
                <div>{day.cn[arg.date.getDay()]}</div>
                <div className="flex items-center">
                  <div
                    className={classNames(
                      arg.isToday ? 'text-yellow-400' : 'text-blueTitle',
                      ' text-xs scale-90',
                    )}
                  >
                    {arg.date.getMonth() + 1}/
                  </div>
                  <div
                    className={classNames(
                      arg.isToday ? 'text-yellow-400' : 'text-blueTitle',
                      ' text-sm  ',
                    )}
                  >
                    {arg.date.getDate()}
                  </div>
                </div>
              </div>
            );
          }}
          events={[
            {
              id: 'a',
              title: 'ADMS 2000',
              content: '111',
              start: '2022-10-19T10:30:00',
              end: '2022-10-19T13:00:00',
              extendedProps: {
                department: 'HNE 038',
                online: true,
                section: 'S',
              },
              description: 'Lecture',
              type: 0,
            },
          ]}
          eventContent={(arg: any) => (
            <div className="flex flex-col justify-center h-full w-full items-center">
              <div className="font-bold	 scale-75 text-xs text-center  whitespace-nowrap">
                {arg.event.title}
              </div>
              <div className="font-light leading-none	 scale-90">
                Section {arg.event.extendedProps.section}
              </div>
              <div className="font-light leading-none	 scale-90	  ">
                {arg.event.extendedProps.department}
              </div>
              <div className="font-light leading-none	 scale-90	  ">
                {arg.event.extendedProps.online ? '线上课程' : '线下课程'}
              </div>
            </div>
          )}
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
