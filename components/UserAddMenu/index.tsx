import React from 'react';
import styles from './index.module.css';
import Icon1 from './1.svg';
import Icon2 from './2.svg';
import Icon3 from './3.svg';
import Icon4 from './4.svg';
import Icon5 from './5.svg';
import Subtract from './Subtract.svg';
import { useRouter } from 'next/router';
import { useLocalStorage } from 'react-use';

export default function index(props) {
  const router = useRouter();
  const [selectSchool,setSelectSchool] = useLocalStorage('school',null)
  let body = document.body;
  return (
    <div
      onClick={() => {
        props.close();
      }}
      onTouchMove={(e)=>{
        e.stopPropagation();
        e.preventDefault();
      }}
      onTouchStart={(e)=>{
        e.stopPropagation();
        e.preventDefault();
      }}
      className="fixed bottom-0 z-30 justify-center flex  w-screen h-screen backdrop-filter backdrop-blur-2xl"
    >
      <div className='max-w-[380px] min-w-[380px] fixed bottom-0 '>
      <div
        onClick={() => {
          body.style.overflow = 'scroll';
          router.push({
            pathname: '/Schedules/AddCourse',
            query: { id: 1 },
          });
        }}
        className={styles.element}
      >
        <Icon4></Icon4>
        <div className='text-[#8C6008] text-xs font-medium'>加课表</div>
      </div>
      <div
        onClick={() => {
          body.style.overflow = 'scroll';
          router.push({
            pathname: '/Schedules/AddCourse',
            query: { id: 2 },
          });
        }}
        className={styles.element}
      >
        <Icon5></Icon5>
        <div className='text-[#8C6008] text-xs font-medium'>加提醒</div>
      </div>
      <div
        className={styles.element}
        onClick={() => {
          body.style.overflow = 'scroll';
          router.push({
            pathname: '/[campus]/Course/evaluation',
            query: { campus: selectSchool },
          });
        }}
      >
        <Icon1></Icon1>
        <div className='text-[#8C6008] text-xs font-medium'>写课评</div>
      </div>
      <div
        onClick={() => {
          body.style.overflow = 'scroll';
          router.push({
            pathname: '/[campus]/post/addPost',
            query: { campus: selectSchool },
          });
        }}
        className={styles.element}
      >
        <Icon2></Icon2>
        <div className='text-[#8C6008] text-xs font-medium'>二手书</div>
      </div>
      <div
        onClick={() => {
          body.style.overflow = 'scroll';
          router.push({
            pathname: '/[campus]/post/addPost',
            query: { campus: selectSchool },
          });
        }}
        className={styles.element}
      >
        <Icon3></Icon3>
        <div className='text-[#8C6008] text-xs font-medium'>转闲置</div>
      </div>
      </div>
      <Subtract className="absolute bottom-0 w-screen -z-30 object-cover"></Subtract>
    </div>
  );
}
