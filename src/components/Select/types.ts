import { ChangeEventHandler } from "react";
import { ExchangeRate } from "../../types";

export type SelectProps = {
  currencies: ExchangeRate[];
  handleSelectChange: ChangeEventHandler<HTMLSelectElement> | undefined;
};
