import getTimefromString from "./getTimeFromString";

type PeriodProps = {
  begin: string;
  end: string;
};

const checkDiscountedPeriod = (period: PeriodProps, percent: number) => {
  const now = new Date().getTime();
  if (percent > 0) {
    return (
      now >= getTimefromString(period.begin) &&
      now <= getTimefromString(period.end)
    );
  }
  return false;
};

export default checkDiscountedPeriod;
