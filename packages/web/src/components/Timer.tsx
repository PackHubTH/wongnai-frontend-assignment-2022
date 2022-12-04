import React, { useEffect, useState } from "react";
import getTimefromString from "@utils/getTimeFromString";
import { BiTime } from "react-icons/bi";

type TimerProps = {
  callQueuedTime: string;
  setIsDiscounted: (isDiscounted: boolean) => void;
};

const Timer = ({ callQueuedTime, setIsDiscounted }: TimerProps) => {
  const nanoTime = getTimefromString(callQueuedTime);
  const [seconds, setSeconds] = useState(() =>
    new Date(nanoTime - new Date().getTime()).getUTCSeconds()
  );
  const [minutes, setMinutes] = useState(() =>
    new Date(nanoTime - new Date().getTime()).getUTCMinutes()
  );
  const [hours, setHours] = useState(() =>
    new Date(nanoTime - new Date().getTime()).getUTCHours()
  );

  useEffect(() => {
    const intervalId = setInterval(function () {
      setSeconds(new Date(nanoTime - new Date().getTime()).getUTCSeconds());
      setMinutes(new Date(nanoTime - new Date().getTime()).getUTCMinutes());
      setHours(new Date(nanoTime - new Date().getTime()).getUTCHours());
      if (nanoTime < new Date().getTime()) setIsDiscounted(false);
      else setIsDiscounted(true);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [callQueuedTime]);

  if (nanoTime < new Date().getTime()) {
    return (
      <div
        className="flex items-center text-sm text-red-500"
        data-testid="timer-not-trigger"
      >
        <BiTime className="mr-1 inline-block" />
        <span>00 : 00 : 00</span>
      </div>
    );
  } else {
    return (
      <div
        className="flex items-center text-sm text-orange-600"
        data-testid="timer-trigger"
      >
        <BiTime className="mr-1 inline-block" />
        <span>
          {hours < 10 ? "0" : ""}
          {hours} : {minutes < 10 ? "0" : ""}
          {minutes} : {seconds < 10 ? "0" : ""}
          {seconds}
        </span>
      </div>
    );
  }
};

export default Timer;
