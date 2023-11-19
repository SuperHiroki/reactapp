const Sequelize = require('sequelize');
const sequelize = require('../database'); // Sequelizeインスタンスのインポート

const ToDoItem = sequelize.define('toDoItem', {
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
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isCompleted: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  dueDate: {
    type: Sequelize.DATE,
    allowNull: true
  }
});

module.exports = ToDoItem;