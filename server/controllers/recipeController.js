const db = require('../db_sql');

// using user id query database for recommended recipes which has a score greater than 0.

// middleware to query the ingredient table
// we want ingredients units, keywords, descriptions, instructions

const recipeController = {};

recipeController.getRecommendedRecipes = async (req, res, next) => {
  const {email} = req.body;
  const user = await db('SELECT * FROM users WHERE email=$1',[email]);
  const userID = user.rows[0].userid;
  console.log('userID',userID);
  // get the recipes from recipeselector view if their score is more than 0.
  const query =
//    'SELECT rs.*, r.type keywords, r.instructions, r.description, r.picurl, r.videourl FROM recipeselector rs INNER JOIN recipes r ON r.recipeID = rs.recipeID WHERE rs.score > 0 AND rs.userid = $1';
`select  r.type keywords, r.instructions, r.description, r.picurl, r.videourl, a.count, r.recipeid
from    (
    select  i.recipeid, count(*) as count
    from    fridge f
    join    ingredients i on i.name like concat('%', f.name, '%')
    where   f.userid = $1 and f.expdate >= now()
    group by i.recipeid
) a
join    recipes r on a.recipeid = r.recipeid
order by a.count desc`;
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
      let query = `SELECT * FROM ingredients WHERE recipeID = ${recipe.recipeid};`;
      const result = await db(query);
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
