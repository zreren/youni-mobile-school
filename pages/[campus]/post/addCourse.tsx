import React from 'react'
import Expiration from '@/components/courseRecommond/expiration';
import CourseConfig from '@/components/courseRecommond/courseConfig';
export default function addCourse() {
  return (
    <div className=' pt-3'>
        <Expiration></Expiration>
        <div className='bg-[#F6F6F6] w-full h-3'></div>
        <CourseConfig></CourseConfig>
    </div>
  )
}
