import React from 'react'
import {setFilter} from '../reducers/filterReducer.js'
import {useDispatch} from 'react-redux'

const Filter = () => {

    const dispatch = useDispatch()
  

  const handleChange = (event) => {
      console.log(event.target.value)
    // input-field value is in variable event.target.value

    // dispatch whenever the value of the input field changes
      dispatch(setFilter(event.target.value))
      
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter