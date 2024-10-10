import React, { useLayoutEffect, useState, useContext } from 'react'
import { CoinContext } from '../context/CoinContext';

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';



function CustomTooltip({ payload, label, active, currency }) {
  if (active && payload && payload.length>0) {
    const currencyCode = typeof currency === 'object' ? currency.name : currency;
    const formattedValue = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currencyCode,
    }).format(payload[0].value);

    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${formattedValue}`}</p>
      </div>
    );
  }

  return null;
}

const ChartComponent = ({data, currency, type}) =>{
  
  return(
    <ResponsiveContainer height={'90%'}>
      <LineChart width={400} height={400} data={data}>
        <Line type="monotone" dataKey={type} stroke="#000" strokeWidth={"1px"}/>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" hide />
        <YAxis dataKey={type} hide domain={["auto", "auto"]}/>
        <Tooltip content={<CustomTooltip />} currency={currency} cursor={false} wrapperStyle={{ outline: "none" }}/>
        <Legend/>
      </LineChart>
    </ResponsiveContainer>
  )
}

const Charts = ({id}) => {
  const [chartData, setChartData] = useState();
  let { currency } = useContext(CoinContext);
  const [ type, setType ] = useState("prices");
  const [ days, setDays ] = useState(7);

    useLayoutEffect(() => {
      const getChartData = async () => {
        
        try {
          const data = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`)
           .then(res => res.json())
           .then((json) => json);

           console.log("chart-data", data);
           let convertedData = data[type].map(item => {
             return {
              date: new Date(item[0]).toLocaleDateString(),
              [type]:item[1],
            }
          })
           setChartData(convertedData);
        } catch (error) {
          console.log(error);        }
      }
      
      getChartData(id);
      
    }, [id, type, days])
  return (
    <div className='w-full h-[60%]'>
      <ChartComponent data={chartData} currency={currency} type={type}/>
      <div className='flex'>
        <button className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            type === "prices"
              ? "bg-cyan text-cyan"
              : "bg-gray-500 text-gray-900"
          }`}
 onClick={() => setType("prices")}>Prices</button>
        <button className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            type === "market_caps"
              ? "bg-cyan text-cyan"
              : "bg-gray-500 text-gray-900"
          }`}
 onClick={() => setType("market_caps")}>Market Caps</button>
        <button className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            type === "total_volumes"
              ? "bg-cyan text-cyan"
              : "bg-gray-500 text-gray-900"
          }`}
 onClick={() => setType("total_volumes")}>Total Volumes </button>

        <button className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            type === 7
              ? "bg-cyan text-cyan"
              : "bg-gray-500 text-gray-900"
          }`}
 onClick={() => setDays(7)}>7d</button>
        <button className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            type === 14
              ? "bg-cyan text-cyan"
              : "bg-gray-500 text-gray-900"
          }`}
 onClick={() => setDays(14)}>14d</button>
        <button className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            type === 30
              ? "bg-cyan text-cyan"
              : "bg-gray-500 text-gray-900"
          }`}
 onClick={() => setDays(30)}>30d</button>
      </div>
    </div>
  )
}

export default Charts;