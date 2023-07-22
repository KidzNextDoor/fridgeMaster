import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

import { useLoggedIn, useSetLoggedIn } from '../contexts/LoggedInContext';

import Homepage from './Homepage';
import { Dashboard } from './Dashboard';

function App() {
  const isLoggedIn = useLoggedIn();
  const setIsLoggedIn = useSetLoggedIn();

  const [view, setView] = useState('homepage');

  const { isLoading, isError, data, error } = useQuery(['isLoggedIn'], () =>
    axios
      .get('api/check-session')
      .then(res => {
        if (res.data) setIsLoggedIn(true);
      })
      .catch(err => {
        throw new Error(err.message);
      })
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-gradient-to-b from-zinc-100 via-zinc-300 to-sky-300 min-h-screen">
      <div className="pb-32">
        {isLoggedIn ? (
          <Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <Homepage
            setIsLoggedIn={setIsLoggedIn}
            view={view}
            setView={setView}
          />
        )}
      </div>
    </div>
  );
}

export default App;
