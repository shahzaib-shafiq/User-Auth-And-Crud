const Item = require("../Models/item_model");

exports.addItem = async (req, res) => {
  try {
    const userId = req.id;
    console.log("user_id", userId);

    const itemDetails = {
      ...req.body,
      userId,
    };

    console.log(itemDetails);

    const item = await Item.create(itemDetails);

    if (item) {
      res.status(201).json({
        message: "Item added successfully",
      });
    }
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({
      message: "An error occurred while adding the item",
      error: error.message,
    });
  }
};

exports.getItemsbyId = async (req, res) => {
  try {
    const itemId = req.params.id;
    console.log("item_id", itemId);

    const item = await Item.findByPk(itemId);

    if (item) {
      res.status(200).json({
        message: "Item retrieved successfully",
        data: item,
      });
    } else {
      res.status(404).json({
        message: "Item not found",
      });
    }
  } catch (error) {
    console.error("Error retrieving item:", error);
    res.status(500).json({
      message: "An error occurred while retrieving the item",
      error: error.message,
    });
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const item = await Item.findAll();
    if (item) {
      res.status(201).json({
        message: "Item Fetched successfully",
        item,
      });
    }
  } catch (error) {
    console.error("Error in Fetching Items", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteItem = async (req, res) => {
  try {
  } catch (error) {}
};

exports.updateItem = async (req, res) => {
  try {
  } catch (error) {}
};
