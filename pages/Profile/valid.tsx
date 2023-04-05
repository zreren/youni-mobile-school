import React, { useContext, useEffect, useState } from 'react';
import HeaderMenu from '@/components/Menu/Header-menu';
import Header from '@/components/Header';
import { Input } from 'react-vant';
import useRequest from '@/libs/request';
import { Toast, Uploader } from 'react-vant';
import { Picker, Field } from 'react-vant';
import useFetch from '@/hooks/useFetch';
import useCountDown from '@/hooks/useCountDown';
import { useRouter } from 'next/router';
import useUser from '@/hooks/useUser';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
// import { demoData, upload } from './utils';
// import './style.less';
export default function idValid() {
  const { t } = useTranslation();
  interface ValidForm {
    year: number;
    major: string;
    email: string;
    code: string;
    degree: string;
    campusId: string;
  }
  interface CardValidForm {
    enrollYear: number | string;
    major: string;
    degree: string;
    frontImg: string;
    backImg: string;
    campusId: string;
  }
  const { data: schoolList } = useFetch('/campus/query', 'get');
  const CPicker = (props) => {
    const { user } = useUser();
    const [loading, setLoading] = React.useState(false);
    const [value, setValue] = React.useState<string[]>(props?.value);
    const mailList = React.useMemo(() => {
      return schoolList?.data.filter((item) => {
        return item.id === value;
      })[0];
    }, [value]);
    useEffect(() => {
      console.log(mailList, 'mailList');
    }, [mailList]);
    useEffect(() => {
      console.log(value, 'value');
      if (!props) return;
      props?.change(value, mailList?.email);
    }, [value]);
    if (!schoolList) return;
    return (
      <Picker
        popup={{
          round: true,
        }}
        value={value}
        title={t('请选择')}
        columns={schoolList?.data || []}
        onConfirm={setValue}
        visibleItemCount={8}
        onChange={(e) => {
          if (!e) return;
          console.log(e, 'Picker');
          setValue(e);
        }}
        columnsFieldNames={{ text: 'ename', value: 'id' }}
        optionRender={(option: any) => {
          // console.log(option,"option")
          if (!option?.cname) return;
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
              placeholder={user?.campus?.ename || t('选择学校')}
              onClick={() => actions.open()}
            />
          );
        }}
      </Picker>
    );
  };
  const MailPicker = (props) => {
    const [loading, setLoading] = React.useState(false);
    const [value, setValue] = React.useState<string[]>();
    // const mailList = React.useMemo(() => {
    //     return schoolList?.data.filter((item) => {
    //       return item.id === value
    //     })
    // }, [value])
    // useEffect(()=>{
    //   console.log(mailList,"mailList")
    // },[mailList])
    useEffect(() => {
      // console.log(value,"value")
      if (!props) return;
      props?.change(value);
    }, [value]);
    // if(!props.data) return (
    //   <div>请先选择学校</div>
    // )
    return (
      <Picker
        popup={{
          round: true,
        }}
        value={value}
        title={t('请选择')}
        columns={props.data}
        onConfirm={setValue}
        visibleItemCount={8}
        onChange={setValue}
      >
        {(val: string, _: any, actions) => {
          console.log(_, val, 'select');
          return (
            <Field
              readOnly
              clickable
              value={val || ''}
              placeholder={
                props?.placeholder ? props?.placeholder : t('Select@mail')
              }
              onClick={() => actions.open()}
            />
          );
        }}
      </Picker>
    );
  };

  const InputComponent = (props) => {
    let { label, type, dataIndex, children } = props;
    if (!type) {
      type = 'input';
    }
    // const data = useContext(ValidForm)
    // const updateData = (val) => {
    //   setValidFormData({ ...ValidFormData, [dataIndex]: text });
    // };

    return (
      <div className="w-full bg-white rounded-full ">
        <label className="flex justify-between w-full h-12 input-group">
          <span className="text-sm font-medium bg-white text-blueTitle whitespace-nowrap">
            {label}
          </span>
          {type === 'input' ? (
            // <Input
            //   align='right'
            //   value={text}
            //   onBlur={updateData}
            //   onChange={val => updateState(val)}
            //   placeholder="请输入文本"
            //   className="text-sm font-medium w-[50px] text-right text-gray-500 placeholder-gray-300 border-none input hover:outline-none"
            // />
            <> {children}</>
          ) : (
            <Input />
          )}
        </label>
      </div>
    );
  };
  const yearList = [
    {
      text: '2016',
      value: '2016',
    },
    {
      text: '2017',
      value: '2017',
    },
    {
      text: '2018',
      value: '2018',
    },
    {
      text: '2019',
      value: '2019',
    },
    {
      text: '2020',
      value: '2020',
    },
    {
      text: '2021',
      value: '2021',
    },
    {
      text: '2022',
      value: '2022',
    },
    {
      text: '2023',
      value: '2023',
    },
    {
      text: '2024',
      value: '2024',
    },
  ];
  const MailValid = () => {
    const [schoolList, setSelectSchool] = useState<{ id: any; mail: any[] }>();
    useEffect(() => {
      console.log(schoolList, 'schoolList');
    }, [schoolList]);
    const [mailBack, setMailBack] = useState();
    const [countdownTime, setCountdown] = useState(60);
    const [start, setStart] = useState(false);
    // const [time, setTime] = useState<any>(0); // keep track of whether the countdown is running or not
    // const [countdownTime, setCountdownTime] = useState(0); // the time to start countdown
    const [count, setTime] = useCountDown({ mss: 0 });
    const sendCode = async () => {
      console.log(ValidFormData, 'ValidFormData.email');
      try {
        const { data } = await useRequest.post('/api/send_email_code', {
          email: `${ValidFormData.email}${mailBack}`,
        });
        console.log(data, 'data');
        if (data?.message === 'success') {
          // @ts-ignore
          setTime(countdownTime);
          Toast.success(t('Send successfully'));
        } else {
          Toast.fail(`${t('Send failed')}${data?.message}`);
        }
      } catch (error) {
        Toast.fail(
          `${t('Send failed')}, ${t(
            'please check if the email address is correct',
          )}`,
        );
      }

      // setCountdown(true)
    };
    const router = useRouter();
    const [ValidFormData, setValidFormData] = useState<ValidForm>({
      campusId: '',
      year: 2016,
      degree: '',
      major: '',
      email: '',
      code: '',
    });
    const submitValid = async (ValidFormData: ValidForm) => {
      try {
        const { data } = await useRequest.post(
          '/api/profile/education/email_verify',
          {
            ...ValidFormData,
            email: ValidFormData.email + mailBack,
            degree: degree,
            campusId: schoolList.id,
            year: enrollYear,
          },
        );
        if (data?.message === 'success') {
          Toast.success(t('Authentication succeeded'));
          router.push('/Profile');
        } else {
          Toast.fail(t('Authentication failed'));
        }
      } catch (error) {
        Toast.fail('fatal error');
      }
    };

    const [degree, setDegree] = useState();
    const [enrollYear, setEnrollYear] = useState<number>();
    useEffect(() => {
      console.log(degree, 'degree');
    }, [degree]);
    const updateData = React.useCallback((name: string, val: any) => {
      setValidFormData((preVal: any) => {
        return {
          ...preVal,
          [name]: val,
        };
      });
    }, []);
    const { user } = useUser();
    useEffect(() => {
      setSelectSchool({
        id: user?.campus?.id,
        mail: user?.campus?.email,
      });
    }, [user]);
    return (
      <div className="w-full space-y-4">
        <InputComponent label={t('School name')}>
          <div className="w-1/2 flex justify-end text-right cpicker">
            <CPicker
              change={(val, mail) => {
                setSelectSchool({
                  id: val,
                  mail: mail,
                });
              }}
            ></CPicker>
          </div>
        </InputComponent>
        <InputComponent label={t('学历')}>
          <div className="w-1/2 flex justify-end text-right cpicker">
            <MailPicker
              placeholder={t('请选择学历')}
              change={(val) => {
                setDegree(val);
              }}
              data={[
                {
                  text: t('本科'),
                  value: '本科',
                },
                {
                  text: t('硕士'),
                  value: '硕士',
                },
                {
                  text: t('博士'),
                  value: '博士',
                },
              ]}
            ></MailPicker>
          </div>
        </InputComponent>
        <InputComponent label={t('专业')}>
          <Input
            align="right"
            value={ValidFormData.major}
            onChange={(val) => {
              updateData('major', val);
            }}
            placeholder={t('请输入专业')}
            className="text-sm font-medium w-[50px] text-right text-gray-500 placeholder-gray-300 border-none input hover:outline-none"
          />
        </InputComponent>
        <InputComponent label={'入学年份'}>
          <div className="w-1/2 flex justify-end text-right cpicker">
            <MailPicker
              change={(val) => {
                setEnrollYear(Number(val));
              }}
              placeholder="请选择年份"
              data={yearList}
            ></MailPicker>
          </div>
        </InputComponent>
        <InputComponent label={'Email'}>
          <div className="cpicker flex justify-end text-right w-full">
            <Input
              align="right"
              value={ValidFormData.email}
              // onBlur={updateData}
              onChange={(val) => {
                updateData('email', val);
              }}
              placeholder={t('请输入邮箱')}
              className="text-sm font-medium  text-right text-gray-500 placeholder-gray-300 border-none input hover:outline-none"
            />
            <div className="cpicker flex justify-end text-right ">
              <MailPicker
                change={(val) => {
                  setMailBack(val);
                }}
                data={schoolList?.mail}
              ></MailPicker>
            </div>
          </div>
        </InputComponent>
        <div className="relative w-full bg-white rounded-full">
          <label className="flex justify-between w-full h-12 input-group">
            <span className="text-sm font-medium bg-white text-blueTitle whitespace-nowrap">
              {t('验证码')}
            </span>
            <input
              type="text"
              placeholder={t('输入验证码')}
              value={ValidFormData.code}
              onChange={(val) => {
                updateData('code', val.target.value);
              }}
              className="mr-28 text-sm font-medium text-right text-gray-500 placeholder-gray-300 border-none input hover:outline-none"
            />
          </label>
          {count === 0 ? (
            <button
              onClick={() => {
                sendCode();
              }}
              className="absolute w-20 h-8 text-xs bg-yellow-400 rounded-full right-2 top-2"
            >
              {t('发送验证码')}
            </button>
          ) : (
            <button
              onClick={() => {
                sendCode();
              }}
              className="absolute w-20 h-8 text-xs bg-gray-400 rounded-full right-2 top-2"
            >
              {Number(count)}
            </button>
          )}
        </div>
        <button
          onClick={() => {
            submitValid(ValidFormData);
          }}
          className="w-full border-none rounded-full yellow-gradient btn"
        >
          {t('提交')}
        </button>
      </div>
    );
  };
  const CardValid = () => {
    const [ValidFormData, setValidFormData] = useState({
      enrollYear: '',
      major: '',
      degree: '',
      frontImg: '',
      backImg: '',
      campusId: '',
    });
    const [mailBack, setMailBack] = useState();
    const [degree, setDegree] = useState();
    const [enrollYear, setEnrollYear] = useState<number>();
    const [frontImg, setFrontImg] = useState();
    const [backImg, setBackImg] = useState();
    const router = useRouter();
    const submitValid = async (ValidFormData: any) => {
      if (!schoolList.id) {
        Toast(t('请选择学校'));
        return;
      }
      if (!ValidFormData.enrollYear) {
        Toast(t('请选择入学年份'));
        return;
      }
      if (!degree) {
        Toast(t('请选择学历'));
        return;
      }
      if (!ValidFormData.major) {
        Toast(t('请输入专业'));
        return;
      }
      if (!frontImg) {
        Toast(t('请上传正面照'));
        return;
      }
      if (!backImg) {
        Toast(t('请上传反面照'));
        return;
      }

      const { data } = await useRequest.post(
        '/api/profile/education/card_verify',
        {
          degree: degree,
          campusId: schoolList.id,
          year: Number(ValidFormData.enrollYear),
          major: ValidFormData.major,
          cardFront: frontImg,
          cardBack: backImg,
        },
      );
      if (data?.code === 200 || data?.message === 'success') {
        Toast(t('提交成功'));
        setTimeout(() => {
          router.push({
            pathname: '/Profile',
            query: {
              campus: router.query.campus,
            },
          });
        }, 1000);
      } else {
        Toast(t('提交失败，请联系管理员'));
      }
    };
    const uploadCardFront = async (file) => {
      console.log(file, 'file');
      try {
        const body = new FormData();
        body.append('file', file);
        const { data: resp } = await useRequest.post('/api/upload', body);
        const json = resp;
        console.log(json?.data, 'json');
        setFrontImg(json?.data?.filename);
        // return包含 url 的一个对象 例如: {url:'https://img.yzcdn.cn/vant/sand.jpg'}
        return {
          url: Cons.BASEURL + json?.data?.filename,
          name: json?.data?.filename,
        };
      } catch (error) {
        console.log(error, 'error');
        return { url: `demo_path/${file.name}` };
      }
    };
    const uploadBackImg = async (file) => {
      console.log(file, 'file');
      try {
        const body = new FormData();
        body.append('file', file);
        const { data: resp } = await useRequest.post('/api/upload', body);
        const json = resp;
        console.log(json?.data, 'json');
        setBackImg(json?.data?.filename);
        // return包含 url 的一个对象 例如: {url:'https://img.yzcdn.cn/vant/sand.jpg'}
        return {
          url: Cons.BASEURL + json?.data?.filename,
          name: json?.data?.filename,
        };
      } catch (error) {
        console.log(error, 'error');
        return { url: `demo_path/${file.name}` };
      }
    };
    const [schoolList, setSelectSchool] = useState<{ id: any; mail: any[] }>();
    const updateData = React.useCallback((name: string, val: any) => {
      setValidFormData((preVal: any) => {
        return {
          ...preVal,
          [name]: val,
        };
      });
    }, []);
    return (
      <div className="w-full space-y-4">
        <InputComponent label={t('学校名称')}>
          <div className="w-1/2 flex justify-end text-right cpicker">
            <CPicker
              change={(val, mail) => {
                setSelectSchool({
                  id: val,
                  mail: mail,
                });
              }}
            ></CPicker>
          </div>
          {/* <Input
            align="right"
            value={ValidFormData.schoolName}
            // onBlur={updateData}
            key={'schoolName'}
            onChange={(val) => {
              updateData('schoolName', val);
            }}
            placeholder="请输入文本"
            className="text-sm font-medium w-[50px] text-right text-gray-500 placeholder-gray-300 border-none input hover:outline-none"
          /> */}
        </InputComponent>
        <InputComponent label={t('入学年份')}>
          <div className="w-1/2 flex justify-end text-right cpicker">
            <MailPicker
              change={(val) => {
                updateData('enrollYear', val);
              }}
              placeholder={t('请选择年份')}
              data={yearList}
            ></MailPicker>
          </div>
        </InputComponent>

        <InputComponent label={t('学历')}>
          <div className="w-1/2 flex justify-end text-right cpicker">
            <MailPicker
              placeholder={t('请选择学历')}
              change={(val) => {
                setDegree(val);
              }}
              data={[
                {
                  text: '本科',
                  value: '本科',
                },
                {
                  text: '硕士',
                  value: '硕士',
                },
                {
                  text: '博士',
                  value: '博士',
                },
              ]}
            ></MailPicker>
          </div>
        </InputComponent>
        <InputComponent label={t('专业')}>
          <Input
            align="right"
            value={ValidFormData.major}
            onChange={(val) => {
              updateData('major', val);
            }}
            placeholder={t('请输入文本')}
            className="text-sm font-medium w-[50px] text-right text-gray-500 placeholder-gray-300 border-none input hover:outline-none"
          />
        </InputComponent>
        <div className="w-full p-4 bg-white rounded-lg h-36">
          <div>{t('学生卡验证')}</div>
          <div className="flex justify-between h-full pt-2 pb-8 space-x-4">
            <div className="flex items-center justify-center w-full h-full text-center bg-bg">
              <Uploader
                multiple
                upload={uploadCardFront}
                maxCount={1}
                className="w-full h-full "
                maxSize={2500 * 1024}
                onOversize={() => Toast.info(t('文件大小不能超过15kb'))}
              />
            </div>
            <div className="flex items-center justify-center w-full h-full text-center bg-bg">
              <Uploader
                multiple
                upload={uploadBackImg}
                maxCount={1}
                className="w-full h-full "
                maxSize={2500 * 1024}
                onOversize={() => Toast.info(t('文件大小不能超过15kb'))}
              />
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            submitValid(ValidFormData);
          }}
          className="w-full border-none rounded-full yellow-gradient btn"
        >
          {t('提交')}
        </button>
      </div>
    );
  };
  const headerMenuList = [
    {
      label: t('邮箱验证'),
    },
    {
      label: t('学生卡认证'),
    },
  ];

  // const menuList = [MailValid, CardValid];
  const [menu, setMenu] = React.useState(0);
  const [form, setFrom] = React.useState({});

  return (
    <div className="h-screen bg-bg valid">
      <Header title={t('学生认证')}></Header>
      <HeaderMenu
        headerMenuList={headerMenuList}
        switchMenu={(val) => {
          setMenu(val);
        }}
      ></HeaderMenu>
      <div className="fixed w-full p-4 h-1/1">
        {menu === 0 ? <MailValid></MailValid> : <CardValid></CardValid>}
      </div>
    </div>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
