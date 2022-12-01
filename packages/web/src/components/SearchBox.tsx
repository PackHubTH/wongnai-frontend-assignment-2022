import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

type SearchProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBox = (props: SearchProps) => {
  return (
    <div className="relative w-4/5 rounded-full border-2 pl-8 pr-2 sm:w-3/5">
      <AiOutlineSearch className="absolute left-2 top-1 text-gray-500" />
      <input
        className="h-full w-full outline-none"
        type="text"
        placeholder="ค้นหา"
        onChange={props.onChange}
      ></input>
    </div>
  );
};

export default SearchBox;
