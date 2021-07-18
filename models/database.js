const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:keiz123@192.168.0.102:5432/casbin');

module.exports = sequelize;




