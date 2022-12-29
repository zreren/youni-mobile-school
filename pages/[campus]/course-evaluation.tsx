import React from 'react';
import Header from '@/components/Header';
import ProfessorCard from '@/components/ProfessorListItem';
import CommonLayout from '@/components/Layout/CommonLayout';
import HeaderMenu from '@/components/Menu/Header-menu';
import Search from '@/components/Input/Search';
import Title from '@/components/Title/Title';
import { professorList } from '@/mock/data';
import HotProfessorCar from './professor/components/hot-professor-car';
import { useRouter } from 'next/router';
import Introduce from '@/components/PageComponents/Course/Introduce';
import FilterIcon from '@/public/filter.svg';
import CDataGrip from '@/components/CDataGrip';
import Waterfall from '@/components/Layout/Waterfall';
import UserComment from '@/components/user-comment';
import UseFetch from '@/hooks/useFetch';
import useFetch from '@/hooks/useFetch';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function courseEvaluation() {
  const { data, error } = useFetch(`${Cons.API.COURSE.List}?campusId=1&courseId=1`,"get");

  const Pending = () => {
    return (
      <div className="w-2/3 mx-auto mt-10 alert alert-info">
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
          <span>等待高保真</span>
        </div>
      </div>
    );
  };
  const evaluation = () => {
    return (
      <CommonLayout>
        <Search></Search>
        <Title title="热门教授"></Title>
        <HotProfessorCar professorList={professorRankList}></HotProfessorCar>
        <Title title="教授列表" customClick={() => {}}>
          <FilterIcon></FilterIcon>
        </Title>
        <div className="space-y-4">
          {professorList.map((item) => {
            return (
              <ProfessorCard
                data={item}
                key={item.id}
                onClick={() => {
                  router.push(`/professor/detail/${item.id}`);
                }}
              ></ProfessorCard>
            );
          })}
        </div>
      </CommonLayout>
    );
  };

  const professorRankList = [
    {
      id: 1,
      name: 'Leonard Eli Karakowsky',
      score: 4.5,
    },
    {
      id: 2,
      name: 'Test Professor 1',
      score: 3.2,
    },
    {
      id: 3,
      name: 'Test Professor 2',
      score: 1.7,
    },
  ];
  const CourseEva = () => {
    return (
      <div className='p-4'>
        <Title title="数据概览"></Title>
        <CDataGrip></CDataGrip>
        <Title title="课程点评" customClick={() => {}}>
          <FilterIcon></FilterIcon>
        </Title>
        <UserComment></UserComment>
        <UserComment></UserComment>
      </div>
    );
  };
  const GroupChat = ()=>{
    return (
      <div>
        <Waterfall></Waterfall>
      </div>
    )
  }
  const menuList = [Introduce, evaluation, CourseEva, GroupChat, Pending];
  const router = useRouter();
  const [menu, setMenu] = React.useState(Introduce);
  const headerMenuList = [
    {
      label: '简介',
    },
    {
      label: '教授',
    },
    {
      label: '课评',
    },
    {
      label: '群聊',
    },
    {
      label: '资料库',
    },
  ];
  return (
    <div className="w-screen min-h-screen bg-bg">
      <Header title="课程评价"></Header>
      <HeaderMenu
        headerMenuList={headerMenuList}
        switchMenu={(val) => {
          setMenu(menuList[val]);
        }}
      ></HeaderMenu>
      {/* <div className='mt-6'></div> */}
      {menu}
    </div>
  );
}