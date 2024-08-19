const express = require("express");
const router = express.Router();
const passport = require("passport");
const apppass = require("../Config/config");
var cors = require("cors");
const {
  googleLoginFailed,
  googleLoginCallback,
  googleLoginSucess,
  googleLogout,
  googleAuthenticate,
} = require("../Controller/google_controller");

router.get("/login/success", googleLoginSucess);
router.get("/login/failed", googleLoginFailed);
router.get("/google/callback", googleLoginCallback);
router.get("/google/auth", googleAuthenticate);
router.get("/logout", googleLogout);
module.exports = router;
