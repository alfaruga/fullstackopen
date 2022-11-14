import { useState } from "react";

const Country = ({ country, display }) => {
  const [show, setShow] = useState(display);
  const diplayToggler = () => {
    setShow(!show);
  };
const languages = Object.values(country.languages).map((language) => (
    <li key={language}>{language}</li>
  ))
  var countryDisplay = show ? (
    <>
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <h4>Languages:</h4>
        <ul>
          {languages}
        </ul>
        <img src={country.flags.svg} width="600" height={(600 * 2) / 3} />
      </div>
      <button onClick={diplayToggler}>hide</button>
    </>
  ) : (
    <div>
      <span>{country.name.common}</span>
      <button onClick={diplayToggler}>show</button>
    </div>
  );

  return countryDisplay;
};

export default Country;
