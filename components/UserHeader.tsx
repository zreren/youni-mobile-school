import { useRouter } from 'next/router';
import React from 'react';
import classnames from 'classnames';

export default function UserHeader(props) {
  const { children, title, className, returnClick, data } = props;
  const router = useRouter();
  const checkUser =(id:number)=>{
    router.push({
      pathname:`/Profile/user`,
      query:{
        id:id
      }
    })
  }
  return (
    <div className={classnames("flex items-center p-2",className)} >
      <div className="avatar placeholder">
        <div
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            returnClick ? returnClick() : router.back();
          }}
          className="mr-4"
        >
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.19531 0.328613L7.13812 1.27142L2.42408 5.98547L7.13812 10.6995L6.19531 11.6423L1.0099 6.45691C1.00988 6.45689 1.00986 6.45687 1.48127 5.98547L1.0099 6.45691L0.538458 5.98547L6.19531 0.328613Z"
              fill="#1D2129"
            />
          </svg>
        </div>
        <div onClick={()=>{checkUser(data?.id)}} className="w-8 rounded-full bg-neutral-focus text-neutral-content">
          <img src={`${Cons.BASEURL}${data?.avatar}`} />
        </div>
      </div>
      <div  onClick={()=>{checkUser(data?.id)}} >
        <div className="ml-4 text-sm font-medium max-w-8 text-blueTitle">
          {data?.nickName}
        </div>
        <div className="ml-4 text-xs text-gray-200">
          {data?.education?.year} · {data?.education?.major}
          {/* 2022届 · B.Com Accounting */}
        </div>
      </div>
    </div>
  );
}
