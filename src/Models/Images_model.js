const { DataTypes } = require("sequelize");
const sequelize = require("../Config/mySql");
const Item = require("../Models/item_model");

const ItemImages = sequelize.define("ItemImages", {
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

//Sync the model with the database, checking if the table already exists
// ItemImages.sync({ alter: true }) // you can use force true instead of alter to drop the table and create new
//   .then((result) => {
//     if (result.changed) {
//       console.log("Admin table updated successfully.");
//     } else {
//       console.log("Admin table already exists and is up to date.");
//     }
//   })
//   .catch((err) => {
//     console.error("Error synchronizing Admin table:", err);
//   });

module.exports = ItemImages;
