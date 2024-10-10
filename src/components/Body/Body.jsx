import React, { useContext, useEffect, useState } from "react";
import { CoinContext } from "../context/CoinContext";
import { Link, Outlet } from "react-router-dom";

const Body = () => {
  const { allCoin, currency, setCurrency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  const inputHandler = (event) => {
    setInput(event.target.value);
    if (event.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = async (event) => {
    event.preventDefault();
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  };

  useEffect(() => {
    if (allCoin) {
      setDisplayCoin(allCoin);
    } else {
      console.log("Api madarchod");
    }
  }, [allCoin]);

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "usd": {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
      case "eur": {
        setCurrency({ name: "eur", symbol: "€" });
        break;
      }
      case "inr": {
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      }
      default: {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
    }
  };

  return (
    <div className="home">
      {/* This is hero section */}
      <div>
        <div className="text-center">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Track crypto prices in real time
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            Our user-friendly interface makes it easy to track your favorite
            cryptocurrencies, set price alerts, and monitor your portfolio's
            performance.
          </p>
        </div>

        {/* Form */}

        <div className="w-full h-20 flex max-w-lg mx-auto overflow-hidden content-center ">
          <form
            onSubmit={searchHandler}
            className="h-full w-full grid-cols-2 flex-auto"
          >
            <input
              onChange={inputHandler}
              value={input}
              list="coin-list"
              type="text"
              placeholder="Search Crypto..."
              className="block w-full max-w-xs px-4 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none leading-relaxed "
              required
            />
            <datalist id="coin-list">
              {input === ""
                ? null
                : allCoin
                    .filter((item) =>
                      item.name.toLowerCase().includes(input.toLowerCase())
                    )
                    .map((item, index) => (
                      <option key={index} value={item.name} />
                    ))}
            </datalist>
            <button
              type="submit"
              class="py-2.5 px-6 text-sm bg-indigo-50 text-indigo-500 rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-100"
            >
              Search
            </button>
          </form>
          <div>
            <select
              className=" border border-gray-300 text-gray-600 text-base rounded-lg block  py-2.5 px-4 focus:outline-none"
              onChange={currencyHandler}
            >
              <option selected>USD</option>
              <option value="inr">INR</option>
              <option value="eur">EUR</option>
            </select>
          </div>
        </div>
      </div>

      <div
        className="bg-white p-6 mx-20 rounded-lg shadow-lg "
        style={{ marginTop: "2rem", marginBottom: "2rem" }}
      >
        <div className="text-2xl font-semibold text-black tracking-wide mb-4">
          Top 10 Cryptocurrencies
        </div>
        <div className="grid grid-cols-6 gap-4">
          <p className="text-left text-sm leading-6 font-semibold text-black col-span-1">
            Rank
          </p>
          <p className="text-left text-sm leading-6 font-semibold text-black col-span-2">
            Coins
          </p>
          <p className="text-left text-sm leading-6 font-semibold text-black col-span-1">
            Price
          </p>
          <p className="text-left text-sm leading-6 font-semibold text-black col-span-1">
            24H Change
          </p>
          <p className="text-left text-sm leading-6 font-semibold text-black col-span-1">
            Market Cap
          </p>
        </div>
        {displayCoin.slice(0, 10).map((item, index) => (
          <Link
            to={`/coin/${item.id}`}
            key={index}
            className="grid grid-cols-6 gap-4 border-b border-gray-300 py-2 items-center"
          >
            <div className="grid grid-cols-2  ">
              <p className="text-left text-sm leading-6 text-black col-span-1">
                {item.market_cap_rank}
              </p>
              <img src={item.image} alt="" className="h-6 w-6" />
            </div>
            <p className="text-left text-sm leading-6 text-black col-span-2">
              {item.name + " (" + item.symbol + ")"}
            </p>
            <p className="text-left text-sm leading-6 text-black col-span-1">
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p
              className={`text-left text-sm leading-6 ${
                item.price_change_percentage_24h < 0
                  ? "text-red-600"
                  : item.price_change_percentage_24h > 0
                  ? "text-green-600"
                  : "text-black"
              } col-span-1`}
            >
              {Math.floor(item.price_change_percentage_24h * 100) / 100}
            </p>
            <p className="text-left text-sm leading-6 text-black col-span-1">
              {currency.symbol}
              {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>

      <Outlet />
    </div>
  );
};

export default Body;
