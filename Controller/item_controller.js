const Item = require("../Models/item_model");
const User = require("../Models/user_model");
require("../Models/user_items_associations");
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
  const userId = req.id;
  const email = req.emailAddress;
  console.log("ids", userId, email);
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
    const userId = req.id;
    const email = req.emailAddress;
    console.log("-----------ids----------------------------", userId, email);

    const getuser = await User.findByPk(userId);
    //console.log(getuser.id);
    if (getuser.id === userId) {
      const item = await Item.findAll();
      if (item) {
        res.status(201).json({
          message: "Item Fetched successfully",
          item,
        });
      }
    } else {
      console.error("Error in Fetching Items", error);
      res.status(500).json({
        message: error.message,
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
    const { id } = req.params;
    console.log(id);
    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }
    await item.destroy();
    res.status(200).json({
      message: "Item deleted successfully",
    });
  } catch (error) {
    console.error("Error in Deleting Item", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }
    await item.update(updateData);

    res.status(200).json({
      message: "Item updated successfully",
      item,
    });
  } catch (error) {
    console.error("Error in Updating Item", error);
    res.status(500).json({
      message: error.message,
    });
  }
};
