import { useRouter } from 'next/router';
import React from 'react';

export default function MenuItem(props) {
  const { label, path } = props.data;
  const router = useRouter();
  return (
    <div className="flex flex-col items-center" onClick={()=>{router.push(path)}}>
      <div className="avatar placeholder mb-2">
        <div className="bg-red-50 text-neutral-content rounded-full w-12 h-12"></div>
      </div>
      <div className="text-gray-400 text-xs">{label}</div>
    </div>
  );
}
