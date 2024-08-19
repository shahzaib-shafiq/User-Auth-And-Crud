const express = require("express");
const cookieParser = require("cookie-parser");
const axios = require("axios");
var cors = require("cors");
const querystring = require("querystring");
const jwt = require("jsonwebtoken");
const app = express();
const {
  SERVER_ROOT_URI,
  GOOGLE_CLIENT_ID,
  JWT_SECRET,
  GOOGLE_CLIENT_SECRET,
  COOKIE_NAME,
  UI_ROOT_URI,
} = require("../Config/config");

const router = express.Router();

const redirectURI = "auth/google";

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

async function getTokens({ code, clientId, clientSecret, redirectUri }) {
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  };

  try {
    const response = await axios.post(url, querystring.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch auth tokens`);
    throw new Error(error.message);
  }
}

// Getting the user from Google with the code
router.get(`/${redirectURI}`, async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send("Missing authorization code");
  }

  try {
    const { id_token, access_token } = await getTokens({
      code,
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      redirectUri: `${SERVER_ROOT_URI}/${redirectURI}`,
    });

    // Fetch the user's profile with the access token
    const googleUser = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const token = jwt.sign(googleUser.data, JWT_SECRET);

    res.cookie(COOKIE_NAME, token, {
      maxAge: 900000,
      httpOnly: true,
      secure: false,
    });

    res.redirect(UI_ROOT_URI);
  } catch (error) {
    console.error(`Failed to process authentication`);
    res.status(500).send("Internal Server Error");
  }
});

// Getting the current user
router.get("/auth/me", (req, res) => {
  console.log("get me");
  try {
    const decoded = jwt.verify(req.cookies[COOKIE_NAME], JWT_SECRET);
    console.log("decoded", decoded);
    return res.send(decoded);
  } catch (err) {
    console.log(err);
    res.status(401).send("Unauthorized");
  }
});

module.exports = router;
