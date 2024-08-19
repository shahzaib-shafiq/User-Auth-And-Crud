const { configDotenv } = require("dotenv");

configDotenv();
SERVER_PORT = process.env.SERVER_PORT;
DB_USER = process.env.DB_USER;
DB_PASS = process.env.DB_PASS;
DB_HOST = process.env.DB_HOST;
DB_PORT = process.env.DB_PASS;
DB_NAME = process.env.DB_NAME;
EMAIL = process.env.EMAIL;
PASS = process.env.PASS;
SECRET = process.env.SECRET;
CLIENT_ID = process.env.CLIENT_ID;
CLIENT_SECRET = process.env.CLIENT_SECRET;
CLIENT_URL = process.env.CLIENT_URL;
module.exports = {
  SERVER_PORT,
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  EMAIL,
  PASS,
  SECRET,
  CLIENT_ID,
  CLIENT_SECRET,
  CLIENT_URL,
};
