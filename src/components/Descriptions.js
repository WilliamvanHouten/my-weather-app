import React from 'react'
import './Descriptions.css'
import { FaArrowUp, FaArrowDown, FaWind } from "react-icons/fa";
import { BiHappy } from "react-icons/bi";
import { MdCompress, MdOutlineWaterDrop } from "react-icons/md";

// Function to display weather descriptions
const Descriptions = ({ weather, units }) => {
    // Determine temperature and wind units based on the selected system (metric or imperial)
    const tempUnit = units === "metric" ? "°C" : "°F";
    const windUnit = units === "metric" ? "m/s" : "m/h";

    // array of description cards with relevant data
    const cards = [
        {
          id: 1,
          icon: <FaArrowDown />,
          title: "min",
          data: weather.temp_min.toFixed(),
          unit: tempUnit,
        },
        {
          id: 2,
          icon: <FaArrowUp />,
          title: "max",
          data: weather.temp_max.toFixed(),
          unit: tempUnit,
        },
        {
          id: 3,
          icon: <BiHappy />,
          title: "feels like",
          data: weather.feels_like.toFixed(),
          unit: tempUnit,
        },
        {
          id: 4,
          icon: <MdCompress />,
          title: "pressure",
          data: weather.pressure,
          unit: "hPa",
        },
        {
          id: 5,
          icon: <MdOutlineWaterDrop />,
          title: "humidity",
          data: weather.humidity,
          unit: "%",
        },
        {
          id: 6,
          icon: <FaWind />,
          title: "wind speed",
          data: weather.speed.toFixed(),
          unit: windUnit,
        },
    ];

    // Render the description cards using map
    return (
        <div className="section section__descriptions">
          {cards.map(({ id, icon, title, data, unit }) => (
            <div key={id} className="card">
              <div className="description__card-icon">
                {icon}
                <small>{title}</small>
              </div>
              <h2>{`${data} ${unit}`}</h2>
            </div>
          ))}
        </div>
    );
};


export default Descriptions;
