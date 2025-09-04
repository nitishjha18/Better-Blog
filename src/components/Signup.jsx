import React, { useState } from 'react'
import authService from '../appwriteSdk/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input } from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import logo from '../assets/logo.png'

function Signup() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [error, setError] = useState('')

  const create = async (data) => {
    setError('')
    try {
      await authService.createAccount(data)
      const userData = await authService.getCurrentUser()
      if (userData) {
        dispatch(login(userData))
        navigate('/')
      }
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-2">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-md p-6 sm:p-10">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
        </div>
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-1">
          Sign up to create account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
        {error && <p className="text-center text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit(create)} className="space-y-4">
          <Input
            label="Full Name:"
            placeholder="Enter your full name"
            {...register('name', { required: 'Name is required' })}
            error={errors.name?.message}
            className="bg-gray-100 border border-transparent rounded-lg"
          />
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
            className="bg-gray-100 border border-transparent rounded-lg"
          />
          <Input
            label="Password:"
            type="password"
            placeholder="Enter your password"
            {...register('password', { required: 'Password is required' })}
            error={errors.password?.message}
            className="bg-gray-100 border border-transparent rounded-lg"
          />
          <Button
            type="submit"
            className="w-full font-medium rounded-lg py-3"
          >
            Create Account
          </Button>
        </form>
      </div>
    </section>
  )
}

export default Signup
