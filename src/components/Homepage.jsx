import React, { useState } from 'react'
import wizzardBuddy from "../images/wizzardBuddy.png"
import Register from './Register'
import Header from './Header'
import Login from './Login'
import logo from "../images/logo.png"

const Homepage = ({ setIsLoggedIn }) => {
  const [view, setView] = useState('homepage');
  const [currentForm, setCurrentForm] = useState('login');

  return (
    view === "homepage" ?
      <div className='homepageHeader'>
          <Header view={view} setView={setView} setCurrentForm={setCurrentForm} />
          <header>
          <img className='logo' src={logo} alt="Logo" />
          <h1>Fridge Wizzard</h1>
          <button>Login/Signup</button>
          </header>
          <h1>Eat better and save cold, hard cash!</h1>
          <h2>A fridge inventory app that helps you fight spoilage and use what you have!</h2>
          <button>Get started!</button>
          <h3>√ Easily view what you have without the shelf shuffle.</h3>
          <h3>√ Recomendations for expiration dates.</h3>
          <h3>√ Notification of which items are past their prime (or way past).</h3>
          <img className='wizzardBuddy' src={wizzardBuddy} alt='wizzardBuddy' />
      </div>
      : currentForm === 'login' 
                ? <Login setCurrentForm={setCurrentForm} setIsLoggedIn={setIsLoggedIn} /> 
                : <Register setCurrentForm={setCurrentForm} setIsLoggedIn={setIsLoggedIn} />
  )
}

export default Homepage
