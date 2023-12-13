import React, { useState, useEffect } from "react";
import CEsvg from "./assets/icons/currency-exchange.svg";
import { ConverterForm, Result } from "./components/main-component";

const API = `https://open.er-api.com/v6/latest/`;

function App() {
  //get the input from localstroge and set the useState value on mount
  const [firstInput, setFirstInput] = useState(1);
  const [secondInput, setSecondInput] = useState("USD – United States Dollar");
  const [thirdInput, setThirdInput] = useState("INR – Indian Rupee");
  const [currency, setCurrency] = useState(0);
  const [exchange, setExchange] = useState(null);
  const [updateOn, setUpdateOn] = useState([]);
  const [tabs, setTabs] = useState("converter");

  function handleTabs(tab) {
    if (tab === "converter") setTabs("converter");
    setTabs(() => tab);
  }

  const handleExchangeValues = () => {
    const temp = secondInput;
    setSecondInput(thirdInput);
    setThirdInput(temp);
  };

  useEffect(() => {
    async function converter() {
      const secondInputMatch = secondInput.match(/[A-Z]{3}/)[0];
      const thirdInputMatch = thirdInput.match(/[A-Z]{3}/)[0];
      try {
        // setIsLoading(true);
        const response = await fetch(`${API}${secondInputMatch}`);
        const data = await response.json();
        const lastUpdate = data["time_last_update_utc"];
        const nextUpdate = data["time_next_update_utc"];
        setUpdateOn((updates) => [
          { ...updates[0], lastUpdate },
          { ...updates[1], nextUpdate },
        ]);

        const rates = data["rates"];
        const rateForThirdInput = Object.keys(rates).includes(thirdInputMatch)
          ? rates[thirdInputMatch]
          : null;
        setCurrency(() => firstInput * rateForThirdInput);
        setExchange(() => 1 / rateForThirdInput);
      } catch (error) {
        console.error(error);
      } finally {
        // setIsLoading(false);
      }
    }
    converter();
  }, [firstInput, secondInput, thirdInput]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* {console.log(isLoading)} */}
      <div className="flex p-4 z-10 flex-1">
        <div className="flex flex-col rounded-md flex-1 overflow-hidden backdrop-blur-sm bg-white">
          <ConverterForm
            firstInput={firstInput}
            setFirstInput={setFirstInput}
            secondInput={secondInput}
            setSecondInput={setSecondInput}
            thirdInput={thirdInput}
            setThirdInput={setThirdInput}
            onTabs={handleTabs}
            tabs={tabs}
            onExchangeValues={handleExchangeValues}
          />
          {tabs === "converter" ? (
            <Result
              firstInput={firstInput}
              secondInput={secondInput}
              thirdInput={thirdInput}
              currency={currency}
              exchange={exchange}
            />
          ) : null}
        </div>
      </div>

      <Footer updateOn={updateOn} />

      <Background />
    </div>
  );
}

function Header() {
  return (
    <div className="p-4 flex items-center gap-4 z-10">
      <img src={CEsvg} alt="currency-converter" className="h-12 w-12" />
      <span className="text-2xl font-extrabold text-slate-300">
        Currency Converter
      </span>
    </div>
  );
}

function Footer({ updateOn }) {
  return (
    <footer className="flex text-sm p-4 z-10 text-white italic flex-col font-extralight">
      <span className="flex">
        Last Updated :
        {updateOn.map((item, i) => (
          <p className="ml-1" key={i}>
            {item.lastUpdate}
          </p>
        ))}
      </span>

      <span className="flex">
        Next Update On :
        {updateOn.map((item, i) => (
          <p className="ml-1" key={i}>
            {item.nextUpdate}
          </p>
        ))}
      </span>
      <p>&copy; 2023 ancode.org. All rights reserved.</p>
    </footer>
  );
}

//Background of the app
const Background = () => (
  <div className="area inset-0 z-0">
    <ul className="circles">
      <li>
        <span>€</span>
      </li>
      <li>
        <span>$</span>
      </li>
      <li>
        <span>₹</span>
      </li>
      <li>
        <span>$</span>
      </li>
      <li>
        <span>$</span>
      </li>
      <li>
        <span>¥</span>
      </li>
      <li>
        <span>$</span>
      </li>
      <li>
        <span>₹</span>
      </li>
      <li>
        <span>$</span>
      </li>
      <li>
        <span>₹</span>
      </li>
    </ul>
  </div>
);

export default App;
