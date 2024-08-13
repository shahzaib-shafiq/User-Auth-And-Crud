const express = require("express");
const User = require("../Models/user_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());
const {
  userInputValidation,
  userLoginValidation,
  userUpdateValidation,
} = require("../utils/userValidation");
const { use } = require("../Routes/user_route");
exports.SignupUser = async (req, res) => {
  try {
    const signupUser = req.body;
    console.log(signupUser);

    const ValidateUserData = await userInputValidation(signupUser);
    if (ValidateUserData) {
      return res.status(400).json({ message: validationError });
    }
    const emailAddress = signupUser.emailAddress;
    const Name = signupUser.Name;
    const password = signupUser.password;
    console.log("-----------------------");

    console.log("Checking for Existing Email");
    const existingEmail = await User.findOne({
      where: { emailAddress },
    });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    signupUser.Name = Name;
    signupUser.email = emailAddress;
    signupUser.password = hashedPassword;

    const user = await User.create(signupUser);

    if (user) {
      res.status(201).json({
        message: "User Signup successfully",
      });
    }
  } catch (error) {
    console.error("Signup Error", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.LoginUser = async (req, res) => {
  try {
    const { emailAddress, password } = req.body;

    console.log(req.body);
    const LoginValidation = userLoginValidation(req.body);
    if (!LoginValidation) {
      return res.status(400).json({ status: false, message: validationError });
    }

    const user = await User.findOne({ where: { emailAddress } });

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Auth Error",
      });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid Email or Password" });
    }

    console.log("Encoding ", user.id, user.emailAddress);
    let token;
    try {
      //Creating jwt token
      token = jwt.sign(
        {
          id: user.id,
          emailAddress: user.emailAddress,
        },
        "secret",
        { expiresIn: "12h" }
      );
    } catch (err) {
      console.log(err);
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: {
        email: user.emailAddress,
        token: token,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Login Failed",
      error,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userIds = req.id;
    const updateData = req.body.emailAddress;

    console.log(userIds, updateData);
    console.log("validating ");
    const ValidateUserData = await userUpdateValidation(updateData);
    console.log("after validating ");
    if (ValidateUserData) {
      return res.status(400).json({ message: validationError });
    }
    const finduser = await User.findOne({
      where: {
        id: userIds,
      },
    });

    if (finduser) {
      const user = await User.update(updateData, {
        where: {
          id: userIds,
        },
      });
      res.status(200).json({
        message: "User updated successfully",
        data: finditem,
      });
    } else {
      res.status(401).json({
        message: "User Does Not Exist",
      });
    }
  } catch (error) {}
};
