import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { postFood } from '../fetchers/itemFetcher';
import moment from 'moment';

function InputFields({ setFridgeContents, email }) {
    const shelfLife = require('../../server/shelflife.json')
    const [expDate2, setExpDate2] = useState(moment().format('YYYY-MM-DD'))
    const [purchaseDate, setPurchaseDate] = useState(moment().format('YYYY-MM-DD'))
    const [daysToSpoil, setDaysToSpoil] = useState(0)
    const [error, setError] = useState('')
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const typesArray = []
          shelfLife.forEach(element => { typesArray.push(element.item);
        });
    
        const onSubmit = async ({type, itemName}) => { 
            if (type === 'Select an option') {
                setError('Not a valid selection')
                return; 
            }
            const res = await postFood({ type, name: itemName, expDate2, email });
            setError('');
            setFridgeContents(res);
            reset();
        };
    
    useEffect(()=>{
        const expirationDateUpdater = () => {
            console.log('running expirationDateUpdater');
            setExpDate2(moment(purchaseDate).add(daysToSpoil, 'd').format('YYYY-MM-DD'));
            return
        }
        expirationDateUpdater();
    },[purchaseDate, daysToSpoil])
    
    const purchaseDateHandler = (e) => {
        // e.preventDefault();
        setPurchaseDate(moment(e).format('YYYY-MM-DD'))
    }
    const daysToSpoilHandler = (e) => {
        // e.preventDefault();
        //figure out how to find passed in type "(e)" in shelfLife object
        shelfLife.forEach((el) => {
            if(el.item === e){setDaysToSpoil(el.shelflife)}
        })
    }

  return (
    <div className='flex mb-14'>
      <form className='' onSubmit={handleSubmit(onSubmit)}>
          {/* <label className='inputLabels'id='itemName'>Name:</label> */}
          <label className='inputLabels' htmlFor='type'>Type:</label>
          <select className='inputField' id='type' onInput={(e) => daysToSpoilHandler(e.target.value)} placeholder='Type:' {...register("type")}>
              <option>Select an option</option>
              {typesArray.map((el, index) => <option key={index} value={el}>{el}</option> )}
          </select>
          { error && <span className="font-mynerve text-red-500">Invalid selection</span>}
          <input 
          className="
              p-2 
              font-mynerve 
              focus:transform 
              focus:transition-all 
              focus:outline-none 
              focus:scale-105 
              bg-blue-500 
              bg-opacity-10 
              border 
              border-slate-700
          " 
          id='itemName'
          type='text' 
          placeholder='Name' {...register("itemName")}
          /> 
          <label className='inputLabels'htmlFor='purchaseDate'>Purchase date:</label>
          <input 
            className='inputField' 
            id='purchaseDate' 
            type='date' 
            onClick={(e) => purchaseDateHandler(e.target.value)} 
            defaultValue={purchaseDate} 
            placeholder='purchaseDate' 
            {...register("purchaseDate")}
          />
          {/* <label className='inputLabels' id='expDate'>Expiration date:</label>
          <input className='inputField' id='expDate' type='date' placeholder='expDate' value={expDate2}  {...register("expDate")}/> */}
          {/* <label htmlFor="purchaseDate">Date Purchased:</label> */}
          {/* <input className="input" value={purchaseDate} type='date' placeholder="Date Purchased" id="purchaseDate" name="purchaseDate"/> */}
          {/* <label htmlFor='type'>Type:</label> */}
          {/* <input className='input' type='dropdown' name='type' id='type' placeholder='Enter Type'/> */}
          {/* <label htmlFor='expDate'>Expiration date:</label> */}
          {/* <input className='input' type='date' placeholder="Expiration Date" id="expDate" name="expDate"/> */}
          {/* <label htmlFor='itemName'>Name:</label> */}
          {/* <input className='input' type='text' placeholder='Item Name' id='itemName'name='itemName'/> */}
          <button 
            className='
              font-mynerve 
              text-xl 
              bg-blue-600 
              text-white 
              p-1 
              rounded-md 
              hover:transform 
              hover:transition-all 
              hover:scale-110 
              cursor-pointer'
              type="submit" 
          >
            Add item
          </ button>
      </form>
    </div>
  )
}

export default InputFields
