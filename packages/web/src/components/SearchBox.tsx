import React from "react";

type SearchProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBox = (props: SearchProps) => {
  return (
    <input type="text" value={props.value} onChange={props.onChange}></input>
  );
};

export default SearchBox;
