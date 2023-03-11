import React, { useEffect, useMemo, useState } from 'react';
import CommonLayout from '@/components/Layout/CommonLayout';
import Header from '@/components/Header';
import CButton from '@/components/Button/CButton';
import CourseInfo from '@/components/PageComponents/Course/addEvaluation/courseInfo';
import CourseData from '@/components/PageComponents/Course/addEvaluation/courseData';
import CourseIcon from '@/components/PageComponents/Course/addEvaluation/course.svg';
import NessIcon from '@/components/PageComponents/Course/addEvaluation/ness.svg';
import { EvaluationForm } from '@/libs/context';
import useFetch from '../../../hooks/useFetch';
import classnames from 'classnames';
import useRequest from '@/libs/request'
// import { EvaluationForm } from '@/libs/context';
import { useRouter } from 'next/router';
import useLocalStorage from '@/hooks/useStore';
import { Toast } from 'react-vant';
const TextEvaluation = () => {
  const data = React.useContext(EvaluationForm);
  const updateData = (level) => {
    data.setData({
      ...data.data,
      // courseDataTagsEvaluation: {
        content: level,
      // },
    });
  };
  const [value,setValue] = useState<any>()
  // const 
  return (
    <div className="bg-white pb-5 mt-4 pb-10">
      <label className="input-group bg-white w-full flex justify-between h-12 pl-4 ">
        <div className="flex items-center ">
          <CourseIcon className="mr-2"></CourseIcon>
          <div className="bg-white font-medium text-blueTitle text-base">
            文字评价
          </div>
        </div>
      </label>
      <div className="divider m-0 pl-4 pr-4 opacity-30 h-1"></div>
      <textarea
      value={value}
      onBlur={(e)=>{updateData(e.target.value)}}
        onChange={(e)=>{setValue(e.target.value)}}
        placeholder="教授讲课风格你喜欢吗？感觉考试难吗？和上课的内容关联性强吗？你是否推荐这个教授？"
        className="p-2 whitespace-normal leading-none hover:outline-none  w-full h-20 "
      />
    </div>
  );
};
const myScoreList = [
  {
    label: `91-100`,
    value: 'A+',
  },
  {
    label: '91-100',
    value: 1,
  },
  {
    label: '91-100A+',
    value: 1,
  },
  {
    label: '91-100A+',
    value: 1,
  },
  {
    label: '91-100A+',
    value: 1,
  },
  {
    label: '91-100A+',
    value: 1,
  },
  {
    label: '91-100A+',
    value: 1,
  },
  {
    label: '91-100A+',
    value: 1,
  },
  {
    label: '91-100A+',
    value: 1,
  },
  {
    label: '91-100A+',
    value: 1,
  },
];
const ResultAndTagEvaluation = (props) => {
  const scoreList = props.data;
  const [select, setSelect] = React.useState(0);
  const data = React.useContext(EvaluationForm);
  const updateData = (level) => {
    data.setData({
      ...data.data,
      courseDataTagsEvaluation: {
        score: level,
      },
    });
  };

  // data.data
  return (
    <div className="bg-white  mt-4 ">
      <label className="input-group bg-white w-full flex justify-between h-12 pl-4 ">
        <div className="flex items-center ">
          <CourseIcon className="mr-2"></CourseIcon>
          <div className="bg-white font-medium text-blueTitle text-base">
            Results & Tag
          </div>
        </div>
      </label>
      <div className="divider m-0 pl-4 pr-4 opacity-30 h-1"></div>
      <label className="input-group">
        <span className="bg-white font-medium text-blueTitle text-sm pt-2">
          <NessIcon className="mr-1"></NessIcon> 我的最终成绩
        </span>
      </label>
      <div className="grid grid-cols-4 gap-2 p-2">
        {scoreList?.map((item) => {
          return (
            <div
              onClick={() => {
                updateData(item.level);
              }}
              className={classnames(
                'w-full bg-gray-100 h-14 pt-3	 text-xs font-normal text-center align-middle	',
                {
                  'text-yellow-500':
                    data.data.courseDataTagsEvaluation.score === item.level,
                },
              )}
            >
              <div> {`${item.interval[0]}-${item.interval[1]}`}</div>
              <div>{item.level}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

//     在意学生感受
//     无趣
//     令人尊敬的教授
//     做好大量阅读准备
//     幽默
//     给分严格
//     评分标准清晰
//     缺勤=挂科',

const tagList = [
  {
    label: '课程讲的不错',
    value: 1,
  },
  {
    label: '好教授',
    value: 2,
  },
  {
    label: '在意学生感受',
    value: 4,
  },{
    label: '无趣',
    value: 5,
  },{
    label: '令人尊敬的教授',
    value: 6,
  },{
    label: '做好大量阅读准备',
    value: 7,
  },{
    label: '幽默',
    value: 8,
  },{
    label: '给分严格',
    value: 9,
  },{
    label: '评分标准清晰',
    value: 10,
  },{
    label: '缺勤=挂科',
    value: 11,
  }
];
const ProfessorTag = (props) => {
  // const tagList = props.data
  const data = React.useContext(EvaluationForm);
  const updateData = (level) => {
    if(data.data.professorTagsEvaluation.indexOf(level) > -1) {
      data.setData({
        ...data.data,
        professorTagsEvaluation: [
          ...data.data.professorTagsEvaluation.filter((item)=>item!==level),
        ]
      });
      return;
    }
    data.setData({
      ...data.data,
      professorTagsEvaluation: [
        ...data.data.professorTagsEvaluation,
        level
      ]
    });
  };
  return (
    <div className="bg-white ">
      <label className="input-group">
        <span className="bg-white font-medium text-blueTitle text-sm pt-2">
          教授标签
        </span>
      </label>
      <div className="w-full flex flex-wrap p-4">
        {tagList.map((item) => {
          return (
            <div onClick={()=>{updateData(item.label)}} className={
              classnames("bg-gray-100 text-xs p-2 mr-2 mt-1 mb-1",{
                'text-yellow-500':data.data.professorTagsEvaluation.includes(item.label)
              })
            }>{item.label}</div>
          );
        })}
      </div>
    </div>
  );
};

export default function evaluation() {
  React.useEffect(() => {
    console.log('EvaluationForm', EvaluationForm);
  }, [EvaluationForm]);
  const router = useRouter();

  const [campusId, setCampusId] = useState<Number>();
  const {
    data: _subjectData,
    error,
    mutate: mutateSubject,
  } = useFetch(`/subject/list`, 'page',{
    campusId:campusId,
    pagesize: 100,
  });

  useEffect(() => {
    console.log(router.query, 'campus?.toLowerCase()');
    if (!router.query.campus) return;
    const campus = router.query.campus as string;
    const campusId = localStorage.getItem(campus?.toLowerCase()) || 1;
    console.log(campusId, 'campusId');
    setCampusId(campusId as Number);
    mutateSubject();
  }, [router.query]);
  // const campusId = typeof window !== undefined ?
  const { data: tagList } = useFetch(`/campus/gpa/list?campusId=${1}`, 'get');
  const { data: professorTagsList } = useFetch(
    `/campus/gpa/list?campusId=${1}`,
    'get',
  );


  const [data, setData] = React.useState({
    courseData: {},
    courseDataEvaluation: {
      professorRating: 1,
      contentRating: 1,
      homeworkRating: 1,
      examRating: 1,
    },
    course:{
      id:1,
    },
    professor:{
      id:1
    },
    courseTextEvaluation: {},
    courseDataTagsEvaluation: {
      score: 'A+',
    },
    content:'',
    professorTagsEvaluation: [],
    professorRating: 1,
    contentRating: 1,
    homeworkRating: 1,
    examRating: 1,
    // [key]: value,
  });
  const submitEvaluation = async () => {
    // console.log('context', data);
    try {
      const {data:submitData} = await useRequest.post("/api/evaluation/create",{
        courseId:data?.course.id,
        professorId:data?.professor?.id,
        professorTags:[...new Set(data?.professorTagsEvaluation)],
        content:data?.content,
        professorRating:data?.professorRating,
        contentRating:data?.contentRating,
        homeworkRating:data?.homeworkRating,
        examRating:data?.examRating,
        finalGrade:data?.courseDataTagsEvaluation?.score,
      })
      if(submitData?.message === 'success'){
        Toast.success('提交成功');
        // router.push({
        //   pathname:'/[campus]/professor/detail/comment/[id]',
        //   query:{campus:router.query.campus,id:data?.professor?.id}
        // })
      }else{
        Toast.fail('提交失败,检查课程信息');
      }
    } catch (error) {
      Toast.fail(error)
    }
   
  };
  const CCourseInputMemo = React.useMemo(() => CourseInfo, []);

  // const context= React.useContext(EvaluationForm);
  // const CourseInfoMemo = useMemo(</CourseInfo>,
  //   [subjectData],
  // );
  useEffect(()=>{
    mutateSubject()
  },[campusId])
  const subjectData = useMemo(()=>{
      return _subjectData ? subjectData? [...subjectData].concat(..._subjectData) : [].concat(..._subjectData) : null
  },[_subjectData,campusId])
  useEffect(()=>{
    console.log(subjectData,"subjectData")
  },[subjectData])
  return (
    <CommonLayout className="p-0 pb-14">
      <Header title="添加新评价">
        <CButton
          size="normal"
          onClick={() => {
            submitEvaluation();
          }}
        >
          提交
        </CButton>
      </Header>
      <EvaluationForm.Provider value={{ data, setData }}>
        <CCourseInputMemo subjectData={subjectData} />
        <CourseData></CourseData>
        <TextEvaluation></TextEvaluation>
        <ResultAndTagEvaluation data={tagList?.data}></ResultAndTagEvaluation>
        <ProfessorTag></ProfessorTag>
      </EvaluationForm.Provider>
      <div className="p-4">
        <button
        onClick={() => {
          submitEvaluation();
        }}
          className="btn text-white btn-primary 
      rounded-full
      w-full btn-sm h-10"
        >
          提交
        </button>
      </div>
      {/* <a href="/test">
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
          <div>该页面正在开发中...</div>
          <div>点击返回测试页面</div>
        </div>
      </div>
     </a> */}
    </CommonLayout>
  );
}
