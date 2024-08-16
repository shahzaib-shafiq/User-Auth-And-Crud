// const { DataTypes } = require("sequelize");
// const sequelize = require("../Config/mySql");
// const Item = require("../Models/item_model");

// const ItemImages = sequelize.define("itemimages", {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   image_name: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   ItemId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: "items",
//       key: "ItemId",
//     },
//   },
//   image_url: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
// });

const { DataTypes } = require("sequelize");
const sequelize = require("../Config/mySql");
const Item = require("../Models/item_model"); // Ensure this model is correctly defined and exported

const ItemImages = sequelize.define("ItemImages", {
  // Sequelize automatically pluralizes model names unless you specify the table name explicitly
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ItemId: {
    type: DataTypes.INTEGER,
    references: {
      model: Item,
      key: "id",
    },
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Sync the model with the database
// ItemImages.sync({ alter: true }) // you can use force: true instead of alter to drop the table and create new
//   .then(() => {
//     console.log("ItemImages table synchronized successfully.");
//   })
//   .catch((err) => {
//     console.error("Error synchronizing ItemImages table:", err);
//   });

//Sync the model with the database, checking if the table already exists
ItemImages.sync({ alter: true }) // you can use force true instead of alter to drop the table and create new
  .then((result) => {
    if (result.changed) {
      console.log("Admin table updated successfully.");
    } else {
      console.log("Admin table already exists and is up to date.");
    }
  })
  .catch((err) => {
    console.error("Error synchronizing Admin table:", err);
  });

module.exports = ItemImages;
// module.exports = ItemImages;
