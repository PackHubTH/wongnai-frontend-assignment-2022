import React from "react";
import { render } from "@testing-library/react";
import Banner from "@components/Banner";

describe("Loading", () => {
  it("render banner", () => {
    render(<Banner image="http://placekitten.com/1920/1080" />);
    const testImage = document.querySelector("img") as HTMLImageElement;
    expect(testImage.src).toContain("http://placekitten.com/1920/1080");
  });
});
