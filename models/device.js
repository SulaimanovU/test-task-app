const Sequelize = require('sequelize');
const sequelize = require('./database');

const device = sequelize.define('device', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    mас: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = device;















