const Sequelize = require('sequelize');
const sequelize = require('../server/banco.js');

const Agendamento = sequelize.define('agendamentos',{
    nome:{
        type: Sequelize.STRING
    },
    email:{
        type: Sequelize.STRING
    },
    endereco:{
        type: Sequelize.STRING
    },
    bairro:{
        type: Sequelize.STRING
    },
    cep:{
        type: Sequelize.STRING
    },
    cidade:{
        type: Sequelize.STRING
    },
    estado:{
        type: Sequelize.STRING
    }
})

Agendamento.sync()

module.exports = Agendamento