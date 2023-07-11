import React from 'react'
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'Type',
        selector: row => row.type,
        sortable: true,
    },
    {
        name: 'Expiration Date',
        selector: row => row.expDate,
        sortable: true,
    },
];

const data = [
    {
        id: 1,
        name: 'leftovers',
        type: 'cooked food',
        expDate: "07-10-2023"
    },
    {
        id: 2,
        name: 'apple',
        type: 'fruit',
        expDate: "07-23-2023"
    },
    {
        id: 3,
        name: 'pizza',
        type:'cooked food',
        expDate: "07-14-2023"
    },
]

export const Contents = () => {
  return (
    <DataTable
            columns={columns}
            data={data}
            selectableRows
        />
  )
}

