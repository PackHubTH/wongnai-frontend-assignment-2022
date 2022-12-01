const getTimefromString = (time: string) => {
  const time_temp: string[] = time.split(":");
  const now = new Date();
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    parseInt(time_temp[0]),
    parseInt(time_temp[1])
  ).getTime();
};
// console.log(getDateFromHours("01:12").getTime());

type PeriodProps = {
  begin: string;
  end: string;
}

const checkDiscountedPeriod = (period: PeriodProps , percent: number) => {
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