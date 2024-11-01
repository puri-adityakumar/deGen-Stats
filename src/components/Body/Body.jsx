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
      console.log("API Error");
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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
            Track Crypto Prices in Real Time
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
            Our user-friendly interface makes it easy to track your favorite
            cryptocurrencies, set price alerts, and monitor your portfolio's
            performance.
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
          <form onSubmit={searchHandler} className="flex-1 w-full flex gap-2">
            <div className="relative flex-1">
              <input
                onChange={inputHandler}
                value={input}
                list="coin-list"
                type="text"
                placeholder="Search Crypto..."
                className="w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-green-300 focus:border-green-300"
                required
              />
              <datalist id="coin-list">
                {input !== "" &&
                  allCoin
                    .filter((item) =>
                      item.name.toLowerCase().includes(input.toLowerCase())
                    )
                    .map((item, index) => (
                      <option key={index} value={item.name} />
                    ))}
              </datalist>
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-xl font-medium hover:from-green-500 hover:to-blue-500 transition-colors shadow-lg shadow-green-200"
            >
              Search
            </button>
          </form>
          <select
            onChange={currencyHandler}
            className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 shadow-sm focus:ring-2 focus:ring-green-300 focus:border-green-300"
            defaultValue="USD"
          >
            <option value="usd">USD</option>
            <option value="inr">INR</option>
            <option value="eur">EUR</option>
          </select>
        </div>

        <div className="mt-16 bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              Top 10 Cryptocurrencies
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-sm font-medium text-gray-500 bg-gray-50">
                  <th className="px-6 py-3 text-left">Rank</th>
                  <th className="px-6 py-3 text-left">Coins</th>
                  <th className="px-6 py-3 text-right">Price</th>
                  <th className="px-6 py-3 text-right">24H Change</th>
                  <th className="px-6 py-3 text-right">Market Cap</th>
                </tr>
              </thead>
              <tbody>
                {displayCoin.slice(0, 10).map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-green-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">
                          {item.market_cap_rank}
                        </span>
                        <img
                          src={item.image}
                          alt=""
                          className="h-6 w-6 ml-2"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/coin/${item.id}`}
                        className="text-sm font-medium text-gray-900 hover:text-blue-600"
                      >
                        {item.name}{" "}
                        <span className="text-gray-500">
                          ({item.symbol.toUpperCase()})
                        </span>
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                      {currency.symbol} {item.current_price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <span
                        className={`${
                          item.price_change_percentage_24h < 0
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {(
                          Math.floor(item.price_change_percentage_24h * 100) /
                          100
                        ).toFixed(2)}
                        %
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                      {currency.symbol}
                      {item.market_cap.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Body;