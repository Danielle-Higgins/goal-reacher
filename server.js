const express = require("express");
const app = express();
const connectDB = require("./config/database");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("express-flash");
const logger = require("morgan");
const mainRoutes = require("./routes/mainRoutes"); // importing our routes
const todoRoutes = require("./routes/todoRoutes");

require("dotenv").config({ path: "./config/.env" });
require("./config/passport")(passport); // authenticate user when trying to login
connectDB(); // call the function to connect to our DB

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // take requests coming from forms
app.use(express.json()); // express is parsing json
app.use(logger("dev")); // log requests to console in development mode

// stuff to keep us logged in
app.use(
  session({
    secret: "baddie coder", // used to sign and encrypt the session cookie
    resave: false, // prevents resaving session if unchanged
    saveUninitialized: false, // prevents saving empty sessions
    store: MongoStore.create({ mongoUrl: process.env.DB_STRING }), // using mongostore to store sessions (use same connection string)
  })
);

// Added passport stuff (activates Passport for your app)
app.use(passport.initialize());
app.use(passport.session()); // store and retrieve user data across requests
app.use(flash());

app.use("/", mainRoutes); // set up our routers to hear the requests (urls)
app.use("/todos", todoRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
