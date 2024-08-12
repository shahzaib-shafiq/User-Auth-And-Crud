const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { dbConnection } = require("./Config/dbConnection");
const { SERVER_PORT } = require("./Config/config");

// Creating an Express application instance
const app = express();
const PORT = SERVER_PORT | 3000;
dbConnection();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
