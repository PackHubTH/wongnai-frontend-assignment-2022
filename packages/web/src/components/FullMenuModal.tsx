import { AiFillCloseCircle } from "react-icons/ai";
import useFullMenuItemAPI from "@api/FullMenuItemAPI";
import Error from "@pages/Error";
import checkDiscountedPeriod from "@utils/checkDiscountedPeriod";
import DiscountBadge from "@components/DiscountBadge";

type ModalProps = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  menuName: string;
};

type OptionsProps = {
  label: string;
  choices: string[];
};

const FullMenuModal = (props: ModalProps) => {
  if (!props.showModal) return null;

  const { data, error, isLoading } = useFullMenuItemAPI(
    import.meta.env.VITE_RESTAURANT_ID,
    props.menuName
  );

  if (isLoading)
    return (
      <div
        className="fixed z-30 flex h-screen w-screen items-center justify-center  transition duration-500"
        style={{
          visibility: props.showModal ? "visible" : "hidden",
          opacity: props.showModal ? 1 : 0,
        }}
      >
        <div
          className="z-40 h-screen w-full"
          onClick={() => props.setShowModal(false)}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        ></div>
        <div className="absolute z-50 flex h-4/5 w-screen max-w-2xl flex-col gap-2 rounded-xl  bg-white pb-4 shadow-2xl md:w-4/5">
          <AiFillCloseCircle
            className="absolute top-2 right-4 h-8 w-8 cursor-pointer text-red-500"
            onClick={() => props.setShowModal(false)}
          />
          <div className="flex animate-pulse flex-col gap-2">
            <div className="h-80 w-full rounded-t-xl bg-gray-300 object-cover"></div>
            <div className="mx-2 h-6 w-3/5 rounded-full bg-gray-200"></div>
            <div className="mx-2 h-8 w-2/5 rounded-full bg-gray-200"></div>
            <div className="mx-2 mt-4 h-6 w-2/5 rounded-full bg-gray-200"></div>
            <div className="mx-4 h-4 w-3/5 rounded-full bg-gray-200"></div>
            <div className="mx-4 h-4 w-3/5 rounded-full bg-gray-200"></div>
            <div className="mx-2 mt-4 h-6 w-2/5 rounded-full bg-gray-200"></div>
            <div className="mx-4 h-4 w-3/5 rounded-full bg-gray-200"></div>
          </div>
        </div>
      </div>
    );

  if (error) return <Error />;

  console.log("modal data", data);
  // if (data)
  return (
    <div
      className="fixed z-30 flex h-screen w-screen items-center justify-center transition duration-500"
      style={{
        visibility: props.showModal ? "visible" : "hidden",
        opacity: props.showModal ? 1 : 0,
      }}
    >
      <div
        className="z-40 h-screen w-full"
        onClick={() => props.setShowModal(false)}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      ></div>
      <div className="absolute z-50 flex h-max max-h-[80%] w-screen max-w-2xl flex-col gap-2 overflow-y-auto rounded-xl  bg-white pb-4 shadow-2xl md:w-4/5">
        <AiFillCloseCircle
          className="absolute top-2 right-4 h-8 w-8 cursor-pointer text-red-500"
          onClick={() => props.setShowModal(false)}
        />
        <img
          // src="https://via.placeholder.com/600?text=image"
          src={data.largeImage ?? "https://via.placeholder.com/600?text=image"}
          className="h-80 w-full rounded-t-xl bg-fixed object-cover"
        />
        <h1 className="px-4 text-xl">{data.name}</h1>
        <p className="space-x-2 px-4">
          <span className="text-2xl font-medium text-emerald-700">
            ราคา {data.fullPrice} บาท
          </span>
          <span className="text-md text-gray-500 line-through">80 บาท</span>
          {data.discountedTimePeriod &&
          checkDiscountedPeriod(
            data.discountedTimePeriod,
            data.discountedPercent
          ) ? (
            <DiscountBadge discount={data.discountedPercent} />
          ) : null}
        </p>
        <p className="space-x-2 px-4">
          <span className="text-md font-medium text-blue-500">
            ขาย: {data.sold} ชิ้น
          </span>
          <span className="text-md font-medium text-red-500">
            เหลือ: {data.totalInStock} ชิ้น
          </span>
        </p>
        <div className="px-4">
          {data.options.map((option: OptionsProps, i: number) => {
            return (
              <div key={i} className="py-2">
                <h1 className="pb-2 text-xl">{option.label}</h1>
                {option.choices.map((item, j) => {
                  return <p key={j}>- {item.label}</p>;
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
  // else return null;
};

export default FullMenuModal;
