import React from "react";
import { render, screen } from "@testing-library/react";
import Error from "@pages/Error";

describe("Error", () => {
  it("render error page", () => {
    render(<Error />);
    const errorElement = screen.getByTestId("error-page");
    expect(errorElement).toBeInTheDocument();
  });

  it("render icon in error page", () => {
    render(<Error />);
    const iconElement = screen.getByTestId("error-icon");
    expect(iconElement).toBeInTheDocument();
  });

  it("render text in error page", () => {
    render(<Error />);
    const textElement = screen.getByTestId("error-text");
    expect(textElement).toBeInTheDocument();
  });
});
