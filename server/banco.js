const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    'agendamentos_bd',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
)

sequelize.authenticate().then(function(){
    console.log('Servidor Ativo!')
}).catch(function(e){
    console.log('Falha ao conectar: ' + e)
})

module.exports = sequelize;