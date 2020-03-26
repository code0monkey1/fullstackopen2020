import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const total=(good+bad+neutral)
  
  const Button= (props)=>{
    return (
       <button onClick={props.action}>{props.text}</button>
    )
 }
 const Statistics= (props)=>{
   return ( 
     <div>
  
      <table >
        <tbody>
        <tr>
         <td style={{width:"100px"}} >{props.category}</td>
         <td >{props.count}</td>
       </tr>
       </tbody>
      </table>
      
     </div>
   )
 }
 
 
 if(total!==0){
  return (
  
    <div>
      <h1> give feedback </h1>

    <Button 
    action={()=>setGood(good+1)}
    text="good"/>

    <Button 
    action={()=>setNeutral(neutral+1)}
    text="neutral"/>

    <Button
    action={()=>setBad(bad+1)} 
    text="bad"/>

<h1>statistics</h1>

  <Statistics 
   category="good" 
   count={good}/>

  <Statistics  
  category="neutral" 
  count={neutral}/>

   <Statistics 
    category="bad"
     count={bad}/>
 <Statistics
 category="all"
 count={good+bad+neutral}/>

  <Statistics 
  category="average"
  count={ ((good-bad)/total )} 
   />

   <Statistics
   category="positive"
   count={`${good/total*100} %`}
   />

    </div>
  )

}
  return (
    <div>

      <h1> give feedback </h1>

    <Button 
    action={()=>setGood(good+1)}
    text="good"/>

    <Button 
    action={()=>setNeutral(neutral+1)}
    text="neutral"/>

    <Button
    action={()=>setBad(bad+1)} 
    text="bad"/>

<h1>statistics</h1>
<h2>No feedback given</h2>
    </div>


  )
}


ReactDOM.render(<App />, 
  document.getElementById('root')
)