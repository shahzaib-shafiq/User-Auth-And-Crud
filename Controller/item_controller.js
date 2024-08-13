const Item = require("../Models/item_model");
const User = require("../Models/user_model");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

require("../Models/user_items_associations");

exports.addItem = async (req, res) => {
  try {
    const userId = req.id;
    const { name, description, price, quantity } = req.body;

    let filepath = null;
    if (req.file) {
      const fileExtension = path.extname(req.file.originalname);
      const originalName = path.basename(req.file.originalname, fileExtension);
      const newFilename = `${originalName}${fileExtension}`;
      filepath = path.join("uploads", newFilename);
      fs.renameSync(req.file.path, filepath);
    }

    const itemDetails = {
      name,
      description,
      price,
      quantity,
      userId,
      image_url: filepath,
    };

    const item = await Item.create(itemDetails);

    if (item) {
      res.status(201).json({
        message: "Item added successfully",
        item,
      });
    } else {
      res.status(500).json({
        message: "Unable to add item to database",
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

// exports.addItem = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { name, description, price, quantity } = req.body;
//     console.log("==================================");
//     const filepath = req.file;

//     console.log(filepath);
//     const itemDetails = {
//       name,
//       description,
//       price,
//       quantity,
//       userId,
//       filepath,
//     };

//     console.log(itemDetails);

//     const item = await Item.create(itemDetails);

//     if (item) {
//       res.status(201).json({
//         message: "Item added successfully",
//       });
//     } else {
//       res.status(500).json({
//         message: "Unable to Add Item to Database",
//         error: error.message,
//       });
//     }
//   } catch (error) {
//     console.error("Error adding item:", error);
//     res.status(500).json({
//       message: "An error occurred while adding the item",
//       error: error.message,
//     });
//   }
// };
///////////////////////

// exports.addItem = async (req, res) => {
//   try {

//     const userId = req.id;
//     const { name, description, price, quantity } = req.body;

//     // Get the filepath and add the file extension if a file is provided
//     const filepath = req.file
//       ? `${req.file.path}${path.extname(req.file.originalname)}`
//       : null;

//     const itemDetails = {
//       name,
//       description,
//       price,
//       quantity,
//       userId,
//       image_url: filepath,
//     };

//     const item = await Item.create(itemDetails);

//     if (item) {
//       res.status(201).json({
//         message: "Item added successfully",
//         item,
//       });
//     } else {
//       res.status(500).json({
//         message: "Unable to add item to database",
//       });
//     }
//   } catch (error) {
//     console.error("Error adding item:", error);
//     res.status(500).json({
//       message: "An error occurred while adding the item",
//       error: error.message,
//     });
//   }
// };

// exports.addItem = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { name, description, price, quantity } = req.body;

//     // Ensure req.file exists before attempting to use it
//     let filepath = null;
//     if (req.file) {
//       const fileExtension = path.extname(req.file.originalname);
//       filepath = `${req.file.path}${fileExtension}`;
//     }

//     const itemDetails = {
//       name,
//       description,
//       price,
//       quantity,
//       userId,
//       image_url: filepath,
//     };

//     const item = await Item.create(itemDetails);

//     if (item) {
//       res.status(201).json({
//         message: "Item added successfully",
//         item,
//       });
//     } else {
//       res.status(500).json({
//         message: "Unable to add item to database",
//       });
//     }
//   } catch (error) {
//     console.error("Error adding item:", error);
//     res.status(500).json({
//       message: "An error occurred while adding the item",
//       error: error.message,
//     });
//   }
// };

//////////////////////////
// exports.addItem = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { name, description, price, quantity } = req.body;

//     // Ensure a file was uploaded
//     if (!req.file) {
//       return res.status(400).json({
//         message: "No file uploaded",
//       });
//     }

//     // Get file information
//     const file = req.file;
//     const filePath = path.join(__dirname, "..", file.path); // Adjust the path as needed

//     // Save item details including file path
//     const itemDetails = {
//       name,
//       description,
//       price,
//       quantity,
//       userId,
//       filepath: filePath, // Save the file path in the database
//     };

//     // Log item details for debugging
//     console.log(itemDetails);

//     // Create a new item in the database
//     const item = await Item.create(itemDetails);

//     if (item) {
//       res.status(201).json({
//         message: "Item added successfully",
//       });
//     } else {
//       res.status(500).json({
//         message: "Unable to add item to database",
//       });
//     }
//   } catch (error) {
//     console.error("Error adding item:", error);
//     res.status(500).json({
//       message: "An error occurred while adding the item",
//       error: error.message,
//     });
//   }
// };

exports.getItemsbyId = async (req, res) => {
  const userIds = req.id;
  const email = req.emailAddress;
  try {
    const itemId = req.params.id;
    console.log("item_id", itemId);
    console.log("ids", userIds, email);

    //const item = await Item.findByPk(itemId);

    const item = await Item.findOne({
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
        message: "No Item in your Bucket",
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

    const finditem = await Item.findOne({
      where: {
        id: itemId,
        userId: userIds,
      },
    });

    if (finditem) {
      const item = await Item.destroy({
        where: {
          id: itemId,
          userId: userIds,
        },
      });
      res.status(200).json({
        message: "Item Deleted successfully",
        data: finditem,
      });
    } else {
      res.status(401).json({
        message: "Item Does Not Exist",
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
  try {
    const itemId = req.params.id;
    const userIds = req.id;

    const updateData = req.body;

    const finditem = await Item.findOne({
      where: {
        id: itemId,
        userId: userIds,
      },
    });

    if (finditem) {
      const item = await Item.update(updateData, {
        where: {
          id: itemId,
          userId: userIds,
        },
      });
      res.status(200).json({
        message: "Item Deleted successfully",
        data: finditem,
      });
    } else {
      res.status(401).json({
        message: "Item Does Not Exist",
      });
    }
  } catch (error) {
    console.error("Error in Updating Item", error);
    res.status(500).json({
      message: error.message,
    });
  }
};
