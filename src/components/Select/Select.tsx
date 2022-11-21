import React, { FC } from "react";
import { SelectProps } from "./types";

export const Select: FC<SelectProps> = ({ currencies, handleSelectChange }) => {
  return (
    <select className="ui dropdown" onChange={handleSelectChange}>
      {currencies &&
        currencies.map((el) => (
          <option key={el.cc} value={el.rate}>
            {el.cc}
          </option>
        ))}
    </select>
  );
};
