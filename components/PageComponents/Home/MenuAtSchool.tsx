import React from 'react';
import MenuItem from './MenuItem';
export default function MenuAtSchool() {
    const menuList = [
        {
            label:"我的GPA",
            path:"/Profile"
        },
        {
            label:"课程评价",
            path:"/course-evaluation"
        },
        {
            label:"教授评价",
            path:"/professor/professor-evaluation"
        },
        {
            label:"我的课表",
            path:"/Schedules/Schedules"
        },
        {
            label:"我的GPA",
            path:"/Profile"
        },
        {
            label:"课程评价",
            path:"/course-evaluation"
        },
        {
            label:"教授评价",
            path:"/professor/detail/1"
        },
        {
            label:"我的课表",
            path:"/Schedules/Schedules"
        },
        
    ]
  return (
    <div className="grid grid-cols-4 gap-4 w-full p-8">
       {menuList.map((item)=>(
         <MenuItem data={item} />
       ))}
    </div>
  );
}
