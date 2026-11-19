import React, { useContext } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './component/home/Home'
import Fav from './component/fav/Fav'
import Navbar from './component/navbar/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from './component/cart/Cart'
import Signup from './component/signup/Signup'
import Login from './component/login/Login'
import NavbarLog from './component/navbar/NavbarLog'
import { productContext } from './component/contextAPI/Context'

const App = () => {

  const { token } = useContext(productContext)
  const hasToken = !!token || !!localStorage.getItem('token')

  return (
    <div>
      {hasToken ? (
            <NavbarLog />
          ) : (
            <Navbar />
          )}
      
      <BrowserRouter>
        <Routes>
        {hasToken ? (
            <Route path="/" element={<Home/>} />
          ) : (
            <Route path="/" element={<Login />} />
          )}
          <Route exact path='/home' element={<Home />}></Route>

          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/signup' element={<Signup/>} ></Route>
          <Route path='/login' element={<Login/>} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
