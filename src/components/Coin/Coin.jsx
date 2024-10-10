import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CoinContext } from "../context/CoinContext";
import ReactDOM from "react-dom";
import  Charts  from "../Charts/Charts";

const HighLowIndicator = ({ currentPrice, high, low }) => {
  const [green, setGreen] = useState();

  useEffect(() => {
    let total = high - low;
    let greenZone = ((high - currentPrice) * 100) / total;
    setGreen(Math.ceil(greenZone));
  }, [currentPrice, high, low]);

  return (
    <>
      <span
        className="bg-red-500 h-1.5 rounded-l-lg w-[50%]"
        style={{ width: `${100 - green}%` }}
      >
        &nbsp;
      </span>
      <span
        className="bg-green-500 h-1.5 rounded-l-lg w-[50%]"
        style={{ width: `${green}%` }}
      >
        &nbsp;
      </span>
    </>
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
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-nrVyRWCGSZozXJpLvsBAmQo5",
      },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((response) => response.json())
      .then((response) => setCoinData(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCoinData();
  }, [currency]);

  // instead of returning two different JSX elements,
  // return one JSX element with conditional rendering
  return ReactDOM.createPortal(
    <div
      className="fixed top-0 w-full h-full left-0 right-0 bottom-0 bg-gray-900 bg-opacity-30 flex items-center justify-center backdrop-blur-sm "
      onClick={close}
    >
      <div
        className="w-[65%] h-[75%] bg-white  bg-opacity-85 rounded-lg text-black relative"
        onClick={(e) => e.stopPropagation()}
      >
        {coinData ? (
          <div className="flex items-center justify-between h-full w-full p-4">
            <div className="flex flex-col items-center w-[45%] h-full pr-2">
              <div className="flex w-full items-center">
                <img
                  src={coinData.image.large}
                  alt=""
                  className="w-[3rem] h-[3rem] mx-1.5"
                />
                <h1 className="text-xl capitalize font-medium">
                  {coinData.name}
                </h1>
                <span className="text-sm py-0.5 px-2.5 ml-2 bg-cyan-500 text-cyan-900 bg-opacity-25 rounded uppercase">
                  {coinData.symbol}
                </span>
              </div>
              <div className="flex w-full mt-6">
                <div className="flex flex-col w-full">
                  <div className="flex justify-between">
                    <span className="text-sm capitalize text-gary-100 ">
                      Price
                    </span>
                    <div
                      className={`text-sm px-1 ml-2 font-medium flex items-center rounded uppercase bg-opacity-25
                                        ${
                                          coinData.market_data
                                            .price_change_percentage_24h > 0
                                            ? "bg-green-300 text-green-900"
                                            : "bg-red-300 text-red-900"
                                        }
                                    `}
                    >
                      <span>
                        {Number(
                          coinData.market_data.price_change_percentage_24h
                        ).toFixed(2)}
                        %
                      </span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`
                            w-[1rem] ml-0.5
                            ${
                              coinData.market_data.price_change_percentage_24h >
                              0
                                ? "fill-green-600 rotate-180"
                                : "fill-red-600"
                            }
                            `}
                      >
                        <path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-lg font-bold">
                    {currency.symbol}
                    {coinData.market_data.current_price[
                      currency.name
                    ].toLocaleString()}
                  </h2>
                </div>
              </div>

              <div className="flex w-full mt-4 justify-between">
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-black-100">
                    {" "}
                    Market Cap
                  </span>
                  <h2 className="text-base font-bold">
                    {currency.symbol}
                    {coinData.market_data.market_cap[
                      currency.name
                    ].toLocaleString()}
                  </h2>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-black-100">
                    Fully Diluted Valuation
                  </span>
                  <h2 className="text-base font-bold">
                    {currency.symbol}
                    {coinData.market_data.fully_diluted_valuation[
                      currency.name
                    ].toLocaleString("en-US", { notation: "compact" })}
                  </h2>
                </div>
              </div>

              <div className="flex flex-col w-full mt-4 justify-between">
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-black-100">
                    Total Volume
                  </span>
                  <h2 className="text-base font-bold">
                    {currency.symbol}
                    {coinData.market_data.total_volume[
                      currency.name
                    ].toLocaleString()}
                  </h2>
                </div>
              </div>

              <div className="flex w-full mt-4 justify-between">
                <HighLowIndicator
                  currentPrice={
                    coinData.market_data.current_price[currency.name]
                  }
                  high={coinData.market_data.high_24h[currency.name]}
                  low={coinData.market_data.low_24h[currency.name]}
                />
              </div>

              <div className="flex w-full mt-4 justify-between">
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-black-100">
                    Low 24h
                  </span>
                  <h2 className="text-base font-bold">
                    {currency.symbol}
                    {coinData.market_data.low_24h[
                      currency.name
                    ].toLocaleString()}
                  </h2>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-black-100">
                    High 24h
                  </span>
                  <h2 className="text-base font-bold">
                    {currency.symbol}
                    {coinData.market_data.high_24h[
                      currency.name
                    ].toLocaleString()}
                  </h2>
                </div>
              </div>

              <div className="flex w-full mt-4 justify-between">
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-black-100">
                    Max Supply
                  </span>
                  <h2 className="text-base font-bold">
                    {coinData.market_data.max_supply === null
                      ? "N/A"
                      : "$" +
                        coinData.market_data.max_supply.toLocaleString(
                          "en-US",
                          { notation: "compact" }
                        )}
                  </h2>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-black-100">
                    Circulation Supply
                  </span>
                  <h2 className="text-base font-bold">
                    {"$" +
                      coinData.market_data.circulating_supply.toLocaleString(
                        "en-US",
                        { notation: "compact" }
                      )}
                  </h2>
                </div>
              </div>

              <div className="flex w-full mt-4 justify-between">
                <div className="flex flex-col">
                  <a
                    target={"_blank"}
                    rel="noreferrer"
                    className="text-sm bg-gray-500 text-gray-300 px-1.5 py-0.5 my-1 rounded"
                    href={coinData?.links?.homepage[0]}
                  >
                    {coinData?.links?.homepage[0].substring(0, 30)}
                  </a>
                  <a
                    target={"_blank"}
                    rel="noreferrer"
                    className="text-sm bg-gray-500 text-gray-300 px-1.5 py-0.5 my-1 rounded"
                    href={coinData?.links?.blockchain_site[0]}
                  >
                    {coinData?.links?.blockchain_site[0].substring(0, 30)}
                  </a>
                  {coinData?.links?.official_forum_url?.[0] && (
                    <a
                      target={"_blank"}
                      rel="noreferrer"
                      className="text-sm bg-gray-500 text-gray-300 px-1.5 py-0.5 my-1 rounded"
                      href={coinData?.links?.official_forum_url[0]}
                    >
                      {coinData?.links?.official_forum_url[0].substring(0, 30)}
                    </a>
                  )}
                </div>

                <div className="flex flex-col content-start">
                  <span>Sentiment</span>
                  <div
                    className={`text-sm px-1 ml-2 my-2 font-medium flex items-center rounded uppercase bg-opacity-25 bg-green-300 text-green-900
                                        
                                    `}
                  >
                    <span>
                      {Number(coinData.sentiment_votes_up_percentage).toFixed(
                        2
                      )}
                      %
                    </span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`
                            w-[1rem] ml-0.5
                            
                            `}
                    >
                      <path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
                    </svg>
                  </div>
                  <div
                    className={`text-sm px-1 ml-2 my-1 font-medium flex items-center rounded uppercase bg-opacity-25 bg-red-300 text-red-900
                                        
                                    `}
                  >
                    <span>
                      {Number(coinData.sentiment_votes_down_percentage).toFixed(
                        2
                      )}
                      %
                    </span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`
                            w-[1rem] ml-0.5
                           
                            `}
                    >
                      <path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center w-[55%] h-full pr-2">
                <Charts id={coinData.id} />

                <div className="flex flex-col mt-4">
                  <h3 className="text-gray-900 py-1"><span className="text-gray-500 capitalize mr-1">market cap rank: </span>{coinData.market_cap_rank}</h3>
                  <h3 className="text-gray-900 py-1"><span className="text-gray-500 capitalize mr-1">coinGecko rank: </span>{coinData.coingecko_rank}</h3>
                  <h3 className="text-gray-900 py-1"><span className="text-gray-500 capitalize mr-1">coinGecko score: </span>{coinData.coingecko_score}</h3>
                </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>,
    document.getElementById("model")
  );
};

export default Coin;
