const express = require("express");
const router = express.Router();
const {
    getItems,
    setItem,
    updateItem,
    deleteItem
} = require("../controllers/inventoryController")

// create authorization middleware?

router.get("/", getItems);
router.post("/", setItem);

// needs id param
router.put("/:id", updateItem);

// needs id
router.delete("/:id", deleteItem);


module.exports = router;