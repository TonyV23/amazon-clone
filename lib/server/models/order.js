// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configuration/sequelize');
const User = require('./user');

const Order = sequelize.define('Order', {
  products: {
    type: DataTypes.JSON,
    allowNull: false,
    validate: {
      isArray(value) {
        if (!Array.isArray(value)) {
          throw new Error('Products must be an array of product objects');
        }
      },
    },
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  orderedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
  paranoid: true,   // Adds a deletedAt field for soft deletes
  tableName:"order",
});

Order.belongsTo(User, { foreignKey: 'userId', as: 'user_order' });

module.exports = Order;