import React from 'react'
import logo from "../images/logo.png"
import wizzardBuddy from "../images/wizzardBuddy.png"

export const Homepage = () => {
  return (
    <div className='homepageHeader'>
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
  )
}

