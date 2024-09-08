const { required } = require("joi");
const mongoose = require("mongoose");
const {model} = require("mongoose");

const {UserSchema} = require("../schemas/UserScehma")



const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;