import React from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { useState } from 'react'
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFail,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFail,
  signoutUserStart,
  signoutUserSuccess,
  signoutUserFail,
} from '../redux/users/UserSlice.js'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const { currentUser, error, loading } = useSelector((state) => state.user)
  const [formData, setFormData] = useState({
    avatar: currentUser.avatar,
  })
  const [showListingsError, setShowListingsError] = useState(null)
  const [listings, setListings] = useState([])
  const [successStatus, setSuccessStatus] = useState(false)
  const [deletelistingError, setDeleteError] = useState(null)
  const [editError, setEditError] = useState(null)
  const fileRef = useRef(null)
  const dispatch = useDispatch()
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

  async function handleDelete(e) {
    e.preventDefault()

    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/users/delete/${currentUser._id}`, {
        method: 'DELETE',
      })

      console.log(res)

      const data = await res.json

      if (data.success === false) {
        dispatch(deleteUserFail(data.message))
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
      console.log('hello')
      dispatch(deleteUserSuccess(data))
      toast.success('Deletion Success!', {
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
      // console.log('catch')
      dispatch(deleteUserFail(err.message))
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
    }
  }

  async function handleSignout(e) {
    e.preventDefault()
    try {
      dispatch(signoutUserStart())
      const res = await fetch('/api/auth/signout', {
        method: 'GET',
      })

      const data = await res.json

      if (data.success === false) {
        dispatch(signoutUserFail(data.message))

        return
      }
      dispatch(signoutUserSuccess())

    }
    catch (err) {
      dispatch(signoutUserFail(err.message))
    }
  }

  const handleShowListings = async (e) => {
    e.preventDefault()
    try {
      setShowListingsError(null)

      const res = await fetch(`/api/users/listings/${currentUser._id}`, {
        method: 'GET',
      })

      const data = await res.json()
      if (data.success === false) {
        setShowListingsError(data.message)
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
      setListings(data)
      setShowListingsError(null)
      console.log(listings)
    }
    catch (err) {
      setShowListingsError(err.message)
      toast.error(err.message, {
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
  }

  const handleDeleteListing = async (listingId) => {
    try {
      setDeleteError(null)
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      })
      const data = await res.json
      if (data.success === false) {
        setDeleteError(data.message)
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
      setDeleteError(null)
      setListings(listings.filter(listing => listing._id !== listingId))
      console.log(listings)
    }
    catch (err) {
      setDeleteError(err.message)
      toast.error(err.message, {
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
  }

  const handleEditListing = async (listingId) => {

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

        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 cursor-pointer'>
          {loading ? 'Loading...' : 'Update'}
        </button>

        <Link to='/create-listing' className='bg-green-700 text-white uppercase p-3 rounded-lg text-center hover:opacity-95'>
          Create Listing
        </Link>

      </form>

      <div className='flex justify-between my-3 text-md font-semibold'>
        <span onClick={(e) => { handleDelete(e) }} className='text-red-500 cursor-pointer hover:opacity-95'>Delete Account</span>
        <span onClick={(e) => { handleSignout(e) }} className='text-green-700 cursor-pointer hover:opacity-95'>Sign Out</span>
      </div>

      <button onClick={(e) => { handleShowListings(e) }} type='button' className='text-center w-full mt-4 text-green-700 font-semibold text-md'>
        Show Listings
      </button>
      {listings && listings.length > 0 &&
        <div>
          <h1 className='text-center my-6 font-bold text-2xl '>Your Listings</h1>
          {listings.map((listing) => {
            return (
              <div key={listing._id} className='flex border border-slate-300 rounded-lg justify-between items-center gap-5 p-3 m-3'>
                <Link to={`/listing/${listing._id}`}>
                  <img src={listing.imageUrls[0]}
                    alt="cover image"
                    className='w-20 h-20 object-contain'
                  />
                </Link >
                <Link to={`/listing/${listing._id}`}
                  className='flex-1 text-slate-700 hover:underline truncate font-semibold'
                >
                  <p >{listing.name}</p>
                </Link>
                <div className='flex flex-col items-center'>
                  <p onClick={() => handleDeleteListing(listing._id)} className='text-red-800 font-semibold cursor-pointer'>Delete</p>
                  <Link to = {`/update-listing/${listing._id}`}>
                    <p onClick={() => handleEditListing(listing._id)} className='text-green-700 font-semibold cursor-pointer'>Edit</p>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      }

    </div>
  )
}

export default Profile