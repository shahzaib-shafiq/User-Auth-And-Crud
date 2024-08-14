const express = require("express");
const router = express.Router();
const app = express();
app.use(express.json());
const {
  SignupUser,
  LoginUser,
  updateUser,
  updatePassword,
} = require("../Controller/user_controller");
const { verifyToken } = require("../middleware/authentication");

router.post("/signup", SignupUser);
router.post("/login", LoginUser);
router.patch("/updateUser/:id", verifyToken, updateUser);
router.patch("/updatePassword/:id", verifyToken, updatePassword);
router.patch("fetchAllUsers", verifyToken);
router.patch("fetchUserById/:id", verifyToken);
router.patch("/deleteUserById/:id", verifyToken);
router.patch("/forgotPassword/:id", verifyToken);

module.exports = router;
