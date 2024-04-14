const User = require("../models/users");
// const { trace } = require('../routers/userRoutes');

const signInController = async (req, res) => {
  try {
    console.log("From SigninController")

    const { name, email, photo } = await req.body;
    // console.log(req.body)
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(300).send({
        success: false,
        msg: "User Already In",
        user: userExists,
      });
    }
    const newUser = new User({
      name,
      email,
      photo,
    });
    newUser.save();
    return res.status(200).send({
      success: true,
      msg: "New User Added",
      newUser,
    });
  } catch (error) {
    // console.log("Error in Signin Api");
    console.log(error);
    return res.status(400).send({
      success: false,
      msg: "Error in signinController or APi",
      error,
    });
  }
};

const getAllUsersController = async (req, res) => {
  try {
    const email = req.params.id;
    console.log("Email in getAll USer:",email);
    const allUsers = await User.find({ email: { $ne: email } });
    return res.status(200).send({
      success: true,
      msg: "All User Received",
      allUsers,
    });
  } catch (error) {
    // console.log("Error in Get All User Api");
    console.log(error);
    return res.status(400).send({
      success: false,
      msg: "Error in Get All User Controller",
      error,
    });
  }
};

module.exports = { signInController, getAllUsersController };
