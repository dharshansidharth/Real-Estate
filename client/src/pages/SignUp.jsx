import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import OAuth from '../components/OAuth'

const SignUp = () => {
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  function handleChange(e) {
    e.preventDefault()
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      console.log(data)
      if (data.success === false) {
        console.log('hello')
        setError(data.message)
        setLoading(false)
        return
      }
      setLoading(false)
      setError(null)
      navigate('/sign-in')
    }

    catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }

  // console.log(formData)

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center text-3xl font-semibold my-7'>Sign Up</h1>
      <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-4'>
        <input type="text"
          placeholder='username'
          className='border p-3 rounded-lg'
          id='username' onChange={(e) => handleChange(e)} />
        <input type="email"
          placeholder='Email'
          className='border p-3 rounded-lg'
          id='email' onChange={(e) => handleChange(e)} />
        <input type="password"
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password' onChange={(e) => handleChange(e)} />
        <button disabled={loading} className='bg-slate-700 text-white py-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-3'>
        <p>Have an account?</p>
        <Link to={'/sign-in'} className='text-blue-600 underline'>
          Sign In
        </Link>
      </div>
      {error &&
        <p className='text-red-500 mt-5'>{error}</p>
      }
    </div>
  )
}

export default SignUp