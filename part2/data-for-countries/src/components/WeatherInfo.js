import React from 'react';

const WeatherInfo = ({weatherData}) => (
    <>
    {
        weatherData && (
            <div>
                <h2>Weather in {weatherData.name}</h2>  
                <p>temperature {weatherData.main.temp} Celcius</p>
                {weatherData.weather.map(info => 
                    <img 
                        key={info.id}
                        src={`http://openweathermap.org/img/wn/${info.icon}@2x.png`}
                    />
                )}
                <p>wind {weatherData.wind.speed} m/s</p>
            </div>
        )
    }
    </>
    
    
);

export default WeatherInfo;