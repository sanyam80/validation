const express = require("express");
const usercontroller = require("./controller/user.controller.js");
const app = express();
app.use(express.json());
app.use("/users", usercontroller);
module.exports = app;
