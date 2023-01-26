import React from 'react';
import classnames from 'classnames';
import styles from './index.module.css';
import { useRouter } from 'next/router';
export default function CategoryButton(props) {
  const { color,data } = props;
  const router = useRouter();
  return (
    <div
      onClick={()=>{
        router.push({pathname:'/[campus]/Course/List',query:{campus:"York",subjectId:data.id}})
      }
      }
      className={classnames(
        `text-white
     h-16 w-full rounded-lg pt-3 pl-3 flex justify-between overflow-hidden`,
        styles[color],
      )}
    >
      <div>
        <div className="text-base font-semibold text-PingFang  overflow-hidden">{data?.ename?.toUpperCase()}</div>
        <div className="text-xs font-normal text-opacity-80  overflow-hidden">{data?.cname}</div>
      </div>
      <div className="pr-2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_139_1412)">
            <circle
              opacity="0.6"
              cx="8"
              cy="8"
              r="8"
              fill="white"
              fillOpacity="0.2"
            />
            <path
              d="M6.49961 10.4999C6.49961 10.372 6.54844 10.244 6.64609 10.1465L8.7918 7.99992L6.64648 5.85352C6.45117 5.6582 6.45117 5.3418 6.64648 5.14648C6.8418 4.95117 7.1582 4.95117 7.35352 5.14648L9.85352 7.64648C10.0488 7.8418 10.0488 8.1582 9.85352 8.35352L7.35352 10.8535C7.1582 11.0488 6.8418 11.0488 6.64648 10.8535C6.54805 10.7562 6.49961 10.628 6.49961 10.4999Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_139_1412">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}
