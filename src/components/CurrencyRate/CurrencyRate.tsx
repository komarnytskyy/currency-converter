import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import { NumRegExp, uah } from "../../constants";
import { ExchangeRate } from "../../types";
import { CurrencyBanner } from "../CurrencyBanner/CurrencyBanner";
import { getExchangeRates } from "../../api";
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";
import { Column } from "../Column/Column";

const CurrencyRate: FC = () => {
  const [currencies, setCurrencies] = useState<ExchangeRate[]>([]);
  const [currenciesWithUAH, setCurrenciesWithUAH] = useState<ExchangeRate[]>(
    []
  );

  const fetchData = useCallback(async () => {
    const data = getExchangeRates();
    setCurrencies(await data);
    setCurrenciesWithUAH([uah, ...(await data)]);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [firstValue, setFirstValue] = useState<number>(1);
  const [secondValue, setSecondValue] = useState<number>(1);
  const [firstRate, setFirstRate] = useState<number>(1);
  const [secondRate, setSecondRate] = useState<number>(1);

  const handleFirstInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value === "" || NumRegExp.test(value)) {
      setFirstValue(Number(value));
      if (firstRate === 1) {
        if (secondRate !== 1) {
          setSecondValue(Number(value) / secondRate);
        } else {
          setSecondValue(Number(value));
        }
      } else if (firstRate !== 1) {
        if (secondRate === 1) {
          setSecondValue(Number(value) * firstRate);
        } else if (secondRate !== 1) {
          if (firstRate === secondRate) {
            setSecondValue(Number(value));
          } else {
            setSecondValue((firstRate / secondRate) * Number(value));
          }
        }
      }
    }
  };

  const handleSecondInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value == "" || NumRegExp.test(value)) {
      setSecondValue(Number(value));
      if (secondRate === 1) {
        if (firstRate !== 1) {
          setFirstValue(Number(value) / firstRate);
        } else {
          setFirstValue(Number(value));
        }
      } else if (secondRate !== 1) {
        if (firstRate === 1) {
          setFirstValue(Number(value) * secondRate);
        } else if (firstRate !== 1) {
          if (firstRate === secondRate) {
            setFirstValue(Number(value));
          } else {
            setFirstValue((secondRate / firstRate) * Number(value));
          }
        }
      }
    }
  };

  const handleFirstSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedRate = Number(event.target.value);
    setFirstRate(selectedRate);

    if (selectedRate === 1) {
      if (selectedRate === secondRate) {
        setSecondValue(firstValue);
      } else {
        setSecondValue(firstValue / secondRate);
      }
    } else if (selectedRate !== 1) {
      if (secondRate === 1) {
        setSecondValue(firstValue * selectedRate);
      } else if (secondRate !== 1) {
        if (selectedRate === secondRate) {
          setSecondValue(firstValue);
        } else {
          setSecondValue((selectedRate / secondRate) * firstValue);
        }
      }
    }
  };

  const handleSecondSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedRate = Number(event.target.value);
    setSecondRate(selectedRate);

    if (selectedRate === 1) {
      if (selectedRate === firstRate) {
        setFirstValue(secondValue);
      } else {
        setFirstValue(secondValue / firstRate);
      }
    } else if (selectedRate !== 1) {
      if (firstRate === 1) {
        setFirstValue(secondValue * selectedRate);
      } else if (firstRate !== 1) {
        if (selectedRate === firstRate) {
          setFirstValue(secondValue);
        } else {
          setFirstValue((selectedRate / firstRate) * secondValue);
        }
      }
    }
  };

  return (
    <div className="ui container">
      <div className="ui vertical stripe quote segment">
        <div className="ui equal width stackable internally celled grid">
          <div className="center aligned row">
            {currencies?.map((elem) => (
              <CurrencyBanner
                key={elem.rate}
                title={elem.cc}
                rate={elem.rate}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="ui vertical segment">
        <div className="ui two column grid">
          <Column>
            <Input
              value={firstValue}
              handleInputChange={handleFirstInputChange}
            />
            <Select
              currencies={currenciesWithUAH}
              handleSelectChange={handleFirstSelectChange}
            />
          </Column>

          <Column>
            <Input
              value={secondValue}
              handleInputChange={handleSecondInputChange}
            />
            <Select
              currencies={currenciesWithUAH}
              handleSelectChange={handleSecondSelectChange}
            />
          </Column>
        </div>
      </div>
    </div>
  );
};

export default CurrencyRate;
