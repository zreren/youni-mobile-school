import React from 'react';
import Header from '../components/Header';
import Link from 'next/link';
import CButton from '../components/Button/CButton';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { selectLoginModelState, seLoginModelState } from "@/stores/authSlice";
export default function test() {
  const  router = useRouter()
  const dispatch = useDispatch();
  dispatch(seLoginModelState(true))
  return (
    <div className="p-8 pt-16 space-y-2">
      <Header title="测试链接页" />
      <button onClick={()=>{router.push('/')}} className="w-full bg-gray-500 btn btn-sm">
        <Link href="/">组件展示页</Link>
      </button>
      <button onClick={()=>{router.push('/School/York')}} className="w-full bg-gray-500 btn btn-sm">
        <Link href="/School/York">约克大学入口</Link>
      </button>
      <button onClick={()=>{router.push('/School/Harvard')}} className="w-full bg-gray-500 btn btn-sm">
        <Link href="/School/Harvard">牛津大学入口</Link>
      </button>
      <button onClick={()=>{router.push('/School/Stanford')}}  className="w-full bg-gray-500 btn btn-sm">
        <Link href="/School/Stanford">斯坦福大学入口</Link>
      </button>
      <div className="shadow-lg alert alert-info">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="flex-shrink-0 w-6 h-6 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <div>目前页面仅为临时展示页面，非最终效果，细节将不断完善</div>
        </div>
      </div>
    </div>
  );
}
