import React, { useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useNavigate , useLocation} from 'react-router-dom'

const Header = () => {
      const navigate = useNavigate()
      const { currentUser } = useSelector((state) => state.user)
      const [searchTerm, setSearchTerm] = useState('')

      const handleSubmit = (e) => {
            e.preventDefault()
            const urlParams = new URLSearchParams(window.location.search)
            urlParams.set('searchTerm' , searchTerm)
            const searchQuery = urlParams.toString()
            navigate(`/search?${searchQuery}`)
      }

      useEffect(() => {
            const useParams = new URLSearchParams(location.search)
            const searchTermFromUrl = useParams.get('searchTerm')
            if(searchTermFromUrl){setSearchTerm(searchTermFromUrl)}
          }, [location.search]);

      return (
            <header className='bg-slate-200 shadow-md'>
                  {/* <img src='../pages/img.jpg' alt='dummy'/> */}
                  <div className='flex justify-between mx-auto max-w-6xl items-center p-3'>
                        <Link to='/'>
                              <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                                    <span className='text-slate-500'>Real</span>
                                    <span className='text-slate-700'>Estate</span>
                              </h1>
                        </Link>
                        <form onSubmit = {(e) => {handleSubmit(e)}} className='bg-slate-100  p-3 rounded-lg flex items-center '>
                              <input type="text"
                                    placeholder='Search...'
                                    className='focus:outline-none bg-transparent w-24 sm:w-64'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                              />
                              <button>
                                    <FaSearch />
                              </button>
                        </form>
                        <ul className='flex gap-4 items-center'>
                              <Link to='/'>
                                    <li className='hidden sm:inline text-slate-700 hover:underline'>
                                          Home
                                    </li>
                              </Link>
                              <Link to='/about'>
                                    <li className='hidden sm:inline text-slate-700 hover:underline'>
                                          About
                                    </li>
                              </Link>
                              <Link to='/profile'>
                                    {currentUser ? (
                                          <img
                                                src={currentUser.avatar || 'https://tse2.mm.bing.net/th?id=OIP.lF8ztkPyzv_NrpD7V8YYVAHaHa&pid=Api&P=0&h=180'}
                                                alt="Profile"
                                                className="w-7 h-7 rounded-full object-cover"
                                                style={{ display: 'block' }}
                                                loading='lazy'
                                          />

                                    ) : (
                                          <li className=' text-slate-700 hover:underline'>
                                                Sign In
                                          </li>
                                    )}
                              </Link>
                        </ul>
                  </div>
            </header >
      )
}

export default Header