import React, { FC } from "react";
import { CurrencyBannerProps } from "./types";

export const CurrencyBanner: FC<CurrencyBannerProps> = ({ rate, title }) => {
  return (
    <div className="column">
      <h3>{title}</h3>
      <p>{rate}</p>
    </div>
  );
};
