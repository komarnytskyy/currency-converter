import React, { FC } from "react";
import { ColumnProps } from "./types";

export const Column: FC<ColumnProps> = ({ children }) => {
  return (
    <div className="column">
      <div className="ui segment">{children}</div>
    </div>
  );
};
