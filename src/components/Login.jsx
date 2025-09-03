import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwriteSdk/auth'
import { useForm } from 'react-hook-form'
import logo from '../assets/logo.png'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [error, setError] = useState('')

  const login = async (data) => {
    setError('')
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(authLogin(userData))
        navigate('/')
      }
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-gray-200 p-10 shadow-md">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
        </div>
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-1">
          Sign in to your account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
        {error && <p className="text-center text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="space-y-5">
          <Input
            label="Email:"
            type="email"
            placeholder="Enter your email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: 'Invalid email address',
              },
            })}
            error={errors.email?.message}
            className="bg-gray-100 border border-transparent rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <Input
            label="Password:"
            type="password"
            placeholder="Enter your password"
            {...register('password', { required: 'Password is required' })}
            error={errors.password?.message}
            className="bg-gray-100 border border-transparent rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium rounded-lg py-3 hover:bg-blue-700 transition"
          >
            Sign in
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login
