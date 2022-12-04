import React from "react";
import ShortMenu from "@type/ShortMenu";
import DiscountBadge from "@components/DiscountBadge";
import checkDiscountedPeriod from "@utils/checkDiscountedPeriod";

type ShortMenuItemProp = {
  item: ShortMenu;
  onClick: () => void;
};

const ShortMenuItem = ({ item, onClick }: ShortMenuItemProp) => {
  let {
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
      className="relative flex w-full items-center gap-4 rounded-xl border-2 p-4 transition  hover:scale-[1.02] hover:shadow-xl"
      data-testid="short-menu-item"
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
              {Math.round(
                (fullPrice * (100 - discountedPercent)) / 100
              ).toLocaleString()}{" "}
              บาท
            </span>
          ) : (
            <span>{fullPrice.toLocaleString()} บาท</span>
          )}
          {discountedTimePeriod &&
          checkDiscountedPeriod(discountedTimePeriod, discountedPercent) ? (
            <span className="text-sm font-medium text-gray-500 line-through">
              {fullPrice.toLocaleString()} บาท{" "}
            </span>
          ) : null}
        </div>
        <p className="text-sm text-gray-700">
          ขายได้ {sold.toLocaleString()} ชิ้น
        </p>
        <div className="space-x-2">
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
