import { ExchangeRate } from "./types";

export const API_GOV =
  "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";

export const NumRegExp = /^[0-9\./b]+$/;

export const uah: ExchangeRate = {
  txt: "Гривня",
  rate: 1,
  cc: "UAH",
  excangedate: "",
};
