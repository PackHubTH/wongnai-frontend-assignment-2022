type BannerProp = {
  image: string;
};

const Banner = (props: BannerProp) => {
  return (
    <img
      alt="coverImage"
      className="h-80 w-full bg-fixed object-cover"
      src={props.image}
    />
  );
};

export default Banner;
