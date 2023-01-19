import React, { useEffect, useMemo } from 'react';
import Header from '@/components/Header';
import ProfessorCard from '@/components/ProfessorListItem';
import CommonLayout from '@/components/Layout/CommonLayout';
import HeaderMenu from '@/components/Menu/Header-menu';
import Search from '@/components/Input/Search';
import Title from '@/components/Title/Title';
import { professorList } from '@/mock/data';
import HotProfessorCar from '../professor/components/hot-professor-car';
import { useRouter } from 'next/router';
import Introduce from '@/components/PageComponents/Course/Introduce';
import FilterIcon from '@/public/filter.svg';
import CDataGrip from '@/components/CDataGrip';
import Waterfall from '@/components/Layout/Waterfall';
import UserComment from '@/components/user-comment';
// import UseFetch from '@/hooks/useFetch';
import useFetch from '@/hooks/useFetch';
import prefixSorted from '../../../libs/phone';
import MenuItem from '@mui/material/MenuItem';
import { Loading } from 'react-vant';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function courseEvaluation() {
  const router = useRouter();
  const CourseId = router.query.id;
  const CampusId = router.query.campus;
  // const router =useRouter();
  const { data: courseEvaluation, error } = useFetch(
    `${Cons.API.COURSE.DETAIL}?id=${CourseId}`,
    'get',
  );
  const [orderState, setOrderState] = React.useState();
  const handleChangeOrder = (event: SelectChangeEvent) => {
    console.log(event.target.value, 'event.target.value');
    setOrderState(event.target.value as string);
  };

  console.log(courseEvaluation, 'courseEvaluation');
  // if(!courseEvaluation) return
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
          <span>敬请期待</span>
        </div>
      </div>
    );
  };
  function CustomIconWrapper(props) {
    return <FilterIcon {...props} style={{ transform: 'rotate(0deg)' }} />;
  }
  const Evaluation = (props) => {
    console.log(props, 'Evaluation props');
    return (
      <CommonLayout>
        <Search></Search>
        <Title title="热门教授"></Title>
        <HotProfessorCar professorList={professorRankList}></HotProfessorCar>
        <Title title="教授列表" customClick={() => {}}>
          {/* <FilterIcon></FilterIcon> */}
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={orderState}
            defaultValue={'default'}
            IconComponent={CustomIconWrapper}
            sx={{
              boxShadow: 'none',
              '.MuiOutlinedInput-notchedOutline': { border: 0 },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                transform: 'none',
                border: 0,
                'border-width': 0,
                'border-color': 'transparent',
              },
            }}
            onChange={handleChangeOrder}
            disableUnderline
          >
            <MenuItem value="default">默认排序</MenuItem>
            <MenuItem value="positive">评分正序</MenuItem>
            <MenuItem value="negative">评分倒序</MenuItem>
          </Select>
        </Title>
        <div className="space-y-4">
          {props?.map((item, index) => {
            return (
              <ProfessorCard
                data={item}
                key={index}
                onClick={() => {
                  const campusId = router.query.campus;
                  router.push({
                    pathname:`/[campus]/professor/detail/${item.id}`,
                    query: { campus: CampusId },
                  });
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


  const CourseEva = (props) => {
    const [evaluationOrder, setEvaluationOrder] = React.useState();
    const handleChangeEvaluationOrder = (event: SelectChangeEvent) => {
      console.log(event.target.value, 'event.target.value');
      setEvaluationOrder(event.target.value as string);
    };
    const { data: commentData } = useFetch(
      `${Cons.API.EVALUATION.LIST}?courseId=${CourseId}&campusId=${1}`,
      'get',
    );
    const { data: evaluationData } = useFetch(
      `/evaluation/list?courseId=${CourseId}&campusId=${1}`,
      'get',
    );
    const sortFunction = (a, b) => {
      console.log(a,b,"sortFunction")
      if (evaluationOrder === 'positive')
        return b.professorRating - a.professorRating;
      if (evaluationOrder === 'negative')
        return a.professorRating - b.professorRating;
      if(evaluationOrder === 'default') return 0
      // return 0;
    };
    if (!props) {
      props = {
        rating: {
          professorRating: 1,
          homeworkRating: 1,
          contentRating: 1.2,
          examRating: 1.2,
        },
      };
    }
    const evaluationListMemo = useMemo(() => {
      if(!evaluationData) return
      const data = evaluationData?.data?.slice()
      return data?.sort(sortFunction);
    }, [evaluationOrder,evaluationData?.data]);
    useEffect(() => {
      console.log(evaluationListMemo, 'evaluationListMemo');
    }, [evaluationListMemo]);
    useEffect(() => {
      console.log(evaluationOrder, 'evaluationOrder')
    },[evaluationOrder])
    let { rating } = props;
    return (
      <div className="p-4">
        <Title title="数据概览"></Title>
        <CDataGrip data={rating}></CDataGrip>
        <Title title="课程点评" customClick={() => {}}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={evaluationOrder}
            // defaultValue={'default'}
            IconComponent={CustomIconWrapper}
            sx={{
              boxShadow: 'none',
              '.MuiOutlinedInput-notchedOutline': { border: 0 },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                transform: 'none',
                border: 0,
                'border-width': 0,
                'border-color': 'transparent',
              },
            }}
            onChange={handleChangeEvaluationOrder}
            disableUnderline
          >
            <MenuItem value="default">默认排序</MenuItem>
            <MenuItem value="positive">评分正序</MenuItem>
            <MenuItem value="negative">评分倒序</MenuItem>
          </Select>
        </Title>
        {evaluationListMemo?.map((item, index) => {
          console.log(item,evaluationOrder, 'item');
          return <UserComment data={item} key={item.id+evaluationOrder}></UserComment>;
        })}
        {/* <UserComment></UserComment> */}
      </div>
    );
  };
  const {data:groupData,error:groupError} = useFetch(`/post/home_list?type=group`,'get')

  const GroupChat = () => {
    return (
      <div className='mt-2'>
        <Waterfall postData={groupData?.data}></Waterfall>
      </div>
    );
  };
  const { data: evaluationData } = useFetch(
    `${Cons.API.PROFESSOR.QUERY}?id=${CourseId}`,
    'get',
  );
  const MyIntroduce = React.useMemo(() => {
    return courseEvaluation?.data;
  }, [courseEvaluation]);
  const menuList = [
    Introduce(MyIntroduce),
    Evaluation(evaluationData?.data),
    CourseEva(courseEvaluation?.data),
    GroupChat,
    Pending,
  ];
  useEffect(() => {
    if (courseEvaluation?.data) {
      setMenu(menuList[0]);
    }
  }, [courseEvaluation]);
  const [menu, setMenu] = React.useState(menuList[-1]);
  // if(courseEvaluation?.data){
  //   setMenu(menuList[0])
  // }

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
      <Header
        title={`${courseEvaluation?.data?.ename} ${courseEvaluation?.data?.code}`}
      ></Header>
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
