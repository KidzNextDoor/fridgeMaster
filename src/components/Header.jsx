import React from 'react'
import logo from './logo.png'

import { IoIosLogOut } from 'react-icons/io'
import { logoutUser } from '../fetchers/userFetcher'

function Header({ isLoggedIn, setIsLoggedIn, setCurrentForm }) {

  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      if (res) {
        setCurrentForm('login')
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="fixed top-0 left-0 right-0 p-8 z-10">
      <div className="flex justify-between">
        <img className="max-h-20" src={logo}></img>
        { isLoggedIn && 
          (
            <div className='flex items-center text-lg gap-1 text-blue-700 cursor-pointer mr-24'>
              <IoIosLogOut onClick={handleLogout} className='text-4xl font-extrabold text-blue-700 hover:transform hover:transition-all hover:scale-125'/>
            </div>
          )    
        }       
      </div>
    </div>
  )
}

export default Header
