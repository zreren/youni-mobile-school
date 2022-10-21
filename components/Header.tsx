import React from 'react';
import { useRouter } from 'next/router';
export default function Header(props: any) {
  const { children, title } = props;
  const router = useRouter();

  return (
    <>
      <div className="shadow w-full fixed inset-0 top-0 p-5 h-11 bg-gray-50 flex justify-between items-center  z-50	">
        <div
          onClick={() => {
            router.back();
          }}
          className="w-1/3"
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
        <div className="text-lg font-medium w-1/3 text-center">{title}</div>
        <div className='w-1/3 flex justify-end'>{children}</div>
      </div>
      <div className="mb-11"></div>
    </>
  );
}
