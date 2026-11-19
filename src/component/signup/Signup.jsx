import React,{useContext, useState} from 'react'
import './signup.css'
import { useNavigate } from 'react-router-dom'
import api from '../../api'
import { productContext } from '../contextAPI/Context'

const Signup = () => {

  const navigate = useNavigate()
  const { setToken } = useContext(productContext)

  const [name, setName] = useState('')
  const [email, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')


  const changeNameHandler = (e) => {
      setName(e.target.value)
  }
  const changeMailHandler = (e) => {
      setMail(e.target.value)
  }
  const changePasswordHandler = (e) => {
      setPassword(e.target.value)
  }

  const submitHandler = async () => {
    setError('')
    try {
      const res = await api.post('/signup', { name, email, password })
      localStorage.setItem('token', res.data.token)
      setToken(res.data.token)
      navigate('/')
    } catch (requestError) {
      const status = requestError.response?.status
      setError(status === 404
        ? 'Signup endpoint not found. Check that the latest backend deployment is live and the API URL has no /api suffix.'
        : status === 409
          ? 'This email already has an account. Please sign in instead.'
        : status
          ? `Signup failed (HTTP ${status}). Check the backend logs.`
          : 'Cannot reach the backend. Check the public API URL and try again.')
    }
}


  return (
    <div className='signup'>
      <input type="text" placeholder='username' onChange={(e) => { changeNameHandler(e) }}/>
      <input type="text" placeholder='email' onChange={(e) => { changeMailHandler(e) }}/>
      <input type="password" placeholder='password'  onChange={(e) => { changePasswordHandler(e) }} />
      <button onClick={() => { submitHandler() }}>SignUp</button>
      {error && <p role="alert" style={{ color: 'crimson', maxWidth: '20rem', textAlign: 'center' }}>{error}</p>}
    </div>
  )
}

export default Signup
