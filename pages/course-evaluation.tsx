import React from 'react';
import Header from '../components/Header';
import ProfessorCard from '@/components/ProfessorListItem';
import CommonLayout from '@/components/Layout/CommonLayout';
import HeaderMenu from '@/components/Menu/Header-menu';
import Search from '@/components/Input/Search';
import Title from '@/components/Title/Title';
import { professorList } from '@/mock/data';
import HotProfessorCar from './professor/components/hot-professor-car';
import { useRouter } from 'next/router';
import Introduce from '@/components/PageComponents/Course/Introduce';
import FilterIcon from  '../public/filter.svg';

// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function courseEvaluation() {
  const Pending = () => {
    return (
      <div className="alert alert-info mt-10 w-2/3 mx-auto">
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
    );
  };
  const evaluation = () => {
    return (
      <CommonLayout>
        <Search></Search>
        <Title title="热门教授"></Title>
        <HotProfessorCar professorList={professorRankList}></HotProfessorCar>
        <Title title="教授列表" customClick={()=>{
          
        }}>
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
      name: 'Test Professor 1',
      score: 1.7,
    },
  ];
  const menuList = [Introduce, evaluation, Pending, Pending, Pending];
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
    <div className="bg-bg w-screen h-screen">
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
