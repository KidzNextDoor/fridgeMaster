import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
import Recipes from './Recipes';
import axios from 'axios';

const getAllRecipes = () => {
  // hook for rendering recipes
  const [recipes, setRecipes] = useState([]);

  // get recipes from backend
  useEffect(() => {
    // define asynchronous function fetchData
    async function fetchRecipes() {
      try {
        // GET request to grab current users recipes
        const response = await axios.get('/api/recipes/3');
        setRecipes(response.data);
        return;
        // if GET request fails
      } catch (error) {
        // console log error
        console.log(error);
      }
    }
    // invoke fetchData
    fetchRecipes();
  }, []);

  return (
    // <div className="h-full w-full flex flex-col">
    <div className="grid grid-cols-2 gap-2">
      <h2 className="text-slate-800 text-3xl font-bold mb-4 font-mynerve">
        Here are some recipes you can use before your items expire!
      </h2>
      {/* <section className="flex flex-col items-center justify-center">
        <motion.div
          className="bg-inherit bg-opacity-80 px-20 pb-20 pt-10 rounded-md shadow-2xl w-[550px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
        </motion.div>
      </section> */}

      <section>
        <Link className="flex items-center justify-center">
          <motion.button
            className="text-slate-800 bg-inherit font-mynerve text-xl mt-8"
            initial={{ opacity: 0.6 }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.1 },
            }}
            whileTap={{ scale: 0.9 }}
            whileInView={{ opacity: 1 }}
          ></motion.button>
          <div>
            {recipes.map((recipe, index) => {
              return (
                <Recipes
                  key={index}
                  recipeid={recipe.recipeid}
                  picurl={recipe.picurl}
                  name={recipe.recipe}
                  description={recipe.description}
                  videourl={recipe.videourl}
                  ingredients={recipe.ingredients}
                  instructions={recipe.instructions}
                />
              );
            })}
          </div>
        </Link>
      </section>
    </div>
  );
};

export default getAllRecipes;
