import {FC, useEffect, useRef, useState} from "react";

export interface IProps {
  time: number;
  timedOut: () => void;
}

const CountDown: FC<IProps> = ({time, timedOut}) => {
  const [timeRemain, setTimeRemain] = useState(time);
  const timeInterval = useRef(0);

  useEffect(() => {
    console.log(time)
    if (timeInterval.current) {
      clearInterval(timeInterval.current);
      setTimeRemain(time);
    }
    timeInterval.current = setInterval(() => {
      setTimeRemain(prevState => {
        if (prevState > 0) return prevState - 1;
        else {
          clearInterval(timeInterval.current);
          timedOut();
          return prevState;
        }
      });
    }, 1000);
  }, [time]);

  return <section>
    {timeRemain}
  </section>
}

export {CountDown}