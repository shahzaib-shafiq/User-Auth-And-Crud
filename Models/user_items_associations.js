import User from "../Models/item_model";
import Item from "../Models/item_model";

User.hasMany(Item, {
  foreignKey: "userId",
});

Item.hasOne(User, {
  foreignKey: "userId",
});
