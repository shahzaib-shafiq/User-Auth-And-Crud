const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const upload = multer({ dest: "uploads/" });
const app = express();
const path = require("path");
app.use(express.static("uploads"));
app.use(cookieParser());
var cors = require("cors");
app.use("/uploads", express.static("uploads"));
//app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));
app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "/public/uploads"))
);

// const { dbConnection } = require("./Config/mySql");
const { SERVER_PORT } = require("./src/Config/config");
const Users = require("./src/Routes/user_route");

const Items = require("./src/Routes/item_route");
const dbConnection = require("./src/Config/db_connection");
const associations = require("./src/Models/user_items_associations");
const authRoutes = require("./src/middleware/Google_Auth");
const Google_Callback = require("./src/middleware/Google_Callback");
//const multipleImagesItem = require("./Routes/MultipleImagesRoute");
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
app.use("/users", Users);
app.use("/items", Items);
app.use(authRoutes);
// app.use(Google_Callback);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
