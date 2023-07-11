const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true },
    password: {type: String, required: true },
    email: {type: String, required: true },
    fridgeContents: [{
      type: {
        item: {type: String, required: true },
        type: {type: String, required: true }, //other - value 0
        category: {type: String, required: true },
        shelfLife: {type: Number, required: true },
        expDate: {type: String, required: true},
      }
    }]
});

userSchema.pre('save', async function(next) {
    const user = this;
  
    if (!user.isModified('password')) return next();
  
    try {
      const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
  
      return next();
    } catch (err) {
      return next(err);
    }
  })

userSchema.statics.comparePassword = async function(password, hashedPassword) {
  try{
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (err) {
    console.log(err);
  }
};

const UserData = mongoose.model("UserData", userSchema);

module.exports = UserData;