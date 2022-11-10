import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  const searchHandler = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      const restCountries = response.data.map(country => country.name.common);
      setCountries(restCountries);
    });
  }, []);

  var content = "";
  const filteredCountries = countries
    .filter((value) => {
      return value.toLowerCase().includes(search.toLowerCase());
    })
    .map((value) => {
      return <p key={value + 1*Math.random(1)}>{value}</p>;
    });

  if(search === "" ){
    content = "Countries will be displayed in here!"
  }
    else if (filteredCountries.length > 10) {
    content = "Too many matches, specify another filter";
  } else {
    content = filteredCountries;
  }
  return (
    <div className="App">
      <h1>public stuff</h1>
      <input value={search} onChange={searchHandler}></input>
      debugger, state "search": {search}
      <h3>Countries:</h3>
      {content}
    </div>
  );
}

export default App;
