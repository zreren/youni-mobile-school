import React, { useState, useContext, useEffect, useMemo } from 'react';
import CourseIcon from './course.svg';
import TextField from '@mui/material/TextField';
import NessIcon from './ness.svg';
import Autocomplete from '@mui/material/Autocomplete';
import useFetch from '@/hooks/useFetch';
import { EvaluationForm } from '@/libs/context';
import useLanguage from '@/hooks/useLanguage';
import { debounce } from 'lodash';
import { Toast } from 'react-vant';

function courseInfo(props) {
  const { subjectData } = props;
  interface ChangeType {
    id: number;
    label: string;
  }
  interface CCourseInput {
    title?: string;
    isNess?: boolean;
    children?: any;
    data?: any;
    change?: (data: ChangeType) => void;
    renderData?: any;
    value?: any;
    onClick?: any;
  }
  const data = useContext(EvaluationForm);

  const [form, setForm] = React.useState({});

  const updateData = (e) => {
    data.setData({ ...data.data, [e.key]: e.value });
    console.log(data, 'courseInfo');
  };

  const CCourseInput = (props: CCourseInput) => {
    const { title, isNess, children, data, renderData, value } = props;
    const [_value, setValue] = useState(value);
    const __value = React.useRef<any>(value);

    const selectItem = (e) => {
      if (!data) {
        props.change({
          id: null,
          label: e ? e : null,
        });
        return true;
      }

      let found = false;
      Object.values(data).forEach((value: any) => {
        if (value?.ename === e || value?.name === e || value?.code === e) {
          props.change({
            id: value?.id,
            label: value?.code || value?.ename || value?.name,
          });
          found = true;
        }
      });

      if (!found && typeof e === 'string') {
        props.change({
          id: null,
          label: e ? e : null,
        });
      }
    };

    const debouncedChange = debounce(props.change, 300); // 设置延迟时间为 300ms

    const handleInputChange = (e) => {
      __value.current = { id: null, label: e.target.value || null };
      debouncedChange(__value.current);
    };

    return (
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        value={_value?.label}
        onChange={(event: any, newValue: string | null) => {
          setValue({
            value: null,
            label: newValue,
          });
          selectItem(newValue);
        }}
        sx={{
          display: 'inline-block',
          width: 200,
          border: 'none',
          borderRadius: 'none',
          padding: 0,
          outline: 'none',
          boxShadow: 'none',
          textAlign: 'right',
        }}
        options={renderData ? renderData?.map((option) => option) : []}
        renderInput={(params) => (
          <TextField
            sx={{
              '& label.Mui-focused': {
                color: 'transparent',
                border: 0,
                'border-width': 0,
                'border-color': 'transparent',
                outline: 'none',
              },
              textAlign: 'right',
              outline: 'none',
              input: { textAlign: 'right' },
              '& fieldset': { border: 'none' },
              '& legend': {
                display: 'none',
              },
            }}
            {...params}
            value={_value?.label}
            onChange={handleInputChange}
            InputProps={{
              ...params.InputProps,
              disableUnderline: true,
              endAdornment: null,
            }}
          />
        )}
      />
    );
  };
  const [subjectId, setSubjectId] = useState();
  const {
    data: _courseData,
    error,
    mutate: mutateSubject,
  } = useFetch(`/subject/courses`, 'page', {
    id: data?.data?.subject?.id | 1,
    pageSize: 100,
  });
  useEffect(() => {
    mutateSubject();
  }, [data?.data?.subject?.id]);
  const courseData = useMemo(() => {
    return _courseData
      ? courseData
        ? [...courseData].concat(..._courseData)
        : [].concat(..._courseData)
      : null;
  }, [_courseData, data?.data?.subject?.id]);
  const { data: courseDetail, mutate: mutateCourse } = useFetch(
    `/course/detail?id=${data?.data?.course?.id}`,
    'get',
  );

  const ProfessorList = useMemo(() => {
    return courseDetail?.data?.sections
      .map((item) => {
        console.log(item, 'item');
        return item.professors;
      })
      .flat();
  }, [courseDetail, data?.data?.course?.id]);

  useEffect(() => {
    mutateCourse();
  }, [data?.data?.course?.id]);
  useEffect(() => {
    console.log(data, 'mutateSubject');
  }, [data]);

  const ModeList = useMemo(() => {
    return courseDetail?.data?.sections
      .map((item) => {
        console.log(item, 'item');
        return item.mode;
      })
      .flat();
  }, [courseDetail, data?.data]);


  useEffect(() => {
    console.log(ProfessorList, 'ProfessorList');
  }, [ProfessorList]);
  const CCourseInputMemo = React.useMemo(
    () => CCourseInput,
    [
      data?.data?.course,
      data?.data?.courseData,
      data?.data?.professor,
      data?.data?.mode,
    ],
  );

  useEffect(() => {
    mutateSubject();
  }, [data?.data?.subjectId]);
  const handleChange = React.useCallback((val: any) => {
    setSubjectId((preVal: any) => {
      return val;
    });
  }, []);
  //   </label>
  // </div>
  return (
    <div className="bg-white pb-5">
      <label className="input-group bg-white w-full flex justify-between h-12 pl-4 ">
        <div className="flex items-center ">
          <CourseIcon className="mr-2"></CourseIcon>
          <div className="bg-white font-medium text-blueTitle text-base">
            课程分类
          </div>
        </div>
      </label>
      <div className="divider m-0 pl-4 pr-4 opacity-30 h-1"></div>
      <div className="divider m-0 pl-4 pr-4 opacity-30 h-1"></div>
      <label className="input-group bg-white w-full flex justify-between h-12">
        <span className="bg-white  font-medium text-blueTitle text-sm">
          <NessIcon className="mr-1"></NessIcon> 课程代码
        </span>
        <div
          onClick={() => {
            props.select();
          }}
          className='w-1/2 h-full flex justify-end items-center mr-10'
        >{data?.data?.course?.label}</div>
        {/* <CCourseInputMemo
          value={{
            value: data?.data?.course?.id,
            label: data?.data?.course?.label,
          }}
          onClick={() => {
            if (!data?.data?.subject?.id) {
              Toast.fail('请先选择课程分类');
              return;
            }
            props.select()
          }}
          change={(val: { id: any; label: any }) => {
            if (!val) return;
            updateData({
              key: 'course',
              value: val,
            });
          }}
          data={courseData}
          renderData={courseData?.map((item) => {
            return item?.code;
          })}
        ></CCourseInputMemo> */}
      </label>
      <div className="divider m-0 pl-4 pr-4 opacity-30 h-1"></div>
      <label className="input-group bg-white w-full flex justify-between h-12">
        <span className="bg-white font-medium text-blueTitle text-sm">
          <NessIcon className="mr-1"></NessIcon> 选择教授
        </span>
        <div
          onClick={() => {
            props.SelectProfessor();
          }}
          className='w-1/2 h-full flex justify-end items-center mr-10'
        >{data?.data?.professor?.label}</div>
        {/* <CCourseInputMemo
          value={{
            value: data.data?.professor?.id,
            label: data.data?.professor?.label,
          }}
          change={(val: { id: any; label: any }) => {
            updateData({
              key: 'professor',
              value: val,
            });
          }}
          data={ProfessorList}
          renderData={ProfessorList?.map((item) => {
            return item.name;
          })}
        ></CCourseInputMemo> */}
      </label>
      <div className="divider m-0 pl-4 pr-4 opacity-30 h-1"></div>
      <label className="input-group bg-white w-full flex justify-between h-12">
        <span className="bg-white font-medium text-blueTitle text-sm">
          <NessIcon className="mr-1"></NessIcon> 课程形式
        </span>
        <div
          onClick={() => {
            props.SelectMode();
          }}
          className='w-1/2 h-full flex justify-end items-center mr-10'
        >{data?.data?.mode?.label}</div>
        {/* <CCourseInputMemo
          value={{
            value: data.data?.mode?.id,
            label: data.data?.mode?.label,
          }}
          change={(val: { id: any; label: any }) => {
            updateData({
              key: 'mode',
              value: val,
            });
          }}
          data={ModeList}
          renderData={ModeList?.map((item) => {
            return item[useLanguage('name')];
          })}
        ></CCourseInputMemo> */}
      </label>
      <div className="divider m-0 pl-4 pr-4 opacity-30 h-1"></div>
    </div>
  );
}
export default courseInfo;
