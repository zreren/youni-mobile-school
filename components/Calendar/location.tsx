import React from 'react';

export default function location({color}) {
  
  return (
    <>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 14.5H15"
          stroke={color}
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2 5.72076V14.5H9.5V3.88743C9.5 3.20487 8.8313 2.7229 8.18377 2.93874L2.68377 4.77208C2.27543 4.90819 2 5.29033 2 5.72076Z"
          stroke={color}
          stroke-width="1.2"
          stroke-linejoin="round"
        />
        <path
          d="M9.5 7L13.5 9.5V14.5"
          stroke={color}
          stroke-width="1.2"
          stroke-linejoin="round"
        />
        <path
          d="M5 7.5H7"
          stroke={color}
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5 11H7"
          stroke={color}
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12 12H11"
          stroke={color}
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </>
  );
}
