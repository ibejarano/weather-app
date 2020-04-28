import React, { useState } from "react";

import cities from "cities.json";

const ResultsList = ({ cities, setValue }) => {
  return (
    <li className="search-list">
      {cities.map((city, idx) => (
        <span key={idx} onClick={() => setValue(city.name)}>
          {city.name} - {city.country}
        </span>
      ))}
    </li>
  );
};

const SearchBar = () => {
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
      {value && <ResultsList cities={matchingCities} setValue={setValue} />}
    </div>
  );
};

export default SearchBar;
