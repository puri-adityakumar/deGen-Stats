import './App.css'
import Header from './components/Header/Header'
import Body from './components/Body/Body.jsx'
import Coin from './components/Coin/Coin.jsx'
import Converter from './components/Converter/Converter.jsx'
import { Routes, Route } from 'react-router-dom'

function App() {
  
  return (
    <div className="App">
        <Header />
        <Routes>
           {/* Route for the home page */}
          <Route path="/" element={<Body />}>
          {/* Route for the Coin details page */}
            <Route path="coin/:coinId" element={<Coin />} />
          </Route>
          <Route path="/Converter" element={<Converter />}></Route>
        </Routes>
    </div>
    
  )
}

export default App
