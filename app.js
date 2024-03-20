const express = require("express")
const bodyParser = require('body-parser')
var Agendamento = require(__dirname + '/models/Agendamento.js')
const handlebars = require("express-handlebars").engine

//Iniciando Bibliotecas
const app = express()

//Iniciando Middleware que recolhe os dados do formulário via POST
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//Definindo rota dos arquivos complementares
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/public', express.static('public'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));


//Definindo layout das páginas
app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars")


//ROTAS
//INDEX
app.get("/", function(req, res){
    res.render("index")
})

app.post("/cadastrar", async (req, res) => {
    Agendamento.create(req.body)

    res.redirect('/consultar');
})


//CONSULTAR
app.get("/consultar", async function(req, res){
    try {
        const agendamentos = await Agendamento.findAll()

        res.render("consultar")
    }catch(error){
        res.status(400).json({ error: error.message });
    }
})


//EDITAR
app.get("/editar/:id", async function(req, res){
    try {
        const agendamentos = await Agendamento.findByPk(req.params.id)

        res.render("consultar")
    }catch(error){
        res.status(400).json({ error: error.message });
    }
})

//ATUALIZAR
app.post("/editar/:id", async function(req, res){
    try {
        const agendamento = await Agendamento.findByPk(req.params.id)

        agendamento.update(req.body)

        res.render("consultar")
    }catch(error){
        res.status(400).json({ error: error.message });
    }
})


//DELETE
app.post("/deletar/:id", async (req, res) => {
    const agendamento = await Agendamento.findByPk(req.params.id);

    if(!agendamento){
        res.send('<h1>Agendamento Não Encontrado!</h1> <br><br> <a href="/">Home</a>')
    }else{
        res.send('<h1>Agendamento Excluído!</h1> <br><br> <a href="/">Home</a>')
    }

    agendamento.destroy();
})



app.listen(8081, function(){
    console.log("Servidor Ativo na Porta 8081!")
})