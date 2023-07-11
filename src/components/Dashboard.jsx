import React, { useState } from 'react';
import logo from "../images/logo.png"
import wizzardBuddy from "../images/wizzardBuddy.png"
import expiringSoon from "../images/expiringSoon.png"
import spoiled  from "../images/spoiled.png"
import { Contents } from './Contents';
import { useForm } from "react-hook-form";
//import types object from json object in db

export const Dashboard = () => {
    const shelfLife = require('../../server/shelflife.json')

    const typesArray = []
    shelfLife.forEach(element => { typesArray.push(element.item);
    });
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = (data) => console.log(data);
    let expDate = '';
    let purchaseDate = '';
    let type = '';
    const purchaseDateHandler = (e) => {
        e.preventDefault();
        purchaseDate = e;

        return expirationDateUpdater();
    }
    const typeHandler = (e) => {
        e.preventDefault();
        //figure out how to find passed in type "(e)" in shelfLife object
        let found = shelfLife.find(el => el === e);
        type = found.shelflife;
        return expirationDateUpdater();
    }
    const expirationDateUpdater = () => {
        expDate

    }

    return (
        <div>
            <header>
            <img className='logo' src={logo} alt="Logo" />
            <h1>Fridge Wizzard</h1>
            <button>Logout</button>
            </header>
            <button><img src={expiringSoon} alt="expiringSoon"/></button>
            <button><img src={spoiled} alt="spoiled"/></button>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Add an item:</h2>
                <label className='inputLabels'>Purchase date:</label>
                <label className='inputLabels'>Type:</label>
                <label className='inputLabels'>Expiration date:</label>
                <label className='inputLabels'>Name:</label>
                <input className='inputField' type='date' onChange={(e) => purchaseDateHandler(e.target.value)} placeholder='purchaseDate' {...register("purchaseDate")}/>
                <select className='inputField' onChange={(e) => typeHandler(e.target.value)} placeholder='Type:' {...register("type")}>
                    <option>Select an option</option>
                    {typesArray.map(el => <option value={el}>{el}</option> )}
                </select>
                <input className='inputField' type='date' placeholder='expDate' value={'PLACEHOLDER'}  {...register("expDate")}/>
                {/* <label htmlFor="purchaseDate">Date Purchased:</label> */}
                {/* <input className="input" value={purchaseDate} type='date' placeholder="Date Purchased" id="purchaseDate" name="purchaseDate"/> */}
                {/* <label htmlFor='type'>Type:</label> */}
                {/* <input className='input' type='dropdown' name='type' id='type' placeholder='Enter Type'/> */}
                {/* <label htmlFor='expDate'>Expiration date:</label> */}
                {/* <input className='input' type='date' placeholder="Expiration Date" id="expDate" name="expDate"/> */}
                {/* <label htmlFor='itemName'>Name:</label> */}
                {/* <input className='input' type='text' placeholder='Item Name' id='itemName'name='itemName'/> */}
                <button>placeholder for a button</button>
            </form>
            <Contents/>
        </div>
    );
};