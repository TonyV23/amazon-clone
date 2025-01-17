const { DataTypes } = require('sequelize');
const sequelize = require('../configuration/sequelize');

const Rating = sequelize.define('rating', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = Rating;
