import React, { FC } from "react";
import { InputProps } from "./types";

export const Input: FC<InputProps> = ({ value, handleInputChange }) => {
  return (
    <div className="ui input">
      <input type="text" value={value} onChange={handleInputChange} />
    </div>
  );
};
