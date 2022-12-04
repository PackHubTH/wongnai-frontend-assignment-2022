import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ShortMenuItem from "@components/ShortMenuItem";

const menuTemp = {
  name: "Egg",
  id: "Egg",
  discountedPercent: 100,
  discountedTimePeriod: {
    begin: "10:30",
    end: "12:00",
  },
  fullPrice: 10,
  sold: 100,
  totalInStock: 200,
};

const menuTemp2 = {
  name: "Egg",
  id: "Egg",
  discountedPercent: 100,
  discountedTimePeriod: {
    begin: "10:30",
    end: "12:00",
  },
  fullPrice: 10,
  sold: 100,
  totalInStock: 0,
};

describe("ShortMenuItem", () => {
  it("render ShortMenuItem correctly by comparison with name", () => {
    render(<ShortMenuItem item={menuTemp} onClick={jest.fn()} />);
    const element = screen.getByTestId("short-menu-item");
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent("Egg");
  });

  it("render ShortMenuItem correctly with discount", () => {
    jest.useFakeTimers().setSystemTime(new Date("1970-01-02T04:00:00.000Z"));
    render(<ShortMenuItem item={menuTemp} onClick={jest.fn()} />);
    const element = screen.getByTestId("short-menu-item");
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent("ลด 100 %");
  });

  it("render ShortMenuItem correctly with totalInStock = 0", () => {
    render(<ShortMenuItem item={menuTemp2} onClick={jest.fn()} />);
    const element = screen.getByTestId("short-menu-item");
    expect(element).toBeInTheDocument();
    expect(element).toHaveStyle("opacity: 0.4");
  });

  it("ShortMenuItem can click", () => {
    const onClickEvent = jest.fn();
    render(<ShortMenuItem item={menuTemp} onClick={onClickEvent} />);
    const element = screen.getByTestId("short-menu-item");
    expect(element).toBeInTheDocument();
    fireEvent.click(element);
    expect(onClickEvent).toBeCalled();
  });

  it("ShortMenuItem cannot click when totalInStock = 0", () => {
    const onClickEvent = jest.fn();
    render(<ShortMenuItem item={menuTemp2} onClick={onClickEvent} />);
    const element = screen.getByTestId("short-menu-item");
    expect(element).toBeInTheDocument();
    fireEvent.click(element);
    expect(onClickEvent).toBeCalledTimes(0);
  });
});
