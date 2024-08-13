const express = require("express");
const router = express.Router();
const app = express();
app.use(express.json());
const {
  SignupUser,
  LoginUser,
  updateUser,
} = require("../Controller/user_controller");
const { verifyToken } = require("../middleware/authentication");

// router.patch(
//     "/user/update/appsell/:id",
//     verifyToken,
//     upload.any("file"),
//     updateUserProfile
//   );
//   router.patch(
//     "/user/update-password/appsells",
//     verifyToken,
//     updatePasswordForUser
//   );
//   router.get("/users/fetch-all/appsells", verifyToken, fetchAllUsers);
//   router.get(
//     "/user/get-single-user/details/:id",
//     verifyToken,
//     fetchSingleUserById
//   );
//   router.delete("/user/delete-appsells/:id", verifyToken, deleteUserById);
//   router.post("/user/forgot-pass/appsells", forgotPassword);

// registerUser,
// userLogin,
// updateUserProfile,
// updatePasswordForUser,
// fetchAllUsers,
// fetchSingleUserById,
// deleteUserById,
// forgotPassword,

router.post("/signup", SignupUser);
router.post("/login", LoginUser);
router.patch("/updateUser/:id", verifyToken, updateUser);

module.exports = router;
