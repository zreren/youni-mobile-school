import React, { useEffect, useMemo, useState } from 'react';
import Header from '@/components/Header';
import useCountDown from '../../hooks/useCountDown';
import classNames from 'classnames';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from './visibility.svg';
import VisibilityOff from './visibilityHide.svg';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import { useRouter } from 'next/router';
import useRequest from '@/libs/request';
import { Toast } from 'react-vant';
// import { withStyles } from '@material-ui/core/styles';
import { styled } from '@mui/material/styles';
import CheckIcon from './check.svg';
import CheckedIcon from './checked.svg';
import { setOpenLogin } from '../../stores/authSlice';
import { useDispatch } from 'react-redux';


export default function Valid() {
  const [state, setState] = React.useState(0);
  const router = useRouter();
  const { query } = router;
  const mail = useMemo(() => {
    return query.mail;
  }, [router]);
  const lang = useMemo(()=>{
    return query.lang;
  },[router])
  const campusId = useMemo(()=>{
    return Number(query.campusId) 
  },[router])
  const roleId = useMemo(() => {
    if(query.roleId === 'Student'){
      return 4;
    }
    if(query.roleId === 'Graduated'){
    return 5;
    }
  },[router])
  // const 
  const [accessToken,setAccessToken] = useState();
  const PhoneValid = (props) => {
    const [count, setTime] = useCountDown({ mss: 60 });
    const [isCodeInput, setCodeInput] = React.useState(false);
    const [code, setCode] = useState('');
    const ReSentCode = () => {
      return (
        <div className="z-30 w-full h-full p-8 bg-white">
          <Header className="shadow-none" title=""></Header>
          <div className="text-2xl font-medium">Phone Verification</div>
          <div>
            Enter the 6-digit verification code you received at +
            {query?.phoneNumber}.The code are valid for 30 minutes
          </div>
          <div className="mt-6 mb-6">
            <input
              type="text"
              placeholder="Type here"
              className="w-full input hover:outline-none"
              onChange={(e) => {
                e.target.value.length > 3
                  ? setCodeInput(true)
                  : setCodeInput(false);
              }}
            />
            <div className="w-full text-xs text-right">
              {count === 0 ? <ReSentCode /> : `Code sent (${count}s)`}
            </div>
          </div>
          <button
            onClick={() => {
              props.setState(2);
            }}
            className={classNames(
              'w-full border-0 rounded-full btn',
              isCodeInput
                ? 'bg-yellow-300 hover:bg-yellow-400 '
                : 'bg-gray-300 hover:bg-gray-300 ',
            )}
          >
            Next
          </button>
          <div className="w-full mt-8 text-xs text-left text-darkYellow">
            No code?
          </div>
        </div>
      );
    };
    const validCode = async () => {
      try {
        const { data } = await useRequest.post('/api/check_code', {
          account: query?.phoneNumber,
          code: code,
        });
        if (data?.message === 'success') {
          Toast.success('success');
          props.setState(2);
        } else {
          Toast.fail(data?.message);
        }
      } catch (error) {
        Toast.fail(error);
      }
    };
    useEffect(() => {
      if (query?.phoneNumber) {
        useRequest
          .post('/api/sendsms_code', {
            phone: query?.phoneNumber,
          })
          .then((res) => {
            if (res.data.message) {
              // beginCountDown()
            }
          });
      }
      if (query?.mail) {
      }
    }, [query]);
    return (
      <div className="z-30 w-full h-full p-8 bg-white">
        <Header className="shadow-none" title=""></Header>
        <div className="text-2xl font-medium">Phone Verification</div>
        <div>
          Enter the 6-digit verification code you received at +
          {query?.phoneNumber}.The code are valid for 30 minutes
        </div>
        <div className="mt-6 mb-6">
          <input
            type="text"
            placeholder="Type here"
            className="w-full input hover:outline-none"
            onChange={(e) => {
              setCode(e.target.value);
              e.target.value.length > 3
                ? setCodeInput(true)
                : setCodeInput(false);
            }}
          />
          <div className="w-full text-xs text-right">
            {count === 0 ? <ReSentCode /> : `Code sent (${count}s)`}
          </div>
        </div>
        <button
          onClick={() => {
            validCode();
          }}
          className={classNames(
            'w-full border-0 rounded-full btn',
            isCodeInput
              ? 'bg-yellow-300 hover:bg-yellow-400 '
              : 'bg-gray-300 hover:bg-gray-300 ',
          )}
        >
          Next
        </button>
        <div className="w-full mt-8 text-xs text-left text-darkYellow">
          No code?
        </div>
      </div>
    );
  };
  const MailValid = (props) => {
    const [count, setTime] = useCountDown({ mss: 60 });
    useEffect(() => {
      if (mail) {
        
      }
    }, []);
    const [isCodeInput, setCodeInput] = React.useState(false);
    const ReSentCode = () => {
      return (
        <div className="z-30 w-full h-full p-8 bg-white">
          <Header className="shadow-none" title=""></Header>
          <div className="text-2xl font-medium">Email Verification</div>
          <div>
            Enter the 6-digit verification code you received at
            {mail}. The code are valid for 30 minutes
          </div>
          <div className="mt-6 mb-6">
            <input
              type="text"
              placeholder="Type here"
              className="w-full input hover:outline-none"
              onChange={(e) => {
                e.target.value.length > 3
                  ? setCodeInput(true)
                  : setCodeInput(false);
              }}
            />
            <div className="w-full text-xs text-right">
              {count === 0 ? <ReSentCode /> : `Code sent (${count}s)`}
            </div>
          </div>
          <button
            onClick={() => {
              props.setState(2);
            }}
            className={classNames(
              'w-full border-0 rounded-full btn',
              isCodeInput
                ? 'bg-yellow-300 hover:bg-yellow-400 '
                : 'bg-gray-300 hover:bg-gray-300 ',
            )}
          >
            Next
          </button>
          <div className="w-full mt-8 text-xs text-left text-darkYellow">
            No code?
          </div>
        </div>
      );
    };
    const validCode = async () => {
      const { data } = await useRequest.post('/api/check_code', {
        code: code,
        account: mail,
      });
      console.log(data, 'validcode');
      if (data?.data?.accessToken) {
        setAccessToken(data?.data?.accessToken);
        props.setState(2);
      } else {
        Toast.fail(data?.message);
      }
      // if
    };
    const [code, setCode] = useState('');
    return (
      <div className="z-30 w-full h-full p-8 bg-white">
        <Header className="shadow-none" title=""></Header>
        <div className="text-2xl font-medium">Email Verification</div>
        <div>
          Enter the 6-digit verification code you received at
          {mail} The code are valid for 30 minutes
        </div>
        <div className="mt-6 mb-6">
          <input
            type="text"
            placeholder="Type here"
            className="w-full input hover:outline-none"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              e.target.value.length > 3
                ? setCodeInput(true)
                : setCodeInput(false);
            }}
          />
          <div className="w-full text-xs text-right">
            {count === 0 ? <ReSentCode /> : `Code sent (${count}s)`}
          </div>
        </div>
        <button
          onClick={() => {
            validCode();
          }}
          className={classNames(
            'w-full border-0 rounded-full btn',
            isCodeInput
              ? 'bg-yellow-300 hover:bg-yellow-400 '
              : 'bg-gray-300 hover:bg-gray-300 ',
          )}
        >
          Next
        </button>
        <div className="w-full mt-8 text-xs text-left text-darkYellow">
          No code?
        </div>
      </div>
    );
  };
  const Password = (props) => {
    interface State {
      amount: string;
      password: string;
      weight: string;
      weightRange: string;
      showPassword: boolean;
    }

    const [isCodeInput, setCodeInput] = React.useState(false);
    const [values, setValues] = React.useState<State>({
      amount: '',
      password: '',
      weight: '',
      weightRange: '',
      showPassword: false,
    });
    const isLength = useMemo(() => {
      if (values.password.length > 8) {
        // setCodeInput(true)
        return true;
      }
    }, [values.password]);

    const isLetterAndNumber = useMemo(() => {
      // 含有任意一个字母并且任意一个数字即可
      const reg = /[a-zA-Z]/;
      const reg2 = /[0-9]/;
      if (reg.test(values.password) && reg2.test(values.password)) {
        // setCodeInput(true)
        return true;
      }
    }, [values.password]);
    const isSpecial = useMemo(() => {
      // 含有一个特殊字符
      const reg = /[~!@#$%^&*()_+<>?:{},.\/;'[\]]/;
      if (reg.test(values.password)) {
        // setCodeInput(true)
        return true;
      }
    }, [values.password]);
    const handleChange =
      (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
      };

    const handleClickShowPassword = () => {
      setValues({
        ...values,
        showPassword: !values.showPassword,
      });
    };
    const handleMouseDownPassword = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      event.preventDefault();
    };
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const GreenCheckbox = styled(Checkbox)`
      color: #dcdde1;
      &:checked {
        color: #dcdde1;
      }
    `;
    const dispatch = useDispatch();
    const submitCreate = async ()=>{
      if( isLetterAndNumber && isLength && isSpecial){
       const {data} = await useRequest.post('/api/auth/student/email_register',{
          password:values.password,
          roleId:roleId,
          lang: lang,
          accessToken:accessToken,
          campusId:campusId
        })
        if(data?.message === 'success'){
          Toast.success('Create success')
          router.push('/Profile');
          dispatch(setOpenLogin('login'));
          Toast.success('Login success')
          // router.push('/Login/signin')
        }else{
          Toast.fail(data?.message)
        }
      }
    }
    return (
      <div className="z-30 w-full h-full p-8 bg-white">
        <Header className="shadow-none" title=""></Header>
        <div className="text-2xl font-medium">Create Password</div>
        <div className="w-full mt-6 mb-6">
          <OutlinedInput
            id="outlined-adornment-password"
            placeholder="password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            sx={{
              boxShadow: 'none',
              '.MuiOutlinedInput-notchedOutline': { border: 0 },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: 0,
                'border-width': 0,
                'border-color': 'transparent',
              },
            }}
            onChange={handleChange('password')}
            className="w-full"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </div>
        <div className="mb-2">Your password must have at least:</div>
        <div className="flex flex-col items-start space-y-2 mt-4 mb-4">
          <div className="flex items-center text-xs space-x-2">
            {isLength ? <CheckedIcon></CheckedIcon> : <CheckIcon></CheckIcon>}
            <div>8 characters (20 max)</div>
          </div>
          <div className="flex items-center  text-xs space-x-2">
            {isLetterAndNumber ? (
              <CheckedIcon></CheckedIcon>
            ) : (
              <CheckIcon></CheckIcon>
            )}
            <div>1 letter and 1 number</div>
          </div>
          <div className="flex items-center  text-xs space-x-2">
            {
              isSpecial ? (
                <CheckedIcon></CheckedIcon>
              ) : (
                <CheckIcon></CheckIcon>
              )
            }
            <div>1 special character (Example:#!$&@)</div>
          </div>
        </div>
        <button
          onClick={() => {
            submitCreate()
          }}
          className={classNames(
            'w-full border-0 rounded-full btn',
            isLetterAndNumber && isLength && isSpecial
              ? 'bg-yellow-300 hover:bg-yellow-400 '
              : 'bg-gray-300 hover:bg-gray-300 ',
          )}
        >
          Next
        </button>
      </div>
    );
  };

  const NodeList = [PhoneValid, MailValid, Password];
  const Node = NodeList[state];
  useEffect(() => {
    if (mail) {
      setState(1);
    }
  }, [mail]);
  return (
    <div>
      {state === 0 ? <PhoneValid setState={setState} /> : null}
    {state === 1 ? <MailValid setState={setState} /> : null}
    {state === 2 ? <Password setState={setState} /> : null}
      {/* <Password setState={setState} /> */}
    </div>
  );
}
