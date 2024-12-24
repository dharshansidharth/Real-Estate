import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart, signInSuccess, signInFail } from '../redux/users/UserSlice'
import OAuth from '../components/OAuth'

const SignIn = () => {
  const [formData, setFormData] = useState({})
  const { loading, error } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function handleChange(e) {
    e.preventDefault()
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    dispatch(signInStart())
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      console.log(data)
      if (data.success === false) {
        dispatch(signInFail(data.message))
        return
      }
      dispatch(signInSuccess(data))
      navigate('/')
    }

    catch (error) {
      dispatch(signInFail(error.message))
    }
  }

  // console.log(formData)

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center text-3xl font-semibold my-7'>Sign In</h1>
      <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-4'>
        <input type="text"
          placeholder='username'
          className='border p-3 rounded-lg'
          id='username' onChange={(e) => handleChange(e)} />
        <input type="password"
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password' onChange={(e) => handleChange(e)} />
        <button disabled={loading} className='bg-slate-700 text-white py-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-3'>
        <p>Don't have an account?</p>
        <Link to='/sign-up' className='text-blue-600 underline'>
          Sign Up
        </Link>
      </div>
      {error &&
        <p className='text-red-500 mt-5'>{error}</p>
      }
    </div>
  )
}

export default SignIn