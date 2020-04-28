import React, { useState } from "react";

import cities from "cities.json";

const ResultsList = ({ cities, setValue, eventEmitter }) => {
  const handleClick = (city) => {
    eventEmitter.emit("updateWeather", city);
    setValue("");
  };
  return (
    <ul className="search-list">
      {cities.map((city, idx) => (
        <li key={idx} onClick={() => handleClick(city.name)}>
          {city.name} - {city.country}
        </li>
      ))}
    </ul>
  );
};

const SearchBar = ({ eventEmitter }) => {
  const [value, setValue] = useState("juju");
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const matchingCities = cities.filter((city) => {
    const regex = new RegExp(value, "gi");
    return city.name.match(regex);
  });

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar ciudad ..."
        onChange={handleChange}
        value={value}
      />
      {value.length > 2 && (
        <ResultsList
          cities={matchingCities}
          setValue={setValue}
          eventEmitter={eventEmitter}
        />
      )}
    </div>
  );
};

export default SearchBar;
