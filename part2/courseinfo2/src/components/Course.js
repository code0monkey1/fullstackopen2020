import React from 'react'


const Course=({course})=>{
    return(
<div key={course.id}>
<Header course={course} />
<Content parts={course.parts} />
<Total parts={course.parts} />
</div>
    )
}

const Header =(props)=>{
    return (
   
      <h2>{props.course.name}</h2>
    )
  }
  const Content =(props)=>{
     
     const parts=props.parts.map( (p)=><Part key={p.id} parts={p}/>)
     return (
       <>
      {parts}
      </>
     )
  }
  const Part=(props)=>{
  
    return (
      <p>
          {props.parts.name} {props.parts.exercises}
        </p>
  
    )
  }
  
  const Total =(props)=>{
    let sum=0;
    
    props.parts.forEach(p => sum+=p.exercises)
  
    return (
    <p>Total of {sum} exercises</p> 
    )
  }
export default Course;