import React,{useContext, useState} from 'react'
import '../signup/signup.css'
import { useNavigate } from 'react-router-dom'
import api from '../../api'
import { productContext } from '../contextAPI/Context'

const Login = () => {
    const navigate = useNavigate()
    const { token,setToken } = useContext(productContext)
    const [email, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
  
 
    const changeMailHandler = (e) => {
        setMail(e.target.value)
    }
    const changePasswordHandler = (e) => {
        setPassword(e.target.value)
    }
  
    const submitHandler = async () => {
      setError('')
      try {
        const res = await api.post('/login', { email, password })
        localStorage.setItem('token', res.data.token)
        setToken(res.data.token)
        navigate('/home')
      } catch (requestError) {
        const status = requestError.response?.status
        setError(status === 401
          ? 'Email or password is incorrect. If this is a new account, sign up first.'
          : status
            ? `Login failed (HTTP ${status}). Check the backend deployment.`
            : 'Cannot reach the backend. Check the public API URL and try again.')
      }
  }
  
  
    return (
      <div className='signup'>
        <input type="text" placeholder='email' onChange={(e) => { changeMailHandler(e) }}/>
        <input type="password" placeholder='password'  onChange={(e) => { changePasswordHandler(e) }} />
        <button onClick={() => { submitHandler() }}>Login</button>
        {error && <p role="alert" style={{ color: 'crimson' }}>{error}</p>}
      </div>
    )
  }

export default Login
