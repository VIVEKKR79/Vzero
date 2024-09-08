const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body; // Corrected typo

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists", success: false });
    }

    // Create a new user instance
    const userModel = new UserModel({
      name,
      email,
      password, // Corrected typo
    });

    // Hash the password before saving
    userModel.password = await bcrypt.hash(password, 10); // Corrected typo
    await userModel.save();

    res.status(201).json({
      message: "User successfully created",
      success: true,
    });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { name, email, password } = req.body; // Corrected typo

    // Check if user already exists
    const errorMsg = "email or password may be wrong";
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    const isPassword = await bcrypt.compare(password, existingUser.password);
    
    if(!isPassword){
        return res.status(403).json({ message: errorMsg, success: false });
    }

    const jwtToken = jwt.sign(
        {email: existingUser.email, _id: existingUser._id},
        process.env.JWT_SECRET,
        {expiresIn: "24h"}
    )


    res.status(200).json({
      message: "login successfully",
      success: true,
      jwtToken,
      email,
      name: existingUser.name
    });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  signup,
  login
};