import React, { useState,useImperativeHandle, forwardRef } from 'react'

const Toggleable=forwardRef((props,ref) => {
  // the visible state indirectly controls the visible state of components by tweaking the display
  // property in 'style'
  const [visible,setVisible] = useState(false)

  // all components that are to be visible only when the visibility is true , use this style
  const showWhenVisible = { display:visible?'':'none' }
  // all components that are to be invisible  when the visibility is true , use this style
  const hideWhenVisible = { display:visible?'none':'' }

  const toggleVisibility =() => setVisible(!visible)

  // used to forward the Reference of the method inside the useImperativeHandle function hook
  // to the parent having the reference variable to the Toggleable component
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>   {/* This will only be shown when the visibility is toggled*/}
      <div style={showWhenVisible}> {props.children} </div>

      {/*
                    children is an empty array that will consist of
                    all the components that are put inside the body of Toggleable
                 */}

      <div style={hideWhenVisible}> {/*To be visible in the starting and being able to toggle visibility*/}
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>

    </div>
  )
})

Toggleable.displayName= 'Toggleable'
export default Toggleable
