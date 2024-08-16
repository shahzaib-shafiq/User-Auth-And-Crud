const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  addItem,
  getAllItems,
  getItemsbyId,
  deleteItem,
  updateItem,
  multipleImagesItem,
  getAllItemImages,
  updateItemImages,
} = require("../Controller/item_controller");
const { verifyToken } = require("../middleware/authentication");

router.post("/additem/", verifyToken, upload.single("file"), addItem);
router.get("/getallitems", verifyToken, getAllItems);
router.get("/getAllItemImages", verifyToken, getAllItemImages);

router.get("/getitem/:id", verifyToken, getItemsbyId);
router.delete("/deleteitem/:id", verifyToken, deleteItem);
router.patch("/updateitem/:id", verifyToken, upload.single("file"), updateItem);
router.patch(
  "/updateItemImages/:id",
  verifyToken,
  upload.array("photos", 4),
  updateItemImages
);

router.post(
  "/addmultiImages",
  verifyToken,
  upload.array("photos", 4),
  multipleImagesItem
);

module.exports = router;
