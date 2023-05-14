const express = require("express");
const expressLayout = require("express-ejs-layouts");
const fileUpload = require("express-fileupload");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
const port = process.env.PORT || 3000; // Set port

require("dotenv").config(); // Load environment variables

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files
app.use(expressLayout); // Use express-ejs-layouts

app.use(cookieParser('CookingBlogSecure')); // Use secure cookies
app.use(session({
  secre: 'CookingBlogSecretSession',
  saveUninitialized: true,
  resave: true
})); // Use session cookies

app.use(flash()); // Use flash messages
app.use(fileUpload());

app.set("layout", "./layouts/main");
app.set("view engine", "ejs");



const routes = require("./server/routes/recipeRoutes.js");
app.use("/", routes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
