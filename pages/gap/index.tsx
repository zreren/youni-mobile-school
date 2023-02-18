import React, { useEffect, useMemo } from 'react';
// import Header from '@/components/Header';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import DownIcon from './down.svg';
import EditIcon from './edit.svg';
import Session from './sesion.svg';
import DeleteIcon from './delete.svg';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ConfirmIcon from './confirm.svg';
import GarbageIcon from './garbage.svg';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { Flex, Loading, Toast } from 'react-vant';
import useRequest from '@/libs/request';
import useFetch from '../../hooks/useFetch';
import { Cell, Dialog } from 'react-vant';
import { useDispatch } from 'react-redux';
import { setOpenLogin } from '../../stores/authSlice';

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
const CScoreCard = (props) => {
  const { score, label } = props;
  return (
    <div className="w-24 h-14">
      <div className="flex items-center justify-center w-full h-8 text-lg font-medium text-center bg-gray-200 rounded-t-lg text-blueTitle">
        {String(score)?.slice(0, 3) || 3.2}
      </div>
      <div className="w-full text-xs h-[24px] bg-gray-100 flex justify-center items-center text-gray-400">
        {label || '内容评分'}
      </div>
    </div>
  );
};

export default function index() {
  const router = useRouter();
  const { data, error } = useFetch('/grade/list', 'get');
  const { data: total, error: totalError } = useFetch('/grade/stat', 'get');

  const deleteGapItem = async (id: number | string): Promise<any> => {
    useRequest.post('/api/grade/delete', { id });
  };
  if (error) return;
  console.log(data);
  // const addGrad
  const Header = (props) => {
    const { children, title, className, returnClick } = props;
    return (
      <>
        <div
          className={classnames(
            'absolute  inset-0 top-0 z-50 flex items-center justify-between w-full p-5   h-11 ',
          )}
        >
          <div
            onClick={() => {
              returnClick ? returnClick() : router.back();
            }}
            className="w-1/6"
          >
            <svg
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.19531 0.328613L7.13812 1.27142L2.42408 5.98547L7.13812 10.6995L6.19531 11.6423L1.0099 6.45691C1.00988 6.45689 1.00986 6.45687 1.48127 5.98547L1.0099 6.45691L0.538458 5.98547L6.19531 0.328613Z"
                fill="#1D2129"
              />
            </svg>
          </div>
          <div className="w-2/3 text-lg font-medium text-center">{title}</div>
          <div className="flex justify-end w-1/6">{children}</div>
        </div>
        <div className="mb-11"></div>
      </>
    );
  };
  const AddCourseGap = (props) => {
    const { color } = props;
    return (
      <div className="relative" onClick={props.onClick}>
        <div className={`bg-[${color}] rounded-full w-3 h-16`}></div>
        <div className="w-full  gap-card-shadow absolute top-0  justify-center items-center bg-white left-2 mr-4  h-16  flex">
          <div className="flex rounded-full px-6 py-1  items-center space-x-2 bg-[#F7F8F9]">
            <Session></Session>
            <div className="text-[#798195] font-medium">添加课程</div>
          </div>
        </div>
      </div>
    );
  };
  const TotalGap = () => {
    return (
      <div className="flex justify-between items-center bg-white border border-[#F7F8F9] p-2 ">
        <div className="text-[#A9B0C0] text-xs">学期总GPA</div>
        <div className="text-[#37455C] text-sm">6.67</div>
      </div>
    );
  };
  const InputField = (props) => {
    const [value, setValue] = React.useState(props.value);
    return (
      <TextField
        value={value}
        onChange={(e)=>{setValue(e.target.value)}}
        onBlur={()=>{props.onChange(value)}}
        placeholder="..."
        sx={{
          '& label.Mui-focused': {
            color: 'transparent',
            border: 0,
            'border-width': 0,
            'border-color': 'transparent',
            outline: 'none',
          },
          fontSize: 12,
          height: 20,
          width: 40,
          padding: 0,
          textAlign: 'left',
          outline: 'none',
          '& .MuiAutocomplete-input': {
            padding: 0,
          },
          '& .MuiAutocomplete-inputRoot.MuiAutocomplete-input': {
            padding: 0,
          },
          input: {
            textAlign: 'left',
            height: 20,
            width: 40,
            padding: 0,
            fontSize: 14,
            '&::placeholder': {
              color: '#FFEB87',
              opacity: 1,
            },
            '& .MuiAutocomplete-inputRoot.MuiAutocomplete-input': {
              padding: 0,
            },
          },
          '& fieldset': { border: 'none' },
          '& legend': {
            display: 'none',
          },
        }}
        InputProps={{
          disableUnderline: true,
          endAdornment: null,
        }}
      />
    );
  };
  const AutoInput = (props) => {
    const { data: courseData } = useFetch('/course/query?campusId=1', 'get');
    const changeValue = (name) =>{
      Object.values(courseData?.data).some((value:any)=>{
        if(value.ename === name){
          props.onChange({
            id:value.id,
            label:value.ename
          });
        }
      })
    }
    const isFocus = useMemo(()=>{
      return props.isFocus?{minWidth:'100vw'}:{width:'40px',maxWidth:'40px'}
    },[props.isFocus])
    return (  
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        onChange={(event: any, newValue: string | null) => {
            changeValue(newValue)
        }}
        placeholder="请输入"
        sx={{
          display: 'block',
          height: 20,
          border: 'none',
          isFocus,
          borderRadius: 'none',
          padding: 0,
          outline: 'none',
          boxShadow: 'none',
          '& .MuiAutocomplete-inputRoot': {
            padding: 0,
            width:'100%',
            height: 20,
          },
          '.MuiAutocomplete-input': {
            padding: '0 !important',
          },
          '& .MuiAutocomplete-inputRoot.MuiAutocomplete-input': {
            padding: 0,
          },
        }}
        options={courseData?.data?.map((option) => option.ename)}
        renderInput={(params) => (
          <TextField
            placeholder="请输入"
            onBlur={() => {
              props.onBlur();
            }}
            onFocus={() => {
              props.onFocus();
            }}
            sx={{
              '& label.Mui-focused': {
                color: 'transparent',
                border: 0,
                'border-width': 0,
                'border-color': 'transparent',
                outline: 'none',
              },
              fontSize: 12,
              height: 20,
              minWidth: 40,
              padding: 0,
              textAlign: 'left',
              outline: 'none',
              '& .MuiAutocomplete-input': {
                padding: 0,
              },
              '& .MuiAutocomplete-inputRoot.MuiAutocomplete-input': {
                padding: 0,
              },
              input: {
                textAlign: 'left',
                height: 20,
                width: 40,
                padding: 0,
                fontSize: 14,
                '&::placeholder': {
                  color: '#FFEB87',
                  opacity: 1,
                },
                '& .MuiAutocomplete-inputRoot.MuiAutocomplete-input': {
                  padding: 0,
                },
              },
              '& fieldset': { border: 'none' },
              '& legend': {
                display: 'none',
              },
            }}
            {...params}
            InputProps={{
              ...params.InputProps,
              disableUnderline: true,
              endAdornment: null,
            }}
          />
        )}
      ></Autocomplete>
    );
  };
  const CourseGap = (props) => {
    const { edit, color, data ,type} = props;
    console.log(data,"CourseGap")
    const [editMethod, setMethod] = React.useState(edit ? edit : false);
    const [courseId,setCourseId] = React.useState(data?.course?.id);
    const [courseName,setCourseName] = React.useState(data?.course?.ename);
    const [score,setScore] = React.useState(data?.score)
    const [credit, setCredit] = React.useState(data?.credit);
    const submitChange = () => {
      if(type === 'new'){
        useRequest.post('/api/grade/create',{
          courseId:courseId,
          credit:credit,
          score: score,
          termId: data.term.id,
        })
        // setMethod(false);
      }
      setMethod(false);
    };
    const [isFocus, setFocus] = React.useState(false);
    return (
      <div
        className={classnames(
          'relative',
          props.className ? props.className : null,
        )}
      >
        <div className={`bg-[${color}] rounded-full w-3 h-16`}></div>
        <div className="w-full gap-card-shadow absolute top-0   items-center bg-white left-2 mr-4  h-16   flex justify-between">
          <div className={'mx-4 w-full'}>
            <div className="flex items-center space-x-4 w-full">
              <div className={classnames({ 'w-screen': isFocus })}>
                <div className="text-[10px] text-[#DCDDE1]">课程</div>
                <div
                  className={classnames('text-[14px] overflow-hidden', {
                    'w-full': isFocus,
                  })}
                >
                  {editMethod ? (
                    <AutoInput
                      onBlur={() => {
                        setFocus(false);
                      }}
                      onFocus={() => {
                        setFocus(true);
                      }}
                      isisFocus={isFocus}
                      onChange={(value) => {setCourseId(value.id)}}
                      className="w-full"
                    ></AutoInput>
                  ) : (
                    <div className={'text-sm overflow-x-scroll w-14 whitespace-nowrap'} >{data?.course?.subject?.ename?.toUpperCase()} {data?.course?.code}</div>
                  )}
                </div>
              </div>
              {isFocus ? null : (
                <>
                  <div>
                    <div className="text-[10px] text-[#DCDDE1]">学分</div>
                    <div className={'text-sm'}>
                      {editMethod ? (
                        <InputField value={credit} onChange={(value)=>{setCredit(value)}}></InputField>
                      ) : (
                        <div>{data.credit}</div>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#DCDDE1]">成绩</div>
                    <div className={'text-sm'}>
                      {editMethod ? (
                        <InputField
                        value={score}
                        onChange={(value)=>{
                          setScore(value)
                        }}
                        ></InputField>
                      ) : (
                        <div>{data.score}</div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="text-xs flex">
              <div className={'bg-[#F7F8F9] text-[#798195] text-xs px-2'}>
                选修
              </div>
            </div>
          </div>
          {editMethod ? (
            <div className="flex items-center mr-4 space-x-4">
              <GarbageIcon
                onClick={() => {
                  deleteGapItem(data.id);
                }}
              ></GarbageIcon>
              <ConfirmIcon onClick={submitChange}></ConfirmIcon>
            </div>
          ) : (
            <div className="flex items-center mr-4 space-x-4">
              <div className={'text-xl bg-[#F7F8F9] rounded-md px-4'}>
                {data.gpa}
              </div>
              <EditIcon
                onClick={() => {
                  setMethod(true);
                }}
              ></EditIcon>
            </div>
          )}
        </div>
      </div>
    );
  };
  const GapGroup = (props) => {
    const { item, index } = props;
    const colorMap = ['#FF7978', '#FFB87C', '#FED64B', '#E2DAFF'];
    const color = colorMap[index % 4];
    console.log(`bg-[${color}]`, '`bg-[${color}]`');
    console.log(props, 'props');
    const [newCourse, setNewCourse] = React.useState(false);
    console.log(item, 'item');
    const addCourse = () => {
      setNewCourse(true);
    };

    return (
      // return (
      <Accordion key={index} defaultExpanded={index === data?.data.length - 1}>
        <AccordionSummary
          expandIcon={<DownIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="flex items-center"
        >
          <div className={'flex h-7 justify-between w-full items-center'}>
            <div className={'flex items-center space-x-2'}>
              <div
                className={classnames(
                  `w-1 h-[18px]  leading-[18px]  rounded-full `,
                  `bg-[${color}]`,
                )}
              ></div>
              <div className={'text-blueTitle text-sm text-medium'}>
                {/* 2021-2022 秋季 */}
                {item.term.year}-{item.term.year + 1}
                {item.term.name}
              </div>
              <div
                className={`text-white flex items-center justify-center h-[18px] bg-[${color}] text-xs px-2 rounded-sm`}
              >
                {item.term?.totalGpa}
              </div>
            </div>
            <div className="bg-[#F7F8F9] rounded-[4px] flex items-center mr-2 h-[22px] leading-[18px] text-[#A9B0C0] text-[10px] w-18 space-x-2 px-2  justify-center">
              <DeleteIcon></DeleteIcon>
              <div onClick={(e)=>{
                e.preventDefault()
                Toast.fail('当前学期为管理员设置，无法删除')
              }}>删除学期</div>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="space-y-2">
            {item.gradeList.map((item, index) => {
              return <CourseGap data={item} color={color}></CourseGap>;
            })}
            <CSSTransition
              in={newCourse}
              classNames="alert"
              timeout={200}
              key={index}
            >
              <CourseGap
                color={color}
                type={'new'}
                data={item}
                className={classnames({
                  'hidden opacity-0': newCourse === false,
                  'opacity-1 block': newCourse === true,
                })}
                edit={true}
              ></CourseGap>
            </CSSTransition>
            <AddCourseGap
              color={color}
              onClick={() => {
                addCourse();
              }}
            ></AddCourseGap>
            <TotalGap></TotalGap>
          </div>
        </AccordionDetails>
      </Accordion>
      // );
    );
  };
  // if(!data){
  //   return <Loading color="#FED64B" />
  // }
  const dispatch = useDispatch();

  useEffect(() => {
    const campus = router.query.campus;
    // console.log(data,"useEffectdata");
    if (data?.code === 1102 || data?.code === 1101) {
      Dialog.confirm({
        title: '登录',
        message: '登录YoUni，自由添加课表、一键导入学校课程、一键分享给朋友！',
      })
        .then((res) => {
          dispatch(setOpenLogin('login'));
          // router.push("/Login/signin");
          // console.log(res,"登录YoUni");
        })
        .catch((err) => {
          router.push(`/${campus}`);
          //  dispatch(setOpenLogin('register'))
        });
    }
  }, [data]);
  const value = {
    '--value': 70,
  };
  return (
    <div className="min-h-screen pb-20">
      <div className="relative h-[280px] w-full gap-bg pt-4  bg-gradient-to-l to-[#EAE6FF] from-[#ECF5FF] ">
        <Header className="bg-transparent fixed top-0"></Header>
        <div className="absolute p-4 bg-white rounded-full left-8 rotate-220">
          {/* 70为满 */}
          {/* @ts-ignore */}
          <div className="radial-progress text-primary" style={value}>
            <div className="-rotate-220">
              <div className="flex flex-col items-center justify-center">
                {' '}
                <div className="font-medium text-[21px] text-blueTitle -mt-1">
                  {total?.data?.totalGpa || 0.0}
                </div>
                <div className="text-xs font-medium  text-[#A9B0C0] -mt-2">
                  总GPA
                </div>
                <div className="font-light text-10 text-[#A9B0C0] flex justify-between space-x-3 absolute -bottom-4">
                  <div> 0.0</div>
                  <div> 9.0</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#FFB35C] hidden"></div>
        <div className="bg-[#FFB87C] hidden"></div>
        <div className="bg-[#FED64B] hidden"></div>
        <div className="bg-[#E2DAFF] hidden"></div>

        <div className="w-full pt-10 pl-5 pr-5 ">
          <div className="rounded-t-lg pink-linergradient-bg h-14 flex space-x-2 justify-end items-center">
            <div
              className={'bg-[#FFFBD9] text-[#B38314] px-2 rounded-md py-0.5'}
            >
              成绩计算规则
            </div>
            <div
              className={'bg-[#FFFBD9] text-[#B38314] px-2 rounded-md py-0.5'}
            >
              校区政策
            </div>
          </div>
          <div className="h-24 bg-white rounded-b-lg">
            <div className="flex justify-between p-4 space-x-2">
              <CScoreCard
                label="专业GPA"
                score={total?.data?.totalGpa}
              ></CScoreCard>
              <CScoreCard
                label="最近2年GPA"
                score={total?.data?.gpaAvg || 0}
              ></CScoreCard>
              <CScoreCard
                label="已完成学分数"
                score={total?.data?.creditSum}
              ></CScoreCard>
            </div>
          </div>
        </div>
      </div>
      {!data?.data ? (
        <div className="w-full flex justify-center items-center mt-10">
          <Loading color="#FED64B" />
        </div>
      ) : (
        <div className="px-0  ">
          {data?.data?.map((item, index) => {
            return <GapGroup item={item} index={index}></GapGroup>;
          })}

          <div className={'w-full h-12 mt-4'}>
            <div
              className={
                'bg-[#F7F8F9] space-x-2 rounded-lg  mx-5 h-12 text-sm text-[#798195] flex justify-center items-center'
              }
            >
              <Session></Session>
              <div>添加学期</div>
            </div>
          </div>
          {/* <div className={"flex justify-between items-center mb-7 mt-5"}> */}
          {/*   <div className={"flex items-center space-x-2"}> */}
          {/*     <div className={"w-2 h-[14px] bg-[#ff7978] rounded-full "}></div> */}
          {/*     <div className={"text-blueTitle text-sm text-medium"}>2021-2022 秋季</div> */}
          {/*     <div className={"text-white bg-[#FF7978] text-xs px-2 rounded-sm"}>6.67</div> */}
          {/*   </div> */}
          {/*   <div></div> */}
          {/* </div> */}
        </div>
      )}
    </div>
  );
}
