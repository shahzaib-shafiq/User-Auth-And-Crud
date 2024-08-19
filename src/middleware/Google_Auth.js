const express = require("express");
const cookieParser = require("cookie-parser");
const axios = require("axios");
var cors = require("cors");
const querystring = require("querystring");
const { OAuth2Client } = require("google-auth-library");
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

// const verifyToken = async (token) => {
//   try {
//     const client = new OAuth2Client(GOOGLE_CLIENT_ID);

//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: GOOGLE_CLIENT_ID,
//     });

//     const returnedTicket = ticket;
//     console.log(returnedTicket);
//   } catch (error) {
//     return { status: 500, data: error };
//   }
// };

// router.get("/auth/verify/token", (req, res) => {
//   const ver = verifyToken();

//   return res.json({ url: ver });
// });

//////////////
router.get("/auth/google/callback", async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).json({ error: "Authorization code is missing" });
  }

  try {
    // Exchange the authorization code for tokens
    console.log("code-----------------", code);
    // const tokens = await client.getToken(code);
    // console.log("Token-----------------", tokens);
    // const { access_token } = tokens;

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

    console.log(
      "userInfoResponse----------------------------------------======================-----------------",
      userInfoResponse
    );

    // Return user info or handle it as needd
    return res.status(200).json({ message: "qwerty----------------------" });
  } catch (error) {
    console.error("Error during Google authentication:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
});

// router.get("/auth/google/callback", async (req, res) => {
//   const code = req.query.code;
//   console.log("============================", code);
//   if (!code) {
//     return res.status(400).json({ error: "Authorization code is missing" });
//   }

//   try {
//     // Exchange the authorization code for tokens
//     const { tokens } = await client.getToken(code);

//     const { access_token, id_token } = tokens;

//     // Decode the ID token
//     let userInfo;
//     if (id_token) {
//       const decodedIdToken = jwt.decode(id_token);
//       console.log("==============================", decodedIdToken);
//       userInfo = decodedIdToken;
//       console.log("==============================", userInfo);
//     }

//     // Use the access token to get user info (optional)
//     const userInfoResponse = await axios.get(
//       "https://www.googleapis.com/oauth2/v2/userinfo",
//       {
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//         },
//       }
//     );

//     // Return user info or handle it as needed
//     res.json({
//       userInfo: userInfo,
//       googleUserInfo: userInfoResponse.data,
//     });
//   } catch (error) {
//     console.error("Error during Google authentication:", error);
//     res.status(500).json({ error: "Authentication failed" });
//   }
// });

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
// router.get("/auth/google", async (req, res) => {
//   const code = req.query.code;

//   if (!code) {
//     return res.status(400).send("Missing authorization code");
//   }

//   try {
//     const { id_token, access_token } = await getTokens({
//       code,
//       clientId: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       redirectUri: `${SERVER_ROOT_URI}/${redirectURI}`,
//     });

//     // Fetch the user's profile with the access token
//     const googleUser = await axios.get(
//       `https://www.googleapis.com/oauth2/v1/userinfo?alt=json`,
//       {
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//         },
//       }
//     );

//     const token = jwt.sign(googleUser.data, JWT_SECRET);

//     res.cookie(COOKIE_NAME, token, {
//       maxAge: 900000,
//       httpOnly: true,
//       secure: false,
//     });

//     res.redirect(UI_ROOT_URI);
//   } catch (error) {
//     console.error(`Failed to process authentication`);
//     res.status(500).send("Internal Server Error");
//   }
// });

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

router.post("/auth/google", async (req, res) => {
  try {
    console.log("google login success");
  } catch (error) {
    console.error("Error during Google authentication:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
});

module.exports = router;
