const express = require("express");
const router = express.Router();
const app = express();
app.use(express.json());
const { SignupUser, LoginUser } = require("../Controller/user_controller");

router.post("/signup", SignupUser);
router.post("/login", LoginUser);

module.exports = router;
