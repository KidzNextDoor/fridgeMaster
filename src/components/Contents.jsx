import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import moment from 'moment';

export function Contents() {
  const email = decodeURIComponent(document.cookie.slice(6));

  const { isLoading, isError, data, error } = useQuery(['contents'], () =>
    axios.get(`api/inventory/${email}`)
  );

  if (isLoading) {
    return (
      <Typography align="center" variant="h4">
        Loading...
      </Typography>
    );
  }

  if (isError) {
    return (
      <Typography align="center" variant="h4">
        {JSON.stringify(error)}
      </Typography>
    );
  }

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
    { field: 'expiration', headerName: 'Expiration', flex: 1 },
  ];

  const rows = data.data.map(row => ({
    name: row.name,
    description: row.type,
    expiration: moment(row.expdate).format('MMMM Do, YYYY'),
  }));

  return <DataGrid getRowId={row => row.name} rows={rows} columns={columns} />;
}
