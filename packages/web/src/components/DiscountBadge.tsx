import { FaPercent } from "react-icons/fa";

type BadgeProp = {
  discount: number;
};

const PopularBadge = (props: BadgeProp) => {
  return (
    <span className="inline-flex w-max flex-wrap items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
      <FaPercent className="mr-1.5 h-3 w-3" />
      <p className="text-xs">ลด {props.discount} %</p>
    </span>
  );
};

export default PopularBadge;
