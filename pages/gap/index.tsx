import React from 'react';
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

import useFetch from '../../hooks/useFetch';
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
const CScoreCard = () => {
  return (
    <div className="w-24 h-14">
      <div className="flex items-center justify-center w-full h-8 text-lg font-medium text-center bg-gray-200 rounded-t-lg text-blueTitle">
        3.2
      </div>
      <div className="w-full h-1.2/3 bg-gray-100 text-center text-gray-400">
        内容评分
      </div>
    </div>
  );
};

export default function index() {
  const router = useRouter();
  const { data, error } = useFetch('/grade/list', 'get');
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
    const {color} = props;
    return (
      <div className="relative" onClick={props.onClick}>
        <div className={`bg-[${color}] rounded-full w-3 h-16`}></div>
        <div className="w-full  gap-card-shadow absolute top-0  justify-center items-center bg-white left-2 mr-4  h-16 z-30 flex">
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
  const top100Films = [
    { title: 'AMDS', year: 1994 },
    { title: 'AMDS', year: 1994 },
    { title: 'AMDS', year: 1994 },
    { title: 'AMDS', year: 1994 },
    { title: 'AMDS', year: 1994 },
    { title: 'AMDS', year: 1994 },
    { title: '后台抓取校区数据', year: 1994 },
  ];
  const InputField = () => {
    return (
      <TextField
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
    return (
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        onChange={(event: any, newValue: string | null) => {
          props.change(newValue);
        }}
        placeholder="请输入"
        sx={{
          display: 'block',
          height: 20,
          border: 'none',
          borderRadius: 'none',
          padding: 0,
          outline: 'none',
          boxShadow: 'none',
          '& .MuiAutocomplete-inputRoot': {
            padding: 0,
            width: 40,
            height: 20,
          },
          '.MuiAutocomplete-input': {
            padding: '0 !important',
          },
          '& .MuiAutocomplete-inputRoot.MuiAutocomplete-input': {
            padding: 0,
          },
        }}
        options={top100Films.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            placeholder="请输入"
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
    const {edit,color} = props;

    const [editMethod, setMethod] = React.useState(edit?edit:false);
    const submitChange = () => {
      setMethod(false);
    };
    return (
      <div className={classnames("relative",props.className?props.className:null)}>
        <div className={`bg-[${color}] rounded-full w-3 h-16`}></div>
        <div className="w-full gap-card-shadow absolute top-0   items-center bg-white left-2 mr-4  h-16 z-30 flex justify-between">
          <div className={'mx-4'}>
            <div className="flex items-center space-x-4">
              <div>
                <div className="text-[10px] text-[#DCDDE1]">课程</div>
                <div className={'text-[14px]'}>
                  {editMethod ? (
                    <AutoInput></AutoInput>
                  ) : (
                    <div className={'text-sm'}>AMDS</div>
                  )}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-[#DCDDE1]">学分</div>
                <div className={'text-sm'}>
                  {editMethod ? <InputField></InputField> : <div>3</div>}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-[#DCDDE1]">成绩</div>
                <div className={'text-sm'}>
                  {editMethod ? <InputField></InputField> : <div>3</div>}
                </div>
              </div>
            </div>
            <div className="text-xs flex">
              <div className={'bg-[#F7F8F9] text-[#798195] text-xs px-2'}>
                选修
              </div>
            </div>
          </div>
          {editMethod ? (
            <div className="flex items-center mr-4 space-x-4">
              <GarbageIcon></GarbageIcon>
              <ConfirmIcon onClick={submitChange}></ConfirmIcon>
            </div>
          ) : (
            <div className="flex items-center mr-4 space-x-4">
              <div className={'text-xl bg-[#F7F8F9] rounded-md px-4'}>6.0</div>
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
  const GapGroup = (props)=>{
    const {item,index} = props;
    const colorMap = [
      '#FF7978',
      '#FFB87C','#FED64B','#E2DAFF'
    ]
    const color = colorMap[index % 4];
    console.log(`bg-[${color}]`,"`bg-[${color}]`")
    console.log(props,"props")
    const [newCourse, setNewCourse] = React.useState(false);
      console.log(item, 'item');
      const addCourse = () => {
        setNewCourse(true);
      };

    return (
      // return (
        <Accordion
          key={index}
          defaultExpanded={index === data?.data.length - 1}
        >
          <AccordionSummary
            expandIcon={<DownIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className="flex items-center"
          >
            <div className={'flex h-7 justify-between w-full items-center'}>
              <div className={'flex items-center space-x-2'}>
                <div
                  className={classnames(`w-1 h-[18px]  leading-[18px]  rounded-full `,
                  `bg-[${color}]`
                )}
                ></div>
                <div className={'text-blueTitle text-sm text-medium'}>
                  {/* 2021-2022 秋季 */}
                  {item.term.year}-{item.term.year + 1}
                  {item.term.name}
                </div>
                <div
                  className={
                    `text-white flex items-center justify-center h-[18px] bg-[${color}] text-xs px-2 rounded-sm`
                  }
                >
                  6.67
                </div>
              </div>
              <div className="bg-[#F7F8F9] rounded-[4px] flex items-center mr-2 h-[22px] leading-[18px] text-[#A9B0C0] text-[10px] w-18 space-x-2 px-2  justify-center">
                <DeleteIcon></DeleteIcon>
                <div>删除学期</div>
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="space-y-2">
              {item.gradeList.map((item, index) => {
                return <CourseGap color={color}></CourseGap>;
              })}
              <CSSTransition in={newCourse} classNames="alert" timeout={200} key={index} >
              <CourseGap color={color} className={classnames({'hidden opacity-0':newCourse===false,
               'opacity-1 block':newCourse===true})} edit={true}></CourseGap>
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
    )
  }
  return (
    <div>
      <div className="relative h-[280px] w-full gap-bg pt-4  bg-gradient-to-l to-[#EAE6FF] from-[#ECF5FF] ">
        <Header className="bg-transparent fixed top-0"></Header>
        <div className="absolute p-4 bg-white rounded-full left-8 rotate-220">
          {/* @ts-ignore */}
          <div
            className="radial-progress text-primary"
            style={{ '--value': 70 }}
          >
            <div className="-rotate-220">
              <div className="flex flex-col items-center justify-center">
                {' '}
                <div className="font-medium text-[21px] text-blueTitle">
                  7.9
                </div>
                <div className="text-xs font-medium  text-[#A9B0C0]">总GPA</div>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-[#FFB35C] hidden'></div>
        <div className='bg-[#FFB87C] hidden'></div>
        <div className='bg-[#FED64B] hidden'></div>
        <div className='bg-[#E2DAFF] hidden'></div>

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
            <div className="flex justify-between p-4">
              <CScoreCard></CScoreCard>
              <CScoreCard></CScoreCard>
              <CScoreCard></CScoreCard>
            </div>
          </div>
        </div>
      </div>
      <div className="px-0  ">
        {data?.data.map((item, index) => {
          return (
            <GapGroup  item={item} index={index}></GapGroup>
          )
        })}

        <div className={'w-full h-12 '}>
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
    </div>
  );
}
