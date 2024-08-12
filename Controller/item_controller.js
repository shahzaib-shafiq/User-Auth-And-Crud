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
    const itemId = req.params;
    console.log(itemId);
    const item = await Item.findAll({
      where: {
        id: itemId,
      },
    });

    if (item) {
      res.status(201).json({
        message: "Item Fetched successfully",
        item,
      });
    }
  } catch (error) {
    console.error("Error in Fetching Item", error);
    res.status(500).json({
      message: error.message,
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
