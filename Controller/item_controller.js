const express = require("express");
const app = express();
const Item = require("../Models/item_model");
app.use(express.json());

exports.addItem = async (req, res) => {
  try {
    const itemDetails = req.body;
    //const { name, description, price, quantity } = req.body;

    console.log(req.body);
    const item = await Item.create(itemDetails);

    if (item) {
      res.status(201).json({
        message: "Item Added successfully",
      });
    }
  } catch (error) {
    console.error("Error in Item Details", error);
    res.status(500).json({
      message: error.message,
    });
  }
};
