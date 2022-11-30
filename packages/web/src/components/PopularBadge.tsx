import { FaFireAlt } from "react-icons/fa";

const PopularBadge = () => {
  return (
    <span className="inline-flex w-max flex-wrap items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700">
      <FaFireAlt className="mr-1.5 h-4 w-4" />
      <p className="text-xs">ยอดนิยม</p>
    </span>
  );
};

export default PopularBadge;
