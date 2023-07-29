import React, { useState, useEffect } from 'react';
import Ingredients from './Ingredients';

const Recipes = ({
  recipeid,
  picurl,
  name,
  description,
  videourl,
  ingredients,
  instructions,
}) => {
  return (
    //   <div className="flex flex-col">
    <div className="recipe-card">
      <h1 className="recipe-name">{name}</h1>
      <img src={picurl} alt="recipe image" />
      <p>{description}</p>
      <video src={videourl} />
      {ingredients.map((ingredient, index) => {
        return (
          <Ingredients
            key={index}
            name={ingredient.name}
            quantity={ingredient.quantity}
          />
        );
      })}
      <p>{instructions}</p>
    </div>
  );
};

export default Recipes;
