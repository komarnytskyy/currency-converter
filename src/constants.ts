export const API_GOV =
  "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
export const RE = /^[0-9\b]+$/;
export const initialState = {
  cc: "",
  excangedate: "",
  rate: 0,
  txt: "",
};
export interface exchangeRate {
  cc: string;
  excangedate: string;
  rate: number;
  txt: string;
}
