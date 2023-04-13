import React, { useCallback, useEffect } from 'react';
import backgroundImage1 from './assets/background2.png';
import backgroundImage2 from './assets/1.png';
import Image from 'next/image';
import Logo from './assets/logo.png';
import Forget from './forget';
import Button from '@mui/material/Button';
import WeChat from './assets/wechat.svg';
import CommonLayout from '@/components/Layout/CommonLayout';
// @ts-ignore
import Youni from './assets/youni.svg';
import Wechat from './assets/wechatlogin.svg';
import Google from './assets/google.svg';
import Stroke from './assets/stroke.svg';
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
import prefixSorted from '../../libs/phone';
import useLocalStorage from '@/hooks/useStore';
import useRequest from '@/libs/request';
import { Popup, Toast } from 'react-vant';
import { setOpenLogin } from '../../stores/authSlice';
import SignUp from './signup';
import ReSetPasswordEmail from './reSetPasswordEmail';
import ReturnBackIcon from './returnBack.svg';
import LOGINI18N from '@/language/login';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// import { useDispatch } from 'react-redux';

export default function SignIn(props) {
  const [myItem, setMyItem] = useLocalStorage('token', null);
  const [lang] = useLocalStorage('language', null);
  const { t, i18n } = useTranslation();
  const route = useRouter();

  // const dispatch = useDispatch();
  const dispatch = useDispatch();
  const login = async (way: string, form: any) => {
    try {
      const { data } = await useRequest.post(`/api/auth/password_login`, {
        account: form.mail,
        password: form.password,
      });
      console.log(data, 'data');
      if (data.code === 200) {
        if (data.data.token) {
          Toast.success(t('登录成功'));
          setMyItem(data.data.token);
          route.push('/Profile', undefined, { shallow: true });
          route.reload();
          dispatch(setOpenLogin('close'));
        }
      } else {
        Toast.fail(`${t('登录失败')}`);
      }
    } catch (error) {
      Toast.fail(`${t('登录失败')}`);
    }
  };

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
  useEffect(() => {
    console.log(i18n.language, 'i18n.language');
  }, []);
  const ChooseYourRole = (props) => {
    const MailLabel = () => {
      const [visible, setVisible] = useState(false);
      const [form, setForm] = useState({
        mail: '',
        password: '',
      });
      const handleChange = useCallback((val: any, name: string) => {
        setForm((preVal: any) => {
          return {
            ...preVal,
            [name]: val,
          };
        });
      }, []);

      return (
        <div className="h-screen space-y-4 bottom-footer-theTop ">
          <Popup
            overlayClass={'Popup'}
            overlay={true}
            className="z-30 bottom-footer-theTop w-4/5 rounded-2xl shadow"
            visible={visible}
            onClose={() => setVisible(false)}
          >
            <div className="h-[232px] flex flex-col  items-center">
              <div className="pt-4  pb-4 text-[#37455C] ">
                <div className="z-10 pl-8 pr-8 text-sm">
                  {t('Reset password with')}
                </div>
              </div>
              {/* <div> */}
              <div
                onClick={() => {
                  setProgress(2);
                }}
                className="py-4 text-[#798195]"
              >
                {t('Phone number')}
                {/* Phone number */}
              </div>
              <div
                onClick={() => {
                  setProgress(3);
                }}
                className="py-4 text-[#798195]"
              >
                {t('邮件')}
              </div>
              <div
                onClick={() => setVisible(false)}
                className="py-4 text-[#A9B0C0]"
              >
                {t('取消')}
              </div>
              {/* </div> */}
            </div>
          </Popup>
          <div className="flex items-center w-full">
            <input
              type="text"
              placeholder="School email address"
              className="w-full input"
              value={form.mail}
              onChange={(e) => {
                handleChange(e.target.value, 'mail');
              }}
            />
            {/* <div>{'>'}</div> */}
          </div>
          <div className="w-full">
            <input
              type="password"
              value={form.password}
              onChange={(e) => {
                handleChange(e.target.value, 'password');
              }}
              placeholder="Password"
              className="w-full input"
            />
          </div>
          <div
            onClick={() => {
              setVisible(true);
            }}
            className="mb-10 pl-4 text-xs text-gray-300"
          >
            {t('忘记密码')}
          </div>
          <button
            onClick={() => {
              login('mail', form);
            }}
            className={classnames(
              'w-full bg-[#F7F8F9]  border-0 rounded-full btn',
              {
                'bg-yellow-400 hover:bg-yellow-400 text-[#8C6008]':
                  form.mail.length > 1 && form.password.length > 1,
              },
              {
                'bg-[#F7F8F9] hover:bg-[#F7F8F9] text-[#798195]':
                  form.mail.length <= 1 && form.password.length <= 1,
              },
            )}
          >
            {t('登录')}
          </button>
        </div>
      );
    };
    const PhoneLabel = () => {
      const [age, setAge] = React.useState('1');
      const [phoneNumber, setPhoneNumber] = useState('');
      const [password, setPassword] = useState('');
      const [loginWay, setLoginWay] = useState('code');
      const [school, setSchool] = useState('University of York1');
      const [visible, setVisible] = useState(false);

      const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
      };
      return (
        <div className="h-screen space-y-4">
          <Popup
            overlayClass={'Popup'}
            overlay={true}
            className="z-30 bottom-footer-theTop w-4/5 rounded-2xl shadow"
            visible={visible}
            onClose={() => setVisible(false)}
          >
            <div className="h-[232px] flex flex-col  items-center">
              <div className="pt-4  pb-4 text-[#37455C] ">{t('重设密码')}</div>
              <div
                onClick={() => {
                  setProgress(2);
                }}
                className="py-4 text-[#798195]"
              >
                {t('手机号码')}
              </div>
              <div
                onClick={() => {
                  setProgress(3);
                }}
                className="py-4 text-[#798195]"
              >
                {t('邮件')}
              </div>
              <div
                onClick={() => setVisible(false)}
                className="py-4 text-[#A9B0C0]"
              >
                {t('取消')}
              </div>
            </div>
          </Popup>
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
            <label className="flex items-center input-group bottomPlusx">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                sx={{
                  zIndex: 9999,
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
                {prefixSorted.map((item) => {
                  return (
                    <MenuItem
                      className="bottomPlusx"
                      sx={{ zIndex: 999999999 }}
                      value={item.prefix}
                    >
                      +{item.prefix}
                    </MenuItem>
                  );
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
          {loginWay === 'password' && (
            <div className="w-full">
              <input
                type="password"
                placeholder="Password"
                className="w-full input hover:outline-none"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          )}
          <div className="h-[1px] bg-[#EAEBEC] w-full"></div>
          {/* <div className="mb-10 text-xs text-gray-300">
            Your phone number will be used to improve your YoUni experience,
            including connecting you with people you may know, personalizing your
            ads experience, and more. If you sign up with SMS, SMS fees may apply.
            <Link href="#">
              <div className="text-blue-400">Learn more</div>
            </Link>
          </div> */}
          <div className="flex justify-between">
            <div
              onClick={() => {
                setVisible(true);
              }}
              className="pl-4 text-xs text-gray-300"
            >
              {t('忘记密码')}
            </div>
            <div
              onClick={() => {
                setLoginWay((pre) => (pre === 'code' ? 'password' : 'code'));
              }}
              className=" pl-4 text-xs text-gray-300"
            >
              {loginWay === 'code' ? t('使用密码登录') : t('使用验证码登录')}
            </div>
          </div>
          <button
            onClick={async () => {
              if (loginWay === 'password') {
                const { data } = await useRequest.post(
                  '/api/auth/password_login',
                  {
                    account: `+${age}${phoneNumber}`,
                    password: password,
                  },
                );
                if (data.code === 200) {
                  if (data.data.token) {
                    Toast.success('登录成功');
                    setMyItem(data.data.token);
                    route.push('/Profile', undefined, { shallow: true });
                    route.reload();
                    dispatch(setOpenLogin('close'));
                  }
                } else {
                  Toast.fail(`登录失败${data.message}`);
                }
                return;
              }
              phoneNumber.length > 5 && school.length
                ? route.push({
                    pathname: './Login/valid',
                    query: {
                      signIn: true,
                      phoneNumber: phoneNumber,
                      prefix: age,
                    },
                  })
                : null;
              dispatch(setOpenLogin('close'));
            }}
            className={classnames(
              'w-full bg-[#F7F8F9] text-[#A9B0C0]  text-[16px] font-medium border-0 rounded-full btn hover:bg-gray-300',
              {
                'bg-yellow-400 text-[#8C6008]':
                  phoneNumber.length > 5 && school.length,
              },
            )}
          >
            {loginWay === 'code' ? 'Send Code' : 'Login'}
          </button>
        </div>
      );
    };
    const list = [PhoneLabel, MailLabel];
    const [label, setLabel] = useState(0);
    const Node = list[label];
    return (
      <div className="z-10 flex flex-col w-full h-full overflow-hidden transition mt-5">
        <div
          onClick={() => {
            props.setProgress(0);
          }}
          className="pl-4 mb-6"
        >
          <ReturnBackIcon className=""></ReturnBackIcon>
        </div>
        {/* <Image src={Logo} alt=""></Image> */}
        {/* <CSSTransition classNames="title" timeout={1000}> */}
        <div className="z-10 h-20">
          <div className="z-10 pl-8 pr-8 text-2xl title">{t('登录')}</div>
          <div className="z-10 pl-8 pr-8 text-sm text-md title text-userColor">
            {t('使用您喜欢的方式登录')}
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
          <div className="flex items-center px-1 justify-around h-10 rounded-xl bg-bg">
            <div
              onClick={() => {
                setLabel(0);
              }}
              className={classnames(
                'w-full h-4/5  flex items-center justify-center text-center',
                {
                  'bg-white text-[#FFD036] rounded-lg': label === 0,
                  'text-[#798195]': label !== 0,
                },
              )}
            >
              {t('手机号码')}
            </div>
            <div
              onClick={() => {
                setLabel(1);
              }}
              className={classnames(
                'w-full h-4/5 flex items-center justify-center text-center',
                {
                  'bg-white text-[#FFD036] rounded-lg': label === 1,
                  'text-[#798195]': label !== 1,
                },
              )}
            >
              {t('邮件')}
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
  const [isLogin, setLogin] = useState(false);
  const SelectSignUpWay = (props) => {
    return (
      <div className="z-10 flex flex-col w-full mt-11">
        {/* <Image src={Logo} alt=""></Image> */}
        <div className="z-10 pl-8 pr-8 text-2xl">{t('登录YoUni')}</div>
        <div className="z-10 pl-8 pr-8 mb-20 text-md">
          {t('认证以解锁所有功能')}
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
        <div className="absolute bottom-0">
          <div
            className="z-20 h-[290px] pt-4 pl-8 pr-8 space-y-4 bg-white-mask"
            onClick={() => {
              props.setProgress(1);
            }}
          >
            <SignUpButton
              icon={Youni}
              label={t('使用手机或学校邮箱')}
            ></SignUpButton>
            <SignUpButton
              icon={Google}
              label={t('使用Google账号')}
            ></SignUpButton>
            <SignUpButton icon={Wechat} label={t('使用微信')}></SignUpButton>
          </div>
          <div className="bottom-0 z-30 w-full">
            <div className="w-full h-full p-10 pt-2 pb-2 text-xs text-center text-gray-300 bg-white">
              {t('继续即表示同意我们的')}
              <Link href="">
                <span className="text-[#3665FF]">{t('服务条款')}</span>
              </Link>{' '}
              {t('并确认您已阅读我们的')}
              <Link href="">
                <span className="text-[#3665FF]">{t('隐私政策')}</span>
              </Link>{' '}
              {t('了解我们如何收集、使用和分享您的数据。')}
            </div>
            <div className="h-32 pt-8 pb-8 space-x-2 text-sm text-center bg-bg">
              <span className="text-blueTitle">{t('还没有帐号？')}</span>
              <span
                onClick={() => {
                  dispatch(setOpenLogin('register'));
                }}
              >
                <span className="text-[#FFD036]">{t('注册')}</span>
              </span>{' '}
            </div>
          </div>
        </div>
        {/* <Button variant="outlined" startIcon={<WeChat />}>
      Delete
    </Button> */}
      </div>
    );
  };
  const [progress, setProgress] = useState(0);
  const [role, selectRole] = useState('Student');
  const ProgressList = [
    SelectSignUpWay,
    ChooseYourRole,
    Forget,
    ReSetPasswordEmail,
  ];
  const Node = ProgressList[progress];
  React.useEffect(() => {
    dispatch(setAuthState(false));
  }, []);

  return (
    <div className="w-full h-full">
      {isLogin ? (
        <SignUp
          isLogin={() => {
            setLogin(false);
          }}
        ></SignUp>
      ) : (
        <div className="relative w-full h-full overflow-hidden bg-fixed">
          <div className="absolute inset-0 z-0 bgIndex w-full -top-24">
            <Image
              className="z-0 h-full"
              layout="fill"
              src={backgroundImage1}
              alt="Picture of the author"
            />
          </div>
          <div className="z-30 w-full">
            <SwitchTransition mode="out-in">
              <CSSTransition classNames="btn" timeout={260} key={progress}>
                {
                  <Node
                    setProgress={(val) => {
                      setProgress(val);
                    }}
                    role={role}
                    selectRole={selectRole}
                    returnClick={() => {
                      setProgress(progress - 1);
                    }}
                  ></Node>
                }
              </CSSTransition>
            </SwitchTransition>
          </div>
        </div>
      )}
    </div>
  );
}

export async function getStaticProps({ locale }) {
  console.log(locale, 'locale');
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  };
}
