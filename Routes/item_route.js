const express = require("express");
const router = express.Router();
const app = express();
app.use(express.json());
const { addItem } = require("../Controller/item_controller");

router.post("/additem", addItem);

module.exports = router;
