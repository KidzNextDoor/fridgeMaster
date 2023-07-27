import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { useLoggedIn, useSetLoggedIn } from '../contexts/LoggedInContext';

import Homepage from './Homepage';
import { Dashboard } from './Dashboard';

function App() {
  const isLoggedIn = useLoggedIn();
  const setIsLoggedIn = useSetLoggedIn();

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
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className="pb-32">{isLoggedIn ? <Dashboard /> : <Homepage />}</div>
    </LocalizationProvider>
  );
}

export default App;
