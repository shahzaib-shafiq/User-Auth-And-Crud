const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { dbConnection } = require("./Config/dbConnection");
const { SERVER_PORT } = require("./Config/config");
const SignupUser = require("./Routes/user_route");
const LoginUser = require("./Routes/user_route");
const addItem = require("./Routes/item_route");
// Creating an Express application instance
const app = express();
app.use(express.json());
const PORT = SERVER_PORT | 3000;

app.use("/users", SignupUser);
app.use("/users", LoginUser);
app.use("/items", addItem);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
