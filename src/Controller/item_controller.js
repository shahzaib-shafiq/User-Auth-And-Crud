const Item = require("../Models/item_model");
const User = require("../Models/user_model");
const MultipleImageItems = require("../Models/Images_model");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { where } = require("sequelize");
require("../Models/user_items_associations");

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
    const { name, description, price, quantity } = req.body;
    let imageUrl = null;

    if (req.file) {
      const uploadDir = path.join(__dirname, "../public/uploads");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileExtension = path.extname(req.file.originalname);
      const originalName = path.basename(req.file.originalname, fileExtension);
      const newFilename = `${originalName}-${Date.now()}${fileExtension}`;
      const tempPath = req.file.path;
      const targetPath = path.join(uploadDir, newFilename);
      fs.renameSync(tempPath, targetPath);
      imageUrl = `/public/uploads/${newFilename}`;
    }

    // Item details
    const itemDetails = {
      name,
      description,
      price,
      quantity,
      userIds,
      image_url: imageUrl,
    };

    const finditem = await Item.findOne({
      where: {
        id: itemId,
        userId: userIds,
      },
    });
    console.log(finditem);
    if (finditem) {
      const item = await Item.update(itemDetails, {
        where: {
          id: itemId,
          userId: userIds,
        },
      });
      res.status(200).json({
        message: "Item Updated successfully",
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

exports.addItem = async (req, res) => {
  try {
    const userId = req.id;
    const { name, description, price, quantity } = req.body;

    let imageUrl = null;

    if (req.file) {
      const uploadDir = path.join(__dirname, "../public/uploads");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileExtension = path.extname(req.file.originalname);
      const originalName = path.basename(req.file.originalname, fileExtension);
      const ImageNameId = Date.now();
      const newFilename = `${originalName}-${ImageNameId}${fileExtension}`;
      const tempPath = req.file.path;

      const targetPath = path.join(uploadDir, newFilename);
      fs.renameSync(tempPath, targetPath);
      imageUrl = `/public/uploads/${newFilename}`;
    }

    // Item details
    const itemDetails = {
      name,
      description,
      price,
      quantity,
      userId,
      image_url: imageUrl,
    };

    // Create the item in the database
    const item = await Item.create(itemDetails);

    // Respond with success
    if (item) {
      res.status(201).json({
        message: "Item added successfully",
        item,
        image_url: `${req.protocol}://${req.get("host")}${imageUrl}`,
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

exports.multipleImagesItem = async (req, res) => {
  try {
    const files = req.files;
    const userId = req.id;
    const { name, description, price, quantity } = req.body;

    if (!files || files.length === 0) {
      return res.status(400).json({
        error: "No images uploaded",
      });
    }

    const itemDetails = {
      name,
      description,
      price,
      quantity,
      userId,
    };

    // Create a new item
    const item = await Item.create(itemDetails);
    console.log(item);

    const uploadDir = path.join(__dirname, "../public/uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    for (const file of files) {
      const fileExtension = path.extname(file.originalname);
      const originalName = path.basename(file.originalname, fileExtension);
      const ImageNameId = Date.now();
      const newFilename = `${originalName}-${ImageNameId}${fileExtension}`;
      const tempPath = file.path;
      const targetPath = path.join(uploadDir, newFilename);

      console.log("----------------------------------------", newFilename);
      fs.renameSync(tempPath, targetPath);

      // Create image URL
      const imageUrl = `http://localhost:3001/public/uploads/${newFilename}`;

      // Save image URL in ItemImages table
      await MultipleImageItems.create({
        name: originalName,
        ImageNameId: ImageNameId,
        ItemId: item.id,
        image_url: imageUrl,
      });

      console.log("Image URL stored:", imageUrl);
    }

    res.status(201).json({
      message: "Item added successfully",
      item,
    });
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({
      message: "An error occurred while adding the item",
      error: error.message,
    });
  }
};

exports.getItemsImages = async (req, res) => {
  try {
    const itemid = req.params.id;
    const userIds = req.id;

    const item = await MultipleImageItems.findAll({
      where: {
        ItemId: itemid,
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

exports.updateItemImages = async (req, res) => {
  try {
    const itemId = req.params.id;
    const files = req.files;
    const userId = req.id;

    const ImageIds = req.body.ImageIds;

    const { name, description, price, quantity } = req.body;

    if (!files || files.length === 0) {
      return res.status(400).json({
        error: "No images uploaded",
      });
    }

    const itemDetails = {
      name,
      description,
      price,
      quantity,
      userId,
    };

    const findItem = await Item.findOne({
      where: {
        id: itemId,
        userId,
      },
    });

    console.log(findItem);

    if (!findItem) {
      return res.status(401).json({
        message: "Item does not exist",
      });
    }

    await Item.update(itemDetails, {
      where: {
        id: itemId,
        userId,
      },
    });

    //handle Imgaes Upload

    const uploadDir = path.join(__dirname, "../public/uploads");

    // if (!fs.existsSync(uploadDir)) {
    //   fs.mkdirSync(uploadDir, { recursive: true });
    // }

    const newImageIds = [];
    for (const file of files) {
      const fileExtension = path.extname(file.originalname);
      const originalName = path.basename(file.originalname, fileExtension);
      const newFilename = `${originalName}-${Date.now()}${fileExtension}`;
      const tempPath = file.path;
      const targetPath = path.join(uploadDir, newFilename);
      fs.renameSync(tempPath, targetPath);

      const imageUrl = `/uploads/${newFilename}`;
      console.log("----=================================", ImageIds);

      const [image, created] = await MultipleImageItems.update(
        {
          id: ImageIds.shift(),
          name: originalName,
          ItemId: itemId,
          image_url: imageUrl,
        },
        {
          where: { id: itemId },
        }
      );

      if (created || image) {
        newImageIds.push(image.id);
      }
    }

    if (ImageIds.length > 0) {
      await MultipleImageItems.destroy({
        where: {
          id: ImageIds,
        },
      });
    }

    res.status(201).json({
      message: "Item and images updated successfully",
      item: findItem,
    });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({
      message: "An error occurred while updating the item",
      error: error.message,
    });
  }
};

// exports.updateItemImages = async (req, res) => {
//   try {

//     const itemId = req.params.id;
//     const files = req.files;
//     const userIds = req.id;

//     const ImageIds = req.body;
//     console.log(ImageIds);

//     const { name, description, price, quantity } = req.body;

//     if (!files || files.length === 0) {
//       return res.status(400).json({
//         error: "No images uploaded",
//       });
//     }

//     const itemDetails = {
//       name,
//       description,
//       price,
//       quantity,
//       userIds,
//     };
//     const finditem = await Item.findOne({
//       where: {
//         id: itemId,
//         userId: userIds,
//       },
//     });
//     console.log(finditem);
//     if (finditem) {
//       const item = await Item.update(itemDetails, {
//         where: {
//           id: itemId,
//           userId: userIds,
//         },
//       });

//       const uploadDir = path.join(__dirname, "../public/uploads");

//       if (!fs.existsSync(uploadDir)) {
//         fs.mkdirSync(uploadDir, { recursive: true });
//       }

//       for (const file of files) {
//         const fileExtension = path.extname(file.originalname);
//         const originalName = path.basename(file.originalname, fileExtension);
//         const newFilename = `${originalName}-${Date.now()}${fileExtension}`;
//         const tempPath = file.path;
//         const targetPath = path.join(uploadDir, newFilename);
//         fs.renameSync(tempPath, targetPath);

//         const imageUrl = `/uploads/${newFilename}`;

//      const updatedImage=  await MultipleImageItems.update(
//           {
//             name: originalName,
//             ItemId: item.id,
//             image_url: imageUrl,

//           },
//           {
//             where: {
//               id: itemId,
//             },
//           }
//         );
//       }
//       res.status(201).json({
//         message: "Item Updated successfully",
//         item,
//       });
//     } else {
//       res.status(401).json({
//         message: "Item Does Not Exist",
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
