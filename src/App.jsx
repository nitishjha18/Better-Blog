import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwriteSdk/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
  authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .catch((error) => {
      // Handle guest users gracefully
      console.log("Guest user detected");
      dispatch(logout())
    })
    .finally(() => setLoading(false))
}, [])


  return !loading ? (
    <div className='min-h-screen flex flex-col font-semibold bg-gray-400'>
      
        <Header />
        <main className="flex-1">
        <Outlet />
        </main>
        <Footer />
      </div>
    
  ) : null
}

export default App
