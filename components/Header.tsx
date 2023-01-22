import React from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames';

export default function Header(props: any):JSX.Element{
  const { children, title , className,returnClick} = props;
  const router = useRouter();

  return (
    <>
      <div className={classnames("fixed  inset-0 top-0 z-50 flex items-center justify-between w-full p-5 shadow h-11 bg-gray-50 ",className)}>
        <div
          onClick={() => {
            returnClick?returnClick():router.back();
          }}
          className="w-1/6"
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
        <div className="w-2/3 text-lg font-medium text-center">{title}</div>
        <div className="flex justify-end w-1/6">{children}</div>
      </div>
      <div className="mb-11"></div>
    </>
  );
}
