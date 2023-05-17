const express = require("express");
const expressLayout = require("express-ejs-layouts");
const fileUpload = require("express-fileupload");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
const port = process.env.PORT || 3000; // Set port

/* `require("dotenv").config();` loads environment variables from a .env file into the process.env
object. This allows sensitive information, such as API keys or database credentials, to be stored
separately from the code and kept private. */
require("dotenv").config();


app.use(express.urlencoded({ extended: true })); // Parse application/x-www-form-urlencoded
app.use(express.static("public")); // Serve static files
app.use(expressLayout); // Use express-ejs-layouts

/* These lines of code are setting up and configuring the use of cookies and sessions in the Express
application. */
app.use(cookieParser('CookingBlogSecure'));
app.use(session({
  secre: 'CookingBlogSecretSession',
  saveUninitialized: true,
  resave: true
}));

/* `app.use(flash())` sets up the use of flash messages in the Express application. Flash messages are
temporary messages that are stored in the session and can be displayed to the user after a certain
action has been performed, such as a successful login or an error during form submission. */
app.use(flash());
app.use(fileUpload());

app.set("layout", "./layouts/main"); // Set layout
app.set("view engine", "ejs"); // Set view engine

const routes = require("./server/routes/recipeRoutes.js"); // Import routes
app.use("/", routes);

app.get('*', (req, res) => {
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

