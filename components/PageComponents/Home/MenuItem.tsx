import { useRouter } from 'next/router';
import React from 'react';
import Image from 'next/image';
export default function MenuItem(props) {
  const { label, path ,icon} = props.data;
  const router = useRouter();
  return (
    <div className="flex flex-col items-center" onClick={()=>{router.push({pathname:path, query: { campus: 'York' },})}}>
      <div className="mb-2 avatar placeholder">
        <div className="w-12 h-12 rounded-full bg-red-50 text-neutral-content">
          <Image width={48} height={48} src={icon}></Image>
        </div>
      </div>
      <div className="text-xs text-gray-400">{label}</div>
    </div>
  );
}
