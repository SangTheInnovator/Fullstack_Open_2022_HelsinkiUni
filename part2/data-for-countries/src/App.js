import React, {useState, useEffect} from 'react';
import axios from "axios";

import Input from "./components/Input";
import Countries from "./components/Countries";

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all").then(response => {
        if(query !== "") {
          const searchCountry = response.data.filter(country => 
            country.name.common.toLowerCase().includes(query.toLowerCase())
          );
          setCountries(searchCountry)
        }
      });
  }, [query]);

  useEffect(() => {
    const url = "https://api.openweathermap.org/data/2.5/weather";
    const api_key = process.env.REACT_APP_API_KEY;
    if(countries.length === 1) {
      const capital = countries.map(country => country['capital'])
      if(capital[0]){
        axios
        .get(`${url}?q=${capital[0]}&appid=${api_key}&units=metric`)
        .then(response =>{
          setWeatherData(response.data)
        })
      }
    }
  }, [countries]);
  
  console.log(countries)
  console.log(weatherData)

  const handleSearchChange = event => {
    setQuery(event.target.value);
  };

  const handleClick = countryName => {
    setQuery(countryName);
  }

  return(
    <div>
      <Input
        type="text"
        label="find countries "
        value={query}
        onChange={handleSearchChange}
      />
      <Countries
          handleClick = {handleClick}
          countries = {countries}
          weatherData={weatherData}
      />
    </div>
    
  )
}

export default App;
