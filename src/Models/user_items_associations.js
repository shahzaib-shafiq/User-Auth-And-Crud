const User = require("../Models/item_model");
const Item = require("../Models/item_model");
const ItemImages = require("../Models/Images_model");

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

Item.hasMany(ItemImages, {
  foreignKey: "ItemId",
});
ItemImages.belongsTo(Item, {
  foreignKey: "ItemId",
});

module.exports = associations;
