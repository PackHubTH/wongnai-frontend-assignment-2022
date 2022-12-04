import React from "react";
import { render, screen } from "@testing-library/react";
import PopularBadge from "@components/PopularBadge";

describe("PopularBadge", () => {
  it("render popular badge correctly", () => {
    render(<PopularBadge />);
    const element = screen.getByTestId("popular-badge");
    expect(element).toBeInTheDocument();
  });
});
