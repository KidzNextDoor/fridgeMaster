const db = require('../db_sql');

// using user id query database for recommended recipes which has a score greater than 0.

// middleware to query the ingredient table
// we want ingredients units, keywords, descriptions, instructions

const recipeController = {};

recipeController.getRecommendedRecipes = async (req, res, next) => {
  const userID = req.params.id;
  // get the recipes from recipeselector view if their score is more than 0.
  const query =
    'SELECT rs.*, r.type keywords, r.instructions, r.description, r.picurl, r.videourl FROM recipeselector rs INNER JOIN recipes r ON r.recipeID = rs.recipeID WHERE rs.score > 0 AND rs.userid = $1';
  try {
    const result = await db(query, [userID]);
    res.locals.recipes = result.rows;
    // console.log(result);
    return next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

// middleware that gets the ingredients of a recipe
recipeController.getIngredients = async (req, res, next) => {
  // loop through the recipes array and query the database with each recipe's id to get its ingredients.
  let index = 0;
  try {
    for (const recipe of res.locals.recipes) {
      console.log('recipe', recipe);
      let query = `SELECT * FROM ingredients WHERE recipeID = ${recipe.recipeid};`;
      const result = await db(query);
      console.log('result', result.rows);
      res.locals.recipes[index].ingredients = result.rows;
      index++;
    }
    return next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = recipeController;
