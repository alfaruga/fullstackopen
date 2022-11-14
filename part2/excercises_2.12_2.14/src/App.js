import axios from "axios";
import { useState, useEffect } from "react";
import Countries from "./Components/Countries/Countries";
import Country from "./Components/Country/Country";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  const searchHandler = (event) => {setSearch(event.target.value)};
  const filterFunction = (listOfCountries) => listOfCountries.filter((value) => value.name.common.toLowerCase().includes(search.toLowerCase()));
  

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fullfiled");
      const restCountries = response.data.map((country) => country);
      setCountries(restCountries);
    });
  }, []);

  
  var content = "";
  const filteredCountries = filterFunction(countries);

  if (search === "") {
    content = "Countries will be displayed in here!";
  } else if (filteredCountries.length > 10) {
    content = "Too many matches, specify another filter";
  } else if (filteredCountries.length === 1) {
    const country = filteredCountries[0]
    content = (<Country country={country} display={true}/>      
    )
  } else {
    content = <><h3>Countries:</h3><Countries listOfCountries={filteredCountries}/></>
  }
  return (
    <div className="App">
      <h1>public stuff</h1>
      find countries<input value={search} onChange={searchHandler}></input>
      
      {content}
    </div>
  );
}

export default App;
