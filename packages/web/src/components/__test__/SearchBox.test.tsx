import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SearchBox from "@components/SearchBox";

describe("SearchBox", () => {
  it("search box updates on change", () => {
    const onChange = jest.fn((value) => {});

    render(<SearchBox onChange={onChange} search={""} />);
    const searchInput = screen.getByPlaceholderText("ค้นหา");
    fireEvent.change(searchInput, { target: { value: "test" } });
    expect(onChange).toBeCalledWith("test");
  });
});
