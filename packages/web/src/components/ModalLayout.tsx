import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

type ModalProps = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  children: React.ReactNode;
};

const ModalLayout = ({ children, showModal, setShowModal }: ModalProps) => {
  return (
    <div
      className="fixed z-30 flex h-screen w-screen items-center justify-center  transition duration-500"
      style={{
        visibility: showModal ? "visible" : "hidden",
        opacity: showModal ? 1 : 0,
      }}
    >
      <div
        className="z-40 h-screen w-full"
        onClick={() => setShowModal(false)}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      ></div>
      <div className="absolute z-50 flex h-4/5 w-screen max-w-2xl flex-col gap-2 overflow-auto rounded-xl  bg-white pb-4 shadow-2xl md:w-4/5">
        <AiFillCloseCircle
          className="absolute top-2 right-4 h-8 w-8 cursor-pointer text-red-500"
          onClick={() => setShowModal(false)}
        />
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
