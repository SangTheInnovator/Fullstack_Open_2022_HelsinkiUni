import React from "react";

const Country = ({country,handleClick}) => (
    <div>
        <p>
            {country.name.common}
            <button onClick={() => handleClick(country.name.common)}>
                show
            </button>
        </p>
        
    </div>
);

export default Country;