const express = require("express");
const router = express.Router();
// const upload = require("../middleware/multer");
const multer = require("multer");
//const upload = multer({ dest: "uploads/" });

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 },
});

const {
  addItem,
  getAllItems,
  getItemsbyId,
  deleteItem,
  updateItem,
} = require("../Controller/item_controller");
const { verifyToken } = require("../middleware/authentication");

router.post("/additem/", verifyToken, upload.single("file"), addItem);
router.get("/getallitems", verifyToken, getAllItems);
router.get("/getitem/:id", verifyToken, getItemsbyId);
router.delete("/deleteitem/:id", verifyToken, deleteItem);
router.patch("/updateitem/:id", verifyToken, updateItem);

module.exports = router;
