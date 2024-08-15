const { DataTypes } = require("sequelize");
const sequelize = require("../Config/mySql");
const Item = require("../Models/item_model");

const ItemImages = sequelize.define("itemimages", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  image_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ItemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "items",
      key: "item_id",
    },
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
