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

// import { demoData, upload } from './utils';
// import './style.less';
export default function idValid() {
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
    const [loading, setLoading] = React.useState(false);
    const [value, setValue] = React.useState<string[]>();
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

    return (
      <Picker
        popup={{
          round: true,
        }}
        value={value}
        title="请选择"
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
              placeholder="选择学校"
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
        title="请选择"
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
                props?.placeholder ? props?.placeholder : '选择@mail'
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
    const form = [
      { label: '学校名称', Value: 1, dataIndex: 'schoolName' },
      { label: '入学年份', Value: 2, dataIndex: 'enrollYear' },
      { label: '专业', Value: 3, dataIndex: 'major' },
      { label: 'Email', Value: 4, dataIndex: 'email' },
      { label: '验证码', Value: 5, dataIndex: 'code' },
    ];
    const [schoolList, setSelectSchool] = useState<{ id: any; mail: any[] }>();
    const [mailBack, setMailBack] = useState();
    const [countdownTime, setCountdown] = useState(60);
    const [start, setStart] = useState(false);
    // const [time, setTime] = useState<any>(0); // keep track of whether the countdown is running or not
    // const [countdownTime, setCountdownTime] = useState(0); // the time to start countdown
    const [count, setTime] = useCountDown({ mss: 0 });
    const sendCode = async () => {
      console.log(ValidFormData, 'ValidFormData.email');
      try {
        const {data} = await useRequest.post('/api/send_email_code', {
          email: `${ValidFormData.email}${mailBack}`,
        });
        console.log(data, 'data');
        if(data?.message === 'success'){
       // @ts-ignore
         setTime(countdownTime);
         Toast.success('发送成功');
        }else{
          Toast.fail(`发送失败${data?.message}`);
        }
      } catch (error) {
        Toast.fail('发送失败，检查邮箱是否正确');
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
        const {data} = await useRequest.post('/api/profile/education/email_verify', {
          ...ValidFormData,
          email: ValidFormData.email + mailBack,
          degree: degree,
          campusId: schoolList.id,
          year:enrollYear
        });
        if(data?.message === 'success'){
          Toast.success('认证成功');
          router.push('/Profile')
        }else{
          Toast.fail('认证失败');
        }
      } catch (error) {
          Toast.fail('fatal error')
      }
    };

    const [degree,setDegree] = useState();
    const [enrollYear,setEnrollYear] = useState<number>()
    useEffect(()=>{
      console.log(degree,"degree")
    },[degree])
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
        <InputComponent label={'学校名称'}>
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
        <InputComponent label={'学历'}>
          <div className="w-1/2 flex justify-end text-right cpicker">
            <MailPicker
              placeholder="请选择学历"
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
        <InputComponent label={'专业'}>
          <Input
            align="right"
            value={ValidFormData.major}
            // onBlur={updateData}
            key={'major'}
            onChange={(val) => {
              updateData('major', val);
            }}
            placeholder="请输入专业"
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
              placeholder="请输入邮箱"
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
              验证码
            </span>
            <input
              type="text"
              placeholder="输入验证码"
              value={ValidFormData.code}
              // onBlur={updateData}
              onChange={(val) => {
                updateData('code', val.target.value);
              }}
              className="mr-20 text-sm font-medium text-right text-gray-500 placeholder-gray-300 border-none input hover:outline-none"
            />
          </label>
          {/* {count} */}
          {count === 0 ? (
            <button
              onClick={() => {
                sendCode();
              }}
              className="absolute w-20 h-8 text-xs bg-yellow-400 rounded-full right-2 top-2"
            >
              发送验证码
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
          提交
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
    const [degree,setDegree] = useState();
    const [enrollYear,setEnrollYear] = useState<number>()
    const [frontImg, setFrontImg] = useState();
    const [backImg, setBackImg] = useState();
    const router = useRouter();
    const submitValid = async (ValidFormData: any) => {
      if(!schoolList.id){
        Toast('请选择学校')
        return;
      }
      if(!ValidFormData.enrollYear){
        Toast('请选择入学年份')
        return;
      }
      if(!degree){
        Toast('请选择学历')
        return;
      }
      if(!ValidFormData.major){
        Toast('请输入专业')
        return;
      }
      if(!frontImg){
        Toast('请上传正面照')
        return;
      }
      if(!backImg){
        Toast('请上传反面照')
        return;
      }
      const {data} = await useRequest.post('/api/profile/education/card_verify', {
        degree: degree,
        campusId: schoolList.id,
        year: Number(ValidFormData.enrollYear),
        major: ValidFormData.major,
        cardFront: frontImg,
        cardBack: backImg,
      });
      if(data?.code === 200){
        Toast('提交成功')
        setTimeout(() => {
          router.push({
            pathname:'/profile',
            query:{
              campus:router.query.campus
            }
          });
        }, 1000);
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
        setFrontImg( json?.data?.filename);
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
    const form = [
      { label: '学校名称', type: 'input', Value: 1 },
      { label: '学历', type: 'input', Value: 1 },
      { label: '专业', type: 'input', Value: 1 },
      { label: '专业', type: 'input', Value: 1 },
      { label: '学生卡验证', type: 'file', Value: 1 },
    ];
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
        <InputComponent label={'学校名称'}>
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
        <InputComponent label={'入学年份'}>
          <div className="w-1/2 flex justify-end text-right cpicker">
            <MailPicker
              change={(val) => {
                updateData('enrollYear',val);
              }}
              placeholder="请选择年份"
              data={yearList}
            ></MailPicker>
          </div>
        </InputComponent>

        <InputComponent label={'学历'}>
          <div className="w-1/2 flex justify-end text-right cpicker">
            <MailPicker
              placeholder="请选择学历"
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
        <InputComponent label={'专业'}>
          <Input
            align="right"
            value={ValidFormData.major}
            // onBlur={updateData}
            key={'major'}
            onChange={(val) => {
              updateData('major', val);
            }}
            placeholder="请输入文本"
            className="text-sm font-medium w-[50px] text-right text-gray-500 placeholder-gray-300 border-none input hover:outline-none"
          />
        </InputComponent>
        <div className="w-full p-4 bg-white rounded-lg h-36">
          <div>学生卡验证</div>
          <div className="flex justify-between h-full pt-2 pb-8 space-x-4">
            <div className="flex items-center justify-center w-full h-full text-center bg-bg">
              <Uploader
                multiple
                upload={uploadCardFront}
                maxCount={1}
                className="w-full h-full "
                maxSize={2500 * 1024}
                onOversize={() => Toast.info('文件大小不能超过15kb')}
              />
            </div>
            <div className="flex items-center justify-center w-full h-full text-center bg-bg">
              <Uploader
                multiple
                upload={uploadBackImg}
                maxCount={1}
                className="w-full h-full "
                maxSize={2500 * 1024}
                onOversize={() => Toast.info('文件大小不能超过15kb')}
              />
            </div>
          </div>
        </div>
        <button  onClick={() => {
            submitValid(ValidFormData);
          }} className="w-full border-none rounded-full yellow-gradient btn">
          提交
        </button>
      </div>
    );
  };
  const headerMenuList = [
    {
      label: '邮箱验证',
    },
    {
      label: '学生卡认证',
    },
  ];
  // const menuList = [MailValid, CardValid];
  const [menu, setMenu] = React.useState(0);
  const [form, setFrom] = React.useState({});

  return (
    <div className="h-screen bg-bg valid">
      <Header title="学生认证"></Header>
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
