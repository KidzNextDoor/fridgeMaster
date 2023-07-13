import React, { useState } from 'react'
import Register from './Register'
import Header from './Header'
import Login from './Login'

import HomepageBody from './HomepageBody'

const Homepage = ({ setIsLoggedIn }) => {
  const [view, setView] = useState('homepage');
  const [currentForm, setCurrentForm] = useState('login');

  return (
    view === "homepage" ?
      <div className=''>
          <Header view={view} setView={setView} setCurrentForm={setCurrentForm} />
          <HomepageBody setView={setView} />
      </div>
      // will render either the login or register component based on what the currentForm is set as
      : currentForm === 'login' 
                ? <Login setCurrentForm={setCurrentForm} setIsLoggedIn={setIsLoggedIn} /> 
                : <Register setCurrentForm={setCurrentForm} setIsLoggedIn={setIsLoggedIn} />
  )
}

export default Homepage
