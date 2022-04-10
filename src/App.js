import './App.css';
import axios from 'axios';
import React, { useEffect } from 'react';
import Coin from './components/Coin';

function App() {

  const [coins,setCoins] = React.useState([]);
  const [search, setSearch] = React.useState('');

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase())
  )
 
  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
    .then(res => {
      setCoins(res.data)
      console.log(res.data);
    })
    .catch(error => console.log(error)) 
  },[])

  return (
    <div className="coin-app">
      <div className='coin-search'>
        <h1 className='coin-text'>Seach a currency</h1>
        <form>
          <input placeholder='search' className='coin-input' type="text" onChange={handleChange}></input>
        </form>
      </div>
      {filteredCoins.map((coin) => {
        return (
          <Coin 
          key={coin.id} name={coin.name} image={coin.image}
          symbol={coin.symbol} volume={coin.total_volume} price={coin.current_price}
          priceChange={coin.price_change_percentage_24h} marketCap={coin.market_cap}
          >
          </Coin>
        )
      })}
    </div>
  );
}

export default App;
