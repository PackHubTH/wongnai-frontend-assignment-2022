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
  let {
    name,
    thumbnailImage,
    discountedTimePeriod,
    discountedPercent,
    fullPrice,
    sold,
    totalInStock,
  } = item;

  if (name.includes("a")) totalInStock = 0;
  if (!discountedPercent) {
    discountedPercent = 21;
    discountedTimePeriod = {
      begin: "00:00",
      end: "02:50",
    };
  }
  return (
    <div
      className="relative flex w-full items-center gap-4 rounded-xl border-2 p-4 transition  hover:scale-[1.02] hover:shadow-xl"
      style={{
        opacity: !totalInStock ? 0.4 : 1,
        filter: !totalInStock ? "grayscale(1)" : "none",
        cursor: !totalInStock ? "not-allowed" : "pointer",
      }}
      onClick={totalInStock ? onClick : () => {}}
    >
      <img
        alt={name}
        className="h-full w-full max-w-[72px] rounded-lg object-cover sm:max-w-[128px]"
        src={thumbnailImage ?? "https://via.placeholder.com/150/?text=image"}
      />
      <div className="flex flex-col gap-2 overflow-clip break-words">
        <h1 className="text-sm sm:text-lg">{name}</h1>
        <div className=" space-x-2 text-xl font-medium text-green-700">
          {discountedTimePeriod &&
          checkDiscountedPeriod(discountedTimePeriod, discountedPercent) ? (
            <span>
              {numberWithCommas(
                Math.round((fullPrice * (100 - discountedPercent)) / 100)
              )}{" "}
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
