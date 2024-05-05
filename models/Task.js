const Sequelize = require('sequelize');
const sequelize = require('../server/database.js');
const User = require('./User.js');

const Task = sequelize.define('tasks',{
    title:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    due:{
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    conclusion:{
        type: Sequelize.DATEONLY,
        allowNull: true,
    },
    description:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    class:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    status:{
        type: Sequelize.STRING,
        allowNull: false,
    },
});

Task.belongsTo(User);

Task.sync();

module.exports = Task;