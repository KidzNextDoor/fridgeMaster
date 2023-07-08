const mongoose = require("mongoose");

const userSchema = {
    password: String,
    email: String,
    fridgeContents: {
        
    }
}

const UserData = mongoose.model("UserData", userSchema);

module.exports = UserData;