import React from "react";

type LayoutProps = {
  children: React.ReactNode;
  scrolled: boolean;
};

const TitleLayout = ({ children, scrolled }: LayoutProps) => {
  return (
    <div
      className="sticky top-0 z-10 flex flex-col items-center justify-center gap-2 rounded-b-lg bg-white p-4 text-center transition-all duration-200 ease-in sm:p-6"
      style={{ boxShadow: scrolled ? "0px 8px 16px rgba(0, 0, 0, 0.25)" : "" }}
    >
      {children}
    </div>
  );
};

export default TitleLayout;
