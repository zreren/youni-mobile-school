import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Header from '@/components/Header';
import NessIcon from '@/components/PageComponents/Course/addEvaluation/ness.svg';
import { Image, Uploader } from 'react-vant';
import { Popup } from 'react-vant';
import { Flex, Loading } from 'react-vant';
import useFetch from '@/hooks/useFetch';
import ResultIcon from './resultimg.png';
import useRequest from '@/libs/request';
import instance from '@/libs/request';
import { Dayjs } from 'dayjs';
import useLanguage from '@/hooks/useLanguage';
import { Picker } from 'react-vant';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import Autocomplete from '@mui/material/Autocomplete';
import { Form, Selector } from 'react-vant';
import { DatetimePicker, Field, Toast } from 'react-vant';
import ConfirmIcon from './confirmicon.svg';
import TextField from '@mui/material/TextField';
import DeleteIcon from './deleteicon.svg';
import { useLocalStorage } from 'react-use';
import useCurriculum from '@/hooks/useCurriculum';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface ChangeType {
  id: number;
  label: string;
}
interface CCourseInput {
  title: string;
  isNess?: boolean;
  children?: any;
  data?: any;
  change?: (data: ChangeType) => void;
  renderData?: any;
  value?: string;
}
export default function reorganize() {
  const { t } = useTranslation();

  const CCourseInput = (props: CCourseInput) => {
    const { title, isNess, children, data, renderData, value } = props;
    const selectItem = (e) => {
      console.log(e, 'selectItem');
      if (!data) {
        props.change({
          id: null,
          label: e,
        });
        return;
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
            return;
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
      <div className="w-full bg-white  text-right rounded-xl">
        <label className="flex justify-between w-full h-12 input-group ">
          <span className="text-sm font-medium bg-white text-[#A9B0C0]">
            {isNess === true ? <NessIcon className="mr-1"></NessIcon> : null}
            {title}
          </span>
          {/* <input */}
          {/*   type="text" */}
          {/*   placeholder="info@site.com" */}
          {/*   className="text-sm font-medium text-right text-gray-500 placeholder-gray-300 border-none input hover:outline-none" */}
          {/* /> */}
          {children ? (
            children
          ) : (
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              onChange={(event: any, newValue: string | null) => {
                console.log(event, 'event');
                console.log(newValue, 'event');
                selectItem(newValue);
              }}
              value={value}
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
                  value={value}
                  InputProps={{
                    ...params.InputProps,
                    disableUnderline: true,
                    endAdornment: null,
                  }}
                />
              )}
            />
          )}
        </label>
      </div>
    );
  };
  const [image, setImage] = React.useState<any>();
  const CCourseColor = ({ setColor }) => {
    const [select, setSelect] = useState(0);
    const colorList = [
      {
        light: '#D9E7FF',
        dark: '#3A66FF',
        id: 0,
      },
      {
        light: '#FFE7E3',
        dark: '#FF8A00',
        id: 1,
      },
      {
        light: '#FFF0D6',
        dark: '#FFB800',
        id: 2,
      },
      {
        light: '#FFFBD9',
        dark: '#FFD800',
        id: 3,
      },
      {
        light: '#E7CCFF',
        dark: '#A800FF',
        id: 4,
      },
    ];
    useEffect(() => {
      setColor(colorList[select].dark);
    }, []);
    return (
      <div className="flex space-x-2">
        {colorList.map((item) => {
          return (
            <div
              onClick={() => {
                setSelect(item.id);
                setColor(item.dark);
              }}
              style={{
                background: item.light,
                border: item.id === select ? '1px solid #FFD036' : 'none',
              }}
              className="w-6 h-6 rounded-full "
            ></div>
          );
        })}
      </div>
    );
  };
  const { defaultCurriculum } = useCurriculum();

  const [reorganizeData, setReorganizeData] = React.useState<any>([]);
  // const upload = async (file: File) => {
  //   console.log(file)
  //   return { url: `${file.arrayBuffer}`,name: file.name};
  // };
  const [begin, setBegin] = React.useState(false);
  const beginRecognize = () => {
    if (!termId) {
      Toast.fail(`${t('请选择学期')}`);
      return;
    }
    if (!image) {
      Toast.fail(`${t('请上传图片')}`);
      return;
    }

    setBegin(true);
    const body = new FormData();
    body.append('image', image[0].file);
    body.append('termId', termId);
    console.log(image[0].file, 'image', body, 'body');
    useRequest.post('/api/curriculum/ocr', body).then((res) => {
      setBegin(false);
      const { data } = res;
      if (!data) {
        Toast.fail(`${t('识别失败')}`);
        // return;
      }
      const result = data?.data?.items
        ?.slice()
        ?.filter((item) => {
          return item?.name.indexOf('undefined') < 0;
        })
        .map((item, index) => {
          return {
            ...item,
            id: index,
          };
        });
      setReorganizeData({ curriculums: result });
      console.log(result);
    });
  };
  const AddCourse = (props) => {
    const { data } = props;
    const {
      name,
      dayOfWeek: dayOfWeeksItem,
      sectionName,
      mode,
      classroom,
      time: courseTime,
      id,
    } = data;
    // const timeSpirit = useMemo(()=>{
    //   console.log(courseTime,"courseTime")
    //     // const pattern =  /^(\d{1,2}:\d{2})-(\d{1,2}:\d{2})$/;
    //     // const match = courseTime?.match(pattern);
    //     // console.log(match,"match")
    //     // if (!match) return;
    //     return [CURRICULUM.time.start, CURRICULUM.time.end];
    // },[courseTime])
    useEffect(() => {
      // console.log(timeSpirit,"timeSpirit")
      setTime(courseTime?.start);
      setEndTime(courseTime?.end);
    }, [courseTime]);
    const [dayOfWeek, setDayOfWeek] = useState([String(dayOfWeeksItem + 1)]);
    const [time, setTime] = useState();
    const [endTime, setEndTime] = useState();
    const [CURRICULUM, setCURRICULUM] = useState({
      name: name,
      color: null,
      period: 0,
      dayOfWeek: [dayOfWeeksItem],
      classroom: classroom,
      courseId: null,
      sectionId: null,
      sectionName: sectionName,
      professorName: '',
      mode: '',
    });

    const [value, setValue] = React.useState<Dayjs | null>(null);
    const handleChange = useCallback((val: any, name: string) => {
      setCURRICULUM((preVal: any) => {
        return {
          ...preVal,
          [name]: val,
        };
      });
    }, []);
    const dayOfWeekList = [
      {
        label: '周一',
        value: '1',
      },
      {
        label: '周二',
        value: '2',
      },
      {
        label: '周三',
        value: '3',
      },
      {
        label: '周四',
        value: '4',
      },
      {
        label: '周五',
        value: '5',
      },
      {
        label: '周六',
        value: '6',
      },
      {
        label: '周日',
        value: '0',
      },
    ];
    const translateTime = (time, endTime) => {
      if (!time || !endTime) return;
      // time:"12:00-18:00 转 time:"12.00-18.00
      const timeArr = time?.split(':');
      const endTimeArr = endTime?.split(':');
      const timeStr = timeArr?.join('.');
      const endTimeStr = endTimeArr.join('.');
      return `${timeStr}-${endTimeStr}`;
    };
    const submitCourse = async (values: any) => {
      const { data } = await instance.post(
        '/api/curriculum/item/create',
        values,
      );
      return data;
    };

    useEffect(() => {
      console.log(defaultCurriculum, 'defaultCurriculum');
    }, [defaultCurriculum]);
    const submitForm = async (values: any) => {
      // return;
      if (!defaultCurriculum) {
        Toast.fail(`${t('请先创建课程表')}`);

        return;
      }
      const requestQueen = dayOfWeek.map(async (item) => {
        const data = await submitCourse({
          ...values,
          dayOfWeek: Number(item),
          termId: termId,
          // time: translateTime(time, endTime),
          time: {
            start: time,
            end: endTime,
          },
          curriculumId: defaultCurriculum?.id,
          mode: mode,
        });
        return data;
      });
      Promise.all(requestQueen)
        .then((res) => {
          console.log(res, 'res');
          // if(res.every((item)=>item.code===200))
          if (res.some((item) => item.message !== 'success')) {
            Toast.fail(`${t('添加失败')}`);
          } else {
            Toast.success(`${t('添加成功')}`);
            const data = reorganizeData.curriculums.slice().filter((item) => {
              return item.id !== values.id;
            });
            setReorganizeData({
              ...reorganizeData,
              curriculums: data,
            });
          }

          // if(res.)
          // Toast.success('添加成功');
        })
        .catch((err) => {
          Toast.fail(`${t('添加失败')}`);
        });
    };
    const deleteCourse = (id) => {
      try {
        const data = reorganizeData.curriculums.slice().filter((item) => {
          return item.id !== id;
        });
        setReorganizeData({
          ...reorganizeData,
          curriculums: data,
        });
        Toast.success(`${t('删除成功')}`);
      } catch (error) {
        Toast.fail(`${t('删除失败')}`);
      }
    };

    return (
      <div className="w-full space-y-4">
        <CCourseInput
          title={`${t('课程名称')}`}
          isNess
          value={name}
          change={(val) => {
            handleChange(val.label, 'name');
            handleChange(val.id, 'courseId');
          }}
        ></CCourseInput>
        {/* <div>{CourseId}</div> */}
        <div className="w-full pl-2 pr-2 bg-white rounded-lg">
          <label className="w-full h-24 ">
            <div className="w-full p-3">
              {' '}
              <span className="flex items-center text-sm font-medium bg-white text-[#A9B0C0]">
                <NessIcon className="mr-1"></NessIcon>
                {`${t('上课日期')}`}
              </span>
            </div>
            <div className="flex youni-form w-full pb-4 pl-4 pr-4 ">
              <Selector
                options={dayOfWeekList}
                style={{
                  '--rv-selector-border-radius': '4px',
                  '--rv-selector-color': 'rgba(55, 69, 92, 0.04)',
                  '--rv-selector-checked-border':
                    'solid var(--adm-color-primary) 1px',
                  '--rv-selector-padding': '4px 4px',
                  '--rv-selector-checked-text-color': 'white',
                }}
                className="text-blueTitle"
                value={dayOfWeek}
                multiple={true}
                showCheckMark={false}
                onChange={(arr, extend) => {
                  setDayOfWeek(arr);
                }}
              />
            </div>
          </label>
        </div>
        <div className="w-full h-12 p-4 bg-white rounded-lg">
          <div className="flex youni-form items-center justify-between h-full space-x-4">
            <div className="flex items-center">
              <NessIcon className="mr-1"></NessIcon>
              <div className="text-sm text-[#A9B0C0]">{t('开始时间')}</div>
            </div>
            <div>
              <DatetimePicker
                popup={{
                  round: true,
                }}
                title=""
                defaultValue={courseTime.start}
                type="time"
                minHour="7"
                maxHour="24"
                value={time}
                onConfirm={(val) => {
                  setTime(val);
                }}
              >
                {(val, _, actions) => {
                  return (
                    <Field
                      readOnly
                      clickable
                      label=""
                      value={val}
                      placeholder={t('请选择日期')}
                      onClick={() => actions.open()}
                    />
                  );
                }}
              </DatetimePicker>
            </div>
          </div>
        </div>
        <div className="w-full h-12 p-4 bg-white rounded-lg">
          <div className="flex youni-form items-center justify-between h-full space-x-4">
            <div className="flex items-center">
              <NessIcon className="mr-1"></NessIcon>
              <div className="text-sm text-[#A9B0C0]">{t('结束时间')}</div>
            </div>
            <div>
              <DatetimePicker
                popup={{
                  round: true,
                }}
                title=""
                defaultValue={courseTime.end}
                type="time"
                minHour="7"
                maxHour="24"
                value={endTime}
                onConfirm={(val) => {
                  setEndTime(val);
                }}
              >
                {(val, _, actions) => {
                  return (
                    <Field
                      readOnly
                      clickable
                      label=""
                      value={val}
                      placeholder={t('请选择日期')}
                      onClick={() => actions.open()}
                    />
                  );
                }}
              </DatetimePicker>
            </div>
          </div>
        </div>
        <CCourseInput
          title="Section"
          value={sectionName}
          change={(val) => {
            handleChange(val.label, 'sectionName');
            handleChange(val.id, 'sectionId');
          }}
        ></CCourseInput>
        <CCourseInput
          title={t('课程形式')}
          value={mode}
          change={(val) => {
            handleChange(val.label, 'mode');
          }}
        ></CCourseInput>
        <CCourseInput
          title={t('教授')}
          change={(val) => {
            handleChange(val.label, 'professorName');
            // handleChange(val.id, 'courseId');
          }}
        ></CCourseInput>
        <CCourseInput
          title={t('教室')}
          value={classroom}
          change={(val) => {
            console.log(val, 'classroom');
            handleChange(val.label, 'classroom');
          }}
        ></CCourseInput>
        <div className="w-full h-12 p-4 bg-white rounded-lg">
          <div className="flex items-center justify-between h-full space-x-4">
            <div className="text-sm text-blueTittle]">{t('单双周')}</div>
            <div className="w-[250px] h-full flex items-center justify-end pr-1 rounded-lg">
              <div className="border-[#DCDDE1] border  overflow-hidden  rounded-lg  h-[28px]   flex ">
                <div
                  onClick={() => {
                    handleChange(0, 'period');
                  }}
                  className={classnames(
                    'w-full  flex justify-center px-2 items-center text-center text-[#A9B0C0]',
                    {
                      'bg-slate-50 text-[#FFD036]': CURRICULUM.period === 0,
                    },
                  )}
                >
                  {t('全部')}
                </div>
                <div
                  onClick={() => {
                    handleChange(1, 'period');
                  }}
                  className={classnames(
                    'w-full  flex justify-center px-2 items-center text-center text-[#A9B0C0]',
                    {
                      'bg-slate-50 text-[#FFD036]': CURRICULUM.period === 1,
                    },
                  )}
                >
                  {t('单周')}
                </div>
                <div
                  onClick={() => {
                    handleChange(2, 'period');
                  }}
                  className={classnames(
                    'w-full rounded-none flex  px-2 justify-center whitespace-nowrap items-center text-center text-[#A9B0C0]',
                    {
                      'bg-slate-50 text-[#FFD036]': CURRICULUM.period === 2,
                    },
                  )}
                >
                  {t('双周')}
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-12 p-4 bg-white rounded-lg">
          <div className="flex items-center justify-between h-full space-x-4">
            <div className="text-sm text-[#A9B0C0]">{t('颜色')}</div>
            <CCourseColor
              setColor={(val) => {
                handleChange(val, 'color');
              }}
            ></CCourseColor>
          </div>
        </div>
        <div className="flex justify-between mx-10 space-x-4 pb-6">
          <div className="bg-[#FF7978] h-11 w-24 rounded-full flex justify-center items-center">
            <DeleteIcon
              onClick={() => {
                deleteCourse(id);
              }}
            ></DeleteIcon>
          </div>
          <div className="bg-[#3665FF] h-11 w-24 rounded-full flex justify-center items-center">
            <ConfirmIcon
              onClick={() => {
                submitForm({ id, ...CURRICULUM });
              }}
            ></ConfirmIcon>
          </div>
        </div>
      </div>
    );
  };
  const ResultItemComponent = (props) => {
    const { data } = props;
    return (
      <div className="w-full relative">
        <div className="bg-[#FDD451] z-0 h-4 w-full absolute rounded-t-[10px]"></div>
        <div className=" w-full z-10 bg-white rounded-[10px] mt-2 relative">
          <AddCourse data={data}></AddCourse>
        </div>
      </div>
    );
  };
  const Result = (props) => {
    return (
      <div className="w-full pb-14  space-y-6 overflow-hidden h-full flex flex-col justify-center items-center p-4">
        <div className="w-full px-6 py-5  overflow-hidden bg-white h-[92px] relative youni-boxShadow  rounded-[10px]">
          <div className="mb-2">
            <span className="text-[#37455C]">{`${t('成功识别')}`}</span>
            <span className="text-[#4FB0FE]">
              {reorganizeData?.curriculums?.length}
            </span>
            <span className="text-[#37455C]">{`${t('课程')}`}</span>
          </div>
          <div className="text-sm text-[#A9B0C0] font-medium z-20 relative">
            {`${t('点击左侧按钮删除')} ${t('点击右侧按钮保存')}`}
          </div>
          <img
            src={'/resultimg.png'}
            className="absolute z-0 w-40 h-[140px] -top-0 -right-12"
          ></img>
        </div>

        {reorganizeData?.curriculums?.map((item, index) => {
          return (
            <ResultItemComponent data={item} key={index}></ResultItemComponent>
          );
        })}
        {/* <ResultItemComponent data={}></ResultItemComponent> */}
      </div>
    );
  };
  const router = useRouter();
  const campus = router.query.campus;
  const [school] = useLocalStorage('school', 'york');
  const [campusId] = useLocalStorage(
    (campus as string) || 'york',
    1,
  );
  const { data: termList } = useFetch('/campus/term/list', 'get', {
    campusId: campusId || 1,
  });
  const [termId, setTermIdValue] = React.useState<any>();
  const CPicker = (props) => {
    const [loading, setLoading] = React.useState(false);
    const [value, setValue] = useState(termId);
    if (!termList?.data) return;
    return (
      <Picker
        popup={{
          round: true,
        }}
        value={value}
        title={`${t('请选择')}`}
        columns={termList?.data}
        className="text-right"
        onConfirm={setTermIdValue}
        visibleItemCount={8}
        onChange={setValue}
        columnsFieldNames={{ text: 'name', value: 'id' }}
        optionRender={(option: any) => {
          // console.log(option,"option")
          if (!option.id) return null;
          return (
            <div className="flex space-x-1">
              <div>{option.name}</div>
              <div>|</div>
              <div>{option.year}</div>
            </div>
          );
        }}
      >
        {(val: string, _: any, actions) => {
          console.log(_, val, 'select');
          return (
            <Field
              readOnly
              clickable
              value={_?.name || ''}
              placeholder={`${t('请选择')}`}
              onClick={() => actions.open()}
            />
          );
        }}
      </Picker>
    );
  };
  return (
    <div className="w-full min-h-screen bg-[#F6F6F6]">
      <Header title={t("一键导入课表")}></Header>
      <Popup
        overlayClass={'Popup'}
        className="z-30 topIndexPlus rounded-full "
        visible={begin}
      >
        <div className="rounded-full w-10 h-10 flex overflow-hidden justify-center items-center">
          <Loading type="spinner" color="#FED64B" />
        </div>
      </Popup>
      {/* <Result></Result> */}
      {!begin && reorganizeData?.curriculums ? <Result></Result> : null}
      {!begin && !reorganizeData?.curriculums ? (
        <div className="p-4 space-y-4">
          <div className="w-full bg-white  text-right rounded-xl">
            <label className="flex items-center justify-between w-full h-12 input-group ">
              <span className="text-sm font-medium bg-white text-blueTitle">
                <NessIcon className="mr-1"></NessIcon>
                {`${t(
                  '学年&学期',
                )}`}
              </span>
              <div className="term-pick">
                <CPicker change={() => {}}></CPicker>
              </div>
            </label>
          </div>
          <div className="h-[170px] w-full bg-white p-3 rounded-lg">
            <div className="text-[#37455C] text-sm font-medium">
              {`${t('上传课表图片')}`}
            </div>
            <div className="text-xs text-[#A9B0C0] mt-2">
              {`${t(
                '上传清晰，图片内仅包含课表主要内容的图片，可以大大提升识别成功率哦！',
              )}`}
            </div>
            <div className="mt-2 preview w-16 h-16 overflow-hidden">
              <Uploader
                multiple
                value={image}
                // upload={upload}
                maxCount={1}
                onChange={(items) => {
                  setImage(items);
                }}
                maxSize={2500 * 1024}
                onOversize={() => Toast.info('文件大小不能超过15kb')}
              />
            </div>
          </div>
          <div
            onClick={() => {
              beginRecognize();
            }}
            className="w-full rounded-md h-10 bg-[#FFD036] text-[#8C6008] text-center flex justify-center items-center"
          >
            {`${t('下一步')}`}
          </div>
        </div>
      ) : null}
    </div>
  );
}


export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
