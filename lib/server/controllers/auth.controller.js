const express = require("express");
const bcrypt = require("bcrypt");

const User = require("./../models/user");
const Validation = require("./../class/Validation");

const login = async (req, res) => {
  try {
    const { email, passoword } = req.body;

    const validation = new Validation(
      req.body,
      { email: { required: true, email: true } },
      { passoword: { required: true } }
    );

    await validation.run();

    const isValid = await validation.isValidate();
    const errors = await validation.getErrors();

    if (!isValid) {
      return res.status(422).json({
        statusCode: 422,
        httpStatus: "UNPROCESSABLE_ENTITY",
        message: "Data validation issues",
        result: errors,
      });
    }

    const userObject = await User.findOne({
      where: { email: email, passoword: passoword },
      attributes: ["email"],
    });

    if (userObject) {
      const user = userObject.toJSON();
      const validPassword = await bcrypt.compare(passoword, user.passoword);

      if (validPassword) {
        res.status(200).json({
          statusCode: 200,
          httpStatus: "OK",
          message: "The user is connected",
        });
      } else {
        validation.setError("main", "Credentials are incorrect");
        const errors = await validation.getErrors();
        res.status(404).json({
          statusCode: 404,
          httpStatus: "NOT_FOUND",
          message: "Credentials are incorrect",
          result: errors,
        });
      }
    } else {
      validation.setError("main", "Identifiants incorrects");
      const errors = await validation.getErrors();
      res.status(404).json({
        statusCode: 404,
        httpStatus: "NOT_FOUND",
        message: "The user does not exist",
        result: errors,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

const signup = (req, res) => {
  try {
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

module.exports = { login, signup };
