import React ,{ useState }from 'react'
// always use at the top of the file when checking for PropTypes
import PropTypes from 'prop-types'

export default function LoginForm({ loginUser }) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitUserCredentials =() => {
    console.log('=> submitUserCredentials() ')
    loginUser({ username,password })

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <input id='username' type="text"  value={username} onChange={({ target:{ value } }) => setUsername(value)} placeholder="username" />
      <input id='password' type="password" value={password} onChange={({ target:{ value } }) => setPassword(value)} placeholder="password"/>
      <br/>
      <button onClick={submitUserCredentials} type="submit"> Login </button>
    </div>
  )
}


LoginForm.propTypes = {
  loginUser:PropTypes.func.isRequired // This will issue a warning in the console if right type is not there or the value is missing
}
