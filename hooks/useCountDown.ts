import { useEffect, useRef, useState } from "react";

interface IProps {
  mss: number;
}
type Fnc = () => void;
const noop = () => {};

const useCountDown = (props: IProps) => {
  const { mss } = props;
  const [time, setTime] = useState(mss || 0);
  const tickRef = useRef<Fnc>(noop);

  const tick = () => {
    setTime(currentTime => {
    if (currentTime > 0) {
      return currentTime - 1;
    }
    return currentTime;
  });
};
  useEffect(() => {
    tickRef.current = tick;
  });

  useEffect(() => {
    const timerId = setInterval(() => tickRef.current(), 1000);
    console.log("timerId", timerId);

    return () => clearInterval(timerId);
  }, []);

  return [time,setTime];
};

export default useCountDown;