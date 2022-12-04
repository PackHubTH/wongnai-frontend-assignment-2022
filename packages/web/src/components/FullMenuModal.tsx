import useFullMenuItemAPI from "@api/FullMenuItemAPI";
import Error from "@pages/Error";
import checkDiscountedPeriod from "@utils/checkDiscountedPeriod";
import DiscountBadge from "@components/DiscountBadge";
import ModalLayout from "./ModalLayout";
import Timer from "./Timer";
import React, { useState } from "react";
import PopularBadge from "@components/PopularBadge";

type ModalProps = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  menuName: string;
};

type OptionsProps = {
  label: string;
  choices: {
    label: string;
  }[];
};

const FullMenuModal = (props: ModalProps) => {
  if (!props.showModal) return null;

  const [isDiscounted, setIsDiscounted] = useState(false);

  const restaurantId = process.env.VITE_RESTAURANT_ID;
  if (!restaurantId) return <Error />;

  const { data, error, isLoading } = useFullMenuItemAPI(
    restaurantId,
    props.menuName
  );
  if (isLoading)
    return (
      <ModalLayout
        showModal={props.showModal}
        setShowModal={props.setShowModal}
      >
        <div className="flex animate-pulse flex-col gap-2 pb-2">
          <div className="h-80 w-full rounded-t-xl bg-gray-300 object-cover"></div>
          <div className="mx-2 h-6 w-3/5 rounded-full bg-gray-200"></div>
          <div className="mx-2 h-8 w-2/5 rounded-full bg-gray-200"></div>
          <div className="mx-2 mt-4 h-6 w-2/5 rounded-full bg-gray-200"></div>
          <div className="mx-4 h-4 w-3/5 rounded-full bg-gray-200"></div>
          <div className="mx-4 h-4 w-3/5 rounded-full bg-gray-200"></div>
          <div className="mx-2 mt-4 h-6 w-2/5 rounded-full bg-gray-200"></div>
        </div>
      </ModalLayout>
    );

  if (error) return <Error />;

  if (
    !isDiscounted &&
    data.discountedTimePeriod &&
    checkDiscountedPeriod(data.discountedTimePeriod, data.discountedPercent)
  ) {
    setIsDiscounted(true);
  }

  return (
    <ModalLayout showModal={props.showModal} setShowModal={props.setShowModal}>
      <div className="relative h-72 w-full" data-testid="full-menu-modal">
        {data.popular && data?.popular.id === data.id && <PopularBadge />}
        <div className="absolute -top-24 h-full w-full bg-gradient-to-b from-black to-transparent"></div>
        <img
          alt={data.name ?? "image"}
          src={data.largeImage ?? "https://via.placeholder.com/600?text=image"}
          className="h-full w-full rounded-t-xl bg-fixed object-cover"
        />
      </div>

      <div className="space-y-1 bg-white p-4">
        <h1 className="text-xl">{data.name}</h1>
        <div className="flex flex-wrap items-center gap-2 text-2xl font-medium text-green-700">
          {isDiscounted ? (
            <span>
              {Math.round(
                (data.fullPrice * (100 - data.discountedPercent)) / 100
              ).toLocaleString()}{" "}
              บาท
            </span>
          ) : (
            <span>{data.fullPrice.toLocaleString()} บาท</span>
          )}
          {data.discountedTimePeriod &&
          checkDiscountedPeriod(
            data.discountedTimePeriod,
            data.discountedPercent
          ) ? (
            <span className="text-sm font-medium text-gray-500 line-through">
              {data.fullPrice.toLocaleString()} บาท{" "}
            </span>
          ) : null}
        </div>
        {data.discountedTimePeriod &&
        checkDiscountedPeriod(
          data.discountedTimePeriod,
          data.discountedPercent
        ) ? (
          <div className="flex flex-wrap gap-2">
            <DiscountBadge discount={data.discountedPercent} />
            <Timer
              setIsDiscounted={setIsDiscounted}
              callQueuedTime={data.discountedTimePeriod.end}
            />
          </div>
        ) : null}
        <p className="flex flex-wrap gap-2 pt-2 text-xs text-gray-500">
          ขาย: {data.sold.toLocaleString()} ชิ้น | เหลือ:{" "}
          {data.totalInStock.toLocaleString()} ชิ้น
        </p>
      </div>

      {data.options.length > 0 && <div className="h-0 bg-gray-200 py-1"></div>}

      <div className=" overflow-auto bg-white px-4 py-2">
        {data.options.map((option: OptionsProps, i: number) => {
          return (
            <div key={i} className="py-2">
              <ul className="list-disc pb-2 text-xl">{option.label}</ul>
              {option.choices.map((item, j) => {
                return <li key={j}>{item.label}</li>;
              })}
            </div>
          );
        })}
      </div>
    </ModalLayout>
  );
};

export default FullMenuModal;
