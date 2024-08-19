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

JWT_SECRET = process.env.JWT_SECRET;
GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
UI_ROOT_URI = process.env.UI_ROOT_URI;
SERVER_ROOT_URI = process.env.SERVER_ROOT_URI;
COOKIE_NAME = process.env.COOKIE_NAME;

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
  JWT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SERVER_ROOT_URI,
  COOKIE_NAME,
  UI_ROOT_URI,
};
