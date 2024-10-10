import React from 'react'

const Converter = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="p-8 rounded-lg shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-4">
        Work in Progress
      </h1>
      <div className="text-6xl md:text-7xl text-center animate-bounce">
        🚧
      </div>
      <p className="mt-6 text-gray-600 text-center">
        We're building something awesome!
      </p>
    </div>
  </div>
  )
}

export default Converter