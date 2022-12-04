const PopularBadge = () => {
  return (
    <span
      className="text-md absolute top-4 left-4 z-40 inline-flex w-max flex-wrap items-center justify-center rounded-md bg-red-500 px-2.5 py-0.5 text-white"
      data-testid="popular-badge"
    >
      ขายดีที่สุด
    </span>
  );
};

export default PopularBadge;
