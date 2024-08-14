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
  validatePassword,
} = require("../utils/userValidation");
const { use } = require("../Routes/user_route");
const { where } = require("sequelize");
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
    const { emailAddress } = req.body;

    // console.log("User ID:", userIds);
    // console.log("New Email Address:", emailAddress);

    const validationError = await userUpdateValidation(emailAddress);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const findUser = await User.findOne({
      where: {
        id: userIds,
      },
    });

    if (!findUser) {
      return res.status(401).json({
        message: "User Does Not Exist",
      });
    }

    const updatedUser = await User.update(
      { emailAddress },
      {
        where: {
          id: userIds,
        },
      }
    );

    if (updatedUser) {
      const updatedUser = await User.findOne({
        where: {
          id: userIds,
        },
      });

      return res.status(200).json({
        message: "User updated successfully",
        Name: updatedUser.Name,
        data: updatedUser.emailAddress,
      });
    } else {
      return res.status(500).json({
        message: "Failed to update user",
      });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const userId = req.id;
    const { oldPassword, newPassword, confirmPassword } = req.body;

    let validateUserPassword = validatePassword(req.body);

    if (!validateUserPassword) {
      return res.status(404).json({ message: "Enter Passwords" });
    }

    // console.log(validateUserPassword);
    const findUser = await User.findOne({ where: { id: userId } });
    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordCheck = await bcrypt.compare(oldPassword, findUser.password);

    if (!passwordCheck) {
      return res.status(401).json({ message: "Incorrect old password" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "New passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.update({ password: hashedPassword }, { where: { id: userId } });

    // Send a success response
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating user password:", error);
    res.status(500).json({ message: "Error updating password" });
  }
};

exports.fetchAllUsers = async () => {};

exports.fetchUserById = async () => {};

exports.deleteUserById = async () => {};

exports.forgotPassword = async () => {};
