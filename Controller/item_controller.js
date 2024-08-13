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
  const userIds = req.id;
  const email = req.emailAddress;
  try {
    const itemId = req.params.id;
    console.log("item_id", itemId);
    console.log("ids", userIds, email);

    //const item = await Item.findByPk(itemId);

    const item = await Item.findAll({
      where: {
        id: itemId,
        userId: userIds,
      },
    });

    console.log(item);
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
    const userIds = req.id;
    const email = req.emailAddress;

    const item = await Item.findAll({
      where: {
        userId: userIds,
      },
    });
    if (item) {
      res.status(200).json({
        message: "Item retrieved successfully",
        data: item,
      });
    } else {
      res.status(401).json({
        message: "Item Does Not Exist",
        data: item,
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
    const itemId = req.params.id;
    const userIds = req.id;

    const item = await Item.destroy({
      where: {
        id: itemId,
        userId: userIds,
      },
    });
    if (item) {
      res.status(200).json({
        message: "Item Deleted successfully",
        data: item,
      });
    } else {
      res.status(401).json({
        message: "Item Does Not Exist",
        data: item,
      });
    }
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
