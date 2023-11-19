// 例: models/index.js
const Sequelize = require('sequelize');
const sequelize = require('../database'); // Sequelizeインスタンスのインポート

const User = require('./user')(sequelize, Sequelize);
const ToDoItem = require('./toDoItem')(sequelize, Sequelize);
const BillingItem = require('./billingItem')(sequelize, Sequelize);

// モデル間の関連付け
User.hasMany(ToDoItem, { foreignKey: 'userId' });
ToDoItem.belongsTo(User, { foreignKey: 'userId' });

// 他の関連付けも同様に定義

module.exports = {
  User,
  ToDoItem,
  BillingItem
};
