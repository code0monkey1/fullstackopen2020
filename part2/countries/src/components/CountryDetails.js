import React from 'react'
import Weather from './Weather'

const CountryDetails=({country})=>{
     
    return(
          <div>
           <h1>{country.name}</h1>
           <div>capital {country.capital}</div>
           <div>population {country.population}</div>
       
           <Languages country={country}/>

          </div>
    )
}

const Languages=({country})=>{
   
    return(
        <div>
       <h3>languages</h3>
            <ul>
                {country.languages.map( language=><li>
                    {language.name}
                </li>)}
            </ul>

            <div>
                <img style={{width:"100px",height:"100px"}}
                    src={country.flag} 
                    alt="flag"/>
            </div>
            <div>
                <Weather country={country} />
     
            </div>
       </div>
    )
}

export default CountryDetails;