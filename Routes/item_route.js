const express = require("express");
const router = express.Router();

const {
  addItem,
  getAllItems,
  getItemsbyId,
  deleteItem,
  updateItem,
} = require("../Controller/item_controller");
const { verifyToken } = require("../middleware/authentication");

router.post("/additem/", verifyToken, addItem);
router.get("/getallitems", verifyToken, getAllItems);
router.get("/getitem/:id", verifyToken, getItemsbyId);
router.delete("/deleteitem/:id", verifyToken, deleteItem);
router.patch("/updateitem/:id", verifyToken, updateItem);

module.exports = router;
