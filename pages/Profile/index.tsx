import React from 'react'
import CommonLayout from '@/components/Layout/CommonLayout'
import Header from '@/components/Header';
import ProfileHeader from '@/components/PageComponents/Profile/ProfileHeader';
export default function index() {
  return (
    // <div className='w-screen h-screen'>
    //   <ProfileHeader></ProfileHeader>
    //   </div>
   <CommonLayout>
    <Header title="我的"></Header>
    <div className="alert alert-info shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current flex-shrink-0 w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>等待高保真</span>
        </div>
      </div>
   </CommonLayout>
  )
}
