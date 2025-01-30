const express = require("express");
const bcrypt = require("bcrypt");

const User = require("./../models/user");
const Validation = require("./../class/Validation");
const { where } = require("sequelize");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validation = new Validation(
      req.body,
      { email: { required: true, email: true } },
      { password: { required: true } }
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
      where: { email: email },
      attributes: ["email", "password"],
    });

    if (userObject) {
      const user = userObject.toJSON();
      const validPassword = await bcrypt.compare(password, user.password);

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

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const validation = new Validation(
      req.body,
      { name: { required: true, alpha: true } },
      { email: { required: true, email: true } },
      { password: { required: true, length: [8, 16] } }
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

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with same email already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    let user = new User({
      email,
      password: hashedPassword,
      name,
    });
    user = await user.save();

    res.status(201).json({
      statusCode: 201,
      httpStatus: "CREATED",
      message: "User created successfully",
      result: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

module.exports = { login, signup };
