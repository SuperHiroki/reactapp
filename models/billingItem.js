const Sequelize = require('sequelize');
const sequelize = require('../database'); // Sequelizeインスタンスのインポート

const BillingItem = sequelize.define('billingItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  amount: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  billingType: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dueDate: {
    type: Sequelize.DATE,
    allowNull: true
  }
});

module.exports = BillingItem;