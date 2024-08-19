const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const apppass = require("../Config/config");
passport.use(
  new GoogleStrategy(
    {
      clientID: apppass.CLIENT_ID,
      clientSecret: apppass.CLIENT_SECRET,
      callbackURL: apppass.CLIENT_URL,
      scope: ["profile", "email"],
    },
    function (acessToken, refreshToken, profile, callback) {
      callback(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
