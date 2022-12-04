import React from "react";
import { render, screen } from "@testing-library/react";
import DiscountBadge from "@components/DiscountBadge";

describe("DiscountBadge", () => {
  it("render discount badge correctly", () => {
    render(<DiscountBadge discount={20} />);
    const element = screen.getByTestId("discount-badge");
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent("ลด 20 %");
  });
});
