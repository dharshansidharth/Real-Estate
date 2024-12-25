import React from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { useState } from 'react'
import { updateUserStart, updateUserSuccess, updateUserFail } from '../redux/users/UserSlice.js'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify' 

const Profile = () => {
  const { currentUser, error, loading } = useSelector((state) => state.user)
  const [formData, setFormData] = useState({
    avatar: currentUser.avatar,
  })
  const [successStatus, setSuccessStatus] = useState(false)
  const fileRef = useRef(null)
  const dispatch = useDispatch()

  console.log(loading)

  function handleChange(e) {

    e.preventDefault()
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      dispatch(updateUserStart())
      const res = await fetch(`/api/users/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (data.success === false) {
        dispatch(updateUserFail(data.message))
        toast.error(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        return
      }

      dispatch(updateUserSuccess(data))
      toast.success('Update Success!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });

    }
    catch (err) {
      dispatch(updateUserFail(err.message))
      toast.error(err.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }

    

  }

  return (
    <div className='max-w-lg p-3 mx-auto '>
      <h1 className='font-semibold text-3xl text-center mt-7'>Profile</h1>
      <form onSubmit={(e) => { handleSubmit(e) }} className='flex flex-col max-w-lg gap-4'>
        <input type="file" ref={fileRef} hidden accept='image/*' />

        <img onClick={() => fileRef.current.click()} src={currentUser.avatar} alt='profile-pic' className=' h-24 w-24 rounded-full object-cover self-center my-5 cursor-pointer' />

        <input onChange={(e) => handleChange(e)} defaultValue={currentUser.username} type='text' placeholder='username' id='username' className='focus:outline-none border p-3 rounded-lg' />

        <input onChange={(e) => handleChange(e)} defaultValue={currentUser.email} type='email' placeholder='email' id='email' className='focus:outline-none border p-3 rounded-lg' />

        <input onChange={(e) => handleChange(e)} type='password' placeholder='password' id='password' className='focus:outline-none border p-3 rounded-lg' />

        <button disabled = {loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 cursor-pointer'>
          {loading ? 'Loading...' : 'Update'}
        </button>

      </form>

      <div className='flex justify-between my-3 text-md font-semibold'>
        <span className='text-red-500 cursor-pointer'>Delete Account</span>
        <span className='text-green-700 cursor-pointer'>Sign Out</span>
      </div>

    </div>
  )
}

export default Profile