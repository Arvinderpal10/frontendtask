const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cross Origin
app.use(require("cors")());

// //Model imports
require("./src/models/User");
require("./src/models/Task");


//Routes
app.use("/user", require("./src/routes/user"));
app.use("/task", require("./src/routes/task"));

module.exports = app;
