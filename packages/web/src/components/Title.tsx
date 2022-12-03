import React from "react";
import { Restaurant } from "@type/Restaurant";
import checkTimePeriod from "@utils/checkTimePeriod";

const Title = (props: Restaurant) => {
  return (
    <>
      <h1
        className="w-4/5 text-2xl sm:text-4xl"
        style={{ textShadow: "0px 2px grey" }}
      >
        {props.name}
      </h1>
      {props.activeTimePeriod.open === props.activeTimePeriod.close ? (
        <h1 className="text-md font-semibold text-emerald-600 sm:text-lg">
          เปิด 24 ชั่วโมง
        </h1>
      ) : checkTimePeriod(props.activeTimePeriod) ? (
        <span className="flex flex-wrap justify-center gap-2">
          <h1 className="text-md font-semibold text-emerald-600 sm:text-lg">
            เปิดอยู่
          </h1>
          <h1 className="text-md text-gray-600 sm:text-lg">
            {`ปิดในเวลา ${props.activeTimePeriod.close} น.`}
          </h1>
        </span>
      ) : (
        <span className="flex flex-wrap justify-center gap-2">
          <h1 className="text-md font-semibold text-red-600 sm:text-lg">
            ปิดอยู่
          </h1>
          <h1 className="text-md text-gray-600 sm:text-lg">
            {`เปิดในเวลา ${props.activeTimePeriod.open} น.`}
          </h1>
        </span>
      )}
    </>
  );
};

export default Title;
