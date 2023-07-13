const asyncHandler = require("express-async-handler");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// require item model 

/*
Controllers are JavaScript files that contain a set of methods, called actions, reached by the client according to the requested route. Whenever a client requests the route, the action performs the business logic code and sends back the response.
*/

// @description Get items
// @route GET /api/items
// @access Public
const getItems = asyncHandler(async (req, res) => {
  // get items from db

//   res.status(200).json(items);
});

// @description Set items
// @route GET /api/items
// @access Private
const setItem = asyncHandler(async (req, res) => {
  // fridge contents are not required. 
  
  // if input is coming from text field?
//   if (!req.body.text) {
//     res.status(400);
//     throw new Error("Please add a text field");
//   }

  // create item in database
  // include the name, type, category, expiration date

  //   res.status(200).json(item);
});

// @description Update items
// @route GET /api/items/:id
// @access Private
const updateItem = asyncHandler(async (req, res) => {
  // find item in db

  // if not item in db throw error
//   if (!item) {
//     res.status(400);
//     throw new Error("User not found");
//   }

  // make sure users can't update each others goals
  // item has a user field which is a ObjectId?
  // Make sure the logged in user matches the item user

  // update item

  //   res.status(200).json(updateItem)
});

// @description Delete item
// @route GET /api/items/:id
// @access Private
const deleteItem = asyncHandler(async (req, res) => {
  // find item in db

  // if not item in db throw error
//   if (!item) {
//     res.staus(400);
//     throw new Error("Item not found");
//   }

  // Check for user
//   if (!req.user) {
//     res.status(401);
//     throw new Error("User not found");
//   }

  // make sure users can't update each others goals
  // item has a user field which is a ObjectId?
  // Make sure the logged in user matches the item user

  // delete goal from db
  // check if deletion was successfull
  // if so send status code 200 and successfull deletion message
  // otherwise throw error

});

module.exports = {
  getItems,
  setItem,
  updateItem,
  deleteItem
};
