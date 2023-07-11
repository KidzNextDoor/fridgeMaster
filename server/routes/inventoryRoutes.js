const express = require("express");
const router = express.Router();
const {
    getItems,
    setItem,
    updateItem,
    deleteItem
} = require("../controllers/inventoryController")

// create authorization middleware?

// get items
router.get("/", getItems);

// set item in fridge 
router.post("/", setItem);

// needs id param
// update item
router.put("/:id", updateItem);

// needs id
//delete item
router.delete("/:id", deleteItem);


module.exports = router;

