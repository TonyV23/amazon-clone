// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configuration/sequelize');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      isValidEmail(value) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
        if (!value.match(re)) {
          throw new Error('Please enter a valid email address');
        }
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  type: {
    type: DataTypes.STRING,
    defaultValue: "user",
  },
  // Uncomment if implementing cart functionality
  // cart: {
  //   type: DataTypes.JSON,
  //   defaultValue: [],
  // },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
  paranoid: true,   // Adds a deletedAt field for soft deletes
});

module.exports = User;