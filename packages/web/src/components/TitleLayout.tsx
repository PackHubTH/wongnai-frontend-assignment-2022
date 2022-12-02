import React from "react";

type LayoutProps = {
  children: React.ReactNode;
  scrolled: boolean;
};

const TitleLayout = ({ children, scrolled }: LayoutProps) => {
  return (
    <div
      className="sticky top-0 z-10 flex flex-col items-center justify-center bg-white p-2 text-center transition-all duration-200 ease-in sm:p-6"
      style={{ border: scrolled ? "2px solid gray" : "" }}
    >
      {children}
    </div>
  );
};

export default TitleLayout;
