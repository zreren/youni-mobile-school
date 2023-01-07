import React,{useCallback} from 'react';
import backgroundImage1 from './assets/background2.png';
import backgroundImage2 from './assets/1.png';
import Image from 'next/image';
import Logo from './assets/logo.png';
import Button from '@mui/material/Button';
import WeChat from './assets/wechat.svg';
import CommonLayout from '@/components/Layout/CommonLayout';
// @ts-ignore
import Youni from './assets/youni.svg';
import Wechat from './assets/wechatlogin.svg';
import Google from './assets/google.svg';
import Stroke from "./assets/stroke.svg";
import classnames from 'classnames';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthState, setAuthState } from '@/stores/authSlice';
import { Router, useRouter } from 'next/router';
import InputLabel from '@mui/material/InputLabel';
import useFetch from '@/hooks/useFetch';
import axios from 'axios';
import useSWR from 'swr';
import prefixSorted from "../../libs/phone";
import useLocalStorage from '@/hooks/useStore';
import instance from '@/libs/request';


export default function SignIn(props) {
  const [myItem, setMyItem] = useLocalStorage('token', null);
  const route = useRouter();

  const login = async (way:string,form:any) =>{
      const { data } = await instance.post(
        `/api/student/password_login` ,{
          account:form.mail,
          password:form.password
        },
      )
    console.log(data,"data")
    if(data.code === 200){
      setMyItem(data.data.token)
      route.push("/Profile")
    }
  }

  const SignUpButton = (props) => {
    const { title, icon: Icon, label } = props;
    return (
      <div className="z-50 flex items-center justify-between h-12 p-4 rounded-xl bg-bg">
        <div className="z-50 flex items-center space-x-2">
          <Icon></Icon>
          <div className="text-xs font-medium text-userColor">{label}</div>
        </div>
        <div>
          <Stroke></Stroke>
        </div>
      </div>
    );
  };
  const SelectSignUpWay = (props) => {
    return (
      <div className="z-10 flex flex-col w-full mt-11">
        {/* <Image src={Logo} alt=""></Image> */}
        <div className="z-10 pl-8 pr-8 text-2xl">Sign in for YoUni</div>
        <div className="z-10 pl-8 pr-8 mb-20 text-md">
          Create a profile to unlock full functions.
        </div>
        <div>
          <div className="absolute z-0 w-full top-32">
            <Image
              className="absolute z-0 w-10 h-10 opacity-80"
              src={backgroundImage2}
              alt="Picture of the author"
            />
          </div>
        </div>
        <div className="w-full h-44"></div>
        <div
          className="z-20 h-screen pt-4 pl-8 pr-8 space-y-4 bg-white-mask"
          onClick={() => {
            props.setProgress(1);
          }}
        >
          <SignUpButton
            icon={Youni}
            label="Use phone or school email"
          ></SignUpButton>
          <SignUpButton icon={Google} label="Continue with Google"></SignUpButton>
          <SignUpButton
            icon={Wechat}
            label="Continue with WeChat/Weixin"
          ></SignUpButton>
        </div>
        <div className="absolute bottom-0 z-30 w-full">
          <div className="w-full h-full p-10 pt-2 pb-2 text-xs text-center text-gray-300 bg-white">
            By continuing, you agree to our{' '}
            <Link href="">
              <span className="text-[#3665FF]">Term of Service</span>
            </Link>{' '}
            and acknowledge that you have read our{' '}
            <Link href="">
              <span className="text-[#3665FF]">Privacy Policy</span>
            </Link>{' '}
            to learn how we collect, use and share your data.
          </div>
          <div className="h-24 pt-8 space-x-2 text-sm text-center bg-bg">
            <span className="text-blueTitle">Don’t have an account? </span>
            <Link href="./signup">
              <span className="text-[#FFD036]"> Sign up</span>
            </Link>{' '}
          </div>
        </div>
        {/* <Button variant="outlined" startIcon={<WeChat />}>
      Delete
    </Button> */}
      </div>
    );
  };
  const SelectLanguage = (props) => {
    return (
      <div
        className="z-10 flex flex-col w-full h-screen -appear in mt-11"
        onClick={() => {
          props.setProgress(2);
        }}
      >
        {/* <Image src={Logo} alt=""></Image> */}
        <div className="z-10 pl-8 pr-8 text-2xl">Select Language</div>
        <div className="z-10 pl-8 pr-8 mb-20 text-md">
          Choose the language you speak most often. Changing this selection is
          possible at any time.
        </div>
        <div>
          <div className="absolute z-0 w-full top-32">
            {/* <Image
              className="absolute z-0 w-10 h-10 opacity-80"
              src={backgroundImage2}
              alt="Picture of the author"
            /> */}
          </div>
        </div>
        <div className="w-full h-22"></div>
        <div className="p-4 space-y-10">
          <div className="flex items-center justify-center w-full h-32 text-xl rounded flex-2xl bg-bg">
            EngLish
          </div>
          <div className="flex items-center justify-center w-full h-32 text-xl rounded flex-2xl bg-bg">
            中文
          </div>
        </div>
        {/* <Button variant="outlined" startIcon={<WeChat />}>
      Delete
    </Button> */}
      </div>
    );
  };
  const ChooseYourRole = (props) => {

    const MailLabel = () => {
      const [form, setForm] = useState({
        mail: '',
        password: '',
      })
      const handleChange = useCallback((val: any, name: string) => {
        setForm((preVal: any) => {
          return {
            ...preVal,
            [name]: val
          };
        });
      }, []);
      return (
        <div className="h-screen space-y-4">
          <div className="flex items-center w-full">
            <input
              type="text"
              placeholder="School email address"
              className="w-full input"
              value={form.mail}
              onChange={(e) => {handleChange(e.target.value,"mail")}}
            />
            {/* <div>{'>'}</div> */}
          </div>
          <div className="w-full">
            <input
              type="password"
              value={form.password}
              onChange={(e) => {handleChange(e.target.value,"password")}}
              placeholder="Password"
              className="w-full input"
            />
          </div>
          <div className="mb-10 pl-4 text-xs text-gray-300">Forgot Password?</div>
          <button
            onClick={()=>{login("mail",form)}}
            className={classnames("w-full bg-[#F7F8F9] text-[#A9B0C0] border-0 rounded-full btn",
            {"bg-yellow-400 text-[#8C6008]":form.mail.length > 1 && form.password.length > 1})}
          >
            Log in
          </button>
        </div>
      );
    };
    const PhoneLabel = () => {
      const [age, setAge] = React.useState('86');
      const [phoneNumber, setPhoneNumber] = useState('');
      const [school, setSchool] = useState('University of York1');
      const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
      };
      return (
        <div className="h-screen space-y-4">
          {/* <div className="flex items-center w-full">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              className="w-full"
              value={school}
              sx={{
                boxShadow: 'none',
                '.MuiOutlinedInput-notchedOutline': { border: 0 },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: 0,
                  'border-width': 0,
                  'border-color': 'transparent',
                },
              }}
              label="select school"
              onChange={(e) => {
                setSchool(e.target.value);
              }}
            >
              <MenuItem value={'University of York1'}>
                University of York
              </MenuItem>
              <MenuItem value={'University of York2'}>
                University of York
              </MenuItem>
              <MenuItem value={'University of York3'}>
                University of York
              </MenuItem>
            </Select>
          </div> */}
          <div className="w-full">
            <label className="flex items-center input-group">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                sx={{
                  boxShadow: 'none',
                  '.MuiOutlinedInput-notchedOutline': { border: 0 },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    border: 0,
                    'border-width': 0,
                    'border-color': 'transparent',
                  },
                }}
                disableUnderline
                label="Age"
                onChange={handleChange}
              >
                  {prefixSorted.map((item)=>{
                      return (<MenuItem value={item.prefix}>+{item.prefix}</MenuItem>)
                  })}
              </Select>
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full input hover:outline-none"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
            </label>
          </div>
          <div className="h-[1px] bg-[#EAEBEC] w-full"></div>
          {/* <div className="mb-10 text-xs text-gray-300">
            Your phone number will be used to improve your YoUni experience,
            including connecting you with people you may know, personalizing your
            ads experience, and more. If you sign up with SMS, SMS fees may apply.
            <Link href="#">
              <div className="text-blue-400">Learn more</div>
            </Link>
          </div> */}
          <button
            onClick={() => {
              phoneNumber.length > 5 && school.length
                ? route.push('./valid')
                : null;
            }}
            className={classnames(
              'w-full bg-[#F7F8F9] text-[#A9B0C0]  text-[16px] font-medium border-0 rounded-full btn hover:bg-gray-300',
              {
                'bg-yellow-400 text-[#8C6008]':
                  phoneNumber.length > 5 && school.length,
              },
            )}
          >
            Send Code
          </button>
        </div>
      );
    };
    const list = [PhoneLabel, MailLabel];
    const [label, setLabel] = useState(0);
    const Node = list[label];
    return (
      <div className="z-10 flex flex-col w-full h-full overflow-hidden transition mt-11">
        {/* <Image src={Logo} alt=""></Image> */}
        {/* <CSSTransition classNames="title" timeout={1000}> */}
        <div className="z-10 h-20">
          <div className="z-10 pl-8 pr-8 text-2xl title">Sign in</div>
          <div className="z-10 pl-8 pr-8 text-sm text-md title text-userColor">
            Login using your preferred method
          </div>
        </div>
        {/* </CSSTransition> */}
        {/* <div className="z-10 flex w-full p-8 space-x-4">
          <div
            className="flex flex-col items-center w-full space-y-4"
            onClick={() => {
              props.selectRole('Student');
            }}
          >
            <div
              className={classnames('w-full h-20 bg-white border-2  rounded-xl', {
                'border-yellow-300': props.role === 'Student',
              })}
            ></div>
            <div className="text-gray-400">Student</div>
          </div>
          <div
            className="flex flex-col items-center w-full space-y-4"
            onClick={() => {
              props.selectRole('Graduated');
            }}
          >
            <div
              className={classnames('w-full h-20 bg-white border-2  rounded-xl', {
                'border-yellow-300': props.role === 'Graduated',
              })}
            ></div>
            <div className="text-gray-400">Graduated</div>
          </div>
        </div> */}
        <div className="w-full h-22"></div>
        <div className="z-30 h-full p-4 space-y-10 bg-white border-t border-yellow-300 rounded-t-3xl">
          <div className="flex items-center justify-around h-10 rounded-xl bg-bg">
            <div
              onClick={() => {
                setLabel(0);
              }}
              className={classnames('w-2/5 h-4/5  flex items-center justify-center text-center', {
                'bg-white text-[#FFD036] rounded-lg': label === 0,
                'text-[#798195]':label !== 0
              })}
            >
              Phone
            </div>
            <div
              onClick={() => {
                setLabel(1);
              }}
              className={classnames('w-2/5 h-4/5 flex items-center justify-center text-center', {
                'bg-white text-[#FFD036] rounded-lg': label === 1,
                'text-[#798195]':label !== 1
              })}
            >
              Email
            </div>
          </div>
          <SwitchTransition mode="out-in">
            <CSSTransition classNames="btn" timeout={200} key={label}>
              <Node></Node>
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
    );
  };
  const [progress, setProgress] = useState(0);
  const [role, selectRole] = useState('Student');
  const ProgressList = [SelectSignUpWay, ChooseYourRole, SelectLanguage];
  const Node = ProgressList[progress];
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(setAuthState(false));
  }, []);


  return (
    <div className="relative w-full h-screen overflow-hidden bg-fixed">
      <div className="absolute inset-0 z-0 w-full -top-24">
        <Image
          className="z-0 h-full"
          layout="fill"
          src={backgroundImage1}
          alt="Picture of the author"
        />
      </div>
      <div>
        <SwitchTransition mode="out-in">
          <CSSTransition classNames="btn" timeout={260} key={progress}>
            {
              <Node
                setProgress={(val) => {
                  setProgress(val);
                }}
                role={role}
                selectRole={selectRole}
              ></Node>
            }
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
}
