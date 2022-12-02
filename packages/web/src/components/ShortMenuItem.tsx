import React from "react";
import ShortMenu from "@type/ShortMenu";
import DiscountBadge from "@components/DiscountBadge";
import checkDiscountedPeriod from "@utils/checkDiscountedPeriod";
import numberWithCommas from "@utils/numberWithCommas";

type ShortMenuItemProp = {
  item: ShortMenu;
  isFirst: number;
  onClick: () => void;
};

const ShortMenuItem = ({ item, isFirst, onClick }: ShortMenuItemProp) => {
  const {
    name,
    thumbnailImage,
    discountedTimePeriod,
    discountedPercent,
    fullPrice,
    sold,
    totalInStock,
  } = item;

  return (
    <div
      className="relative flex w-full cursor-pointer items-center rounded-xl border-2 transition hover:scale-[1.02]  hover:shadow-xl"
      style={{ opacity: totalInStock === 0 ? 0.4 : 1 }}
      onClick={onClick}
    >
      {totalInStock === 0 && (
        <div className="absolute flex h-full w-full items-center justify-center rounded-xl">
          <p className="text-4xl">หมด</p>
        </div>
      )}
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
        <div className=" space-x-2 text-xl font-medium text-green-700">
          {discountedTimePeriod &&
          checkDiscountedPeriod(discountedTimePeriod, discountedPercent) ? (
            <span>
              {numberWithCommas((fullPrice * (100 - discountedPercent)) / 100)}{" "}
              บาท
            </span>
          ) : (
            <span>{numberWithCommas(fullPrice)} บาท</span>
          )}
          {discountedTimePeriod &&
          checkDiscountedPeriod(discountedTimePeriod, discountedPercent) ? (
            <span className="text-sm font-medium text-gray-500 line-through">
              {numberWithCommas(fullPrice)} บาท{" "}
            </span>
          ) : null}
        </div>
        <p className="text-sm text-gray-700">
          ขายได้ {numberWithCommas(sold)} ชิ้น
        </p>
        {/* badge */}
        <div className="space-x-2">
          {/* {isFirst === 0 ? <PopularBadge /> : null} */}
          {discountedTimePeriod &&
          checkDiscountedPeriod(discountedTimePeriod, discountedPercent) ? (
            <DiscountBadge discount={discountedPercent} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ShortMenuItem;
