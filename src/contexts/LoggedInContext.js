import React, { createContext, useContext, useState } from 'react';

const LoggedInContext = createContext();
const SetLoggedInContext = createContext();

export function useLoggedIn() {
  return useContext(LoggedInContext);
}

export function useSetLoggedIn() {
  return useContext(SetLoggedInContext);
}

export function LoggedInProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoggedInContext.Provider value={isLoggedIn}>
      <SetLoggedInContext.Provider value={setIsLoggedIn}>
        {children}
      </SetLoggedInContext.Provider>
    </LoggedInContext.Provider>
  );
}
