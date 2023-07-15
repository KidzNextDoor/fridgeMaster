import React, { useState, useEffect } from 'react';
import logo from "../images/logo.png"
import wizzardBuddy from "../images/wizzardBuddy.png"
import expiringSoon from "../images/expiringSoon.png"
import spoiled  from "../images/spoiled.png"
import { Contents } from './Contents';
import { useForm } from "react-hook-form";
import moment from 'moment';
import { postFood } from '../fetchers/itemFetcher';
import Header from './Header';
//import types object from json object in db

export const Dashboard = ({ isLoggedIn, setIsLoggedIn }) => {
    const shelfLife = require('../../server/shelflife.json')

    const [expDate2, setExpDate2] = useState(moment().format('YYYY-MM-DD'))
    const [purchaseDate, setPurchaseDate] = useState(moment().format('YYYY-MM-DD'))
    const [daysToSpoil, setDaysToSpoil] = useState(0)
    const [category, setCategory] =useState('')

    const typesArray = []
    shelfLife.forEach(element => { typesArray.push(element.item);
    });
    const categoryArray = []
    shelfLife.forEach(element => { categoryArray.push(element.category);
    });
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        const type = data.type
        const itemName = data.itemName
        const category = data.category
        console.log('this id the category', category)
        const res = await postFood(type,expDate2, itemName, category);
    };

    useEffect(()=>{
        const expirationDateUpdater = () => {
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
        shelfLife.forEach((el, index) => {
            if(el.item === e){
                categoryArray.forEach((el, idx) =>{ 
                    if(index === idx && el != undefined){
                            setCategory(el);
                        }})
                        setDaysToSpoil(el.shelflife)} 
        })
    }
    console.log(category)
    return (
        <div className=''>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <button><img src={expiringSoon} alt="expiringSoon"/></button>
            <button><img src={spoiled} alt="spoiled"/></button>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Add an item:</h2>
                <label className='inputLabels'htmlFor='purchaseDate'>Purchase date:</label>
                <label className='inputLabels' htmlFor='type'>Type:</label>
                <label className='inputLabels' id='expDate'>Expiration date:</label>
                <label className='inputLabels'id='itemName'>Name:</label>
                <input className='inputField' id='purchaseDate' type='date' onInput={(e) => purchaseDateHandler(e.target.value)} defaultValue={purchaseDate} placeholder='purchaseDate' {...register("purchaseDate")}/>
                <select className='inputField' id='type' onInput={(e) => daysToSpoilHandler(e.target.value)} placeholder='Type:' {...register("type")}>
                    <option>Select an option</option>
                    {typesArray.map(el => <option value={el}>{el}</option> )}
                </select>
                <input className='inputField' id='expDate' type='date' placeholder='expDate' value={expDate2}  {...register("expDate")}/>
                <input className='inputField' id='itemName'type='text' placeholder='itemName' {...register("itemName")}/> 
                <input type='hidden' value={category} {...register("category")}></input>
                {/* <label htmlFor="purchaseDate">Date Purchased:</label> */}
                {/* <input className="input" value={purchaseDate} type='date' placeholder="Date Purchased" id="purchaseDate" name="purchaseDate"/> */}
                {/* <label htmlFor='type'>Type:</label> */}
                {/* <input className='input' type='dropdown' name='type' id='type' placeholder='Enter Type'/> */}
                {/* <label htmlFor='expDate'>Expiration date:</label> */}
                {/* <input className='input' type='date' placeholder="Expiration Date" id="expDate" name="expDate"/> */}
                {/* <label htmlFor='itemName'>Name:</label> */}
                {/* <input className='input' type='text' placeholder='Item Name' id='itemName'name='itemName'/> */}
                <input type="submit" />
            </form>
            <Contents />
        </div>
    );
};