import {FC, useEffect, useRef, useState} from "react";
import {parseTime} from "../utlis/number-utils.ts";

export interface IProps {
  time: number;
  timedOut: () => void;
}

const CountDown: FC<IProps> = ({time, timedOut}) => {
  const [timeRemain, setTimeRemain] = useState(time);
  const timeInterval = useRef(0);

  useEffect(() => {
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
    <span className={'font-mono text-9xl'}>{parseTime(timeRemain)}</span>
  </section>
}

export {CountDown}