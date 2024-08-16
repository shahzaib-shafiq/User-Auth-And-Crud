const express = require("express");
const router = express.Router();
const app = express();
app.use(express.json());
const {
  SignupUser,
  LoginUser,
  updateUser,
  updatePassword,
  fetchAllUsers,
  fetchUserById,
  deleteUserById,
  forgotPassword,
  sendOTP,
  verifyOTP,
} = require("../Controller/user_controller");
const { verifyToken } = require("../middleware/authentication");

router.post("/signup", SignupUser);
router.post("/login", LoginUser);
router.patch("/updateUser/:id", verifyToken, updateUser);
router.patch("/updatePassword/:id", verifyToken, updatePassword);
router.get("/fetchAllUsers", verifyToken, fetchAllUsers);
router.get("/fetchUserById/:id", verifyToken, fetchUserById);
router.delete("/deleteUserById/:id", verifyToken, deleteUserById);
router.patch("/forgotPassword/:id", verifyToken, forgotPassword);
router.post("/sendOTP/:id", verifyToken, sendOTP);
router.post("/verifyOTP/:id", verifyToken, verifyOTP);

module.exports = router;
