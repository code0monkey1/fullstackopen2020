import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import { createEntry, getDiaryEntries } from './services/diariesService';
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from './types';

function App() {
    
     const [entries,setEntries] =useState<DiaryEntry[]>([])
      
     const [date,setDate] =useState('')
     const [visibility,setVisibility] = useState<Visibility>(Visibility.Good)
     const [weather,setWeather] = useState<Weather>(Weather.Rainy)
     const [comment,setComment] = useState('')
 
     useEffect(()=>{
        
       getDiaryEntries()
       .then(storedEntries =>setEntries(storedEntries))
       .catch(err => console.error(`Error : ",${err.data.message}`))
      
     },[])
   
     const addEntry=async(e:React.SyntheticEvent) =>{
          
           e.preventDefault()
            
           const newDiaryEntry :NewDiaryEntry={
              date:date,
              visibility,
              weather,
              comment
           }

          createEntry(newDiaryEntry)
          .then(entry =>setEntries(entry))
            .catch(error  => {
               
              if (axios.isAxiosError(error)) {
                console.error( "is axios error")
                  console.error(error.response?.data);
                  // Do something with this error...
                    }
                 console.error(`Error : ,${error.data.message}`)
                  }
              )
          
     }

     console.log("visibility is",visibility)
     console.log("weather is",weather)
  return (
    <div className="App">
    
    <h1>
      Add new entries
      
    </h1>

    <form onSubmit={addEntry}>
     <div> 
      <label htmlFor="date">Date:</label>
      <input 
      onChange={({target})=>{
        setDate(target.value )
      }}
      value={date}
      type="date"
      name="date"
       />
     </div>
     <hr/>
     <span>Visibility : </span>
      {
         
           Object.values(Visibility).map( _visibility => <>
                    <span>
                      <label>{_visibility}</label>
                      <input type="radio" id="huey" name="visibility" value={_visibility} checked={visibility===_visibility} 
                      onChange={({target})=>{
                        setVisibility(target.value as Visibility)
                      }}/>
                   </span>
           </>)
      }
      <hr/>
  <span>Weather : </span>
      {
         
           Object.values(Weather).map( _weather => <>
                    <span>
                      <label>{_weather}</label>
                      <input type="radio" id="due" name="weather" value={_weather} checked={weather===_weather} 
                      onChange={({target})=>{
                        setWeather(target.value as Weather)
                      }}/>
                   </span>
           </>)
      }
      <hr/>
   

       <div> 
      <label htmlFor="comment">Comment:</label>
      <input 
      onChange={({target})=>{
        setComment(target.value)
      }}
      value={comment}
      type="text"
       name="comment"/>
     </div>
    <button type="submit">Submit</button>
    </form>

      <h2>Diary Entries</h2>
    <ul>
      {
        entries.map(entry =><>
            
              <li>
                <div>
                  {`date : ${entry.date}`}
                </div>
                <div>
                 { `weather : ${entry.weather}`}
                </div>
                <div>
                  {`visibility : ${entry.visibility}`}
                </div>
               <hr/>
              </li>
            
        </>)
      }
         </ul>
    </div>
  );
}

export default App;
