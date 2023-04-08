import React, { useState, useMemo } from 'react';
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
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import prefixSorted from '../../libs/phone';
import CheckIcon from './check.svg';
import CheckedIcon from './checked.svg';
import { useRouter } from 'next/router';
import useRequest from '@/libs/request';
import { styled } from '@mui/material/styles';
import { setOpenLogin } from '../../stores/authSlice';
import { Toast } from 'react-vant';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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
  return (
    <div className="z-30 w-full h-full p-8 ">
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
          <div>label="Parent</div>
        </div>
        <div className="flex items-center">
          {isLetterAndNumber ? (
            <CheckedIcon></CheckedIcon>
          ) : (
            <CheckIcon></CheckIcon>
          )}
          <div>label="Parent</div>
        </div>
        <div className="flex items-center">
          {isSpecial ? <CheckedIcon></CheckedIcon> : <CheckIcon></CheckIcon>}
          <div>label="Parent</div>
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
    </div>
  );
};

export default function Valid(props) {
  const { returnClick } = props;
  const [state, setState] = React.useState(0);
  const { t } = useTranslation();
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [prefix, setPrefix] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const PhoneValid = (props) => {
    const [count] = useCountDown({ mss: 60 });
    const [age, setAge] = React.useState('86');
    const [phoneValue, setPhoneValue] = useState('');
    const [isCodeInput, setIsCodeInput] = useState(false);

    React.useEffect(() => {
      if (phoneValue.length > 3) {
        setIsCodeInput(true);
      } else {
        setIsCodeInput(false);
      }
    }, [phoneValue]);

    const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value as string);
    };
    const ReSentCode = () => {
      return (
        <div className="z-30 w-full h-screen p-8  topIndexPlus">
          <Header className="shadow-none bg-transparent" title=""></Header>
          <div className="text-2xl font-medium">{t('忘记密码')}</div>
          <div>{t('我们将发送一条验证码到您的手机')}</div>
          <div className="mt-6 mb-6">
            <input
              type="text"
              value={phoneValue}
              placeholder="Type here"
              className="w-full input hover:outline-none topIndexPlus"
              onChange={(e) => {
                setPhoneValue(e.target.value);
              }}
            />
            <div className="w-full text-xs text-right">
              {count === 0 ? <ReSentCode /> : `Code sent (${count}s)`}
            </div>
          </div>
          <button
            onClick={() => {
              setPhoneNumber(phoneValue);
              props.setState(2);
            }}
            className={classNames(
              'w-full border-0 rounded-full btn',
              isCodeInput
                ? 'bg-yellow-300 hover:bg-yellow-400 '
                : 'bg-gray-300 hover:bg-gray-300 ',
            )}
          >
            {t('下一步')}
          </button>
          <div className="w-full mt-8 text-xs text-left text-darkYellow">
            {t('没有收到验证码？')}
          </div>
        </div>
      );
    };
    // const [phoneNumber, setPhoneNumber] = useState('');
    return (
      <div className="z-30 w-full h-full p-8 bg-white h-screen">
        <Header
          returnClick={() => {
            returnClick();
          }}
          className="shadow-none bg-transparent"
          title=""
        ></Header>
        <div className="text-2xl font-medium">{t('忘记密码')}</div>
        <div>{t('我们将发送一条验证码到您的手机')}</div>
        <div className="mt-6 mb-6">
          <label className="flex items-center input-group topIndex">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              className="topIndexPlus"
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
                  <MenuItem className="topIndexPlus" value={item.prefix}>
                    +{item.prefix}
                  </MenuItem>
                );
              })}
            </Select>
            <input
              type="text"
              value={phoneValue}
              placeholder="Type here"
              className="w-full input hover:outline-none topIndexPlus"
              onChange={(e) => {
                setPhoneValue(e.target.value);
              }}
            />
          </label>
          {/* <input
            type="text"
            placeholder="Type here"
            className="w-full input hover:outline-none"
            onChange={(e) => {
              e.target.value.length > 3
                ? setCodeInput(true)
                : setCodeInput(false);
            }}
          /> */}
          {/* <div className="w-full text-xs text-right">
            {count === 0 ? <ReSentCode /> : `Code sent (${count}s)`}
          </div> */}
        </div>
        <button
          onClick={() => {
            useRequest.post('/api/send_sms_code', {
              phone: phoneValue,
            });
            setPhoneNumber(phoneValue);
            setPrefix(age);
            props.setState(2);
          }}
          className={classNames(
            'w-full border-0 rounded-full btn',
            isCodeInput
              ? 'bg-yellow-300 hover:bg-yellow-400 '
              : 'bg-gray-300 hover:bg-gray-300 ',
          )}
        >
          {t('发送验证码')}
        </button>
        {/* <div className="w-full mt-8 text-xs text-left text-darkYellow">
          No code?
        </div> */}
      </div>
    );
  };
  const CodeValid = (props) => {
    const [code, setCode] = useState('');
    const validCode = async () => {
      const { data } = await useRequest.post('/api/check_code', {
        account: phoneNumber,
        code: code,
      });
      if (data?.data?.accessToken) {
        setState(3);
        setAccessToken(data?.data?.accessToken);
      } else {
        Toast.fail(data?.message);
      }
    };
    return (
      <div className="z-30 w-full h-full p-8 bg-white h-screen">
        <Header
          returnClick={() => {
            returnClick();
          }}
          className="shadow-none bg-transparent"
          title=""
        ></Header>
        <div className="text-2xl font-medium">{t('输入6位数字代码')}</div>
        <div>
          {t('输入您在+')} {prefix} {phoneNumber}{' '}
          {t('收到的6位数字验证码。该代码在30分钟内有效。')}
        </div>
        <div className="mt-6 mb-6">
          <input
            type="text"
            placeholder="Code"
            className="w-full input hover:outline-none"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />{' '}
          {/* <input
          type="text"
          placeholder="Type here"
          className="w-full input hover:outline-none"
          onChange={(e) => {
            e.target.value.length > 3
              ? setCodeInput(true)
              : setCodeInput(false);
          }}
        /> */}
          {/* <div className="w-full text-xs text-right">
          {count === 0 ? <ReSentCode /> : `Code sent (${count}s)`}
        </div> */}
        </div>
        <button
          onClick={() => {
            validCode();
            // props.setState(2);
          }}
          className={classNames(
            'w-full border-0 rounded-full btn ',
            code.length > 3
              ? 'bg-[#FFD036] hover:bg-yellow-400 text-[#8C6008] '
              : 'bg-gray-300 hover:bg-gray-300 ',
          )}
        >
          Next
        </button>
        {/* <div className="w-full mt-8 text-xs text-left text-darkYellow">
        No code?
      </div> */}
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
    const submitCreate = async () => {
      if (isLetterAndNumber && isLength && isSpecial) {
        const { data } = await useRequest.post('/api/student/reset_password', {
          password: values.password,
          accessToken: accessToken,
        });
        if (data?.message === 'success') {
          Toast.success('Create success');
          router.push('/Profile');
          dispatch(setOpenLogin('login'));
          Toast.success(t('修改成功'));
          // router.push('/Login/signin')
        } else {
          Toast.fail(data?.message);
        }
      }
    };
    return (
      <div className="z-30 w-full h-full p-8 bg-white">
        <Header className="shadow-none" title=""></Header>
        <div className="text-2xl font-medium">Reset Password</div>
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
        <div className="mb-2">{t('您的密码必须至少包含：')}</div>
        <div className="flex flex-col items-start space-y-2 mt-4 mb-4">
          <div className="flex items-center text-xs space-x-2">
            {isLength ? <CheckedIcon></CheckedIcon> : <CheckIcon></CheckIcon>}
            <div>{t('8个字符（最多20个字符）')}</div>
          </div>
          <div className="flex items-center  text-xs space-x-2">
            {isLetterAndNumber ? (
              <CheckedIcon></CheckedIcon>
            ) : (
              <CheckIcon></CheckIcon>
            )}
            <div>{t('1个字母和1个数字')}</div>
          </div>
          <div className="flex items-center  text-xs space-x-2">
            {isSpecial ? <CheckedIcon></CheckedIcon> : <CheckIcon></CheckIcon>}
            <div>{t('1个特殊字符（例如：#!$&@）')}</div>
          </div>
        </div>
        <button
          onClick={() => {
            submitCreate();
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
  const NodeList = [PhoneValid, PhoneValid, CodeValid, Password];
  const Node = NodeList[state];
  return (
    <div className="topIndexPlus  z-30">
      <Node setState={setState}></Node>
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
