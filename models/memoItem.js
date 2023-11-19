const Sequelize = require('sequelize');
const sequelize = require('../database'); // Sequelizeインスタンスのインポート

const MemoItem = sequelize.define('memoItem', {
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
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

module.exports = MemoItem;

