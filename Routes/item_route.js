const express = require("express");
const router = express.Router();
const app = express();
app.use(express.json());
const { addItem, getAllItems } = require("../Controller/item_controller");

router.post("/additem", addItem);
router.get("/getallitems", getAllItems);

module.exports = router;
