import React from 'react';
import MenuItem from './MenuItem';
export default function MenuAtSchool() {
    const menuList = [
        {
            label:"我的GPA",
            path:"/gap",
            icon: "/assets/index/1 (1).png"
        },
        {
            label:"课程评价",
            path:"/course-evaluation",
            icon: "/assets/index/1 (2).png"
        },
        {
            label:"教授评价",
            path:"/professor/professor-evaluation",
            icon: "/assets/index/1 (3).png"
        },
        {
            label:"我的课表",
            path:"/Schedules/Schedules",
            icon: "/assets/index/1 (4).png"
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
    <div className="grid w-full grid-cols-4 gap-4 p-8">
       {menuList.map((item)=>(
         <MenuItem data={item} />
       ))}
    </div>
  );
}
