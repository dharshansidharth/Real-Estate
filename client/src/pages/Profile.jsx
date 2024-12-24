import { current } from '@reduxjs/toolkit'
import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user)

  return (
    <div className = 'max-w-lg p-3 mx-auto '>
      <h1 className = 'font-semibold text-3xl text-center mt-7'>Profile</h1>
      <form className = 'flex flex-col max-w-lg gap-4'>

        <img src={currentUser.avatar} alt='profile-pic' className = ' h-24 w-24 rounded-full object-cover self-center my-5 cursor-pointer'/>

        <input type='text' placeholder='username' id = 'username' className = 'focus:outline-none border p-3 rounded-lg' />

        <input type='email' placeholder='email' id = 'email' className = 'focus:outline-none border p-3 rounded-lg' />

        <input type='password' placeholder='password' id = 'password' className = 'focus:outline-none border p-3 rounded-lg' />

        <button className = 'bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 cursor-pointer'>
          update
        </button>

      </form>

      <div className = 'flex justify-between my-3 text-md font-semibold'>
        <span className = 'text-red-500 cursor-pointer'>Delete Account</span>
        <span className = 'text-green-700 cursor-pointer'>Sign Out</span>
      </div>

    </div>
  )
}

export default Profile