import React from 'react'

const PersonForm=({addName,
                    newName,
                    onTypingName,
                    newNumber,
                   onTypingNumber})=>{
  
     return (
<form onSubmit={addName}>     
        <div>

        name: <input value={newName} 
                        onChange={onTypingName}/>
        <br/>
        number : <input value={newNumber} 
                            onChange={onTypingNumber}/>
        </div>
        
        <div>
            <button type="submit">add</button>
        </div>
</form>


     )


}
export default PersonForm;
