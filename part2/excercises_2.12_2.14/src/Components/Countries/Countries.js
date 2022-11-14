import Country from "../Country/Country";

const Countries = ({ listOfCountries }) => {
  
  return(
    listOfCountries.map((country) => <><Country key={country.name.official} country={country} display={false}/></>
  ));
};

export default Countries;
