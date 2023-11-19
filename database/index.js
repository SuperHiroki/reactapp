const Sequelize = require('sequelize');

const sequelize = new Sequelize('reactappdb_1', 'root', '140286TakaHiro', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
