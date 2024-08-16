const Item = require("../Models/Images_model");
const User = require("../Models/user_model");
const { sequelize } = require("./mySql");

let dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conntected to DB");
    await User.sync();
    await Item.sync();
    console.log("Synchronized Tables");
  } catch (error) {
    console.log("error in connection: ", error);
  }
};
module.exports = dbConnection;
