import React from "react";

const CountryInfo = ({ country }) => (
    <div>
        <div>
            <h1>{country.name.official}</h1>
            <p><b>Capital: </b> {country.capital}</p>
            <p><b>Area: </b>{country.area}</p>
        </div>
        <div>
            <h2>Languages</h2>
            {(Object.entries(country.languages)).map(([key,value]) => 
                <li key={key}>{value}</li>
            )}
        </div>
        <div>
            <p></p>
            <img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            width="150px"
            height="100px"
            />
        </div>
    </div>
    
);

export default CountryInfo;