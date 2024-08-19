const express = require("express");

const passport = require("passport");
const apppass = require("../Config/config");

exports.googleLoginSucess = async (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
};

exports.googleLoginCallback = async (req, res) => {
  passport.authenticate("google", {
    successRedirect: apppass.CLIENT_URL,
    failureRedirect: "/login/failed",
  });
};

exports.googleLoginFailed = async (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log In Failed",
  });
};

exports.googleLogout = async (req, res) => {
  req.logout();
  res.Redirect(apppass.CLIENT_URL);
};

exports.googleAuthenticate = async (req, res) => {
  passport.authenticate("google", ["profile", "email"]);
};
