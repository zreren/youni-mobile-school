import React, { useCallback, useEffect } from 'react';
import backgroundImage1 from './assets/background2.png';
import backgroundImage2 from './assets/1.png';
import Image from 'next/image';
import Logo from './assets/logo.png';
import Button from '@mui/material/Button';
import WeChat from './assets/wechat.svg';
import CommonLayout from '@/components/Layout/CommonLayout';
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
import { Picker, Field } from 'react-vant';
import Link from 'next/link';
import useFetch from '@/hooks/useFetch';
import { Router, useRouter } from 'next/router';
import InputLabel from '@mui/material/InputLabel';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoginModelState, seLoginModelState } from '@/stores/authSlice';
import prefixSorted from '../../libs/phone';
import { setOpenLogin } from '../../stores/authSlice';
import useRequest from '@/libs/request';
// import { useDispatch } from 'react-redux';
import SignIn from './signin';
import ReturnBackIcon from './returnBack.svg';
import { disableZoom } from '@/libs/disableZoom';
import { enableZoom } from '@/libs/enableZoom';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useLocalStorage } from 'react-use';

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

export default function SignUp(props) {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [language, setLanguage] = useState('');
  const [lang, setLang] = useLocalStorage('language', null);

  const { t } = useTranslation();
  useEffect(() => {
    disableZoom();
    return () => {
      enableZoom();
    };
  }, []);

  const ChooseYourRole = (props) => {
    const route = useRouter();
    const MailLabel = () => {
      const [mail, setMail] = useState('');
      const [school, setSelectSchool] = useState({
        id: 1,
        mail: '',
      });
      const CPicker = useCallback(
        (props) => {
          const { data: schoolList } = useFetch('/campus/query', 'get');
          const [loading, setLoading] = React.useState(false);
          const [value, setValue] = React.useState<string[]>();
          const mailList = React.useMemo(() => {
            return schoolList?.data.filter((item) => {
              return item.id === value;
            })[0];
          }, [value]);

          // React.useEffect(() => {
          //   console.log(value, 'value');
          //   if (!props) return;
          //   props?.change(value, mailList?.email);
          // }, [value]);
          return (
            <div className="bottom-footer-theTop2">
              <Picker
                popup={{
                  round: true,
                }}
                value={value}
                title={props.placeholder}
                columns={schoolList?.data}
                onConfirm={setValue}
                visibleItemCount={8}
                onChange={setValue}
                columnsFieldNames={{ text: 'ename', value: 'id' }}
                optionRender={(option: any) => {
                  // console.log(option,"option")
                  if (!option.alias) return null;
                  return (
                    <div className="flex space-x-1">
                      <div>{option.cname}</div>
                      <div>|</div>
                      <div>{option.ename}</div>
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
                      value={_?.ename || ''}
                      className="text-lg"
                      placeholder={props.placeholder}
                      onClick={() => actions.open()}
                    />
                  );
                }}
              </Picker>
            </div>
          );
        },
        [school],
      );
      const sendCode = () => {
        useRequest.post('/api/send_email_code', {
          email: mail,
        });
        route.push({
          pathname: '/Login/valid',
          query: {
            mail: mail,
            campusId: school.id,
            roleId: role,
            lang: language,
          },
        });
        dispatch(setOpenLogin('close'));
      };
      return (
        <div className="h-screen space-y-4">
          <div className="flex items-center w-full topIndexPlus">
            <CPicker
              placeholder={t('select your university')}
              change={(val, mail) => {
                setSelectSchool({
                  id: val,
                  mail: mail,
                });
              }}
            ></CPicker>
          </div>
          <div className="w-full">
            <input
              // onChange={(e) => {
              //   setMail(e.target.value);
              // }}
              value={mail}
              onChange={(e) => {
                setMail(e.target.value);
              }}
              type="text"
              placeholder={t('please enter your email')}
              className="w-full input"
            />
          </div>
          <div className="mb-10 text-xs text-gray-300">
            {t('继续即表示同意YoUni的服务条款并确认已阅读我们的隐私政策')}
          </div>
          <button
            onClick={() => {
              if (!(mail && school?.id)) return;
              sendCode();
            }}
            className={classnames('w-full  border-0 rounded-full btn', {
              'bg-yellow-400': mail && school?.id,
              'bg-gray-400': !(mail && school?.id),
            })}
          >
            {t('Next')}
          </button>
        </div>
      );
    };
    const PhoneLabel = () => {
      const [age, setAge] = React.useState('86');
      const [phoneNumber, setPhoneNumber] = useState('');
      const [school, setSchool] = useState('University of York1');
      const sendCode = () => {
        route.push({
          pathname: '/Login/valid',
          query: {
            phoneNumber: phoneNumber,
            prefix: age,
            roleId: role,
            lang: language,
          },
        });
        dispatch(setOpenLogin('close'));
      };
      const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
      };
      return (
        <div className="h-screen space-y-4">
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
                {prefixSorted.map((item) => {
                  return (
                    <MenuItem value={item.prefix}>+{item.prefix}</MenuItem>
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
          <div className="mb-10 text-xs text-gray-300">
            {t(
              '我们会使用您的手机号码来改善您的YoUni体验，包括为您推荐您可能认识的人、个性化广告体验等。如果您使用短信注册，可能会产生短信费用。',
            )}
            <Link href="#">
              <div className="text-blue-400">{t('了解更多')}</div>
            </Link>
          </div>
          <button
            onClick={() => {
              phoneNumber.length > 5 ? sendCode() : null;
            }}
            className={classnames(
              'w-full  border-0 rounded-full btn hover:bg-gray-300',
              {
                'bg-yellow-400': phoneNumber.length > 5,
                'bg-gray-400': phoneNumber.length <= 5,
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
    const Node = React.useMemo(() => list[label], [label]);
    return (
      <div className="z-10 flex flex-col w-full h-full overflow-hidden transition mt-11">
        <div
          onClick={() => {
            props.setProgress(1);
          }}
          className="pl-4 z-30 mb-6"
        >
          <ReturnBackIcon className=""></ReturnBackIcon>
        </div>
        {/* <Image src={Logo} alt=""></Image> */}
        {/* <CSSTransition classNames="title" timeout={1000}> */}
        <div className="z-10 pl-8 pr-8 text-2xl title">{t('选择您的角色')}</div>
        <div className="z-10 pl-8 pr-8 text-md title">
          {t('选择最适合您的角色。')}
        </div>
        {/* </CSSTransition> */}
        <div className="z-10 flex w-full p-8 space-x-4">
          <div
            className="flex  flex-col items-center w-full space-y-4"
            onClick={() => {
              props.selectRole('Student');
            }}
          >
            <div
              className={classnames(
                'w-full h-20 bg-white border-2  rounded-xl',
                {
                  'border-yellow-300': props.role === 'Student',
                },
              )}
            ></div>
            <div className="text-gray-400">{t('学生')}</div>
          </div>
          <div
            className="flex flex-col items-center w-full space-y-4"
            onClick={() => {
              props.selectRole('Graduated');
              setLabel(0);
            }}
          >
            <div
              className={classnames(
                'w-full h-20 bg-white border-2  rounded-xl',
                {
                  'border-yellow-300': props.role === 'Graduated',
                },
              )}
            ></div>
            <div className="text-gray-400">{t('毕业生')}</div>
          </div>
        </div>
        <div className="w-full h-22"></div>
        <div className="z-30 h-full p-4 space-y-10 bg-white border-t border-yellow-300 rounded-t-3xl">
          <div className="flex  items-center justify-around h-10 rounded-xl bg-bg">
            <div
              onClick={() => {
                setLabel(0);
              }}
              className={classnames(
                'w-full font-medium h-8  mx-1 flex justify-center items-center',
                {
                  'bg-white  text-yellow-300 rounded-lg': label === 0,
                  'text-[#798195]': label !== 0,
                },
              )}
            >
              Phone
            </div>
            {props.role === 'Student' ? (
              <div
                onClick={() => {
                  setLabel(1);
                }}
                className={classnames(
                  'w-full font-medium  h-8  mx-1 flex justify-center items-center',
                  {
                    'bg-white text-yellow-300 rounded-lg': label === 1,
                    'text-[#798195]': label !== 1,
                  },
                )}
              >
                School Email
              </div>
            ) : null}
          </div>
          <Node></Node>
        </div>
      </div>
    );
  };
  const router = useRouter();

  const SelectLanguage = (props) => {
    useEffect(() => {
      if (router.locale === 'cn') {
        // props?.setProgress(2);
      }
    }, [router]);
    return (
      <div className="z-10 flex flex-col w-full h-screen -appear in mt-11">
        <div
          onClick={() => {
            props.setProgress(0);
          }}
          className="pl-4 mb-6 z-30"
        >
          <ReturnBackIcon className=""></ReturnBackIcon>
        </div>
        {/* <Image src={Logo} alt=""></Image> */}
        <div className="z-10 pl-8 pr-8 text-2xl">{t('Select Language')}</div>
        <div className="z-10 pl-8 pr-8 mb-10 text-sm text-md text-userColor">
          {t('选择您最常使用的语言。您可以随时更改此选择。')}
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
        <div className="w-full h-12"></div>
        <div className="z-30 h-full p-4 space-y-10 bg-white-mask">
          <div
            onClick={() => {
              console.log(router.locale, 'language');
              if (router.locale === 'cn') {
                router.push(router.asPath, router.asPath, { locale: 'en' });
                props.setProgress(2);
                // setLanguage('en');
                setLang('en');
              } else {
                props.setProgress(2);
              }
            }}
            className="flex items-center justify-center w-full h-32 text-xl rounded text-userColor flex-2xl bg-bg"
          >
            EngLish
          </div>
          <div
            onClick={() => {
              if (router.locale === 'en') {
                router.push(router.asPath, router.asPath, { locale: 'cn' });
                // setLanguage('cn');
                setLang('cn');
              } else {
                props.setProgress(2);
              }
            }}
            className="flex items-center justify-center w-full h-32 text-xl rounded text-userColor flex-2xl bg-bg"
          >
            中文
          </div>
        </div>
        {/* <Button variant="outlined" startIcon={<WeChat />}>
      Delete
    </Button> */}
      </div>
    );
  };
  const SelectSignUpWay = (props) => {
    return (
      <div className="z-10 flex flex-col w-full mt-11">
        {/* <Image src={Logo} alt=""></Image> */}
        <div className="z-10 pl-8 pr-8 text-2xl">{t('注册 YoUni')}</div>
        <div className="z-10 pl-8 pr-8 mb-20 text-md">
          {t('创建个人资料以解锁全部功能。')}
        </div>
        <div className="">
          <div className="absolute z-0 w-full top-32">
            <Image
              className="absolute z-0 w-10 h-10 opacity-80"
              src={backgroundImage2}
              quality={100}
              blurDataURL={'/assets/1.png'}
              alt="Picture of the author"
            />
          </div>
        </div>
        <div className="w-full h-44"></div>
        <div className="absolute bottom-0">
          <div
            className="z-20 h-[290px]  pt-4 pl-8 pr-8 space-y-4 bg-white-mask"
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
          <div className=" bottom-0 z-30 w-full">
            <div className="w-full h-full p-10 pt-2 pb-2 text-xs text-center text-gray-300 bg-white">
              {t('继续即表示您同意我们的')}
              <Link href="">
                <span className="text-[#3665FF]">{t('服务条款')}</span>
              </Link>{' '}
              {t('并确认您已阅读我们的')}
              <Link href="">
                <span className="text-[#3665FF]">{t('隐私政策')}</span>
              </Link>{' '}
              {t('以了解我们如何收集、使用和共享您的数据。')}
            </div>
            <div className="h-20 pt-8 space-x-2 text-sm text-center bg-bg">
              <span className="text-blueTitle">{t('已经有账号了？')}</span>
              <span
                onClick={() => {
                  dispatch(setOpenLogin('login'));
                }}
              >
                <span className="text-[#FFD036]"> {t('登录')}</span>
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
  // const dispatch = useDispatch();
  const [role, selectRole] = useState('Student');
  const ProgressList = [SelectSignUpWay, SelectLanguage, ChooseYourRole];
  const Node = ProgressList[progress];

  React.useEffect(() => {
    dispatch(seLoginModelState(false));
  }, []);

  return (
    <div className="h-full">
      {isLogin ? (
        <SignIn
          isLogin={() => {
            setIsLogin(false);
          }}
        ></SignIn>
      ) : (
        <div className="relative w-full h-full overflow-hidden bg-fixed">
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
