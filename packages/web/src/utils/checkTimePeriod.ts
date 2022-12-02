import getTimefromString from "./getTimeFromString";

type PeriodProps = {
  open: string;
  close: string;
}

const checkTimePeriod = (period: PeriodProps ) => {
  const now = new Date().getTime();
    return (
      now >= getTimefromString(period.open) &&
      now <= getTimefromString(period.close)
    );
};

export default checkTimePeriod;