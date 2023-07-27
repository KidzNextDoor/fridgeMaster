const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get(
  '/:id',
  recipeController.getRecommendedRecipes,
  recipeController.getIngredients,
  (req, res) => {
    res.status(200).json(res.locals.recipes);
    // res.end();
  }
);

module.exports = router;
