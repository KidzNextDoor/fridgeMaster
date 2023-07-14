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

const tableDataItems = [
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
    const [selectedRows, setSelectedRows] = React.useState([]);
	const [toggleCleared, setToggleCleared] = React.useState(false);
	const [data, setData] = React.useState(tableDataItems);

	const handleRowSelected = React.useCallback(state => {
		setSelectedRows(state.selectedRows);
	}, []);

	const contextActions = React.useMemo(() => {
		const handleDelete = () => {
			
			if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.title)}?`)) {
				setToggleCleared(!toggleCleared);
				setData(differenceBy(data, selectedRows, 'title'));
			}
		};

		return (
			<button key="delete" onClick={handleDelete} style={{ backgroundColor: 'red' }} icon>
				Delete
			</button>
		);
	}, [data, selectedRows, toggleCleared]);

	return (
		<DataTable
			columns={columns}
			data={tableDataItems}
			selectableRows
			contextActions={contextActions}
			onSelectedRowsChange={handleRowSelected}
			clearSelectedRows={toggleCleared}
			pagination
		/>
  )
}

