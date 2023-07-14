import React, {useState, useCallback, useMemo, useEffect} from 'react'
import differenceBy from 'lodash/differenceBy'
import DataTable from 'react-data-table-component';
import { deleteFood } from '../fetchers/itemFetcher';

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

// const tableDataItems = [
//     {
//         id: 1,
//         name: 'leftovers',
//         type: 'cooked food',
//         expDate: "07-10-2023"
//     },
//     {
//         id: 2,
//         name: 'apple',
//         type: 'fruit',
//         expDate: "07-23-2023"
//     },
//     {
//         id: 3,
//         name: 'pizza',
//         type:'cooked food',
//         expDate: "07-14-2023"
//     },
// ]


export const Contents = ({ fridgeContents, setFridgeContents, isLoading }) => {
    const [selectedRows, setSelectedRows] = useState([]);
	const [toggleCleared, setToggleCleared] = useState(false);
	
	const handleRowSelected = useCallback(state => {
		setSelectedRows(state.selectedRows);
	}, []);

	const contextActions = useMemo(() => {
		const handleDelete = () => {
			
			if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.name)}?`)) {
				setToggleCleared(!toggleCleared);
				setFridgeContents(differenceBy(fridgeContents, selectedRows));
				
			}
		};
		return (
			<button key="delete" onClick={handleDelete} style={{ backgroundColor: 'red' }} icon>
				Delete
			</button>
		);
	}, [fridgeContents, selectedRows, toggleCleared]);

	useEffect(() => {
		const tryDeleteFood = async () => {
		  await deleteFood(fridgeContents)
		}

		if (!isLoading) {
		  tryDeleteFood();
		}

	}, [fridgeContents])

	return (
		<DataTable
            title="Fridge Contents"
			columns={columns}
			data={fridgeContents}
			selectableRows
            selectableRowsHighlight
			contextActions={contextActions}
			onSelectedRowsChange={handleRowSelected}
			clearSelectedRows={toggleCleared}
		/>
  )
}

