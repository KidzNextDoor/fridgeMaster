import React, {useState, useCallback, useMemo, useEffect} from 'react'
import DataTable from 'react-data-table-component';
import differenceBy from 'lodash/differenceBy';

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
    const [selectedRows, setSelectedRows] = useState([]);
	const [toggleCleared, setToggleCleared] = useState(false);
	const [data, setData] = useState(tableDataItems);

	const handleRowSelected = useCallback(state => {
		setSelectedRows(state.selectedRows);
	}, []);

	const contextActions = useMemo(() => {
		const handleDelete = () => {
			
			if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.name)}?`)) {
				setToggleCleared(!toggleCleared);
				setData(differenceBy(data, selectedRows));
			}
		};
        console.log(data);
        console.log(selectedRows);
		return (
			<button key="delete" onClick={handleDelete} style={{ backgroundColor: 'red' }} icon>
				Delete
			</button>
		);
	}, [data, selectedRows, toggleCleared]);

	return (
		<DataTable
            title="Fridge items"
			columns={columns}
			data={data}
			selectableRows
			contextActions={contextActions}
			onSelectedRowsChange={handleRowSelected}
			clearSelectedRows={toggleCleared}
			pagination
		/>
  )
}

