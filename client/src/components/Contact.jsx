import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { mailtoLink } from 'mailto-link'

const Contact = ({ listing }) => {
      const [landlord, setLandlord] = useState(null)
      const [message, setMessage] = useState('')
      console.log(landlord)
      useEffect(() => {
            try {
                  const fetchUser = async () => {
                        const res = await fetch(`/api/users/${listing.userRef}`, {
                              method: 'GET'
                        })
                        const data = await res.json()
                        if (data.success === false) {
                              console.log(data.message)
                              return
                        }
                        setLandlord(data)


                  }
                  fetchUser()
            }
            catch (err) {
                  console.log(err.message)
            }
      }, [listing.userRef])

      useEffect(() => {
            console.log('Landlord state updated:', landlord);
      }, [landlord]);

      const handleChange = (e) => {
            setMessage(e.target.value)
      }

      

      return (
            <>
                  {landlord &&
                        <div className='flex flex-col gap-3 '>
                              <p>Contact &nbsp;
                                    <span className='font-semibold'>{landlord.username}</span>&nbsp;
                                    for &nbsp; <span className='font-semibold'>{listing.name}</span>
                              </p>
                              <textarea
                                    name="message"
                                    id="message"
                                    rows='2'
                                    value={message}
                                    onChange={handleChange}
                                    placeholder='Enter your message here...'
                                    className='p-3 rounded-lg border border-slate-300 shadow-lg w-full focus:outline-none'
                              ></textarea>
                              <Link
                              to = {`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
                              className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
                              >
                                    Send Message
                              </Link>
                        </div>
                  }
            </>
      )
}

export default Contact