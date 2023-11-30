import React, {useEffect, useState} from 'react'
import Weathercard from "./weathercard"
import "./style.css"

const Temp = () => {
  const [searchValue, setSearchValue] = useState("ranchi");
  const [tempInfo, setTempInfo] = useState({});

const getWeatherInfo = async ()=>{
  try {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=15e18f165567892581e1197a4eca3997`;

    const res = await fetch(url);
    const data = await res.json();

    // destructring
    const { temp, humidity, pressure } = data.main;
    // changing the name
    const { main: weathermood } = data.weather[0];
    const { name } = data;
    const { speed } = data.wind;
    const { country, sunset } = data.sys;

    // now we have to pass the data
    const myNewWeatherInfo = {
      temp,
      humidity,
      pressure, 
      weathermood,
      name,
      speed,
      country,
      sunset,
    };

    setTempInfo(myNewWeatherInfo);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  getWeatherInfo();
}, []);

  return (
    <>
      <div className='wrap'>
        <div className='search'>
          <input type='search'
          placeholder='search ...'
          autoFocus
          id='search'
          className='searchTerm'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          />

          <button className='searchButton' type='button' onClick={getWeatherInfo}>
            Search
            </button>  

        </div>
      </div>

      {/* temp card */}
      <Weathercard {...tempInfo}/>

    </>
  )
}

export default Temp
