import { useEffect, useRef, useState } from "react";

interface IProps {
  mss: any;
}
type Fnc = () => void;
const noop = () => {};

const useCountDown = (props: IProps) => {
  const { mss } = props;
  const [time, setTime] = useState(mss || 0);

  useEffect(() => {
    let timerId: number | undefined | any;
    if (time > 0) {
      timerId = setInterval(() => {
        setTime(currentTime => {
          if (currentTime > 0) {
            return currentTime - 1;
          }
          return 0;
        });
      }, 1000);
    }else{
      setTime(0);
      if (timerId) {
        clearInterval(timerId);
      }
    }
    console.log(time,'use count down time out')
    return () => {
      // setTime(0);
      console.log(time,'use count down time return')
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [time]);

  return [time, setTime];
};

export default useCountDown;