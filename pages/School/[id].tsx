import React from 'react'
import HeaderLayout from '@/components/PageComponents/Home/HeaderLayout'
import MenuAtSchool from '@/components/PageComponents/Home/MenuAtSchool'
function SchoolPage(props) {
  console.log(props,'SchoolPage')
  return (
    <div className='h-screen'>
        <HeaderLayout school={props.post.school}></HeaderLayout>
        <MenuAtSchool></MenuAtSchool>
    </div>
  )
}


export async function getServerSideProps({params}){
    console.log(params,"params")
    const School =[
        {
            id:1,
            school:'约克大学 (加拿大)'
        },
        {
            id:2,
            school:'牛津大学 (英国)'
        },
        {
            id:3,
            school:'斯坦福大学 (美国)'
        }
    ]
    const map = {
        "York":School[0],
        "Harvard":School[1],
        "Stanford":School[2],
    }
    return {
        props:{
            post:map[params.id],
        },
    }
}
export default SchoolPage;