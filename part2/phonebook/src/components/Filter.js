import React from 'react'
const Filter=({action})=>{
   return  <div>
        filter show with : <input
        onChange={action}
        type="text"/>
            </div>
}
export default Filter;