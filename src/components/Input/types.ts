import { ChangeEventHandler } from "react";

export type InputProps = {
  value: number;
  handleInputChange: ChangeEventHandler<HTMLInputElement> | undefined;
};
