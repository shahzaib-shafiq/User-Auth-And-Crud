const { DataTypes } = require("sequelize");
const sequelize = require("../Config/mySql");

const OTP = sequelize.define("otp", {
  emailAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Automatically set to the current time
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: () => {
      const now = new Date();
      now.setMinutes(now.getMinutes() + 2);
      return now;
    },
  },
});

//Sync the model with the database, checking if the table already exists
// OTP.sync({ alter: true }) // you can use force true instead of alter to drop the table and create new
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

module.exports = OTP;
