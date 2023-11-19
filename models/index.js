const Sequelize = require('sequelize');
const sequelize = require('../database'); // Sequelizeインスタンスのインポート

// モデルのインポート
const User = require('./user');
const ToDoItem = require('./toDoItem');
const BillingItem = require('./billingItem');
const MemoItem = require('./memoItem');
const UserDashboardSetting = require('./userDashboardSetting');
const Widget = require('./widget');

// モデル間の関連付け
User.hasMany(ToDoItem, { foreignKey: 'userId' });
ToDoItem.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(BillingItem, { foreignKey: 'userId' });
BillingItem.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(MemoItem, { foreignKey: 'userId' });
MemoItem.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(UserDashboardSetting, { foreignKey: 'userId' });
UserDashboardSetting.belongsTo(User, { foreignKey: 'userId' });

Widget.hasMany(UserDashboardSetting, { foreignKey: 'widgetId' });
UserDashboardSetting.belongsTo(Widget, { foreignKey: 'widgetId' });

// モデルをエクスポート
module.exports = {
  sequelize,
  User,
  ToDoItem,
  BillingItem,
  MemoItem,
  UserDashboardSetting,
  Widget
};

