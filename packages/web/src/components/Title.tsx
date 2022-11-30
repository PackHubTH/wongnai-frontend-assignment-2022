import { Restaurant } from "@type/Restaurant";
import React, { useState, useEffect } from "react";

const Title = (props: Restaurant) => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    console.log("offset", offset, scrolled);
    if (offset > 322) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  return (
    <div
      className="sticky top-0 z-10 flex flex-col items-center justify-center bg-white p-6 text-center transition-all duration-200 ease-in"
      style={{ border: scrolled ? "2px solid gray" : "" }}
    >
      <h1 className="w-4/5 text-4xl" style={{ textShadow: "2px 2px grey" }}>
        {props.name}
      </h1>
      <h1>
        {props.activeTimePeriod.open === props.activeTimePeriod.close
          ? "เปิด 24 ชั่วโมง"
          : `เปิด ${props.activeTimePeriod.open} น. - ${props.activeTimePeriod.close} น.`}
      </h1>
    </div>
  );
};

export default Title;
