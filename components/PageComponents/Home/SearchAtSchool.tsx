import React from 'react';
export default function SearchInSchool(props) {
  const { placeholder } = props;
  return (
    <div className="flex justify-center w-full relative pl-4 pr-4">
      {/* <div className='absolute left-1/3 top-3 pl-20'>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.66716 1.66699C10.7968 1.66699 13.3338 4.20405 13.3338 7.33366C13.3338 8.51647 12.9714 9.61464 12.3516 10.5232L14.6122 12.7844C14.7424 12.9146 14.7424 13.1256 14.6122 13.2558L14.0466 13.8215C13.9164 13.9517 13.7053 13.9517 13.5752 13.8215L11.3735 11.6203C10.3799 12.4801 9.08426 13.0003 7.66716 13.0003C4.53754 13.0003 2.00049 10.4633 2.00049 7.33366C2.00049 4.20405 4.53754 1.66699 7.66716 1.66699ZM7.66716 3.06699C5.31074 3.06699 3.40049 4.97724 3.40049 7.33366C3.40049 9.69007 5.31074 11.6003 7.66716 11.6003C10.0236 11.6003 11.9338 9.69007 11.9338 7.33366C11.9338 4.97724 10.0236 3.06699 7.66716 3.06699Z"
            fill="#86909C"
          />
        </svg>
      </div> */}
      <input
        type="text"
        placeholder={placeholder ? placeholder : 'Search'}
        className="
        border-none
        text-center input input-md	h-10 w-full rounded-full"
      />
    </div>
  );
}
