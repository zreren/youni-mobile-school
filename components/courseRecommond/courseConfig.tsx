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
import { selectOpen } from '@/stores/authSlice';
import Select from './select';
import DraftIcon from './draft.svg';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useTranslation } from 'next-i18next';

export default function config(props) {
  const router = useRouter();
  const [current, setCurrent] = React.useState(0);
  const { t } = useTranslation();
  function usePersistentState(key, defaultValue) {
    const isBrowser = typeof window !== 'undefined';
    const [state, setState] = useState(() => {
      if (isBrowser) {
        const value = localStorage.getItem(key);
        if (value) {
          return JSON.parse(value);
        }
      }
      return defaultValue;
    });

    React.useEffect(() => {
      if (isBrowser) {
        localStorage.setItem(key, JSON.stringify(state));
      }
    }, [isBrowser, key, state]);

    return [state, setState];
  }
  const [expandedItems, setExpandedItems] = usePersistentState(
    'expandedItems',
    [],
  );

  const [semesterData, setSemesterData] = useState(null);
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
  const { data: fetchedData } = useFetch('/campus/term/list', 'get', {
    campusId: campusId,
  });

  // React.useEffect(() => {
  //   async function fetchData() {

  //     setSemesterData(fetchedData);
  //   }
  //   if(campusId){
  //     fetchData()
  //   }
  // }, [campusId])

  const Puller = styled(Box)(({ theme }) => ({
    width: 33,
    height: 4,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
  }));
  const CourseSelectFormItem = (props) => {
    const { data }: { data: Course } = props;
    return (
      <>
        <div className="flex mt-4 items-top space-x-8 w-full">
          <div className="min-w-[44px] text-[#798195] w-11 flex items-center justify-center text-center h-11 bg-[#F7F8F9] rounded-lg text-xs">
            {data.label}
          </div>
          <div className="w-full space-y-4">
            <div className="flex items-center space-x-10 h-10">
              <div className="text-blueTitle text-xs font-semibold">
                {' '}
                {t('优先')}
              </div>
              {data?.professorMust.map((item) => {
                return (
                  <div className="ml-10 w-10 text-center text-xs text-[#798195]">
                    {item.label}
                  </div>
                );
              })}
            </div>
            {data?.professorOption.length > 0 && (
              <div className="flex items-center space-x-10">
                <div className="text-blueTitle text-xs font-semibold">
                  {t('可选')}
                </div>
                {data?.professorOption.map((item) => {
                  return (
                    <div className="ml-10 w-10 text-center text-xs text-[#798195]">
                      {item.label}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {data.note && (
          <div className="rounded-sm bg-[#F7F8F9] text-[#798195] w-full p-4 mt-4 text-xs">
            {data?.note}
          </div>
        )}

        <div className="bg-[#F7F8F9] w-full h-[0.5px] mt-4"></div>
      </>
    );
  };

  const [professorCurrent, setProfessorCurrent] = useState(0);

  const [professorOpen, setProfessorOpen] = useState(false);
  const [professorOptionOpen, setProfessorOptionOpen] = useState(false);
  const {
    courseList,
    setCourseList,
  }: { courseList: Course[]; setCourseList: any } = props;
  const CourseId = React.useMemo(
    () => courseList[professorCurrent]?.id,
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
        courseList[professorCurrent]?.professorMust,
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
                  {t('本课程历史教授')}
                </div>
                {props?.data?.map((item) => {
                  const isSelect = selectList?.some((i) => i.id === item.id);
                  return (
                    <div className="h-14">
                      <div className="flex items-center justify-between h-10">
                        <div
                          className={classnames(
                            {
                              'text-[#37455C] border-[#F3F4F6]':
                                !selectList?.every((i) => i.id === item.id),
                              ' text-[#B38314]': selectList?.some(
                                (i) => i.id === item.id,
                              ),
                            },
                            'text-sm ',
                          )}
                        >
                          {item.name}
                        </div>
                        {/* {isSelect} */}
                        <div
                          onClick={() => {
                            if (selectList?.length >= 0) {
                              if (isSelect) {
                                setSelectList((pre) => [
                                  ...pre.filter(
                                    (i) => i.id !== item.id && item.id !== -1,
                                  ),
                                ]);
                                return;
                              }
                              setSelectList((pre) => [
                                ...pre.filter((item) => item.id !== -1),
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
                          className={classnames(
                            ' px-4 py-1 text-xs text-[#798195] border rounded-md',
                            {
                              'text-[#798195] border-[#F3F4F6]':
                                !selectList?.every((i) => i.id === item.id),
                              'bg-red-400 text-white': selectList?.some(
                                (i) => i.id === item.id,
                              ),
                            },
                          )}
                        >
                          {selectList?.some((i) => i.id === item.id)
                            ? t('取消选中')
                            : t('选中')}
                        </div>
                      </div>
                      <div className="w-full h-[0.8px] bg-[#F3F4F6] rounded-md "></div>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-between h-10">
                <div className="text-sm text-[#37455C]">
                  <input
                    value={customProfessor}
                    placeholder={t('自定义教授')}
                    onChange={(e) => {
                      setCustomProfessor(e.target.value);
                    }}
                  ></input>
                </div>
                {/* {isSelect} */}
                <div
                  onClick={() => {
                    if (
                      selectList?.length >= 0 &&
                      customProfessor?.length > 0
                    ) {
                      if (isSelectCustom) {
                        setSelectList((pre) => [
                          ...pre.filter(
                            (i) =>
                              !i.id &&
                              i.name !== customProfessor &&
                              i.id !== -1,
                          ),
                        ]);
                        return;
                      }
                      setSelectList((pre) => [
                        ...pre.filter((item) => item.id !== -1),
                        { id: null, label: customProfessor },
                      ]);
                    } else {
                      if (customProfessor?.length === 0) return;
                      setSelectList((pre) => [
                        ...pre.filter((item) => item.id !== -1),
                        { id: null, label: customProfessor },
                      ]);
                      // setSelectList([
                      //   {
                      //     id: null,
                      //     label: customProfessor,
                      //   },
                      // ]);
                    }
                  }}
                  className={classnames(
                    ' px-4 py-1 text-xs  border rounded-md',
                    {
                      'text-[#798195] border-[#F3F4F6]': !selectList?.every(
                        (i) => i.label === customProfessor,
                      ),
                      'bg-red-400 text-white': selectList?.some(
                        (i) => i.label === customProfessor,
                      ),
                    },
                  )}
                >
                  {selectList?.some((i) => i.label === customProfessor)
                    ? '取消选中'
                    : '选中'}
                </div>
              </div>
              <div className="text-[#A9B0C0] my-3">{t('非常规情况')}</div>
              <div className="space-y-2">
                <div
                  onClick={() => {
                    setSelectList((pre) => [{ id: -1, label: '均可选择' }]);
                  }}
                  className={classnames(
                    'text-xs flex justify-center items-center border-[0.5px] border-[#F3F4F6] rounded-md w-full h-10',
                    {
                      'text-[#798195] ': !selectList?.some(
                        (i) => i.label === '均可选择' && i.id === -1,
                      ),
                      'text-[#C8A655] ': selectList?.some(
                        (i) => i.label === '均可选择' && i.id === -1,
                      ),
                    },
                  )}
                >
                  {t('教授均可选择')}
                </div>
                <div
                  onClick={() => {
                    setSelectList((pre) => [{ id: -1, label: '无教授推荐' }]);
                  }}
                  className={classnames(
                    'text-xs flex justify-center items-center border-[0.5px] border-[#F3F4F6] rounded-md w-full h-10',
                    {
                      'text-[#798195] ': !selectList?.some(
                        (i) => i.label === '无教授推荐' && i.id === -1,
                      ),
                      'text-[#C8A655] ': selectList?.some(
                        (i) => i.label === '无教授推荐' && i.id === -1,
                      ),
                    },
                  )}
                >
                  {t('无教授推荐')}
                </div>
              </div>
            </div>
            {/* <PostGroupDetail topicName={props.topicName} mutate={()=>{mutate()}} isEdit={isEdit} data={props.data}></PostGroupDetail> */}
          </div>
        </SwipeableDrawer>
      );
    },
    [professorCurrent, courseList],
  );
  const SelectProfessorOption = useCallback(
    (props) => {
      const {
        open,
        isEdit,
        mutate,
      }: { open: boolean; isEdit: boolean; mutate: any } = props;
      const [selectList, setSelectList] = useState<any>(
        courseList[professorCurrent]?.professorOption,
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
                  {t('本课程历史教授')}
                </div>
                {props?.data?.map((item) => {
                  const isSelect = selectList?.some((i) => i.id === item.id);
                  return (
                    <div className="h-14">
                      <div className="flex items-center justify-between h-10">
                        <div
                          className={classnames(
                            {
                              'text-[#37455C] border-[#F3F4F6]':
                                !selectList?.every((i) => i.id === item.id),
                              ' text-[#B38314]': selectList?.some(
                                (i) => i.id === item.id,
                              ),
                            },
                            'text-sm ',
                          )}
                        >
                          {item.name}
                        </div>
                        {/* {isSelect} */}
                        <div
                          onClick={() => {
                            if (selectList?.length >= 0) {
                              if (isSelect) {
                                setSelectList((pre) => [
                                  ...pre.filter(
                                    (i) => i.id !== item.id && item.id !== -1,
                                  ),
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
                          className={classnames(
                            ' px-4 py-1 text-xs text-[#798195] border rounded-md',
                            {
                              'text-[#798195] border-[#F3F4F6]':
                                !selectList?.every((i) => i.id === item.id),
                              'bg-red-400 text-white': selectList?.some(
                                (i) => i.id === item.id,
                              ),
                            },
                          )}
                        >
                          {selectList?.some((i) => i.id === item.id)
                            ? t('取消选中')
                            : t('选中')}
                        </div>
                      </div>
                      <div className="w-full h-[0.8px] bg-[#F3F4F6] rounded-md "></div>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-between h-10">
                <div className="text-sm text-[#37455C]">
                  <input
                    value={customProfessor}
                    placeholder={t('自定义教授')}
                    onChange={(e) => {
                      setCustomProfessor(e.target.value);
                    }}
                  ></input>
                </div>
                {/* {isSelect} */}
                <div
                  onClick={() => {
                    if (
                      selectList?.length >= 0 &&
                      customProfessor?.length > 0
                    ) {
                      if (isSelectCustom) {
                        setSelectList((pre) => [
                          ...pre.filter(
                            (i) =>
                              !i.id &&
                              i.name !== customProfessor &&
                              i.id !== -1,
                          ),
                        ]);
                        return;
                      }
                      setSelectList((pre) => [
                        ...pre.filter((item) => item.id !== -1),
                        { id: null, label: customProfessor },
                      ]);
                    } else {
                      if (customProfessor?.length === 0) return;
                      setSelectList((pre) => [
                        ...pre.filter((item) => item.id !== -1),
                        { id: null, label: customProfessor },
                      ]);
                      // setSelectList([
                      //   {
                      //     id: null,
                      //     label: customProfessor,
                      //   },
                      // ]);
                    }
                  }}
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
                  {selectList?.some((i) => i.name === customProfessor)
                    ? '取消选中'
                    : '选中'}
                </div>
              </div>
              <div className="text-[#A9B0C0] my-3">{t('非常规情况')}</div>
              <div className="space-y-2">
                <div
                  onClick={() => {
                    setSelectList([{ id: -1, label: t('均可选择') }]);
                  }}
                  className={classnames(
                    'text-xs flex justify-center items-center border-[0.5px] border-[#F3F4F6] rounded-md w-full h-10',
                    {
                      'text-[#798195] ': !selectList?.some(
                        (i) => i.label === t('均可选择') && i.id === -1,
                      ),
                      'text-[#C8A655] ': selectList?.some(
                        (i) => i.label === t('均可选择') && i.id === -1,
                      ),
                    },
                  )}
                >
                  {t('教授均可选择')}
                </div>
                <div
                  onClick={() => {
                    setSelectList([{ id: -1, label: t('无教授推荐') }]);
                  }}
                  className={classnames(
                    'text-xs flex justify-center items-center border-[0.5px] border-[#F3F4F6] rounded-md w-full h-10',
                    {
                      'text-[#798195] ': !selectList?.some(
                        (i) => i.label === t('无教授推荐') && i.id === -1,
                      ),
                      'text-[#C8A655] ': selectList?.some(
                        (i) => i.label === t('无教授推荐') && i.id === -1,
                      ),
                    },
                  )}
                >
                  {t('无教授推荐')}
                </div>
              </div>
            </div>
            {/* <PostGroupDetail topicName={props.topicName} mutate={()=>{mutate()}} isEdit={isEdit} data={props.data}></PostGroupDetail> */}
          </div>
        </SwipeableDrawer>
      );
    },
    [professorCurrent, courseList],
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
    }, [campusId, value]);
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
    const { isSelect, key } = props;
    return (
      <div
        onClick={() => {
          props.onClick();
        }}
        className={classnames(
          'flex justify-center relative items-center w-14 h-14  p-[1px] rounded-2xl',
          {
            'border-[2px] border-[#FFF4B0]': isSelect,
          },
        )}
      >
        {props?.data?.label && (
          <div
            onClick={() => {
              setCourseList((pre) => {
                return {
                  ...pre,
                  [props.index]: {
                    id: null,
                    label: null,
                    professorMust: [],
                    professorOption: [],
                    type: null,
                    note: null,
                  },
                };
              });
            }}
            className="bg-red-500 absolute -top-2 -right-2 rounded-full w-5 h-5 text-white flex justify-center items-center text-xs"
          >
            -
          </div>
        )}
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
    professorOption: { id: number; label: string }[];
    type: string;
    note: string;
  }
  const courseMap: Course[] = React.useMemo(
    () =>
      Object.values(courseList).filter((item) => item.id !== null) as Course[],
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
    setCurrent((pre) => pre);
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
    const { data }: { data: Course[] } = props;
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
            <div className="text-[10px] text-[#ff9832] flex justify-center text-center items-center">
              {props?.data?.label}
            </div>
            {/* <svg className='whitespace-wrap' height={'14px'} width={'100%'}>
              <text
                x="50%"
                text-anchor="middle"
                y="10"
                fill="#ff9832"
                color="#ff9832"
                fontSize={'10px'}
              >
                {' '}
                {props.data.label}
              </text>
            </svg> */}
          </div>
          <div className="xueqiTag absolute rounded-[5px] p-[5px] text-[white] flex justify-center items-center text-[10px] w-4 h-4 bottom-0 right-0">
            {termValue?.slice(0, 1)}
          </div>
        </div>
      );
    };
    return (
      <div className="min-w-[1/2] h-16 w-1/2  max-w-[1/2]">
        <div className="flex items-center justify-center">
          <div className="w-full h-[0.5px] bg-[#DCDDE1]"></div>
          <div className="whitespace-nowrap text-[#DCDDE1] text-xs mx-2">
            必修课
          </div>
          <div className="w-full h-[0.5px] bg-[#DCDDE1]"></div>
        </div>
        <div className="flex items-center overflow-scroll space-x-4  max-w-[1/2]">
          {data.map((item) => {
            return <CourseSelector data={item}></CourseSelector>;
          })}
        </div>
        {/* //course list */}
      </div>
    );
  };
  const OptionalStudy = (props) => {
    const { data }: { data: Course[] } = props;
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
            <div className="text-[10px] text-[#ff9832] flex justify-center text-center items-center">
              {props?.data?.label}
            </div>
            {/* <svg className='whitespace-wrap' height={'14px'} width={'100%'}>
              <text
                x="50%"
                text-anchor="middle"
                y="10"
                fill="#ff9832"
                color="#ff9832"
                fontSize={'10px'}
              >
                {' '}
                {props.data.label}
              </text>
            </svg> */}
          </div>
          <div className="xueqiTag absolute rounded-[5px] p-[5px] text-[white] flex justify-center items-center text-[10px] w-4 h-4 bottom-0 right-0">
            {termValue?.slice(0, 1)}
          </div>
        </div>
      );
    };
    return (
      <div className="min-w-[1/2] h-16 w-1/2  max-w-[1/2]">
        <div className="flex items-center justify-center">
          <div className="w-full h-[0.5px] bg-[#DCDDE1]"></div>
          <div className="whitespace-nowrap text-[#DCDDE1] text-xs mx-2">
            {t('选修课')}
          </div>
          <div className="w-full h-[0.5px] bg-[#DCDDE1]"></div>
        </div>
        <div className="flex items-center overflow-scroll space-x-4  max-w-[1/2]">
          {props.data.map((item) => {
            return <CourseSelector data={item}></CourseSelector>;
          })}
        </div>
        {/* //course list */}
      </div>
    );
  };
  const mustStudyData = React.useMemo(() => {
    const values = Object.values(courseList) as Course[];
    return values.filter((item: Course) => item?.type === 'must');
  }, [courseList]);
  const optionStudyData = React.useMemo(() => {
    const values = Object.values(courseList) as Course[];
    return values.filter((item: Course) => item?.type === 'option');
  }, [courseList]);
  React.useEffect(() => {
    console.log(mustStudyData, 'mustStudyData');
  }, [mustStudyData]);

  const NoteArea = (props) => {
    const [open, setOpen] = useState(props?.data?.length > 0);
    const [value, setValue] = useState(props.data);
    return (
      <div className="flex items-center space-x-3">
        <div className="bg-[#F0F6FF] p-2 min-w-[48px] w-12 h-6 text-xs  text-[#2347D9] flex justify-center items-center rounded-md">
          {t('笔记')}
        </div>
        <div className="w-[0.5px] h-3 bg-[#F0F6FF]"></div>
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
                setTimeout(() => {
                  updateForm({
                    [String(professorCurrent)]: {
                      note: value,
                    },
                  });
                }, 10000);
              }}
            ></textarea>
            {/* note area */}
          </div>
        ) : null}
      </div>
    );
  };
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
  const submit = () => {
    console.log(filteredData, 'filteredData');
  };
  const deleteProfessor = (p, i, t) => {
    setCourseList((pre) => {
      return {
        ...pre,
        [i]: {
          ...courseList[i],
          [t]: courseList[i][t].filter((item) => item !== p),
        },
      };
    });
  };
  const { termValue, setTermValue } = props;
  const submitPost = async (form, draft) => {};
  const { term, year } = props;
  React.useEffect(() => {
    console.log(term, 'term');
  }, [term]);

  const Footer = () => {
    return (
      <div className="w-full shadow-footer bg-white h-[60px] space-x-4 flex justify-between fixed bottom-12 px-5 py-2">
        <div
          className="flex flex-col items-center  w-[40px]"
          onClick={() => {
            console.log(filteredData, term, termValue, year, 'courseList');
          }}
        >
          <DraftIcon></DraftIcon>
          <div className="text-[10px] text-[#798195] whitespace-nowrap">
            存草稿
          </div>
        </div>
        <div
          onClick={() => {
            console.log(filteredData, term, termValue, year, 'courseList');
          }}
          className="bg-[#FFD036] cursor-pointer  text-white rounded-full w-full h-10 flex justify-center items-center"
        >
          {t('发布')}
        </div>
      </div>
    );
  };
  const [draggedItemId, setDraggedItemId] = useState(null);

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    const courseListArray = Object.keys(courseList).map(
      (key) => courseList[key],
    );
    const [removed] = courseListArray.splice(sourceIndex, 1);
    courseListArray.splice(destinationIndex, 0, removed);
    const newCourseList = courseListArray.reduce((obj, item, index) => {
      return { ...obj, [index]: item };
    }, {});
    setCourseList(newCourseList);
    // Update expandedItems to match the new order of courseListArray
    const newExpandedItems = expandedItems.map((expandedIndex) => {
      if (expandedIndex === sourceIndex) {
        return destinationIndex;
      } else if (sourceIndex < destinationIndex) {
        if (expandedIndex > sourceIndex && expandedIndex <= destinationIndex) {
          return expandedIndex - 1;
        } else {
          return expandedIndex;
        }
      } else {
        if (expandedIndex >= destinationIndex && expandedIndex < sourceIndex) {
          return expandedIndex + 1;
        } else {
          return expandedIndex;
        }
      }
    });
    setExpandedItems(newExpandedItems);
    setDraggedItemId(null);
  };
  React.useEffect(() => {
    console.log(expandedItems, 'expandedItems');
  }, [expandedItems]);

  return (
    <div className="pb-20">
      <div className="items-start justify-between  py-0 bg-white p-5">
        <SelectCourse
          campusId={campusId}
          selectCourse={(course) => {
            updateForm({ [current]: course });
            // setOpenCourse(false);
            // setCurrent(current)
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
        <SelectProfessorOption
          onClose={() => {
            setProfessorOptionOpen(false);
          }}
          onOpen={() => {
            setProfessorOptionOpen(true);
          }}
          data={evaluationData?.data}
          selectCourse={(professor) => {
            updateProfessorOption({ [professorCurrent]: professor });
            // updateForm({ [current]: course });
          }}
          open={professorOptionOpen}
        ></SelectProfessorOption>
        <div className="flex justify-between mb-6 mt-2">
          <div className="flex items-center space-x-2">
            <CateGoryIcon></CateGoryIcon>
            {/* {item.Icon ? <Icon className="mt-1"></Icon> : null} */}
            <div className="text-blueTitle">{t('课程配置')}</div>
          </div>
          {/* <div>{item.action}</div> */}
        </div>
        <div className="mb-4">
          <Select
            value={termValue}
            change={(e) => {
              setTermValue(e);
            }}
            data={props?.term}
          ></Select>
        </div>
        <div className="grid grid-cols-5 grid-rows-2 gap-y-2 gap-x-2">
          {new Array(10).fill(1).map((item, index) => {
            console.log(item, 'courseList');
            return (
              <CourseSelector
                deleteCourse={() => {}}
                onClick={() => {
                  setOpenCourse(true);
                  setCurrent(index);
                }}
                data={courseList[index]}
                isSelect={current === index}
                index={index}
                key={index}
              ></CourseSelector>
            );
          })}
        </div>
      </div>
      <div className="mt-2 w-full"></div>
      <div className="items-start justify-between space-y-2  py-0 bg-white p-5 mb-4">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="course-list space-y-2">
            {(provided) => (
              <div
                {...provided.dragHandleProps}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {courseMap.map((item, index) => (
                  <Draggable
                    key={index}
                    draggableId={index.toString()}
                    onStart={() => {
                      setDraggedItemId(index);
                    }}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {/* Your existing course item component goes here */}
                        <div
                          onClick={() => {
                            setProfessorCurrent(index);
                          }}
                          className="border border-[#F7F8F9] rounded-md w-full p-2 mb-2"
                        >
                          <Accordion
                            defaultExpanded={expandedItems.includes(index)}
                            expanded={expandedItems.includes(index)}
                            onChange={() => {
                              setExpandedItems((prev) => {
                                if (prev.includes(index)) {
                                  return prev.filter((item) => item !== index);
                                } else {
                                  return [...prev, index];
                                }
                              });
                            }}
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
                                  {item?.label}
                                </div>
                              </div>
                            </AccordionSummary>
                            <AccordionDetails sx={{ padding: 0 }}>
                              <div className="w-full space-y-4">
                                <div className="flex items-center space-x-3">
                                  <div className="bg-[#F0F6FF] p-2 min-w-12 w-12 h-6 text-xs  text-[#2347D9] flex justify-center items-center rounded-md">
                                    {t('类别')}
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
                                        'bg-[#FFD036] text-[#93660A]':
                                          item.type === 'must',
                                        'bg-[#F7F8F9] text-[#798195]':
                                          item.type !== 'must',
                                      },
                                    )}
                                  >
                                    {t('必修课')}
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
                                        'bg-[#FFD036] text-[#93660A]':
                                          item.type === 'option',
                                        'bg-[#F7F8F9] text-[#798195]':
                                          item.type !== 'option',
                                      },
                                    )}
                                  >
                                    {t('选修课')}
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <div className="bg-[#F0F6FF] p-2 min-w-12 w-12 h-6 text-xs  text-[#2347D9] flex justify-center items-center rounded-md">
                                    {t('优先')}
                                  </div>
                                  <div className="w-[0.5px] h-3 bg-[#F0F6FF]"></div>
                                  <div
                                    onClick={() => {
                                      setProfessorOpen(true);
                                    }}
                                    className=" flex border-dashed justify-center border border-gray-300 items-center min-w-[36px] h-9 text-xs p-2 text-[#798195] rounded-md"
                                  >
                                    +
                                  </div>
                                  {item?.professorMust.map((item) => {
                                    return (
                                      <div
                                        onClick={() => {
                                          // up
                                          deleteProfessor(
                                            item,
                                            index,
                                            'professorMust',
                                          );
                                        }}
                                        className=" flex justify-center items-center min-w-[68px] h-6 text-xs p-2 text-[#798195] rounded-md"
                                      >
                                        {item.label}
                                      </div>
                                    );
                                  })}
                                </div>
                                <div className="flex items-center space-x-3">
                                  <div className="bg-[#F0F6FF] min-w-12 p-2 min-w-[48px] h-6 text-xs  text-[#2347D9] flex justify-center items-center rounded-md">
                                    {t('可选')}
                                  </div>
                                  <div className="w-[0.5px] h-3 bg-[#F0F6FF]"></div>
                                  <div
                                    onClick={() => {
                                      setProfessorOptionOpen(true);
                                    }}
                                    className=" flex justify-center border border-gray-300 items-center w-9 h-9 text-xs p-2 text-[#798195] rounded-md"
                                  >
                                    +
                                  </div>
                                  {item?.professorOption.map((item) => {
                                    return (
                                      <div
                                        onClick={() => {
                                          // up
                                          deleteProfessor(
                                            item,
                                            index,
                                            'professorOption',
                                          );
                                        }}
                                        className=" flex justify-center items-center min-w-[68px] h-6 text-xs p-2 text-[#798195] rounded-md"
                                      >
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
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className="bg-[#F6F6F6] w-full h-3"></div>

      <div className="p-5">
        <div className="mb-6 mt-2">
          <div className="flex items-center space-x-2">
            <CateGoryIcon></CateGoryIcon>
            {/* {item.Icon ? <Icon className="mt-1"></Icon> : null} */}
            <div className="text-blueTitle">{t('课表预览')}</div>
          </div>
          {(mustStudyData.some((item) => item.id) ||
            optionStudyData.some((item) => item.id)) && (
            <div className="w-full  ">
              <div className="flex w-full justify-between mt-5 items-center px-2 space-x-3">
                <MustStudy data={mustStudyData}></MustStudy>
                <OptionalStudy data={optionStudyData}></OptionalStudy>
              </div>
              <div className="flex items-center space-x-2 mt-6">
                <div className="w-1 h-4 bg-yellow-300 rounded-full"></div>
                <div className="font-semibold">{termValue}</div>
              </div>
              {filteredData?.map((item: Course) => {
                return (
                  <CourseSelectFormItem data={item}></CourseSelectFormItem>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
