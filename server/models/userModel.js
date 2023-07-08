const mongoose = require("mongoose");

const userSchema = {
    username: {type: String, required: true },
    password: {type: String, required: true },
    email: {type: String, required: true },
    fridgeContents: [
        {item: {type: String, required: true },
        type: {type: String, required: true },
        category: {type: String, required: true },
        purchaseDate: {type: String, required: true },
        shelfLife: {type: Number, required: true },
        expDate: {type: String, required: true }
    }
    ]
}

const UserData = mongoose.model("UserData", userSchema);

module.exports = UserData;