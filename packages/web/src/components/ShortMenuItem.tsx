import React from "react";
import ShortMenu from "@type/ShortMenu";
import PopularBadge from "@components/PopularBadge";
import DiscountBadge from "@components/DiscountBadge";

type ShortMenuItemProp = {
  item: ShortMenu;
  isFirst: number;
};

const ShortMenuItem = ({ item, isFirst }: ShortMenuItemProp) => {
  const {
    name,
    thumbnailImage,
    discountedTimePeriod,
    discountedPercent,
    fullPrice,
    sold,
    totalInStock,
  } = item;

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

  const checkDiscountedPeriod = () => {
    const now = new Date().getTime();
    if (discountedTimePeriod && discountedPercent > 0) {
      return (
        now >= getTimefromString("00:00") &&
        now <= getTimefromString(discountedTimePeriod.begin)
      );
    }
    return false;
  };

  return (
    <div className="relative flex w-full cursor-pointer items-center  rounded-xl border-2 transition hover:scale-105  hover:shadow-xl ">
      {/* <div className="absolute flex justify-center items-center opacity-70 w-full h-full bg-gray-500 rounded-xl ">
        <p className="text-4xl">หมด</p>
      </div> */}
      {thumbnailImage ? (
        <img
          alt={name}
          className="m-4 h-32 w-32 rounded-lg object-cover"
          src={thumbnailImage}
        />
      ) : (
        <img
          alt="coverImage"
          className="m-4 h-32 w-32 rounded-lg object-cover"
          src="https://via.placeholder.com/150/?text=image"
        />
      )}
      <div className="m-4 flex flex-col  gap-2 break-words">
        <h1>{name}</h1>
        <div className=" space-x-2 text-xl font-medium text-green-800">
          <span className={checkDiscountedPeriod() ? "line-through" : ""}>
            {fullPrice} บาท{" "}
          </span>
          {checkDiscountedPeriod() && (
            <span>{(fullPrice * (100 - discountedPercent)) / 100} บาท</span>
          )}
        </div>
        <p className="text-sm text-gray-700">ขายได้ {sold} ชิ้น</p>
        {/* badge */}
        <div className="space-x-2">
          {isFirst === 0 ? <PopularBadge /> : null}
          {checkDiscountedPeriod() ? (
            <DiscountBadge discount={discountedPercent} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ShortMenuItem;
