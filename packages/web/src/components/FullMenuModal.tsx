import { AiFillCloseCircle } from "react-icons/ai";
import useFullMenuItemAPI from "@api/FullMenuItemAPI";
import Error from "@pages/Error";
import checkDiscountedPeriod from "@utils/checkDiscountedPeriod";
import numberWithCommas from "@utils/numberWithCommas";
import DiscountBadge from "@components/DiscountBadge";
import { Fragment } from "react";
import ModalLayout from "./ModalLayout";

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
      // <div
      //   className="fixed z-30 flex h-screen w-screen items-center justify-center  transition duration-500"
      //   style={{
      //     visibility: props.showModal ? "visible" : "hidden",
      //     opacity: props.showModal ? 1 : 0,
      //   }}
      // >
      //   <div
      //     className="z-40 h-screen w-full"
      //     onClick={() => props.setShowModal(false)}
      //     style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      //   ></div>
      //   <div className="absolute z-50 flex h-4/5 w-screen max-w-2xl flex-col gap-2 rounded-xl  bg-white pb-4 shadow-2xl md:w-4/5">
      //     <AiFillCloseCircle
      //       className="absolute top-2 right-4 h-8 w-8 cursor-pointer text-red-500"
      //       onClick={() => props.setShowModal(false)}
      //     />
      <ModalLayout
        showModal={props.showModal}
        setShowModal={props.setShowModal}
      >
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
      </ModalLayout>
    );

  if (error) return <Error />;

  console.log("modal data", data);
  // if (data)
  return (
    <ModalLayout showModal={props.showModal} setShowModal={props.setShowModal}>
      <img
        // src="https://via.placeholder.com/600?text=image"
        src={data.largeImage ?? "https://via.placeholder.com/600?text=image"}
        className="h-80 w-full rounded-t-xl bg-fixed object-cover"
      />
      <h1 className="px-4 text-xl">{data.name}</h1>
      {/* <p className="flex flex-wrap items-center gap-2 px-4">
          <span className="text-2xl font-medium text-emerald-700 ">
            ราคา {numberWithCommas(data.fullPrice)} บาท
          </span>
          {data.discountedTimePeriod &&
          checkDiscountedPeriod(
            data.discountedTimePeriod,
            data.discountedPercent
          ) ? (
            <Fragment>
              <span className="text-md  text-gray-500 line-through">
                {numberWithCommas(8000)} บาท
              </span>
              <DiscountBadge discount={data.discountedPercent} />
            </Fragment>
          ) : null}
        </p> */}
      <div className="flex flex-wrap items-center gap-2 px-4 text-2xl font-medium text-green-700">
        {data.discountedTimePeriod &&
        checkDiscountedPeriod(
          data.discountedTimePeriod,
          data.discountedPercent
        ) ? (
          <span>
            {numberWithCommas(
              (data.fullPrice * (100 - data.discountedPercent)) / 100
            )}{" "}
            บาท
          </span>
        ) : (
          <span>{numberWithCommas(data.fullPrice)} บาท</span>
        )}
        {data.discountedTimePeriod &&
        checkDiscountedPeriod(
          data.discountedTimePeriod,
          data.discountedPercent
        ) ? (
          <span className="text-sm font-medium text-gray-500 line-through">
            {numberWithCommas(data.fullPrice)} บาท{" "}
          </span>
        ) : null}
      </div>
      <p className="flex flex-wrap gap-2 px-4">
        <span className="text-md font-medium text-blue-500">
          ขาย: {numberWithCommas(data.sold)} ชิ้น
        </span>
        <span className="text-md font-medium text-red-500">
          เหลือ: {numberWithCommas(data.totalInStock)} ชิ้น
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
    </ModalLayout>
  );
  // else return null;
};

export default FullMenuModal;
