import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";

function Weather() {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const search = async (city) => {
    if (city === "") {
      alert("Enter city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Fetching API error");
      }

      const data = await response.json();
      console.log("API Data:", data);


      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: data.weather[0].icon,
        description: data.weather[0].description,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching weather data:", error);
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className="weather">
      <div className="search_bar">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          onKeyDown={(e) => e.key === "Enter" && search(inputRef.current.value)}
        />
        <img
          src={search_icon}
          alt="search"
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
            alt="weather_icon"
            className="weather_icon"
          />
          <p className="temperature">{weatherData.temperature}°c</p>
          <p className="location">{weatherData.location}</p>
          <p className="weather_description">{weatherData.description}</p>
          <div className="weather_data">
            <div className="col">
              <img src={humidity_icon} alt="icon" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="icon" />
              <div>
                <p>{weatherData.windSpeed}kph</p>
                <span>Humidity</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
        <div className="error_message">
            <p>Oops... This city doesn't exist.</p>
        </div>
        </>
      )}
    </div>
  );
}

export default Weather;
