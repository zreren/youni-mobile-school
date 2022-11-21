import React from 'react';
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
      <div className='mb-2'>Your password must have at least:</div>
      <div className="flex flex-col items-start -space-y-2">
        <div className='flex items-center'>
          <Checkbox {...label} defaultChecked color="success" />
          <div>label="Parent</div>
        </div>
        <div className='flex items-center'>
          <Checkbox {...label} defaultChecked color="success" />
          <div>label="Parent</div>
        </div>
        <div className='flex items-center'>
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
const PhoneValid = (props) => {
  const [count] = useCountDown({ mss: 60 });
  const [isCodeInput, setCodeInput] = React.useState(false);
  const ReSentCode = () => {
    return (
      <div className="z-30 w-full h-full p-8 bg-white">
        <Header className="shadow-none" title=""></Header>
        <div className="text-2xl font-medium">Email Verification</div>
        <div>
          Enter the 6-digit verification code you received at
          testemail@my.yorku.ca. The code are valid for 30 minutes
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
  return (
    <div className="z-30 w-full h-full p-8 bg-white">
      <Header className="shadow-none" title=""></Header>
      <div className="text-2xl font-medium">Email Verification</div>
      <div>
        Enter the 6-digit verification code you received at
        testemail@my.yorku.ca. The code are valid for 30 minutes
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
export default function Valid() {
  const NodeList = [PhoneValid, PhoneValid, Password];
  const [state, setState] = React.useState(0);
  const Node = NodeList[state];
  return <Node setState={setState}></Node>;
}
