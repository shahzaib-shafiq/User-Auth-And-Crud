// const Sequelize = require("sequelize");
// const { DB_HOST, DB_PORT, DB_PASS, DB_USER, DB_NAME } = require("./config");
// console.log("db user", DB_NAME);
// const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
//   host: DB_HOST,
//   dialect: "mysql",
//   port: DB_PORT,
// });
// let dbConnection = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Conntected to DB");
//   } catch (error) {
//     console.log("error in connection: ", error);
//   }
// };

// module.exports = { sequelize, dbConnection };

// const Sequelize = require("sequelize");
// const { DB_HOST, DB_PORT, DB_PASS, DB_USER, DB_NAME } = require("./config");
// const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
//   host: DB_HOST,
//   dialect: "mysql",
//   port: process.env.db_port,
// });

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log(`connected to ${process.env.DB_NAME}`);
//   })
//   .catch((err) => {
//     console.error("Unable to connect to the database:", err);
//   });
// module.exports = { sequelize };

//module.exports = sequelize;

const Sequelize = require("sequelize");
const { DB_HOST, DB_PORT, DB_PASS, DB_USER, DB_NAME } = require("./config");
console.log(DB_NAME);

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "mysql",
  port: DB_PORT, // Ensure you're using DB_PORT variable here
});

sequelize
  .authenticate()
  .then(() => {
    console.log(`Connected to ${DB_NAME}`);
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
