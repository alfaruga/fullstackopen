import { useEffect, useState } from "react";
import axios from "axios";

const Country = ({ country, display }) => {
  const [show, setShow] = useState(display);
  const [weather, setWeather] = useState({});
  const capitalCity = country.capital[0];

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capitalCity}&APPID=4949342ed1a2963beb0558128f07f52f`
      )
      .then((response) => {
        setWeather({
          ...weather,
          temperature: (response.data.main.temp - 273.15).toFixed(2),
          icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
          wind: response.data.wind.speed,
        });
      });
  }, []);

  const diplayToggler = () => {
    setShow(!show);
  };
  const languages = Object.values(country.languages).map((language) => (
    <li key={language}>{language}</li>
  ));
  var countryDisplay = show ? (
    <div>
      <h1>{country.name.common}</h1>
      <button onClick={diplayToggler}>hide</button>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h4>Languages:</h4>
      <ul>{languages}</ul>
      <img src={country.flags.svg} width="600" height={(600 * 2) / 3} />
      <h2>Weather in {capitalCity}</h2>
      <p>temperature {weather.temperature}</p>
      <img src={weather.icon} />
      <p>wind {weather.wind} m/s</p>
    </div>
  ) : (
    <div>
      <span>{country.name.common}</span>
      <button onClick={diplayToggler}>show</button>
    </div>
  );

  return countryDisplay;
};

export default Country;
