import React from 'react'
import logo from './logo.png'

import { IoIosLogOut } from 'react-icons/io'
import { logoutUser } from '../fetchers/userFetcher'

function Header({ isLoggedIn, setIsLoggedIn, view, setView }) {
  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      if (res) {
        setIsLoggedIn(false);
        localStorage.removeItem('email');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="fixed top-0 left-0 right-0 px-20 py-10 z-10">
      <div className="flex flex-shrink-0 justify-between">
        <a href='http://localhost:8080'>
          <img className="max-h-20 flex-shrink-0" src={logo}></img>
        </a>
        { isLoggedIn 
          && 
            (
              <div 
                onClick={handleLogout} 
                className="
                  flex 
                  items-center 
                  text-xl 
                  gap-1 
                  text-blue-700 
                  font-mynerve 
                  cursor-pointer 
                  hover:transform 
                  hover:transition-all 
                  hover:scale-125"
              >
                <span>Logout</span>
                <IoIosLogOut className='text-4xl font-extrabold'/>
              </div>
            )
        } 
        { view === 'homepage' &&
          <div onClick={() => setView('login')}>
            <div 
              className="
                hover:transform 
                hover:transition-all 
                hover:scale-110 
                cursor-pointer 
                flex 
                text-xl
                font-mynerve
                 bg-blue-600
                 text-white
                items-center 
                justify-center 
                gap-2
                rounded-2xl 
                mt-4 
                p-4 
                shadow-xl
              "
            >
              <span>Login/Signup</span>
            </div>
          </div>
        }       
      </div>
    </div>
  )
}

export default Header
