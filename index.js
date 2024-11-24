const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const { ensureAuthenticated } = require("./middleware/checkAuth")
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
const session = require("express-session");// passport by default uses sessions and sit ontop of session library


app.use(
  session({
    secret: "secret",// this is used to make the cookie which is digitally signed
    resave: false,// this code is configring express
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

const passport = require("./middleware/passport");



app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.use(ejsLayouts);

app.use(passport.initialize());
app.use(passport.session());


// Routes start here

app.get("/reminders", ensureAuthenticated, reminderController.list);

app.get("/reminder/new",ensureAuthenticated, reminderController.new);

app.get("/reminder/:id",ensureAuthenticated, reminderController.listOne);

app.get("/reminder/:id/edit",ensureAuthenticated, reminderController.edit);

app.post("/reminder/",ensureAuthenticated, reminderController.create);

// Implement this yourself
app.post("/reminder/update/:id",ensureAuthenticated, reminderController.update);

// Implement this yourself
app.post("/reminder/delete/:id",ensureAuthenticated, reminderController.delete);

// We will fix this soon.
app.get("/register", authController.register);
app.get("/login", authController.login);
app.post("/register", authController.registerSubmit);
app.post("/auth/login", authController.loginSubmit);

app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser 🚀"
  );
});
