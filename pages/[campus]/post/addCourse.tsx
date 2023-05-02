import React, { useEffect, useState } from 'react';
import Expiration from '@/components/courseRecommond/expiration';
import CourseConfig from '@/components/courseRecommond/courseConfig';
import DraftIcon from './draft.svg';
import { useTranslation } from 'next-i18next';

export default function addCourse(props) {
  const [term, setTerm] = useState([]);
  useEffect(()=>{
    if(props?.termList?.length){
      setTerm(props?.termList);
      setTermValue(props?.termList?.[0]?.name)
    }
    console.log(props.termList,'props.termList');
    // setTerm(props.termList)
  },[props.termList])
  const [year, setYear] = useState();
  const [termValue, setTermValue] = useState([]);
  const {t} = useTranslation()
  const [courseList, setCourseList] = useState({
    0: {
      id: null,
      label: null,
      type: null,
      professorMust: [],
      professorOption: [],
      note: null,
      term: null,
    },
    1: {
      id: null,
      label: null,
      type: null,
      professorMust: [],
      professorOption: [],
      note: null,
      term: null,
    },
    2: {
      id: null,
      label: null,
      type: null,
      professorMust: [],
      professorOption: [],
      note: null,
      term: null,
    },
    3: {
      id: null,
      label: null,
      type: null,
      professorMust: [],
      professorOption: [],
      note: null,
      term: null,
    },
    4: {
      id: null,
      label: null,
      type: null,
      professorMust: [],
      professorOption: [],
      note: null,
      term: null,
    },
    5: {
      id: null,
      label: null,
      type: null,
      professorMust: [],
      professorOption: [],
      note: null,
      term: null,
    },
    6: {
      id: null,
      label: null,
      professorMust: [],
      professorOption: [],
      note: null,
      term: null,
    },
    7: {
      id: null,
      label: null,
      type: null,
      professorMust: [],
      professorOption: [],
      note: null,
      term: null,
    },
    8: {
      id: null,
      label: null,
      type: null,
      professorMust: [],
      professorOption: [],
      note: null,
      term: null,
    },
    9: {
      id: null,
      label: null,
      type: null,
      professorMust: [],
      professorOption: [],
      note: null,
      term: null,
    },
  });
  const [_current,_setCurrent] = useState(0)
  useEffect(() => {
    console.log(props.value, 'props.value');
    if (!props.value) return;
    // 将数组转为对象，并补全到10个元素
    const obj = props.value.reduce(
      (acc, item, index) => ({
        ...acc,
        [index]: item,
      }),
      {},
    );

    for (let i = props.value.length; i < 10; i++) {
      const key = `${i}`;
      obj[key] = {
        id: null,
        label: null,
        type: null,
        professorMust: [],
        professorOption: [],
        note: null,
      };
    }
    console.log(obj);
    setCourseList(obj);
  }, [props.value]);
  const Course = React.useCallback(() => {
    return (
      <CourseConfig
        setTermValue={setTermValue}
        termValue={termValue}
        courseList={courseList}
        setCourseList={setCourseList}
        _setCurrent={_setCurrent}
        _current={_current}
        year={year}
        term={term}
      ></CourseConfig>
    );
  }, [courseList, term]);

  useEffect(() => {
    console.log(year, 'year');
  }, [year]);
  const filteredData = React.useMemo(
    () =>
      Object.values(
        Object.fromEntries(
          Object.entries(courseList)
            .filter(([_, value]) => value?.id !== null)
            .map(([key, value]) => [key, value]),
        ),
      ),
    [courseList],
  );
  const getDomAndHide = () => {
    const dom = document.getElementById('bottom-navigation');
    if (!dom) return;
    dom.style.display = 'none';
  };
  useEffect(() => {
    const dom = document.getElementById('bottom-navigation');
    if (!dom) {
      setTimeout(() => {
        getDomAndHide();
      }, 500);
      return;
    }
    dom.style.display = 'none';
    return () => {
      dom.style.display = 'block';
    };
  }, []);
  const submitPost = async (form, draft) => {};
  const Footer = () => {
    return (
      <div className="w-full shadow-footer bg-white h-[60px] space-x-4 flex justify-between fixed bottom-0 px-5 py-2">
        <div
          className="flex flex-col items-center  w-[40px]"
          onClick={() => {
            console.log(filteredData, term, termValue, year, 'courseList');
          }}
        >
          <DraftIcon></DraftIcon>
          <div className="text-[10px] text-[#798195] whitespace-nowrap">
            {t('存草稿')}
          </div>
        </div>
        <div
          onClick={() => {
            props.submit({
              form: {
                courseData: filteredData,
                termList: term,
                year: year,
                isLongTerm: year ? false : true,
                term: 'DEFAULT',
                courseIds: filteredData.map((item) => item.id),
              },
            });
            // console.log(filteredData,term,termValue,year,'courseList')
          }}
          className="bg-[#FFD036] cursor-pointer  text-white rounded-full w-full h-10 flex justify-center items-center"
        >
            {t('发布')}
        </div>
      </div>
    );
  };
  return (
    <div className=" pt-3">
      <Expiration
        setTermList={(e) => {
          if (term.some((i) => i === e)) {
            setTerm([...term.filter((item) => item.id !== e.id)]);
            return;
          }
          console.log('Expiration setTermList', e, term);
          setTerm((pre) => [...pre, e]);
        }}
        year={year}
        term={term}
        selectTerm={(e) => {
          setTerm(e);
        }}
        select={(e) => {
          setYear(e);
        }}
      ></Expiration>
      <div className="bg-[#F6F6F6] w-full h-3"></div>
      <Course></Course>
      <Footer></Footer>
    </div>
  );
}
