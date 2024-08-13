const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// const { dbConnection } = require("./Config/mySql");
const { SERVER_PORT } = require("./Config/config");
const SignupUser = require("./Routes/user_route");
const LoginUser = require("./Routes/user_route");
const addItem = require("./Routes/item_route");
const dbConnection = require("./Config/db_connection");
const associations = require("./Models/user_items_associations");
// Creating an Express application instance
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const PORT = SERVER_PORT | 3000;
(async function () {
  try {
    await dbConnection();
    console.log("DB Connected");

    await associations();

    console.log("Associations Created");
  } catch (err) {}
})();
app.use("/users", SignupUser);
app.use("/users", LoginUser);
app.use("/items", addItem);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
