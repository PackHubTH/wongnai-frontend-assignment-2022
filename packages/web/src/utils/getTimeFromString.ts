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

export default getTimefromString;
