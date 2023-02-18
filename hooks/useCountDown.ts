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
    const timerId = setInterval(() => {
      setTime(currentTime => {
        if (currentTime > 0) {
          return currentTime - 1;
        }
        if(currentTime === 0){
          clearInterval(timerId);
          return 0
        }
        return currentTime;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return [time, setTime];
};

export default useCountDown;