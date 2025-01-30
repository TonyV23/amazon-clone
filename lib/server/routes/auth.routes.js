const express = require("express");
const authController = require("./../controllers/auth.controller");
const authRouter = express.Router();

// login route
authRouter.post("/login", authController.login);

// signup route
authRouter.post("/signup", authController.signup);

module.exports = authRouter;
