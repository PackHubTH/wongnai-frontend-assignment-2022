import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

type SearchProps = {
  plcaeholder?: string;
  onChange: (e: string) => void;
};

const SearchBox = ({ onChange, plcaeholder }: SearchProps) => {
  return (
    <div className="relative w-full rounded-full border-2 pl-8 pr-2 sm:w-3/5">
      <AiOutlineSearch className="absolute left-2 top-1 text-gray-500" />
      <input
        className="h-full w-full outline-none"
        type="text"
        placeholder={plcaeholder ?? "ค้นหา"}
        onChange={(e) => onChange(e.target.value)}
      ></input>
    </div>
  );
};

export default SearchBox;
