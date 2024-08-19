const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const app = express();
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const passportSetup = require("./src/middleware/passport");
require("dotenv").config();
const cookieSession = require("cookie-session");
app.use(express.static("uploads"));

app.use("/uploads", express.static("uploads"));
//app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "/public/uploads"))
);

///Google Auth

app.use(
  cookieSession({
    name: "session",
    keys: ["secret"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

///Google Auth

// const { dbConnection } = require("./Config/mySql");
const { SERVER_PORT } = require("./src/Config/config");
const Users = require("./src/Routes/user_route");
const SocialLogin = require("./src/Routes/google_route");

const Items = require("./src/Routes/item_route");
const dbConnection = require("./src/Config/db_connection");
const associations = require("./src/Models/user_items_associations");

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
app.use("/social", SocialLogin);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
