import React, { useState, useContext, useEffect, useMemo } from 'react';
import CourseIcon from './course.svg';
import TextField from '@mui/material/TextField';
import NessIcon from './ness.svg';
import Autocomplete from '@mui/material/Autocomplete';
import useFetch from '@/hooks/useFetch';
import { EvaluationForm } from '@/libs/context';
import useLanguage from '@/hooks/useLanguage';
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
    const selectItem = (e) => {
      console.log(e, 'selectItem');
      // setValue(e)
      if (!data) {
        props.change({
          id: null,
          label: e,
        });
        return true;
      }
      // let allValuesGreaterThanZero = true;
      if (
        !Object?.values(data)?.some((value: any) => {
          if (value.ename === e) {
            props.change({
              id: value.id,
              label: value.ename,
            });
            return true;
          }
          return false;
        })
      )
        if (
          !Object?.values(data)?.some((value: any) => {
            if (value.name === e) {
              props.change({
                id: value.id,
                label: value.name,
              });
              return true;
            }
            return false;
          })
        )
          if (typeof e === 'string') {
            props.change({
              id: null,
              label: e,
            });
            return true;
          }

      // if (!allValuesGreaterThanZero) {
      //   // execute code
      //   props.change({
      //     courseId: null,
      //     courseName: e,
      //   });
      // }
      // if(!Object.values(data).every((item:any) => { item})
      // Object.values(data).every((item:any) => {
      //   if(item.ename === e){
      //     props.change({
      //       courseId:item.id,
      //       courseName:item.ename
      //     })
      //   }
      // })
      // props.change({
      //   courseId:null,
      //   courseName:e
      // })
    };
    return (
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        value={_value?.label}
        onChange={(event: any, newValue: string | null) => {
          console.log(event, 'event');
          console.log(newValue, 'event');
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
            onChange={(e) => {
              selectItem(e.target.value);
            }}
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
    data: courseData,
    error,
    mutate: mutateSubject,
  } = useFetch(`/subject/course?id=${data?.data?.subject?.id}`, 'get');
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
  const CCourseInputMemo = React.useMemo(() => CCourseInput, []);

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
      <label className="input-group bg-white w-full flex justify-between h-12">
        <span className="bg-white font-medium text-blueTitle text-sm">
          <NessIcon className="mr-1"></NessIcon> 课程分类
        </span>
        <CCourseInput
          value={{
            value: data.data?.subject?.id,
            label: data.data?.subject?.label,
          }}
          change={(val: { id: any; label: any }) => {
            console.log(val, 'val');
            // handleChange(val.id);
            updateData({
              key: 'subject',
              value: val,
            });
            // updateData({
            //   key: 'subjectName',
            //   value: val.label,
            // });
          }}
          data={subjectData}
          renderData={subjectData?.map((item) => {
            return item?.ename;
          })}
        ></CCourseInput>
        {/* <select onChange={(val)=>{
          console.log(val.target.value,"subjectData")
        }} className="select  hover:outline-none text-right font-medium	 text-gray-500 text-xs ">
          {
            subjectData?.map((item, index) => {
              return (
                    <option>{item.ename}</option>
              )
            })
          }
        </select> */}
      </label>
      <div className="divider m-0 pl-4 pr-4 opacity-30 h-1"></div>
      <label className="input-group bg-white w-full flex justify-between h-12">
        <span className="bg-white  font-medium text-blueTitle text-sm">
          <NessIcon className="mr-1"></NessIcon> 课程代码
        </span>
        <CCourseInput
          value={{
            value: data.data?.course?.id,
            label: data.data?.course?.label,
          }}
          change={(val: { id: any; label: any }) => {
            updateData({
              key: 'course',
              value: val,
            });
          }}
          data={courseData?.data}
          renderData={courseData?.data?.map((item) => {
            return item.ename;
          })}
        ></CCourseInput>
      </label>
      <div className="divider m-0 pl-4 pr-4 opacity-30 h-1"></div>
      <label className="input-group bg-white w-full flex justify-between h-12">
        <span className="bg-white font-medium text-blueTitle text-sm">
          <NessIcon className="mr-1"></NessIcon> 选择教授
        </span>
        <CCourseInput
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
        ></CCourseInput>
      </label>
      <div className="divider m-0 pl-4 pr-4 opacity-30 h-1"></div>
      <label className="input-group bg-white w-full flex justify-between h-12">
        <span className="bg-white font-medium text-blueTitle text-sm">
          <NessIcon className="mr-1"></NessIcon> 课程形式
        </span>
        <CCourseInput
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
        ></CCourseInput>
      </label>
      <div className="divider m-0 pl-4 pr-4 opacity-30 h-1"></div>
    </div>
  );
}
export default courseInfo;
