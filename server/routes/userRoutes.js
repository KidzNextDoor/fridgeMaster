const express = require("express");
const router = express.Router()
const {
    registerUser,
    loginUser,
    goHome
} = require("../controllers/userController");


// import authorization middleware
const { protect } = require("../middleware/authMiddleware");


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/home", goHome); // add authorization middleware before getHome route

module.exports = router;