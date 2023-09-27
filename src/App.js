import sunnyBg from './assets/hot.jpg';
import cloudyBg from './assets/cloudy.jpg';
import rainyBg from './assets/rain.jpg';
import heavyRainBg from './assets/heavy-rain.jpg';
import thunderBg from './assets/thunder.jpg'
import snowBg from './assets/snow.jpg'
import Descriptions from './components/Descriptions';
import { useEffect, useState } from 'react';
import getWeatherData from './components/Weather';

function App() {
  const[city, setCity] = useState("Johannesburg");

  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric")
  const [bg, setBg] = useState(sunnyBg);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getWeatherData(city, units);
      setWeather(data);

       // Dynamic background based on weather description
       const weatherDescription = data.description.toLowerCase();
       switch (weatherDescription) {
         case 'clear sky':
         case 'few clouds':
           setBg(sunnyBg);
           break;
         case 'scattered clouds':
         case 'broken clouds':
          case 'overcast clouds' :
           setBg(cloudyBg);
           break;
         case 'light rain':
         case 'moderate rain':
           setBg(rainyBg);
           break;
         case 'heavy rain':
         case 'heavy intensity rain':
           setBg(heavyRainBg);
           break;
           case 'thunder shower':
         case 'thunderstorm':
           setBg(thunderBg);
           break;
           case 'snow':
           setBg(snowBg);
           break;
         default:
           setBg(sunnyBg); // Default to sunny if unknown description
       }
     };

    fetchWeatherData();
  }, [units, city]);

const handleUnitsClick = (e) => {
  const button = e.currentTarget;
  const currentUnit = button.innerText.slice(1)
  const isCelsius = currentUnit === 'C';
  button.innerText = isCelsius ? '°F' : '°C'
  setUnits(isCelsius ? "metric" : "imperial");
}

const enterKeyPressed = (e) => {
  if (e.keyCode === 13) {
    setCity(e.currentTarget.value)
    e.currentTarget.blur()
  }
}

return (
  <div className="app" style={{ backgroundImage: `url(${bg})` }}>
    <div className="overlay">
      {weather && (
        <div className="container">
          <div className="section section__inputs">
            <input
              onKeyDown={enterKeyPressed}
              type="text"
              name="city"
              placeholder="Enter City..."
            />
            <button onClick={(e) => handleUnitsClick(e)}>°F</button>
          </div>

          <div className="section section__temperature">
            <div className="icon">
              <h3>{`${weather.name}, ${weather.country}`}</h3>
              <img src={weather.iconURL} alt="weatherIcon" />
              <h3>{weather.description}</h3>
            </div>
            <div className="temperature">
              <h1>{`${weather.temp.toFixed()} °${
                units === "metric" ? "C" : "F"
              }`}</h1>
            </div>
          </div>

          {/* bottom description */}
          <Descriptions weather={weather} units={units} />
        </div>
      )}
    </div>
  </div>
);
}

export default App;
