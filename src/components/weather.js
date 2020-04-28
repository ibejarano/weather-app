import React from "react";
import "./style-weather.scss";

export default function Weather(props) {
  const { temperature, iconURL, location, background } = props;
  return (
    <div
      className="weather-container"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <img className="weather-icon" src={iconURL} alt="forcast img" />
      <h1 className="weather-temperature">{`${Math.floor(temperature)} °C`}</h1>
      <h3 className="weather-location">{location}</h3>
    </div>
  );
}
