type BadgeProp = {
  discount: number;
};

const PopularBadge = (props: BadgeProp) => {
  return (
    <span className="inline-flex w-max flex-wrap items-center justify-center rounded-md bg-red-500 px-2.5 py-0.5 text-xs text-white">
      {`ลด ${props.discount} %`}
    </span>
  );
};

export default PopularBadge;
