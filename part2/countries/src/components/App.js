
import React ,{useState,useEffect}from 'react'
import axios from 'axios'
import Country from './Country'
import CountryDetails from './CountryDetails'
const App=()=>{
const [countries,setCountries]=useState([]) 
const [searchCountry,setSearchCountry]=useState('')


const textInputListener=(event)=>{
    setSearchCountry(event.target.value)
   }


useEffect(() => {
   axios.get("https://restcountries.eu/rest/v2/all").
    then(country =>  {  
        setCountries(country.data)  
    }     
        )
}, [])



const showCountryDetails=(country)=>{
setSearchCountry(country.name)
}
const TooManyMatches=()=>{
   return <div>Too Many Matches</div>
}

let matchCountries=countries.filter( country=>
    country.name.toLowerCase().
    includes(searchCountry.toLowerCase()) )


 console.log("the search country is " ,searchCountry,
 "the countries are ",...matchCountries)
   return (<div>
       <label>find countries</label>
       <input
       value={searchCountry}
        onChange={textInputListener}
        type="text" />{searchCountry}
       
       {
       matchCountries.length>10?
       <TooManyMatches/>:matchCountries.length===1?
       <CountryDetails 
            key={matchCountries[0].name} 
            country={matchCountries[0]}/>:
         matchCountries.map(country=>
                <div>
                        <Country key={country.name} 
                                country={country}/>

                        <button 
                            onClick= {()=>showCountryDetails(country)}> 
                             show
                        </button>
                        
                </div> )
        }

    </div>

   )

   

}

export default App;


    
     