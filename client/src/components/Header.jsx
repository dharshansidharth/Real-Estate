import React from "react";
import { FaSearch } from 'react-icons/fa'
import {Link} from 'react-router-dom'

const Header = () => {
  const sideBar = [
    <Link to = '/'>Home</Link> , 
    <Link to = '/about'>About</Link> , 
    <Link to = '/sign-in'>Sign In</Link> , 
    ]

  return (
    <>
      <header className="bg-slate-200 shadow-md">
        <div className = 'flex justify-between items-center max-w-6xl p-3 mx-auto'>
          <Link to = '/'>
          <h1 className="text-bold text-lg lg:text-xl flex flex-wrap">
            <span className="text-slate-500">Real</span>
            <span className="text-slate-700">Estate</span>
          </h1>
          </Link>
          <form className = 'bg-slate-100 p-3 rounded-lg flex items-center'>
            <input type="text" className="bg-transparent focus:outline-none w-24 sm:w-64" placeholder="search..." />
            <FaSearch className = 'text-slate-700'/>
          </form>
          <ul className="flex gap-3 ">
            { sideBar.map((val , index) => {
              return <li key = {index} className = {`sm:inline text-slate-500 hover:underline ${val === 'Sign In' ? '' : 'hidden'}`}>{val}</li>
            }) }
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
