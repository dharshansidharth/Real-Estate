const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const { errorHandler } = require("../util/error.js");

const bcryptSalt = bcrypt.genSaltSync(10);

const authController = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
  console.log(hashedPassword);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).json({ newUser });
  } catch (err) {
    next(err);
    // next(errorHandler(550 , 'custom error'))
  }
};

module.exports = authController;
