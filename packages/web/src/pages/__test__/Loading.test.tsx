import React from "react";
import { render, screen } from "@testing-library/react";
import Loading from "@pages/Loading";

describe("Loading", () => {
  it("render loading page", () => {
    render(<Loading />);
    const errorElement = screen.getByTestId("loading-page");
    expect(errorElement).toBeInTheDocument();
  });

  it("render icon in loading page", () => {
    render(<Loading />);
    const iconElement = screen.getByTestId("loading-icon");
    expect(iconElement).toBeInTheDocument();
  });

  it("render text in loading page", () => {
    render(<Loading />);
    const textElement = screen.getByTestId("loading-text");
    expect(textElement).toBeInTheDocument();
  });
});
