const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  UI_ROOT_URI,
} = require("../Config/config");
const router = express.Router();
const client = new OAuth2Client(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  UI_ROOT_URI
);

// Endpoint to get the Google Auth URL
router.get("/auth/google/url", (req, res) => {
  const url = getGoogleAuthURL();
  return res.json({ url });
});

// Endpoint to handle the Google callback
// router.get("/auth/google/callback", async (req, res) => {
//   const code = req.query.code;

//   if (!code) {
//     return res.status(400).json({ error: "Authorization code is missing" });
//   }

//   try {
//     // Exchange the authorization code for tokens
//     const { tokens } = await client.getToken(code);
//     const { access_token } = tokens;

//     // Use the access token to get user info
//     const userInfoResponse = await axios.get(
//       "https://www.googleapis.com/oauth2/v2/userinfo",
//       {
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//         },
//       }
//     );

//     // Return user info or handle it as needed
//     res.json(userInfoResponse.data);
//   } catch (error) {
//     console.error("Error during Google authentication:", error);
//     res.status(500).json({ error: "Authentication failed" });
//   }
// });

function getGoogleAuthURL() {
  // Generate the Google OAuth URL
  const { generateAuthUrl } = client;
  return generateAuthUrl({
    access_type: "offline",
    scope: ["profile", "email"],
  });
}

module.exports = router;
