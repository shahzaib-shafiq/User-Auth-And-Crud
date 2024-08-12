const { DataTypes } = require("sequelize");
const sequelize = require("../Config/dbConnection");

const User = sequelize.define(
  "user",
  {
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

module.exports = User;
