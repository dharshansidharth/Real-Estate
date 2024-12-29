import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import CreateListing from './pages/CreateListing.jsx'
import Header from './components/Header.jsx'
import PrivateRoutes from './components/PrivateRoutes.jsx'
import UpdateExistingListing from './pages/UpdateExistingListing.jsx'
import Listing from './pages/Listing.jsx'


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/listing/:listingId' element={<Listing />} />
        <Route element = {<PrivateRoutes />}>
          <Route path='/profile' element={<Profile />} />
          <Route path = '/create-listing'  element = {<CreateListing />} />
          <Route path = '/update-listing/:listingId'  element = {<UpdateExistingListing />}/>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App