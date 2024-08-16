const express = require("express");
const router = express.Router();
const multer = require("multer");
const multipleImagesItem = require("../Controller/MultipleImagesController");
require("../Models/user_items_associations");

const { verifyToken } = require("../middleware/authentication");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
router.post(
  "/addmultiImages",
  verifyToken,
  upload.array("photos", 4),
  multipleImagesItem
);

module.exports = router;
