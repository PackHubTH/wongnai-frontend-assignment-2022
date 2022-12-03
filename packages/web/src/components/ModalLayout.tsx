import React from "react";

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
      }}
    >
      <div
        className="z-40 h-screen w-full"
        onClick={() => setShowModal(false)}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      ></div>
      <div
        className="absolute z-50 flex w-screen max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl md:w-4/5"
        style={{ maxHeight: "80%" }}
      >
        <h1
          className="absolute top-2 right-6 z-40 cursor-pointer text-2xl text-white"
          onClick={() => setShowModal(false)}
        >
          X
        </h1>
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
