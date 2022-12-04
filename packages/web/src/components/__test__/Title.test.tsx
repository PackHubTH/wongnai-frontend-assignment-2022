import React from "react";
import { render, screen } from "@testing-library/react";
import Title from "@components/Title";
import TitleLayout from "@components/TitleLayout";
import { Restaurant } from "@type/Restaurant";

const titleTemp: Restaurant = {
  name: "Ekkamai Macchiato - Home Brewer",
  id: 227018,
  coverImage:
    "https://img.wongnai.com/p/1920x0/2021/03/09/fc6f2b50e313418590eb113cbc4981c2.jpg",
  activeTimePeriod: {
    open: "08:00",
    close: "17:00",
  },
  page: 1,
  pageAmount: 10,
};

describe("Title", () => {
  it("render title correctly by comparison with name", () => {
    render(
      <TitleLayout scrolled={true}>
        <Title {...titleTemp} />
      </TitleLayout>
    );
    const element = screen.getByTestId("title");
    expect(element).toHaveTextContent("Ekkamai Macchiato - Home Brewer");
  });

  it("render title correctly when it is open", () => {
    jest.useFakeTimers().setSystemTime(new Date("1970-01-02T04:00:00.000Z"));
    render(
      <TitleLayout scrolled={true}>
        <Title {...titleTemp} />
      </TitleLayout>
    );
    const element = screen.getByTestId("title");
    expect(element).toHaveTextContent("เปิดอยู่");
    expect(element).toHaveTextContent("ปิดในเวลา 17:00 น.");
  });

  it("render title correctly when it is open", () => {
    jest.useFakeTimers().setSystemTime(new Date("1970-01-02T00:00:00.000Z"));
    render(
      <TitleLayout scrolled={true}>
        <Title {...titleTemp} />
      </TitleLayout>
    );
    const element = screen.getByTestId("title");
    expect(element).toHaveTextContent("ปิดอยู่");
    expect(element).toHaveTextContent("เปิดในเวลา 08:00 น.");
  });
});
