import React, { useState } from "react";
import {Login} from './Login';
import { Register } from "./Register"; 
import { Dashboard } from "./Dashboard";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Homepage } from "./Homepage";

function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [token, setToken] = useState(true);

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  if(!token) {
    return (
      currentForm === 'login' ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>
  )}
  else{
    return <Dashboard/>
  }

  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  // }
  //   return (
  //     <div className="App">
  //       <BrowserRouter>
  //       <Routes>
  //         <Route path="/dashboard" element={<Dashboard/>}/>
  //         <Route path="/login" element={currentForm === 'login' ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>}/>
  //       </Routes>
  //     </BrowserRouter>
  //     </div>
  //   );
}

export default App;
