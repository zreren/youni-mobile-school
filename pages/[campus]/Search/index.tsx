import React, { useEffect, useState } from 'react';
import CustomizedTabs from '@/components/Menu/Header-menu';
import Title from '@/components/Title/Title';
import DeleteIcon from './delete.svg';
import SearchIcon from './search.svg';
import { useRouter } from 'next/router';
import { debounce } from 'lodash';
import CourseScoreCard from '@/components/CourseScoreCard';
import useFetch from '@/hooks/useFetch';
import ProfessorCard from '@/components/ProfessorListItem';
import useLocalStorage from '@/hooks/useStore';
import Head from 'next/head';
import { disableZoom } from '@/libs/disableZoom';
export default function index() {
  // const router = useRouter();
  const router = useRouter();
  const campus = router.query.campus as string;
  console.log(campus, 'campus');
  const { data: campusData, mutate: campusDataMutate } = useFetch(
    '/campus/query',
    'get',
    {
      name: router.query.campus,
    },
  );
  const campusId = React.useMemo(() => {
    return campusData?.data[0]?.id;
  }, [campusData?.data[0]?.id]);
  useEffect(() => {
    campusDataMutate();
  }, [router.query.campus]);
  // const [campusId] = useLocalStorage(campus?.toLowerCase(),1)
  const [history, setHistory] = useLocalStorage('history', []);
  const [menu, setMenu] = useState(0);
  const [value, setValue] = React.useState('');
  const [historyList, setHistoryList] = useState<any[]>(history);
  const {
    data: courseData,
    error: courseError,
    mutate,
  } = useFetch(`/course/query`, 'get', {
    keyword: value,
    campusId: campusId,
  });
  const { data: professorList, mutate: professorMutate } = useFetch(
    `/professor/list`,
    'get',
    {
      keyword: value,
      campusId: campusId,
    },
  );
  const SearchTag = (props) => {
    const { title } = props;
    return (
      <div
        className="bg-bg m-1 text-xs font-light h-8 p-2"
        onClick={() => {
          setValue(title);
        }}
      >
        {title}
      </div>
    );
  };
  useEffect(()=>{
    disableZoom()

    // setHistoryList(history)
  },[])
  useEffect(() => {
    setHistoryList(history);
  }, [history]);
  useEffect(() => {
    if (menu === 1) {
      mutate();
    }
    if (menu === 0) {
      professorMutate();
    }
  }, [value]);
  const headerMenuList = [
    {
      label: '教授',
      id: 1,
    },
    {
      label: '课程',
      id: 2,
    },
    {
      label: '用户',
      id: 3,
    },
  ];

  const beginSearch = (value) => {
    if (value) {
      // mutate()
    }
    if (menu === 0) {
      // professorMutate()
    }
  };
  const debounceSearch = debounce((value) => {
    beginSearch(value);
  }, 1000);
  const handleChange = (e) => {
    setValue(e.target.value);
    // debounceSearch(value)
  };
  useEffect(() => {
    console.log(menu, 'menu');
  }, [menu]);
  return (
    <div className="w-screen min-h-screen bg-gray-50 pb-20">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <div>
        <CustomizedTabs
          switchMenu={(val) => {
            setMenu(val);
          }}
          headerMenuList={headerMenuList}
        ></CustomizedTabs>
      </div>
      <div className="w-full p-4 flex items-center space-x-4 rounded-xl">
        <div className="form-control w-full rounded-xl">
          <label className="input-group input-group-md w-full rounded-xl bg-bg">
            <span className="bg-bg">
              <SearchIcon></SearchIcon>
            </span>
            <input
              type="text"
              value={value}
              onBlur={() => {
                if (!value || value === '') return;
                const _history = history;
                _history.push(value);
                setHistory(_history);
              }}
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Type here"
              className="bg-bg hover:outline-none -ml-4 input border-none input-bordered w-full input-md"
            />
          </label>
        </div>
        <div
          className="whitespace-nowrap"
          onClick={() => {
            router.back();
          }}
        >
          取消
        </div>
      </div>
      <div className="w-full h-full pr-5 pl-5">
        {value.length > 1 ? null : (
          <>
            <Title title="搜索历史">
              <DeleteIcon
                onClick={() => {
                  setHistory([]);
                }}
              ></DeleteIcon>
            </Title>
            <div className="flex  flex-wrap w-7/10 mb-3">
              {historyList?.map((item) => {
                return <SearchTag title={item}></SearchTag>;
              })}
            </div>
          </>
        )}
        <div className="min-h-full">
          {menu === 1
            ? courseData?.data?.map((item) => {
                return (
                  <div className="mt-3">
                    <CourseScoreCard data={item}></CourseScoreCard>
                  </div>
                );
              })
            : null}
        </div>
        <div className="space-y-3">
          {menu === 0
            ? professorList?.data?.map((item) => {
                return (
                  <ProfessorCard
                    data={item}
                    key={item.id}
                    onClick={() => {
                      const { campus } = router.query;
                      router.push({
                        pathname: `/[campus]/professor/detail/${item.id}`,
                        query: { campus: campus },
                      });
                    }}
                  ></ProfessorCard>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}
