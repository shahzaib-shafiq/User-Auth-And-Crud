const User = require("../Models/item_model");
const Item = require("../Models/item_model");

const associations = async () => {
  try {
    await User.hasMany(Item, {
      foreignKey: "userId",
    });

    await Item.hasOne(User, {
      foreignKey: "userId",
    });
  } catch (error) {
    console.log("error");
  }
};

module.exports = associations;
