const UserData = require('../models/userModel');
const dbsql = require('../db_sql');

const inventoryController = {};

/*
Controllers are JavaScript files that contain a set of methods, called actions, reached by the client according to the requested route. Whenever a client requests the route, the action performs the business logic code and sends back the response.
*/

// @description Get items
// @route GET /api/items
// @access Public
inventoryController.getItem = async (req, res, next) => {
  // user enters purchaseDate, type, expDate, itemName
  try {
    // what are we using to identify a user? email, db _id?
    const { email } = req.params;

    // get items from db
    const user = await UserData.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // get user from database, then access fridgeContents
    res.locals.getItem = user.fridgeContents;
    return next();
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// @description Set items
// @route POST /api/items
// @access Private
inventoryController.setItem = async (req, res, next) => {
  // query the db with the current user's email and get the userid in the users table based off their email
  const findUserQuery = 'SELECT userid FROM users WHERE email=$1';
  const foundUserID = await dbsql(findUserQuery, [req.body.email]);
  console.log(foundUserID);
  if (!foundUserID.rowCount) {
    return next('No userid found in the users table');
  }
  // now use that userid found, and insert name, type, purchasedate, and expdate into fridge table
  const addItemQuery =
    'INSERT INTO fridge(userid, name, type, purchasedate, expdate) VALUES($1, $2, $3, $4, $5)';
  const addedItem = await dbsql(addItemQuery, [
    foundUserID.rows[0].userid,
    req.body.name,
    req.body.type,
    req.body.purchasedate,
    req.body.expdate,
  ]);
  return next();
};

// @description Update items
// @route PUT /api/items/:id
// @access Private
inventoryController.updateItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, item, type, category, expDate } = req.body;

    // find user in database
    const user = await UserData.findOne({ email });

    // if no user in database
    if (!user) {
      return res.status(400).json({ message: 'No user found' });
    }

    // if each fridgeContents object has a unique id
    const itemIndex = user.fridgeContents.findIndex(food => {
      return food._id === id;
    });

    // if item not found in fridge
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Fridge content not found' });
    }

    // if item is found update it
    user.fridgeContents[itemIndex] = {
      item,
      type,
      category,
      expDate,
    };

    // save updated document
    await user.save();

    // idea from Robert:
    // get user then copy contetns into obj
    // try findOneandUpdate
    // then change it and re save to database
    // lookup way to go inside a propery in model

    res.locals.updatedItem = user.fridgeContents;
    return next();
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// @description Delete item
// @route DELETE /api/items/:id
// @access Private
inventoryController.deleteItem = async (req, res, next) => {
  try {
    // const { id } = req.params;
    const { email, fridgeContents } = req.body;

    const newFridgeContents = fridgeContents;

    // find user in database
    const user = await UserData.findOneAndUpdate(
      { email },
      {
        fridgeContents: newFridgeContents,
      },
      {
        upsert: true,
        new: true,
      }
    );

    // if (!user) {
    //   return res.status(400).json({ message: "User not found" });
    // }

    // // find the index of the fridge item I want to delete
    // const itemIndex = user.fridgeContents.findIndex((food) => {
    //   return food._id === id;
    // });

    // // ******** some mongoose methods will return the deleted document
    // // deleteOne and DeleteMany do not return the deleted document

    // // if food content not found
    // if (itemIndex === -1) {
    //   return res.status(404).json({ message: "Fridge content not found" });
    // }

    // // delete food from fridge
    // user.fridgeContents.splice(itemIndex, 1);

    // // save the updated user document
    // await user.save();

    // do we need to use res.locals? what are sending back?
    return next();
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

module.exports = inventoryController;
