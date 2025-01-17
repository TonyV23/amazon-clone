const { DataTypes } = require('sequelize');
const sequelize = require('../configuration/sequelize');
const User = require('./user');

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
  paranoid: true,   // Adds a deletedAt field for soft deletes
  tableName:"user",
});

Rating.belongsTo(User, {foreignKey:"userId", as :"rating_user"});

module.exports = Rating;
