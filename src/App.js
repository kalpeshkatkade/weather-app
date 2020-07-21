import React, {useState} from 'react';

import './App.css';

const api ={
  key : "551b324d5864b205999be73dc0a2c270",
  base : "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const[query,setQuery]=useState('');
  const[weather,setWeather]=useState({});

  const searchWeather = (evt) =>{
    if (evt.key==='Enter'){
      fetch(`${api.base}weather?q=${query}&&units=metrics&&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
      })
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
     
    let day= days[d.getDay()];
    let month=months[d.getMonth()];
    let date=d.getDate();
    let year=d.getFullYear();

    return`${date}/${month}/${year} ${day}`

  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 300) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search your city"
            className="search-bar" 
            onChange={e =>setQuery (e.target.value)}
            value={query}
            onKeyPress={searchWeather}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round((weather.main.temp)-273.15)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
        
      </main>
    </div>
  );
}

export default App;
