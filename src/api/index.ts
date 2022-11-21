import axios from "axios";
import { API_GOV } from "../constants";
import { ExchangeRate } from "../types";

const displayedCurrencies = ["USD", "EUR"];

export const getExchangeRates = async () => {
  try {
    const { data } = await axios.get<ExchangeRate[]>(API_GOV);

    const displayedData = data.filter((elem) => {
      return displayedCurrencies.includes(elem.cc);
    });

    return displayedData;
  } catch (error) {
    console.error(error);
    return [];
  }
};
