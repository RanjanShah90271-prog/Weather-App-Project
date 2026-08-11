import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

const API_KEY = "8608c35e534097aae5684e1e36e02b6b";

function Weather() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {

  if (city.trim() === "") {
    alert("Enter city name");
    return;
  }

  try {

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    setWeather(response.data);
    setError("");

  } catch (err) {

    setError("City Not Found");
    setWeather(null);

  }

};

  return (

    <div className="container">

      <div className="weather-card">

        <h1>Weather App</h1>

        <div className="search">

          <input
            type="text"
            placeholder="Enter City..."
            value={city}
            onChange={(e)=>setCity(e.target.value)}
          />

          <button onClick={getWeather}>
            Search
          </button>

        </div>

        {error && <p className="error">{error}</p>}

        {weather && (

          <div className="weather-info">

            <h2>
              {weather.name}, {weather.sys.country}
            </h2>

           <img
  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
  alt="Weather Icon"
/>

            <h1>{weather.main.temp}°C</h1>

            <h3>{weather.weather[0].main}</h3>

            <p>{weather.weather[0].description}</p>

            <div className="details">

              <div>
                <h4>Humidity</h4>
                <p>{weather.main.humidity}%</p>
              </div>

              <div>
                <h4>Wind</h4>
                <p>{weather.wind.speed} m/s</p>
              </div>

            </div>

          </div>

        )}

      </div>

    </div>

  );

}

export default Weather;