import Data from "../data.json";
import arrowSvg from "../assets/icons/arrows.svg";

export function ConverterForm({
  firstInput,
  setFirstInput,
  secondInput,
  setSecondInput,
  thirdInput,
  setThirdInput,
  onTabs,
  tabs,
  onExchangeValues,
}) {
  return (
    <>
      <div className="top-container">
        <button
          className={`btns ${tabs === "aboutme" ? "active" : ""}`}
          onClick={() => onTabs("converter")}
        >
          Converter
        </button>
        <button
          className={`btns ${tabs === "converter" ? "active" : ""}`}
          onClick={() => onTabs("aboutme")}
        >
          About Me
        </button>
      </div>
      {tabs === "converter" ? (
        <div className="input-container">
          <span className="div1 font-semibold">Amount</span>
          <span className="div2 items-center flex gap-4">
            <span className="absolute mx-4 text-slate-700 font-semibold text-lg">
              {setCurrencySymbol(secondInput)}
            </span>
            <input
              type="number"
              className="w-full px-14 py-4 text-lg"
              value={firstInput === "0" ? "" : firstInput}
              onChange={(e) =>
                setFirstInput(e.target.value === "" ? "0" : e.target.value)
              }
            />
          </span>
          <span className="div3 font-semibold">From</span>
          <span className="div4">
            <CurrencySelect value={secondInput} onChange={setSecondInput} />
          </span>
          <span className="div5"></span>
          <span className="flex div6">
            <button
              className="border border-slate-400 bg-slate-100 p-4 rounded-full"
              onClick={onExchangeValues}
            >
              <img
                src={arrowSvg}
                alt="exchange"
                className="w-6 h-6 text-indigo-600"
              />
            </button>
          </span>
          <span className="div7 font-semibold">To</span>
          <span className="div8">
            <CurrencySelect value={thirdInput} onChange={setThirdInput} />
          </span>
        </div>
      ) : (
        <AboutMe />
      )}
    </>
  );
}

function CurrencySelect({ value, onChange }) {
  return (
    <select
      className="w-full py-4"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {Data.map((items) => (
        <option key={items.code}>
          {items.code} – {items.currency}
        </option>
      ))}
    </select>
  );
}

export function Result({
  firstInput,
  secondInput,
  thirdInput,
  currency,
  exchange,
}) {
  return (
    <div className="result">
      <p className="text-slate-500 text-xl font-bold">
        {firstInput} {CurrencyName(secondInput)} =
      </p>
      <p className="text-3xl">
        <span className="mr-4">{currency.toFixed(3)}</span>
        <span className="text-slate-900 font-bold">
          {CurrencyName(thirdInput)}
        </span>
      </p>
      <p>
        1 {CurrencyName(thirdInput)} = {exchange} {CurrencyName(secondInput)}
      </p>
    </div>
  );
}

function AboutMe() {
  return (
    <div className="about">
      <p className="text-2xl">Project: Currency Converter Web App</p>
      <p>
        <strong>GitHub:</strong>{" "}
        <a href="https://github.com/AnkurNayak">AnkurNayak</a>
      </p>
      <p>
        <strong>LinkedIn:</strong>{" "}
        <a href="https://linkedin.com/in/dr-ankur-nayak">dr-ankur-nayak</a>
      </p>
      <p className="font-semibold">
        This web app is a demonstration of my skills and knowledge in web
        development. It utilizes the Exchange Rate API to provide real-time
        currency conversion rates. Please note that this project is intended for
        educational purposes only.
      </p>
      <p>
        Feel free to reach out to me for any inquiries or collaboration
        opportunities. You can contact me via email at ankurzac3@gmail.com.
        Let's connect and build amazing things together!
      </p>
    </div>
  );
}

//Non Exported functions
const CurrencyName = (currencyString) =>
  currencyString.split(/\s*–\s*/)[1] || currencyString;

const setCurrencySymbol = (secInput) => {
  const getInput = secInput.match(/[A-Z]{3}/)[0];
  const matchedCurr = Data.find((res) => res.code === getInput);

  // if (matchedCurr.currencySymbol.length < 4) {
  return matchedCurr.currencySymbol;
  // }
};
