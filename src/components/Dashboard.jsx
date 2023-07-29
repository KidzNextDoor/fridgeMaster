import React, { useState, useEffect } from 'react';

import { Contents } from './Contents';
import { getFood } from '../fetchers/itemFetcher';

import LoadingSpinner from './LoadingSpinner';
import CompositionGraph from './CompositionGraph';
import IconButtons from './IconButtons';
import ExpiringSoon from './ExpiringSoon';
import Expired from './Expired';
import InputForm from './InputForm';

//import types object from json object in db

export const Dashboard = () => {
  const [fridgeContents, setFridgeContents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ESClicked, setESClicked] = useState(false);
  const [EClicked, setEClicked] = useState(false);
  const [graphClicked, setgraphClicked] = useState(false);

  const email = localStorage.getItem('email');

  useEffect(() => {
    const getFoodContent = async () => {
      const res = await getFood(email);
      setFridgeContents(res);
      setIsLoading(false);
    };
    getFoodContent();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center">
        <div className="w-3/5 md:w-1/2 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="font-mynerve text-2xl font-semibold">
              Add an item
            </div>
            <IconButtons
              EClicked={EClicked}
              setEClicked={setEClicked}
              ESClicked={ESClicked}
              setESClicked={setESClicked}
              graphClicked={graphClicked}
              setgraphClicked={setgraphClicked}
              fridgeContents={fridgeContents}
            />
          </div>
          <div className="flex flex-col w-3/5 gap-4">
            {ESClicked && <ExpiringSoon fridgeContents={fridgeContents} />}
            {EClicked && <Expired fridgeContents={fridgeContents} />}
          </div>
          <div className="flex flex-col">
            {/* <InputFields email={email} setFridgeContents={setFridgeContents} /> */}
            <InputForm />
            {graphClicked ? (
              <CompositionGraph fridgeContents={fridgeContents} />
            ) : isLoading ? (
              <LoadingSpinner />
            ) : (
              <Contents />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
