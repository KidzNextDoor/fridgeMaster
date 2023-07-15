import React, { useState, useEffect } from 'react';
import expiringSoon from "../images/expiringSoon.png"
import spoiled  from "../images/spoiled.png"
import graph from "../images/graph.png"
import { Contents } from './Contents';
import { getFood } from '../fetchers/itemFetcher';
import Header from './Header';
import InputFields from './InputFields';
import LoadingSpinner from './LoadingSpinner'
import ExpiringSoon from './ExpiringSoon';
import Expired from './Expired';
import CompositionGraph from './CompositionGraph'
//import types object from json object in db

export const Dashboard = ({ isLoggedIn, setIsLoggedIn }) => {
    const [fridgeContents, setFridgeContents] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [ESClicked, setESClicked] = useState(false)
    const [EClicked, setEClicked] = useState(false)
    const [graphClicked, setgraphClicked] = useState(false)
    const email = localStorage.getItem('email');

    const expiringSoonButton = () => {
        setESClicked(!ESClicked);
    }
    const expiredButton = () => {
      setEClicked(!EClicked);
    }
    const graphButton = () => {
      setgraphClicked(!graphClicked)
    }

    useEffect(() => {
      const getFoodContent = async () => {
        const res = await getFood(email)
        setFridgeContents(res);
        setIsLoading(false);
      }
        getFoodContent();
    }, [])

    return (
        <div className=''>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <div className='flex justify-between'>
              <div className='font-mynerve text-2xl font-semibold'>Add an item</div>
              <div className='flex'>
                <img src={expiringSoon} alt="expiringSoon" onClick={expiringSoonButton}/>
                {ESClicked && <ExpiringSoon fridgeContents={fridgeContents}/>}
                <img src={spoiled} alt="spoiled" onClick={expiredButton}/>
                {EClicked && <Expired fridgeContents={fridgeContents}/>}
                <img src={graph} alt="graph" onClick={graphButton}/>
                {graphClicked && <CompositionGraph fridgeContents={fridgeContents}/>}
              </div>
            </div>
            <InputFields email={email} setFridgeContents={setFridgeContents} />
            {/* { error && <div className="font-mynerve text-red-500">Not a valid selection</div> } */}
            { isLoading ? <LoadingSpinner /> : <Contents email={email} isLoading={isLoading} setFridgeContents={setFridgeContents} fridgeContents={fridgeContents}/> }
            
        </div>
    );
};