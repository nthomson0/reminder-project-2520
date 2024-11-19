const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controller/userController");
var GitHubStrategy = require('passport-github2').Strategy;


// const github = new GitHubStrategy({
//   clientID: process.env.GITHUB_CLIENT,
//   clientSecret: process.env.GITHUB_SECRET,
//   callbackURL: "http://localhost:8000/auth/github/callback"
// },
// function(accessToken, refreshToken, profile, done) {
//   User.findOrCreate({ githubId: profile.id }, function (err, user) {
//     return done(err, user);
//   });
// }
// );

const localLogin = new LocalStrategy(// this is the local stratigy 
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(localLogin)//.use(github);
