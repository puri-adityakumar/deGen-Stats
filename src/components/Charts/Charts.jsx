import React, { useLayoutEffect, useState, useContext } from 'react'
import { CoinContext } from '../context/CoinContext'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'

function CustomTooltip({ payload, label, active, currency }) {
  if (active && payload && payload.length > 0) {
    const currencyCode = typeof currency === 'object' ? currency.name : currency
    const formattedValue = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currencyCode,
    }).format(payload[0].value)

    return (
      <div className="bg-white/80 backdrop-blur-sm border border-teal-200 rounded-lg shadow-lg p-2">
        <p className="text-sm font-medium text-gray-800">{`${label} : ${formattedValue}`}</p>
      </div>
    )
  }
  return null
}

const ChartComponent = ({ data, currency, type }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <Line type="monotone" dataKey={type} stroke="#0d9488" strokeWidth={2} dot={false} />
        <CartesianGrid stroke="#d1d5db" strokeDasharray="5 5" opacity={0.3} />
        <XAxis dataKey="date" hide />
        <YAxis dataKey={type} hide domain={["auto", "auto"]} />
        <Tooltip content={<CustomTooltip />} currency={currency} cursor={false} wrapperStyle={{ outline: "none" }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

const Charts = ({ id }) => {
  const [chartData, setChartData] = useState()
  const { currency } = useContext(CoinContext)
  const [type, setType] = useState("prices")
  const [days, setDays] = useState(7)

  useLayoutEffect(() => {
    const getChartData = async () => {
      try {
        const data = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`)
          .then(res => res.json())
        
        let convertedData = data[type].map(item => ({
          date: new Date(item[0]).toLocaleDateString(),
          [type]: item[1],
        }))
        setChartData(convertedData)
      } catch (error) {
        console.log(error)
      }
    }
    
    getChartData(id)
  }, [id, type, days])

  const buttonClass = (active) =>
    `text-sm py-1.5 px-3 rounded-lg transition-all duration-200 ${
      active
        ? "bg-teal-500 text-white shadow-md"
        : "bg-white/50 text-gray-700 hover:bg-teal-100"
    }`

  return (
    <div className='w-full h-full bg-gradient-to-br from-teal-50 to-green-50 rounded-xl shadow-inner p-4 overflow-y-auto'>
      <div className='h-[calc(100%-40px)] mb-4'>
        <ChartComponent data={chartData} currency={currency} type={type} />
      </div>
      <div className='flex flex-row justify-between'>
        <div className='space-x-2'>
          <button className={buttonClass(type === "prices")} onClick={() => setType("prices")}>Prices</button>
          <button className={buttonClass(type === "market_caps")} onClick={() => setType("market_caps")}>Market Caps</button>
          <button className={buttonClass(type === "total_volumes")} onClick={() => setType("total_volumes")}>Total Volumes</button>
        </div>
        <div className='space-x-2'>
          <button className={buttonClass(days === 7)} onClick={() => setDays(7)}>7d</button>
          <button className={buttonClass(days === 14)} onClick={() => setDays(14)}>14d</button>
          <button className={buttonClass(days === 30)} onClick={() => setDays(30)}>30d</button>
        </div>
      </div>
    </div>
  )
}

export default Charts