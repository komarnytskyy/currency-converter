import axios from "axios";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { API_GOV, exchangeRate, initialState, RE } from "../../constants";
const CurrencyRate: FC = () => {
  const [usd, setUsd] = useState<exchangeRate>(initialState);
  const [eur, setEur] = useState<exchangeRate>(initialState);

  const getData = async () => {
    try {
      const { data } = await axios.get(API_GOV);

      const usdData = data.find((elem: { cc: string }) => {
        return elem.cc === "USD";
      });
      const eurData = data.find((elem: { cc: string }) => {
        return elem.cc === "EUR";
      });
      setUsd(usdData);
      setEur(eurData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const uah: exchangeRate = {
    txt: "Гривня",
    rate: 1,
    cc: "UAH",
    excangedate: usd.excangedate,
  };

  const currency: exchangeRate[] = [uah, usd, eur];

  const [firstValue, setFirstValue] = useState<any>(1);
  const [secondValue, setSecondValue] = useState<any>(1);
  const [firstRate, setFirstRate] = useState<number>(1);
  const [secondRate, setSecondRate] = useState<number>(1);

  const handleFirstInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "" || RE.test(value)) {
      setFirstValue(value);
      setSecondValue(Number(value) * firstRate);
    }
  };
  const handleSecondInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "" || RE.test(value)) {
      setSecondValue(value);
      setFirstValue(Number(value) * secondRate);
    }
  };

  const handleFirstSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrency = Number(event.target.value);
    setFirstRate(selectedCurrency);

    if (selectedCurrency === usd.rate) {
      if (secondRate === uah.rate) {
        setSecondValue(firstValue * usd.rate);
      } else if (secondRate === eur.rate) {
        setSecondValue((usd.rate / eur.rate) * firstValue);
      } else if (secondRate === usd.rate) {
        setSecondValue(firstValue);
      }
    } else if (selectedCurrency === eur.rate) {
      if (secondRate === uah.rate) {
        setSecondValue(firstValue * eur.rate);
      } else if (secondRate === eur.rate) {
        setSecondValue(firstValue);
      } else if (secondRate === usd.rate) {
        setSecondValue((eur.rate / usd.rate) * firstValue);
      }
    } else if (selectedCurrency === uah.rate) {
      if (secondRate === uah.rate) {
        setSecondValue(firstValue * uah.rate);
      } else if (secondRate === usd.rate) {
        setSecondValue(firstValue / usd.rate);
      } else if (secondRate === eur.rate) {
        setSecondValue(firstValue / eur.rate);
      }
    }
  };

  const handleSecondSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrency = Number(event.target.value);
    setSecondRate(selectedCurrency);

    if (selectedCurrency === usd.rate) {
      if (firstRate === uah.rate) {
        setFirstValue(secondValue * usd.rate);
      } else if (firstRate === eur.rate) {
        setFirstValue((usd.rate / eur.rate) * secondValue);
      } else if (firstRate === usd.rate) {
        setFirstValue(secondValue);
      }
    } else if (selectedCurrency === eur.rate) {
      if (firstRate === uah.rate) {
        setFirstValue(secondValue * eur.rate);
      } else if (firstRate === eur.rate) {
        setFirstValue(secondValue);
      } else if (firstRate === usd.rate) {
        setFirstValue((eur.rate / usd.rate) * secondValue);
      }
    } else if (selectedCurrency === uah.rate) {
      if (firstRate === uah.rate) {
        setFirstValue(secondValue * uah.rate);
      } else if (firstRate === usd.rate) {
        setFirstValue(secondValue / usd.rate);
      } else if (firstRate === eur.rate) {
        setFirstValue(secondValue / eur.rate);
      }
    }
  };

  return (
    <div className="ui container">
      <div className="ui vertical stripe quote segment">
        <div className="ui equal width stackable internally celled grid">
          <div className="center aligned row">
            <div className="column">
              <h3>{usd.cc}</h3>
              <p>{usd.rate}</p>
            </div>
            <div className="column">
              <h3>{eur.cc}</h3>
              <p>{eur.rate}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="ui vertical segment">
        <div className="ui two column grid">
          <div className="column">
            <div className="ui segment">
              <div className="center aligned row">
                <div className="column">
                  <div className="ui input">
                    <input
                      type="text"
                      value={firstValue}
                      onChange={handleFirstInputChange}
                    />
                  </div>

                  <select
                    className="ui dropdown"
                    onChange={handleFirstSelectChange}
                  >
                    {currency.map((el, i) => (
                      <option key={i} value={el.rate}>
                        {el.cc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="column">
            <div className="ui segment">
              <div className="ui input">
                <input
                  type="text"
                  value={secondValue}
                  onChange={handleSecondInputChange}
                />
              </div>
              <select
                className="ui dropdown"
                onChange={handleSecondSelectChange}
              >
                {currency.map((el, i) => (
                  <option key={i} value={el.rate}>
                    {el.cc}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyRate;
