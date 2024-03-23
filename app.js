const express = require("express")
const bodyParser = require('body-parser')
const {allowInsecurePrototypeAccess,} = require("@handlebars/allow-prototype-access");
const Handlebars = require("handlebars");
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
app.engine(
  "handlebars",
  handlebars({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "handlebars")


//ROTAS
//INDEX
app.get("/", function(req, res){
    res.render("inicial")
})

//Pagina inicial
app.get("/cadastrar", function(req, res){
    res.render("index")
})

app.post("/cadastrar", async (req, res) => {
    Agendamento.create(req.body)

    res.redirect('/consultar');
})


//CONSULTAR
app.get("/consultar", async function(req, res){
    try {
        const agendamentos = await Agendamento.findAll();
        console.log(
            agendamentos.every((agendamento) => agendamento instanceof Agendamento)
        );
        console.log("All users:", JSON.stringify(agendamentos, null, 2));
        res.render("consultar", { agendamentos: agendamentos });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})



//EDITAR
app.get("/editar/:id", async function(req, res){
    try {
        const agendamento = await Agendamento.findByPk(req.params.id)
        console.log(agendamento instanceof Agendamento);
        console.log("Got agendamento:", JSON.stringify(agendamento, null, 2));
        res.render("editar", { agendamento: agendamento });
    }catch(error){
        res.status(400).json({ error: error.message });
    }
})

//ATUALIZAR
app.post("/editar/:id", async function(req, res){
    try {
        const agendamento = await Agendamento.findByPk(req.params.id)

        agendamento.update(
          { 
            nome: req.body.nome,
            email: req.body.email,
            endereco: req.body.endereco,
            bairro: req.body.bairro,
            cep: req.body.cep,
            cidade: req.body.cidade,
            estado: req.body.estado
         },
          {
            where: {
              id: agendamento.id,
            },
          }
        );

        res.redirect("/consultar");
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