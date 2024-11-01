import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CoinContext } from "../context/CoinContext";
import ReactDOM from "react-dom";
import Charts from "../Charts/Charts";

const HighLowIndicator = ({ currentPrice, high, low }) => {
  const [green, setGreen] = useState();

  useEffect(() => {
    let total = high - low;
    let greenZone = ((high - currentPrice) * 100) / total;
    setGreen(Math.ceil(greenZone));
  }, [currentPrice, high, low]);

  return (
    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden flex">
      <span
        className="bg-red-500 h-full rounded-l-lg"
        style={{ width: `${100 - green}%` }}
      />
      <span
        className="bg-green-500 h-full rounded-r-lg"
        style={{ width: `${green}%` }}
      />
    </div>
  );
};

const Coin = () => {
  const { coinId } = useParams();
  const navigate = useNavigate();
  const [coinData, setCoinData] = useState();
  const { currency } = useContext(CoinContext);

  const close = () => {
    navigate("..");
  };

  const fetchCoinData = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`,
        {
          headers: {
            accept: "application/json",
            "x-cg-demo-api-key": "CG-nrVyRWCGSZozXJpLvsBAmQo5",
          },
        }
      );
      const data = await response.json();
      setCoinData(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCoinData();
  }, [currency]);

  return ReactDOM.createPortal(
    <div
      className="fixed top-0 w-full h-full left-0 right-0 bottom-0 bg-gradient-to-br from-teal-500/20 to-green-500/20 flex items-center justify-center backdrop-blur-md"
      onClick={close}
    >
      <div
        className="w-[80%] h-[80%] bg-white rounded-lg text-gray-800 relative shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {coinData ? (
          <div className="flex h-full">
            <div className="w-[45%] h-full p-4 border-r border-gray-200 overflow-y-auto">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={coinData.image.large}
                  alt=""
                  className="w-12 h-12"
                />
                <div>
                  <h1 className="text-2xl font-bold capitalize">
                    {coinData.name}
                  </h1>
                  <span className="text-sm py-0.5 px-2 bg-teal-100 text-teal-800 rounded-full uppercase font-medium">
                    {coinData.symbol}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-gray-50 hover:bg-gradient-to-br hover:from-teal-50 hover:to-green-50 transition-colors rounded-lg p-3 shadow-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-500">Price</span>
                    <div
                      className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                        coinData.market_data.price_change_percentage_24h > 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {Number(
                        coinData.market_data.price_change_percentage_24h
                      ).toFixed(2)}%
                    </div>
                  </div>
                  <div className="text-lg font-bold">
                    {currency.symbol}
                    {coinData.market_data.current_price[
                      currency.name
                    ].toLocaleString()}
                  </div>
                </div>

                <div className="bg-gray-50 hover:bg-gradient-to-br hover:from-teal-50 hover:to-green-50 transition-colors rounded-lg p-3 shadow-sm">
                  <span className="text-xs text-gray-500">Market Cap</span>
                  <div className="text-lg font-bold">
                    {currency.symbol}
                    {coinData.market_data.market_cap[currency.name].toLocaleString(
                      "en-US",
                      { notation: "compact", maximumFractionDigits: 2 }
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 hover:bg-gradient-to-br hover:from-teal-50 hover:to-green-50 transition-colors rounded-lg p-3 shadow-sm">
                  <span className="text-xs text-gray-500">Fully Diluted</span>
                  <div className="text-lg font-bold">
                    {currency.symbol}
                    {coinData.market_data.fully_diluted_valuation[
                      currency.name
                    ].toLocaleString("en-US", {
                      notation: "compact",
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-gray-50 hover:bg-gradient-to-br hover:from-teal-50 hover:to-green-50 transition-colors rounded-lg p-3 shadow-sm">
                  <span className="text-xs text-gray-500">Total Volume</span>
                  <div className="text-lg font-bold">
                    {currency.symbol}
                    {coinData.market_data.total_volume[
                      currency.name
                    ].toLocaleString()}
                  </div>
                </div>

                <div className="bg-gray-50 hover:bg-gradient-to-br hover:from-teal-50 hover:to-green-50 transition-colors rounded-lg p-3 shadow-sm">
                  <span className="text-xs text-gray-500 mb-2 block">
                    24h Range
                  </span>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>
                      {currency.symbol}
                      {coinData.market_data.low_24h[currency.name].toLocaleString()}
                    </span>
                    <span>
                      {currency.symbol}
                      {coinData.market_data.high_24h[currency.name].toLocaleString()}
                    </span>
                  </div>
                  <HighLowIndicator
                    currentPrice={coinData.market_data.current_price[currency.name]}
                    high={coinData.market_data.high_24h[currency.name]}
                    low={coinData.market_data.low_24h[currency.name]}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 hover:bg-gradient-to-br hover:from-teal-50 hover:to-green-50 transition-colors rounded-lg p-3 shadow-sm">
                    <span className="text-xs text-gray-500">Max Supply</span>
                    <div className="text-lg font-bold">
                      {coinData.market_data.max_supply === null
                        ? "∞"
                        : coinData.market_data.max_supply.toLocaleString("en-US", {
                            notation: "compact",
                          })}
                    </div>
                  </div>
                  <div className="bg-gray-50 hover:bg-gradient-to-br hover:from-teal-50 hover:to-green-50 transition-colors rounded-lg p-3 shadow-sm">
                    <span className="text-xs text-gray-500">Circulating</span>
                    <div className="text-lg font-bold">
                      {coinData.market_data.circulating_supply.toLocaleString(
                        "en-US",
                        { notation: "compact" }
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 hover:bg-gradient-to-br hover:from-teal-50 hover:to-green-50 transition-colors rounded-lg p-3 shadow-sm">
                  <span className="text-xs text-gray-500 mb-2 block">Links</span>
                  <div className="flex flex-wrap gap-2">
                    {coinData?.links?.homepage[0] && (
                      <a
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full hover:bg-teal-200 transition-colors"
                        href={coinData.links.homepage[0]}
                      >
                        Website
                      </a>
                    )}
                    {coinData?.links?.blockchain_site[0] && (
                      <a
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full hover:bg-teal-200 transition-colors"
                        href={coinData.links.blockchain_site[0]}
                      >
                        Explorer
                      </a>
                    )}
                    {coinData?.links?.official_forum_url?.[0] && (
                      <a
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full hover:bg-teal-200 transition-colors"
                        href={coinData.links.official_forum_url[0]}
                      >
                        Forum
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[55%] h-full p-4">
              <div className="h-[70%] mb-4">
                <Charts id={coinData.id} currency={currency} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 hover:bg-gradient-to-br hover:from-teal-50 hover:to-green-50 transition-colors rounded-lg p-3 shadow-sm">
                  <h3 className="text-sm font-bold mb-3">Sentiment</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-sm">
                        {Number(coinData.sentiment_votes_up_percentage).toFixed(2)}%
                        Positive
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <span className="text-sm">
                        {Number(
                          coinData.sentiment_votes_down_percentage
                        ).toFixed(2)}
                        % Negative
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 hover:bg-gradient-to-br hover:from-teal-50 hover:to-green-50 transition-colors rounded-lg p-3 shadow-sm">
                  <h3 className="text-sm font-bold mb-3">Rankings</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">Market Cap</span>
                      <span className="text-sm">#{coinData.market_cap_rank}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">CoinGecko</span>
                      <span className="text-sm">#{coinData.coingecko_rank}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">Score</span>
                      <span className="text-sm">{coinData.coingecko_score}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-t-teal-500 border-r-teal-500 border-b-transparent border-l-transparent" />
          </div>
        )}
      </div>
    </div>,
    document.getElementById("model")
  );
};

export default Coin;