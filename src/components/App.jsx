import React, { useState } from "react";

import Login from './Login';
import Header from "./Header";
import Register from "./Register"; 
import Dashboard from "./Dashboard";
import useUserSession from "../hooks/useUserSession";

function App() {
  const { isLoggedIn, isLoading, setIsLoggedIn } = useUserSession();
  const [currentForm, setCurrentForm] = useState('login');
  const [currentUser, setCurrentUser] = useState('');

  if (isLoading) {
    return <div>Loading...</div>
  }

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="bg-gradient-to-b from-zinc-100 via-zinc-200 to-sky-300">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} currentUser={currentUser} />
      <div className="flex flex-col z-100 items-center justify-center h-screen">
        {
          isLoggedIn 
            ? <Dashboard /> 
            : currentForm === 'login' 
                ? <Login onFormSwitch={toggleForm} setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} /> 
                : <Register onFormSwitch={toggleForm} setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser}/>
        }
      </div>
    </div>
  );
}

export default App;
