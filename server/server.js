//Env imports
require("dotenv").config();

//Jwt import
const jwt = require("jsonwebtoken");

const app = require("./app");

//MongoDB connection
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose Connection ERROR: " + err.message);
});

mongoose.connection.once("open", () => {
  console.log("MongoDB Connected!");
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Server started on port 3001");
});
