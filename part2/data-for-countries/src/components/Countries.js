import React from 'react'
import Country from './Country'
import CountryInfo from './CountryInfo'
import WeatherInfo from './WeatherInfo';

const Countries = ({countries, handleClick, weatherData}) =>{
    if(countries.length > 10){
        return(
            <div>
                <p>Too many matches, specify another filter.</p>
            </div>
        );
    } else if (countries.length > 1 && countries.length < 10) {
        return(
            <div>
                {countries.map(country => (
                 <Country
                    key = {country.name.common}
                    country = {country}
                    handleClick={handleClick}
                 />   
                ))}
            </div>
        );
    } else if (countries.length === 1) {
        return (
            <div>
                {countries.map(country => (
                <CountryInfo 
                    key = {country.name.common}
                    country = {country}
                />
                ))}

                <WeatherInfo weatherData={weatherData} />
            </div> 
        );
    }
};

export default Countries;