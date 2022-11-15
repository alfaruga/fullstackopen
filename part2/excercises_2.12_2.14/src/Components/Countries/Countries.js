import Country from "../Country/Country";

const Countries = ({ listOfCountries }) => {
  
  return(
    listOfCountries.map((country) => <Country key={country.name.common} country={country} display={false}/>
  ));
};

export default Countries;
