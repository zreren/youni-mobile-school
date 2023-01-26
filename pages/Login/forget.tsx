import React, { useState } from 'react';
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
      <div className="flex flex-col items-start -space-y-2">
        <div className="flex items-center">
          <Checkbox {...label} defaultChecked color="success" />
          <div>label="Parent</div>
        </div>
        <div className="flex items-center">
          <Checkbox {...label} defaultChecked color="success" />
          <div>label="Parent</div>
        </div>
        <div className="flex items-center">
          <Checkbox {...label} defaultChecked color="success" />
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

  const PhoneValid = (props) => {
    const [count] = useCountDown({ mss: 60 });
    const [age, setAge] = React.useState('86');
    const [isCodeInput, setCodeInput] = React.useState(false);
    const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value as string);
    };
    const ReSentCode = () => {
      return (
        <div className="z-30 w-full h-screen p-8  topIndexPlus">
          <Header className="shadow-none bg-transparent" title=""></Header>
          <div className="text-2xl font-medium">Forget Password</div>
          <div>We will send a code to your phone</div>
          <div className="mt-6 mb-6">
            <input
              type="text"
              placeholder="Type here"
              className="w-full input hover:outline-none topIndexPlus"
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
    const [phoneNumber, setPhoneNumber] = useState('');
    return (
      <div className="z-30 w-full h-full p-8 bg-white h-screen">
        <Header
          returnClick={() => {
            returnClick();
          }}
          className="shadow-none bg-transparent"
          title=""
        ></Header>
        <div className="text-2xl font-medium">Forget Password</div>
        <div>We will send a code to your phone</div>
        <div className="mt-6 mb-6">
          <label className="flex items-center input-group topIndex">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              className='topIndexPlus'
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
                return <MenuItem className='topIndexPlus' value={item.prefix}>+{item.prefix}</MenuItem>;
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
            props.setState(2);
          }}
          className={classNames(
            'w-full border-0 rounded-full btn',
            isCodeInput
              ? 'bg-yellow-300 hover:bg-yellow-400 '
              : 'bg-gray-300 hover:bg-gray-300 ',
          )}
        >
          Send code
        </button>
        {/* <div className="w-full mt-8 text-xs text-left text-darkYellow">
          No code?
        </div> */}
      </div>
    );
  };
  const CodeValid = (props) => {
    const [code,setCode] = useState('')
    return (
      <div className="z-30 w-full h-full p-8 bg-white h-screen">
        <Header
          returnClick={() => {
            returnClick();
          }}
          className="shadow-none bg-transparent"
          title=""
        ></Header>
        <div className="text-2xl font-medium">Enter 6-digit code</div>
        <div>
          Enter the 6-digit verification code you received at +86 133 9987
          3321.The code are valid for 30 minutes
        </div>
        <div className="mt-6 mb-6">
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full input hover:outline-none"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
              }}
            />    {/* <input
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
            props.setState(2);
          }}
          className={classNames(
            'w-full border-0 rounded-full btn ',
            code.length > 5
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
  const NodeList = [PhoneValid, PhoneValid, CodeValid];
  const Node = NodeList[state];
  return (
    <div className="topIndexPlus  z-30">
      <Node setState={setState}></Node>
    </div>
  );
}
