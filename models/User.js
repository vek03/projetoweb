const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../server/database.js');

const User = sequelize.define('users',{
    username:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});

User.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

User.sync();

module.exports = User;