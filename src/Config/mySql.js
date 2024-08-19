const Sequelize = require("sequelize");
const { DB_HOST, DB_PORT, DB_PASS, DB_USER, DB_NAME } = require("./config");
console.log("db user", DB_NAME);
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "mysql",
  port: DB_PORT,
});

module.exports = sequelize;
