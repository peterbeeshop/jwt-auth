const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const app = express();
const { password } = require("./config");

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set("view engine", "ejs");

// database connection
const mongodbURL = `mongodb+srv://peterbeeshop:${password}@cluster0.ogeik.mongodb.net/jwt-auth?retryWrites=true&w=majority`;
mongoose
  .connect(mongodbURL)
  .then(() => console.log("connected to the db"))
  .catch((err) => console.log(err.message));

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
app.use(authRoutes);

//server
app.listen(4000, () => {
  console.log("listening on port 4000");
});
