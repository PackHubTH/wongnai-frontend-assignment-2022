import React from "react";
import { render, screen } from "@testing-library/react";
import ButtonGroup from "@components/ButtonGroup";

describe("ButtonGroup", () => {
  it("render group of buttons correctly", () => {
    render(<ButtonGroup isDefault={true} setIsDefault={() => {}} />);
    const element = screen.getByTestId("button-group");
    expect(element).toBeInTheDocument();
  });
});
