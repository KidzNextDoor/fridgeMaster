import React, { useState, useEffect } from "react";

import Login from './Login';
import Header from "./Header";
import Register from "./Register"; 
import { Dashboard } from "./Dashboard";
import { checkSession } from "../fetchers/userFetcher";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentForm, setCurrentForm] = useState('login');

  // checks whether user has an active session or not on component loading
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const res = await checkSession();
        if (res) {
          setIsLoggedIn(true);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []);

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-b from-zinc-100 via-zinc-300 to-sky-300">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setCurrentForm={setCurrentForm} />
      <div className="flex flex-col z-100 items-center justify-center h-screen">
        {
          isLoggedIn 
            ? <Dashboard /> 
            : currentForm === 'login' 
                ? <Login onFormSwitch={toggleForm} setIsLoggedIn={setIsLoggedIn} /> 
                : <Register onFormSwitch={toggleForm} setIsLoggedIn={setIsLoggedIn} />
        }
      </div>
    </div>
  );
}

export default App;
