import React, { useCallback, useState } from 'react';
import CateGoryIcon from './categoryIcon.svg';
import IOSSwitch from '../Input/ios';
import classnames from 'classnames';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import CScanRating from '@/components/Rating/CScanRating';
import DownIcon from './down.svg';
import PrefixIcon from './prefix.svg';
import useFetch from '@/hooks/useFetch';
import { useRouter } from 'next/router';
import { Toast } from 'react-vant';
import { professorList } from '@/mock/data';
export default function config() {
  const router = useRouter();
  const Puller = styled(Box)(({ theme }) => ({
    width: 33,
    height: 4,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
  }));

  const { data: campusData, mutate: campusDataMutate } = useFetch(
    '/campus/query',
    'get',
    {
      name: router.query.campus,
    },
  );
  const campusId = React.useMemo(() => {
    return campusData?.data[0]?.id;
  }, [campusData?.data, router]);

  const [professorCurrent, setProfessorCurrent] = useState(0);

  const [courseList, setCourseList] = useState({
    0: {
      id: null,
      label: null,
      type: null,
      professorMust: [],
      professorOption:[],
      note: null,
    },
    1: {
      id: null,
      label: null,
      type: null,
      professorMust: [],
      professorOption:[],
      note: null,
    },
    2: {
      id: null,
      label: null,
      type: null,
      professorMust: [],
      professorOption:[],
      note: null,
    },
    3: {
      id: null,
      label: null,
      type: null,
      professorMust: [],
      professorOption:[],
      note: null,
    },
    4: {
      id: null,
      label: null,
      type: null,
      professorMust: [],
      professorOption:[],
      note: null,
    },
    5: {
      id: null,
      label: null,
      type: null,
      professorMust: [],
      professorOption:[],
      note: null,
    },
    6: {
      id: null,
      label: null,
      professorMust: [],
      professorOption:[],
      note: null,
    },
    7: {
      id: null,
      label: null,
      type: null,
      professorMust: [],
      professorOption:[],
      note: null,
    },
    8: {
      id: null,
      label: null,
      type: null,
      professorMust: [],
      professorOption:[],
      note: null,
    },
    9: {
      id: null,
      label: null,
      type: null,
      professorMust: [],
      professorOption:[],
      note: null,
    },
  });
  const [professorOpen, setProfessorOpen] = useState(false);
  const [professorOptionOpen, setProfessorOptionOpen] = useState(false);

  const CourseId = React.useMemo(
    () => courseList[professorCurrent].id,
    [professorCurrent, courseList],
  );
  const { data: evaluationData, mutate: evaluationDataMutate } = useFetch(
    `/course/professors?id=${CourseId}`,
    'get',
  );
  const SelectProfessor = useCallback(
    (props) => {
      const {
        open,
        isEdit,
        mutate,
      }: { open: boolean; isEdit: boolean; mutate: any } = props;
      const [selectList, setSelectList] = useState<any>(
        courseList[professorCurrent].professorMust,
      );
      React.useEffect(() => {
        console.log(
          selectList?.some((i) => i.id === 1),
          'selectList',
        );
      }, [selectList]);
      const [customProfessor, setCustomProfessor] = useState('');
      const isSelectCustom = React.useMemo(
        () => selectList?.some((i) => i.name === customProfessor),
        [customProfessor, selectList],
      );

      return (
        <SwipeableDrawer
          className="z-20 bottom-footer-theTop"
          disableDiscovery={true}
          disableSwipeToOpen={true}
          onClose={() => {
            props.selectCourse(selectList);
            props.onClose();
          }}
          onOpen={() => {
            props.onOpen();
          }}
          open={open}
          anchor="bottom"
        >
          <div className="h-[60vh]">
            <Puller></Puller>

            <div className="p-4">
              <div>
                <div className="text-[#A9B0C0] text-xs mb-3">
                  本课程历史教授
                </div>
                {props?.data?.map((item) => {
                  const isSelect = selectList?.some((i) => i.id === item.id);
                  return (
                    <div
                      className="h-14"
                      onClick={() => {
                        if (selectList?.length >= 0) {
                          if (isSelect) {
                            setSelectList((pre) => [
                              ...pre.filter((i) => i.id !== item.id),
                            ]);
                            return;
                          }
                          setSelectList((pre) => [
                            ...pre,
                            { id: item.id, label: item.name },
                          ]);
                        } else {
                          setSelectList([
                            {
                              id: item.id,
                              label: item.name,
                            },
                          ]);
                        }
                      }}
                    >
                      <div className="flex items-center justify-between h-10">
                        <div className="text-sm text-[#37455C]">
                          {item.name}
                        </div>
                        {/* {isSelect} */}
                        <div
                          className={classnames(
                            ' px-4 py-1 text-xs  border rounded-md',
                            {
                              'text-[#798195] border-[#F3F4F6]':
                                !selectList?.every((i) => i.id === item.id),
                              'bg-red-400 text-white': selectList?.some(
                                (i) => i.id === item.id,
                              ),
                            },
                          )}
                        >
                          选择
                        </div>
                      </div>
                      <div className="w-full h-[0.1px] bg-[#F3F4F6] rounded-md border border-lg"></div>
                    </div>
                  );
                })}
              </div>
              <div
                className="flex items-center justify-between h-10"
                onClick={() => {
                  if (selectList?.length >= 0 && customProfessor?.length > 0) {
                    if (isSelectCustom) {
                      setSelectList((pre) => [
                        ...pre.filter((i) => i.name !== customProfessor),
                      ]);
                      return;
                    }
                    setSelectList((pre) => [
                      ...pre,
                      { id: null, label: customProfessor },
                    ]);
                  } else {
                    if (customProfessor?.length > 0) return;
                    setSelectList([
                      {
                        id: null,
                        label: customProfessor,
                      },
                    ]);
                  }
                }}
              >
                <div className="text-sm text-[#37455C]">
                  <input
                    value={customProfessor}
                    placeholder="自定义教授"
                    onChange={(e) => {
                      setCustomProfessor(e.target.value);
                    }}
                  ></input>
                </div>
                {/* {isSelect} */}
                <div
                  className={classnames(
                    ' px-4 py-1 text-xs  border rounded-md',
                    {
                      'text-[#798195] border-[#F3F4F6]': !selectList?.every(
                        (i) => i.name === customProfessor,
                      ),
                      'bg-red-400 text-white': selectList?.some(
                        (i) => i.name === customProfessor,
                      ),
                    },
                  )}
                >
                  选择
                </div>
              </div>
              <div className="text-[#A9B0C0] my-3">非常规情况</div>
              <div className="space-y-2">
                <div className="text-[#798195] text-xs flex justify-center items-center border-[0.5px] border-[#F3F4F6] rounded-md w-full h-10">
                  教授均可选择
                </div>
                <div className="text-[#798195] text-xs flex justify-center items-center border-[0.5px] border-[#F3F4F6] rounded-md w-full h-10">
                  无教授推荐
                </div>
              </div>
            </div>
            {/* <PostGroupDetail topicName={props.topicName} mutate={()=>{mutate()}} isEdit={isEdit} data={props.data}></PostGroupDetail> */}
          </div>
        </SwipeableDrawer>
      );
    },
    [professorCurrent],
  );
  const SelectProfessorOption = useCallback(
    (props) => {
      const {
        open,
        isEdit,
        mutate,
      }: { open: boolean; isEdit: boolean; mutate: any } = props;
      const [selectList, setSelectList] = useState<any>(
        courseList[professorCurrent].professorMust,
      );
      React.useEffect(() => {
        console.log(
          selectList?.some((i) => i.id === 1),
          'selectList',
        );
      }, [selectList]);
      const [customProfessor, setCustomProfessor] = useState('');
      const isSelectCustom = React.useMemo(
        () => selectList?.some((i) => i.name === customProfessor),
        [customProfessor, selectList],
      );

      return (
        <SwipeableDrawer
          className="z-20 bottom-footer-theTop"
          disableDiscovery={true}
          disableSwipeToOpen={true}
          onClose={() => {
            props.selectCourse(selectList);
            props.onClose();
          }}
          onOpen={() => {
            props.onOpen();
          }}
          open={open}
          anchor="bottom"
        >
          <div className="h-[60vh]">
            <Puller></Puller>

            <div className="p-4">
              <div>
                <div className="text-[#A9B0C0] text-xs mb-3">
                  本课程历史教授
                </div>
                {props?.data?.map((item) => {
                  const isSelect = selectList?.some((i) => i.id === item.id);
                  return (
                    <div
                      className="h-14"
                      onClick={() => {
                        if (selectList?.length >= 0) {
                          if (isSelect) {
                            setSelectList((pre) => [
                              ...pre.filter((i) => i.id !== item.id),
                            ]);
                            return;
                          }
                          setSelectList((pre) => [
                            ...pre,
                            { id: item.id, label: item.name },
                          ]);
                        } else {
                          setSelectList([
                            {
                              id: item.id,
                              label: item.name,
                            },
                          ]);
                        }
                      }}
                    >
                      <div className="flex items-center justify-between h-10">
                        <div className="text-sm text-[#37455C]">
                          {item.name}
                        </div>
                        {/* {isSelect} */}
                        <div
                          className={classnames(
                            ' px-4 py-1 text-xs  border rounded-md',
                            {
                              'text-[#798195] border-[#F3F4F6]':
                                !selectList?.every((i) => i.id === item.id),
                              'bg-red-400 text-white': selectList?.some(
                                (i) => i.id === item.id,
                              ),
                            },
                          )}
                        >
                          选择
                        </div>
                      </div>
                      <div className="w-full h-[0.1px] bg-[#F3F4F6] rounded-md border border-lg"></div>
                    </div>
                  );
                })}
              </div>
              <div
                className="flex items-center justify-between h-10"
                onClick={() => {
                  if (selectList?.length >= 0 && customProfessor?.length > 0) {
                    if (isSelectCustom) {
                      setSelectList((pre) => [
                        ...pre.filter((i) => i.name !== customProfessor),
                      ]);
                      return;
                    }
                    setSelectList((pre) => [
                      ...pre,
                      { id: null, label: customProfessor },
                    ]);
                  } else {
                    if (customProfessor?.length > 0) return;
                    setSelectList([
                      {
                        id: null,
                        label: customProfessor,
                      },
                    ]);
                  }
                }}
              >
                <div className="text-sm text-[#37455C]">
                  <input
                    value={customProfessor}
                    placeholder="自定义教授"
                    onChange={(e) => {
                      setCustomProfessor(e.target.value);
                    }}
                  ></input>
                </div>
                {/* {isSelect} */}
                <div
                  className={classnames(
                    ' px-4 py-1 text-xs  border rounded-md',
                    {
                      'text-[#798195] border-[#F3F4F6]': !selectList?.every(
                        (i) => i.name === customProfessor,
                      ),
                      'bg-red-400 text-white': selectList?.some(
                        (i) => i.name === customProfessor,
                      ),
                    },
                  )}
                >
                  选择
                </div>
              </div>
              <div className="text-[#A9B0C0] my-3">非常规情况</div>
              <div className="space-y-2">
                <div className="text-[#798195] text-xs flex justify-center items-center border-[0.5px] border-[#F3F4F6] rounded-md w-full h-10">
                  教授均可选择
                </div>
                <div className="text-[#798195] text-xs flex justify-center items-center border-[0.5px] border-[#F3F4F6] rounded-md w-full h-10">
                  无教授推荐
                </div>
              </div>
            </div>
            {/* <PostGroupDetail topicName={props.topicName} mutate={()=>{mutate()}} isEdit={isEdit} data={props.data}></PostGroupDetail> */}
          </div>
        </SwipeableDrawer>
      );
    },
    [professorCurrent],
  );
  const SelectCourse = useCallback((props) => {
    const [value, setValue] = useState('');
    const {
      open,
      isEdit,
      mutate,
      campusId,
    }: { open: boolean; isEdit: boolean; mutate: any; campusId: any } = props;

    const {
      data: _courseData,
      error: courseError,
      mutate: m,
    } = useFetch(`/course/query`, 'page', {
      keyword: value,
      campusId: campusId,
      pageSize: 100,
    });
    React.useEffect(() => {
      m();
    }, [campusId,value]);
    const courseData = React.useMemo(
      () =>
        _courseData && !courseError
          ? courseData
            ? [...courseData].concat(..._courseData)
            : [].concat(..._courseData)
          : null,
      [_courseData, campusId, value, courseError],
    );
    return (
      <SwipeableDrawer
        className="z-20 bottom-footer-theTop"
        disableDiscovery={true}
        disableSwipeToOpen={true}
        onClose={() => {
          props.onClose();
        }}
        onOpen={() => {
          props.onOpen();
        }}
        open={open}
        anchor="bottom"
      >
        <div className="h-[60vh]">
          <Puller></Puller>
          <div className=" p-4 space-y-2">
            <input
              className="bg-bg hover:outline-none  input border-none input-bordered w-full input-md"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            ></input>
            {courseData?.map((item) => {
              return (
                <div
                  className="w-full flex flex-col justify-between h-12"
                  onClick={() => {
                    props.selectCourse({
                      id: item.id,
                      label: item.code,
                      type: 'must',
                    });
                  }}
                >
                  <div></div>
                  <div className="text-gray-500  font-semibold text-sm">
                    {item?.code}
                  </div>
                  <div className="w-full h-[0.1px] bg-[#F3F4F6] rounded-md border border-lg"></div>
                </div>
              );
            })}
          </div>
          {/* <PostGroupDetail topicName={props.topicName} mutate={()=>{mutate()}} isEdit={isEdit} data={props.data}></PostGroupDetail> */}
        </div>
      </SwipeableDrawer>
    );
  }, []);
  const CourseSelector = (props) => {
    const { isSelect } = props;
    return (
      <div
        onClick={() => {
          props.onClick();
        }}
        className={classnames(
          'flex justify-center items-center w-14 h-14  p-[1px] rounded-2xl',
          {
            'border-[2px] border-[#FFF4B0]': isSelect,
          },
        )}
      >
        <div
          className={classnames(
            'flex justify-center text-xs text-[#798195] items-center text-center border-[2px] rounded-2xl h-12 w-12',
            {
              'border-[#0ad177] ': props?.data?.label,
              'border-[#DCDDE1] ': !props?.data?.label,
            },
          )}
        >
          {props?.data?.label}
        </div>
      </div>
    );
  };
  const [current, setCurrent] = React.useState(0);

  const [openCourse, setOpenCourse] = useState(false);
  const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: ``,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  interface Course {
    id: number;
    label: string;
    professorMust: { id: number; label: string }[];
    type: string;
    note: string;
  }
  const courseMap: Course[] = React.useMemo(
    () => Object.values(courseList) as Course[],
    [courseList],
  );

  React.useEffect(() => {
    console.log(Object.values(courseList), 'courseList');
  }, [courseList]);

  const updateForm = (data: {
    [key: string]: { id?; label?; type?; note? };
  }) => {
    const key = Object.keys(data);
    setCourseList((pre) => {
      console.log(pre[key[0]], data[key[0]], 'updateProfessor');
      return {
        ...pre,
        [key[0]]: {
          ...pre[key[0]],
          ...data[key[0]],
        },
      };
    });
  };
  interface Professor {
    id: any;
    label: any;
  }
  // const updateCourseType = (data: { [key: string]: { id; label } }) => {
  //   const key = Object.keys(data);
  //   setCourseList((pre) => {
  //     console.log(pre[key[0]], 'updateProfessor');
  //     return {
  //       ...pre,
  //       [key[0]]: {
  //         ...pre[key[0]],
  //         ...data[key[0]],
  //       },
  //     };
  //   });
  // };
  const updateProfessorOption = (data: { [key: string]: any }) => {
    const key = Object.keys(data)[0];
    const professor = data[key[0]];
    setCourseList((pre) => {
      const preProfessor = [...pre[key]?.professorOption, ...professor];
      console.log(preProfessor, 'preProfessor');
      const professorOption = [
        ...new Set(preProfessor.map((item) => JSON.stringify(item))),
      ].map((item) => JSON.parse(item));
      return {
        ...pre,
        [key]: {
          ...pre[key],
          professorOption: [...professorOption],
        },
      };
    });
  };
  const updateProfessor = (data: { [key: string]: any }) => {
    const key = Object.keys(data)[0];
    const professor = data[key[0]];
    setCourseList((pre) => {
      const preProfessor = [...pre[key]?.professorMust, ...professor];
      console.log(preProfessor, 'preProfessor');
      const professorMust = [
        ...new Set(preProfessor.map((item) => JSON.stringify(item))),
      ].map((item) => JSON.parse(item));
      return {
        ...pre,
        [key]: {
          ...pre[key],
          professorMust: [...professorMust],
        },
      };
    });
  };

  React.useEffect(() => {
    console.log(courseList, 'courseList');
  }, [courseList]);


  React.useEffect(() => {
    evaluationDataMutate();
  }, [CourseId]);

  const MustStudy = (props) => {
    const CourseSelector = (props) => {
      const { isSelect } = props;
      return (
        <div
          className={classnames(
            'flex justify-center  max-w-[1/2] relative items-center w-14 h-14  p-[1px] rounded-2xl',
            {
              'border-[2px] border-[#FFDEAD]': isSelect,
            },
          )}
        >
          <div
            className={classnames(
              'border-[#FFDEAD] bg-[#FFFAF0] flex flex-col justify-center items-center  border-[2px] rounded-2xl h-12 w-12',
            )}
          >
            <svg height={'14px'} width={'100%'}>
              <text
                x="50%"
                text-anchor="middle"
                y="10"
                fill="#ff9832"
                color="#ff9832"
                fontSize={'10px'}
              >
                {' '}
                MAT
              </text>
            </svg>
            <svg height={'14px'} width={'100%'}>
              <text
                x="50%"
                text-anchor="middle"
                y="10"
                fill="#ff9832"
                fontWeight={600}
                color="#ff9832"
                fontSize={'10px'}
              >
                {' '}
                321
              </text>
            </svg>
          </div>
          <div className="xueqiTag absolute rounded-[6px] p-[6px] text-[white] flex justify-center items-center text-xs w-5 h-5 bottom-0 right-0">
            秋
          </div>
        </div>
      );
    };
    return (
      <div className="w-full h-16 max-w-[1/2]">
        <div className="flex items-center justify-center">
          <div className="w-full h-[0.5px] bg-[#DCDDE1]"></div>
          <div className="whitespace-nowrap text-[#DCDDE1] text-xs mx-2">
            必修课
          </div>
          <div className="w-full h-[0.5px] bg-[#DCDDE1]"></div>
        </div>
        <div className="flex items-center overflow-scroll space-x-4 max-w-[1/2]">
          {props.data.map((item) => {
            return <CourseSelector></CourseSelector>;
          })}
        </div>
        {/* //course list */}
      </div>
    );
  };
  const OptionalStudy = (props) => {
    const CourseSelector = (props) => {
      const { isSelect } = props;
      return (
        <div
          className={classnames(
            'flex justify-center  max-w-[1/2] relative items-center w-14 h-14  p-[1px] rounded-2xl',
            {
              'border-[2px] border-[#FFDEAD]': isSelect,
            },
          )}
        >
          <div
            className={classnames(
              'border-[#FFDEAD] bg-[#FFFAF0] flex flex-col justify-center items-center  border-[2px] rounded-2xl h-12 w-12',
            )}
          >
            <svg height={'14px'} width={'100%'}>
              <text
                x="50%"
                text-anchor="middle"
                y="10"
                fill="#ff9832"
                color="#ff9832"
                fontSize={'10px'}
              >
                {' '}
                MAT
              </text>
            </svg>
            <svg height={'14px'} width={'100%'}>
              <text
                x="50%"
                text-anchor="middle"
                y="10"
                fill="#ff9832"
                fontWeight={600}
                color="#ff9832"
                fontSize={'10px'}
              >
                {' '}
                321
              </text>
            </svg>
          </div>
          <div className="xueqiTag absolute rounded-[6px] p-[6px] text-[white] flex justify-center items-center text-xs w-5 h-5 bottom-0 right-0">
            秋
          </div>
        </div>
      );
    };
    return (
      <div className="w-full h-16 max-w-[1/2]">
        <div className="flex items-center justify-center">
          <div className="w-full h-[0.5px] bg-[#DCDDE1]"></div>
          <div className="whitespace-nowrap text-[#DCDDE1] text-xs mx-2">
            必修课
          </div>
          <div className="w-full h-[0.5px] bg-[#DCDDE1]"></div>
        </div>
        <div className="flex items-center overflow-scroll space-x-4 max-w-[1/2]">
          {props.data.map((item) => {
            return <CourseSelector></CourseSelector>;
          })}
        </div>
        {/* //course list */}
      </div>
    );
  };
  const mustStudyData = React.useMemo(
    () =>
      Object.values(courseList).filter((item: Course) => item?.type === 'must'),
    [courseList],
  );
  const optionStudyData = React.useMemo(
    () =>
      Object.values(courseList).filter(
        (item: Course) => item?.type === 'option',
      ),
    [courseList],
  );
  React.useEffect(() => {
    console.log(mustStudyData, 'mustStudyData');
  }, [mustStudyData]);

  const NoteArea = (props) => {
    const [open, setOpen] = useState(props?.data?.length > 0);
    const [value, setValue] = useState(props.data);
    return (
      <div className="flex items-center space-x-3">
        <div className="bg-[#F0F6FF] p-2 min-w-[48px] w-12 h-6 text-xs  text-[#2347D9] flex justify-center items-center rounded-md">
          笔记
        </div>
        <div className="w-"></div>
        {!open ? (
          <div
            onClick={() => {
              setOpen(true);
            }}
            className=" flex justify-center border border-gray-300 items-center w-9 h-9 text-xs p-2 text-[#798195] rounded-md"
          >
            +
          </div>
        ) : null}

        {open ? (
          <div className="bg-[#F7F8F9] p-2 w-full min-h-[40px] flex justify-center items-center  text-xs text-[#798195] rounded-md">
            <textarea
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              className="bg-[#F7F8F9] w-full h-full"
              onBlur={() => {
                updateForm({
                  [String(professorCurrent)]: {
                    note: value,
                  },
                });
              }}
            ></textarea>
            {/* note area */}
          </div>
        ) : null}
      </div>
    );
  };


  const submit = ()=>{
    const filteredData = Object.fromEntries(
      Object.entries(courseList)
        .filter(([_, value]) => value.id !== null)
        .map(([key, value]) => [key, value])
    );
    console.log(filteredData,"filteredData")
  }
  return (
    <div className="pb-20">
      <div className="items-start justify-between  py-0 bg-white p-5">
        <SelectCourse
          campusId={campusId}
          selectCourse={(course) => {
            updateForm({ [current]: course });
            setOpenCourse(false);
          }}
          onClose={() => {
            setOpenCourse(false);
          }}
          onOpen={() => {
            setOpenCourse(true);
          }}
          open={openCourse}
        ></SelectCourse>
        <SelectProfessor
          data={evaluationData?.data}
          selectCourse={(professor) => {
            updateProfessor({ [professorCurrent]: professor });
            // updateForm({ [current]: course });
          }}
          onClose={() => {
            setProfessorOpen(false);
          }}
          open={professorOpen}
          onOpen={() => {
            setProfessorOpen(true);
          }}
        ></SelectProfessor>
        <SelectProfessorOption onClose={()=>{
           setProfessorOptionOpen(false)
        }} onOpen={() => {
            setProfessorOptionOpen(true)
          }}  data={evaluationData?.data} selectCourse={(professor) => {
            updateProfessorOption({ [professorCurrent]: professor });
            // updateForm({ [current]: course });
          }} open={professorOptionOpen}></SelectProfessorOption>
        <div className="flex justify-between mb-6 mt-2">
          <div className="flex items-center space-x-2">
            <CateGoryIcon></CateGoryIcon>
            {/* {item.Icon ? <Icon className="mt-1"></Icon> : null} */}
            <div className="text-blueTitle">课程配置</div>
          </div>
          {/* <div>{item.action}</div> */}
        </div>
        <div className="grid grid-cols-5 grid-rows-2 gap-y-2 gap-x-2">
          {new Array(10).fill(1).map((item, index) => {
            console.log(item, 'courseList');
            return (
              <CourseSelector
                onClick={() => {
                  setCurrent(index);
                  setOpenCourse(true);
                }}
                data={courseList[index]}
                isSelect={current === index}
                key={index}
              ></CourseSelector>
            );
          })}
        </div>
      </div>
      <div className="mt-2 w-full"></div>
      <div className="items-start justify-between  py-0 bg-white p-5">
        {courseMap?.map((item, index) => {
          if (item.id) {
            return (
              <div onClick={()=>{ setProfessorCurrent(index)}} className="border border-[#F7F8F9] rounded-md w-full p-2">
                <Accordion
                  defaultExpanded={professorCurrent === index}
                  className="rounded-lg"
                  sx={{ padding: 0 }}
                >
                  <AccordionSummary
                    expandIcon={<DownIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ padding: 0 }}
                  >
                    <div className="flex w-full items-center space-x-4">
                      <PrefixIcon></PrefixIcon>
                      <div className="w-6 h-6 rounded-md text-[#798195] bg-[#F7F8F9] flex items-center justify-center">
                        {/* index */}
                        {index + 1}
                      </div>
                      <div className="text-[#798195] font-semibold text-sm">
                        {item.label}
                      </div>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails sx={{ padding: 0 }}>
                    <div className="w-full space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-[#F0F6FF] p-2 w-12 h-6 text-xs  text-[#2347D9] flex justify-center items-center rounded-md">
                          类别
                        </div>
                        <div className="w-"></div>
                        <div
                          onClick={() => {
                            updateForm({
                              [index]: {
                                type: 'must',
                              },
                            });
                          }}
                          className={classnames(
                            ' flex justify-center items-center w-14 h-6 text-xs p-2  rounded-md',
                            {
                              'bg-yellow-300 text-white': item.type === 'must',
                              'bg-[#F7F8F9] text-[#798195]':
                                item.type !== 'must',
                            },
                          )}
                        >
                          必修课
                        </div>
                        <div
                          onClick={() => {
                            updateForm({
                              [index]: {
                                type: 'option',
                              },
                            });
                          }}
                          className={classnames(
                            ' flex justify-center items-center w-14 h-6 text-xs p-2  rounded-md',
                            {
                              'bg-yellow-300 text-white':
                                item.type === 'option',
                              'bg-[#F7F8F9] text-[#798195]':
                                item.type !== 'option',
                            },
                          )}
                        >
                          选修课
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="bg-[#F0F6FF] p-2 w-12 h-6 text-xs  text-[#2347D9] flex justify-center items-center rounded-md">
                          优先
                        </div>
                        <div className="w-"></div>
                        <div
                          onClick={() => {
                            setProfessorOpen(true);
                          }}
                          className=" flex justify-center border border-gray-300 items-center min-w-[36px] h-9 text-xs p-2 text-[#798195] rounded-md"
                        >
                          +
                        </div>
                        {item?.professorMust.map((item) => {
                          return (
                            <div className="bg-[#F7F8F9] flex justify-center items-center w-14 h-6 text-xs p-2 text-[#798195] rounded-md">
                              {item.label}
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="bg-[#F0F6FF] p-2 w-12 h-6 text-xs  text-[#2347D9] flex justify-center items-center rounded-md">
                          可选
                        </div>
                        <div className="w-"></div>
                        <div  onClick={() => {
                            setProfessorOptionOpen(true);
                          }} className=" flex justify-center border border-gray-300 items-center w-9 h-9 text-xs p-2 text-[#798195] rounded-md">
                          +
                        </div>
                        {item?.professorOption.map((item) => {
                          return (
                            <div className="bg-[#F7F8F9] flex justify-center items-center w-14 h-6 text-xs p-2 text-[#798195] rounded-md">
                              {item.label}
                            </div>
                          );
                        })}
                      </div>
                      <NoteArea data={item?.note}></NoteArea>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            );
          }
        })}
      </div>
      <div className="bg-[#F6F6F6] w-full h-3"></div>

      <div className="p-5">
        <div className="mb-6 mt-2">
          <div className="flex items-center space-x-2">
            <CateGoryIcon></CateGoryIcon>
            {/* {item.Icon ? <Icon className="mt-1"></Icon> : null} */}
            <div className="text-blueTitle">课表预览</div>
          </div>
          {(mustStudyData.some((item) => item.id) ||
            optionStudyData.some((item) => item.id)) && (
            <div className="w-full  ">
              <div className="flex w-full justify-between mt-5 items-center px-2 space-x-3">
                <MustStudy data={mustStudyData}></MustStudy>
                <OptionalStudy data={optionStudyData}></OptionalStudy>
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <div className="w-1 h-4 bg-yellow-300 rounded-full"></div>
                <div className="font-semibold">秋季学期 Fall 2023</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <div onClick={()=>{submit()}} className='btn'> 提交</div>
      </div>
    </div>
  );
}
