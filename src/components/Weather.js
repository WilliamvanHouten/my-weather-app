// Define the API key and a function to create the weather icon URL
const API_KEY = "948fd22a58a783a1ee4ca493b36d8681";
const makeIconURL = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

// Define a function to fetch weather data from the OpenWeatherMap API
const getWeatherData = async (city, units = "metric") => {
  // Construct the URL for the API request
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

  // Fetch weather data from the API using the constructed URL
  const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data);

  // Destructure relevant data from the API response
  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    sys: { country },
    name,
  } = data;

  // Destructure the weather description and icon ID
  const { description, icon } = weather[0];

  // Create and return an object containing relevant weather information
  return {
    description,
    iconURL: makeIconURL(icon),
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    speed,
    country,
    name,
  };
};


export default getWeatherData;
