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
import useLanguage from '@/hooks/useLanguage';
import EmptyProfessorIcon from './emptyProfessor.svg';
import EmptyCourseIcon from './emptyCourse.svg';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function courseEvaluation() {
  const router = useRouter();
  const CourseId = router.query.id;
  const CAMPUS = router.query.campus;

  const {data:campusData} = useFetch('/campus/query','get',{
    name: router.query.campus,
  })

  const campusId = useMemo(()=>{
    return campusData?.data?.[0]?.id
  },[campusData])
  // const router =useRouter();
  const { data: courseEvaluation, error } = useFetch(
    `${Cons.API.COURSE.DETAIL}?id=${CourseId}`,
    'get',
  );
  const [orderState, setOrderState] = React.useState<undefined | string>();
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
  const EmptyProfessor = () => {
    return (
      <div className="flex w-full bg-white flex-col justify-center items-center py-8 h-[100vh-200px] rounded-lg">
        <EmptyProfessorIcon></EmptyProfessorIcon>
        <div className="flex text-xs mt-6 justify-center items-center text-[#A9B0C0]">
          {useLanguage('') === 'e' ? '目前还没有教授' : '目前还没有教授'}
        </div>
      </div>
    );
  };
  const EmptyCourse= () => {
    return (
      <div className="flex w-full bg-white flex-col justify-center items-center py-8  h-[100vh-200px]  rounded-lg">
        <EmptyCourseIcon></EmptyCourseIcon>
        <div className="flex text-xs mt-6 justify-center items-center text-[#A9B0C0]">
          <span>{useLanguage('') === 'e' ? '目前还没有课评，' : '目前还没有课评，'}</span>
          <span onClick={()=>{
            router.push({
              pathname: `/[campus]/Course/evaluation`,
              query: { campus: router.query.campus ,id:CourseId,name:courseEvaluation?.data?.code},
            })
          }} className='text-[#3665FF]'>点击评价课程</span>
        </div>
      </div>
    );
  };
  function CustomIconWrapper(props) {
    return <FilterIcon {...props} style={{ transform: 'rotate(0deg)' }} />;
  }
  const {data:professorRankList} = useFetch('/professor/hot','get',{
    campusId:campusId
  })
  useEffect(()=>{
    console.log(professorRankList,"professorRankList")
  },[professorRankList])

  const Evaluation = (props) => {
    console.log(props, 'Evaluation props');
    return (
      <CommonLayout>
        <Search></Search>
        <Title title="热门教授"></Title>
        <HotProfessorCar professorList={professorRankList?.data}></HotProfessorCar>
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
          {props?.length > 0 ? (
            props?.map((item, index) => {
              return (
                <ProfessorCard
                  data={item}
                  key={index}
                  onClick={() => {
                    const campusId = router.query.campus;
                    router.push({
                      pathname: `/[campus]/professor/detail/${item.id}`,
                      query: { campus: router.query.campus },
                    });
                  }}
                ></ProfessorCard>
              );
            })
          ) : (
            <EmptyProfessor></EmptyProfessor>
          )}
        </div>
      </CommonLayout>
    );
  };

  const [isFilteringOut, setisFilteringOut] = React.useState(true);
  const {data:recommendsData} = useFetch(`/course/recommends?id=${CourseId}`,'get')
  const CourseEva = (props) => {
    type order = 'default' | 'positive' | 'negative';
    const [evaluationOrder, setEvaluationOrder] =
      React.useState<order>('default');


    const handleChangeEvaluationOrder = (event: SelectChangeEvent) => {
      setEvaluationOrder(event.target.value as order);
      console.log(event.target.value, 'event.target.value');
      const sortFunction = (a, b) => {
        console.log(a, b, 'sortFunction');
        if (event.target.value === 'positive')
          return b.professorRating - a.professorRating;
        if (event.target.value === 'negative')
          return a.professorRating - b.professorRating;
        if (event.target.value === 'default') return a.id - b.id;
        return 0;
      };
      evaluationData?.sort(sortFunction);
    };

    const { data: commentData } = useFetch(
      `${Cons.API.EVALUATION.LIST}?courseId=${CourseId}&campusId=${1}`,
      'get',
    );
    const { data: _evaluationData } = useFetch(
      `/evaluation/list`,
      'page',
      {
        campusId:campusId,
        courseId:CourseId,
        pageSize: 100,
      }
    );
    const evaluationData = React.useMemo(
      () =>
      _evaluationData
          ? evaluationData
            ? [...evaluationData].concat(..._evaluationData)
            : [].concat(..._evaluationData)
          : null,
      [_evaluationData, campusId,CourseId]
    );
    const [data, setData] = React.useState(evaluationData?.data);

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
    // const evaluationListMemo = useMemo(() => {
    //   if (!evaluationData) return
    //   // setisFilteringOut(true)
    //   const data = evaluationData?.data?.slice();
    //   setData(data?.sort(sortFunction).map((item) => {
    //     return (
    //       {
    //         ...item,
    //         sort: evaluationOrder
    //       }
    //     )
    //   }));
    // }, [evaluationOrder, evaluationData?.data]);
    // useEffect(() => {
    //   console.log(evaluationListMemo, 'evaluationListMemo');
    //   setisFilteringOut(false)
    // }, [evaluationListMemo]);
    // useEffect(() => {
    //   if (!evaluationData?.data) return
    //   console.log(evaluationOrder, 'evaluationOrder')
    //   setData(evaluationData?.data)
    //   // setisFilteringOut(false)
    // }, [evaluationOrder])
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
        <div className='pb-20'>
          {evaluationData?.length > 0 ? (
            evaluationData.map((item, index) => {
              console.log(item, evaluationOrder, 'item');
              return <UserComment data={item} key={index}></UserComment>;
            })
          ) : (
            <EmptyCourse></EmptyCourse>
          )}
        </div>
      </div>
    );
  };
  const { data: groupData, error: groupError } = useFetch(
    `/post/home_list?type=group`,
    'get',
  );

  const GroupChat = () => {
    return (
      <div className="mt-2">
        <Waterfall postData={groupData?.data}></Waterfall>
      </div>
    );
  };
  const { data: evaluationData } = useFetch(
    `/course/professors?id=${CourseId}`,
    'get',
  );
  const MyIntroduce = React.useMemo(() => {
    return courseEvaluation?.data;
  }, [courseEvaluation]);
  useEffect(() => {
    if (courseEvaluation?.data) {
      setMenu(0);
    }
  }, [courseEvaluation]);
  const [Menu, setMenu] = React.useState(-1);
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
    <div className="w-screen min-h-screen bg-bg pb-2">
      <Header
        title={`${courseEvaluation?.data?.code || 'loading...'}`}
      ></Header>
      <HeaderMenu
        headerMenuList={headerMenuList}
        switchMenu={(val) => {
          setMenu(val);
        }}
      ></HeaderMenu>

      {/* <div className='mt-6'></div> */}
      {/* {!Menu ? <Menu></Menu> : null} */}
      {/* {Menu} */}
      {Menu === 0 ? <Introduce recommendsData={recommendsData?.data} MyIntroduce={MyIntroduce}></Introduce> : null}
      {Menu === 1 ? Evaluation(evaluationData?.data) : null}
      {Menu === 2 ? <CourseEva {...courseEvaluation?.data} /> : null}
      {Menu === 3 ? GroupChat() : null}
      {Menu === 4 ? Pending() : null}
    </div>
  );
}
