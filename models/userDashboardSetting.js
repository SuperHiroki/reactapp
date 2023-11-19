const Sequelize = require('sequelize');
const sequelize = require('../database'); // Sequelizeインスタンスのインポート

const Sequelize = require('sequelize');
const sequelize = require('../database'); // Sequelizeインスタンスのインポート

const UserDashboardSetting = sequelize.define('userDashboardSetting', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  widgetId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  settings: {
    type: Sequelize.JSON,
    allowNull: true
  },
  position: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});
  
module.exports = UserDashboardSetting;