import React ,{useState,useEffect} from 'react'
import axios from 'axios'

const Weather=({country})=>{

    const [weather ,setWeather]=useState(null)
        
    useEffect(()=> {
   
      axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.name}`).
        then(
            weather=>{
                console.log(weather.data)
                setWeather(weather.data) 
            }
         )
        }
 , [])

// useEffect(async() => {
//     console.log("The country is :",country)
//     try {
//         await axios.get(http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.name})
//             .then(weather=>{
//                 console.log(weather.data)
//                 setWeather(weather.data) 
//             })
//     } catch (e) {
//         console.log(e);
//     }
// } , [])
 if(weather==null ){
     return <div>Loading...</div>
 }
 console.log("loading weather : ",weather)
   return(
       <div>
           Weather
           <h2>Weather in {weather.location.name}</h2>
        <div>
            <em>temperature:</em> {weather.current.temperature} Celcius
        </div>
            <img alt="weather Image" src={weather.current.weather_icons[0]} 
            style={{width:"100px",height:"100px"}}
           alt="weatherPic"/>
            <div>
                <em>wind:</em> {weather.current.wind_speed} mph direction {weather.current.wind_dir}
            </div>
       </div>
   )
    }
export default Weather;