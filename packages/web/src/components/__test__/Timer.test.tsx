import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Timer from "@components/Timer";

describe("Timer", () => {
  it("render Timer correctly when it is not equal to 0", () => {
    const onSetEvent = jest.fn((value) => {});

    jest.useFakeTimers().setSystemTime(new Date("1970-01-02T00:00:00.000Z"));
    render(<Timer setIsDiscounted={onSetEvent} callQueuedTime="08:00" />);
    const element = screen.getByTestId("timer-trigger");
    expect(element).toBeInTheDocument();
  });

  it("do nothing when it is equal or less than to 0", () => {
    const onSetEvent = jest.fn((value) => {});

    jest.useFakeTimers().setSystemTime(new Date("1970-01-02T02:00:00.000Z"));
    render(<Timer setIsDiscounted={onSetEvent} callQueuedTime="08:00" />);
    expect(onSetEvent).toBeCalledTimes(0);
  });
});
