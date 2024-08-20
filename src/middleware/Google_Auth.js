const express = require("express");
const axios = require("axios");
var cors = require("cors");
const querystring = require("querystring");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");

const app = express();
const {
  SERVER_ROOT_URI,
  GOOGLE_CLIENT_ID,

  GOOGLE_CLIENT_SECRET,

  UI_ROOT_URI,
} = require("../Config/config");

const router = express.Router();

const redirectURI = "auth/google";
const client = new OAuth2Client(
  GOOGLE_CLIENT_ID, // Ensure these environment variables are set
  GOOGLE_CLIENT_SECRET,
  UI_ROOT_URI // Replace with your redirect URI
);
app.use(
  cors({
    // Sets Access-Control-Allow-Origin to the UI URI
    origin: UI_ROOT_URI,
    // Sets Access-Control-Allow-Credentials to true
    credentials: true,
  })
);

function getGoogleAuthURL() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: `${SERVER_ROOT_URI}/${redirectURI}`,
    client_id: GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  return `${rootUrl}?${querystring.stringify(options)}`;
}

router.get("/auth/google/url", (req, res) => {
  const googleAuthURL = getGoogleAuthURL();
  return res.json({ url: googleAuthURL });
});

router.get("/auth/google/callback", async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).json({ error: "Authorization code is missing" });
  }

  try {
    console.log("code-----------------", code);

    console.log("GOOGLE_CLIENT_ID-----------------", GOOGLE_CLIENT_ID);
    console.log("GOOGLE_CLIENT_SECRET-----------------", GOOGLE_CLIENT_SECRET);
    console.log("UI_ROOT_URI-----------------", UI_ROOT_URI);

    const { tokens } = await client.getToken(code);

    console.log("tokens------------------", tokens);
    console.log("Access Token:", tokens.access_token);
    console.log("Refresh Token:", tokens.refresh_token);
    console.log("ID Token:", tokens.id_token);

    // Use the access token to get user info
    const userInfoResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      }
    );

    console.log("User Info:", userInfoResponse.data);

    console.log("userInfoResponse-------------------", userInfoResponse);
    return res.redirect(307, "/auth/google");
    //return res.status(200).json({ message: "qwerty----------------------" });
  } catch (error) {
    console.error("Error during Google authentication:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
});

router.get("/auth/google", async (req, res) => {
  try {
    console.log("google login success");
    // Additional logic for handling login success
    return res.status(200).json({ message: "Google login successful" });
  } catch (error) {
    console.error("Error during Google authentication:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
});

module.exports = router;
