import React from 'react'
import { getAuth, GoogleAuthProvider , signInWithPopup} from 'firebase/auth'
import { app } from '../firebase.js'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/users/UserSlice.js'
import { useNavigate } from 'react-router-dom'

const OAuth = () => {
      const dispatch = useDispatch()
      const navigate = useNavigate()
      async function handleGoogleClick(e) {
            try {
                  const provider = new GoogleAuthProvider()
                  const auth = getAuth(app)

                  const result = await signInWithPopup(auth , provider)


                  const res = await fetch('/api/auth/google' , {
                        method : 'POST',
                        headers : {
                              'Content-Type' : 'application/json',
                        },
                        body : JSON.stringify({
                              name : result.user.displayName,
                              email : result.user.email,
                              photo : result.user.photoURL,
                        }),
                  })

                  
                  
                  if(!res.ok){
                        throw new Error(`HTTP error! status: ${res.status}`);
                  }

                  const data = await res.json()
                  dispatch(signInSuccess(data))
                  navigate('/')
            }
            catch (err) {
                  console.log("Cannot log in using Google!!", err)
            }
      }
      return (
            <button onClick={(e) => { handleGoogleClick(e) }} type='button' className='bg-red-800 text-white p-3 rounded-lg uppercase hover:opacity-95'>
                  Continue with Google
            </button>
      )
}

export default OAuth