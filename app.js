//IMPORTANDO BIBLIOTECAS
const express = require("express");
const bodyParser = require('body-parser');
const session = require('express-session');
const {allowInsecurePrototypeAccess,} = require("@handlebars/allow-prototype-access");
const Handlebars = require("handlebars");
var Task = require("./models/Task")
var User = require(__dirname + '/models/User.js');
const handlebars = require("express-handlebars").engine;
const notifier = require('node-notifier');

//Iniciando Bibliotecas
const app = express();

//Iniciando Sessions
app.use(session({
    secret: 'key',
    resave: true,
    saveUninitialized: true
}));

//Iniciando Middleware que recolhe os dados do formulário via POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Definindo rota dos arquivos complementares
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/public', express.static('public'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/fullcalendar', express.static(__dirname + '/node_modules/fullcalendar-scheduler'));
app.use('/@fullcalendar', express.static(__dirname + '/node_modules/@fullcalendar'));

//Definindo layout das páginas
app.engine(
  "handlebars",
  handlebars({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "handlebars");



//ROTAS
//VIEW LOGIN
app.get("/", (req, res) => {
    if (req.session.user) {
        return res.redirect("/todo");
    }

    return res.render("user/login", {title: "Login"});
});

//LOGAR
app.post('/login', async(req, res) => {
    if (req.session.user) {
        return res.redirect("/todo");
    }

    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || !await user.validPassword(password)) {
        req.session.error = 'Credenciais Incorretas!';

        return res.redirect("/");
    }

    req.session.user = user.id;

    req.session.success = 'Você entrou na sua conta!';

    return res.redirect("/todo");
});

//DESLOGAR
app.get("/logout", (req, res) => {
    delete req.session.user;

    req.session.success = 'Você foi Deslogado!';
    return res.redirect("/");
});



//VIEW CADASTRO DE USUÁRIO
app.get("/register", (req, res) => {
    if (req.session.user) {
        return res.redirect("/todo");
    }

    return res.render("user/register", {title: "Cadastro"});
});

//CADASTRAR USUÁRIO
app.post('/register', async(req, res) => {
    if (req.session.user) {
        return res.redirect("/todo");
    }

    const { username, password } = req.body;

    var existingUser = await User.findOne({where: {'username': username}})

    if (!!existingUser) {
        req.session.error = 'Já existe um Usuário com essa credencial!';

        return res.redirect("/register");
    }

    try {
        var user = await User.create({ username, password });
        req.session.user = user.id;
        req.session.success = 'Usuario Criado e Logado!';

        return res.redirect("/todo");
    } catch (error) {
        req.session.error = 'Ocorreu um erro ao criar Usuário!';
        return res.redirect("/register");
    }
});



//LISTAGEM
app.get("/todo", async(req, res) => {
    if (!req.session.user) {
        return res.render("errors/erro", {error: "403", textError: 'Você não tem permissão para acessar essa página!'});
    }

    try{
        var tasksConcluidos = await Task.findAll({where: {status: "Concluida", userId: req.session.user}, order: [['due', 'ASC']]});
        var tasksPendentes = await Task.findAll({where: {status: "Pendente", userId: req.session.user}, order: [['due', 'ASC']]});
        var alltasks = await Task.findAll({where: {userId: req.session.user}, order: [['due', 'ASC']]});
        const alltasksJson = JSON.stringify(alltasks);
        return res.render("todo", {tasksConcluidos, tasksPendentes, alltasksJson, title: "Todo List"})
    }catch(e){
        req.session.error = 'Ocorreu um erro!';
        return res.redirect("/todo");
    }
});

//COMPLETAR
app.get("/completar/:id", async(req, res) => {
    await Task.update({
        status: "Concluida",
        conclusion: new Date()
    },{
        where: {
            'id': req.params.id,
            'userId': req.session.user
        }
    }).then(function(){
        req.session.success = 'Tarefa Concluída!';
        res.redirect("/todo")
    }).catch(function(erro){
        req.session.error = 'Ocorreu um erro!';
        return res.redirect("/todo");
    })
})

//DESFAZER
app.get("/desfazer/:id", async(req, res) => {
    await Task.update({
        status: "Pendente",
        conclusion: null
    },{
        where: {
            'id': req.params.id,
            'userId': req.session.user
        }
    }).then(function(){
        req.session.success = 'Tarefa Desfeita!';
        res.redirect("/todo")
    }).catch(function(erro){
        req.session.error = 'Ocorreu um erro!';
        return res.redirect("/todo");
    })
})

//VIEW EDITAR TAREFA
app.get("/edit/:id", async(req, res) => {
    if (!req.session.user) {
        return res.render("errors/erro", {error: "403", textError: 'Você não tem permissão para acessar essa página!'});
    }

    await Task.findAll({where: {'id': req.params.id, 'userId': req.session.user}}).then(function(task){
        return res.render("edit", {task, title: "Editar Tarefa"})
    }).catch(function(erro){
        req.session.error = 'Ocorreu um erro!';
        return res.redirect("/todo");
    })
});



//CRIAR TAREFA
app.get("/create", (req, res) => {
    if (!req.session.user) {
        return res.render("errors/erro", {error: "403", textError: 'Você não tem permissão para acessar essa página!'});
    }

    return res.render("create", {title: "Criar Tarefa"});
});

//CREATE TAREFA
app.post("/cadastrar", async(req, res) => {
    await Task.create({
        title: req.body.nomeTarefa,
        due: req.body.dataConclusao,
        description: req.body.descricao,
        class: req.body.nomeMateria,
        status: "Pendente",
        userId: req.session.user
    }).then(function(task){
        req.session.success = 'Tarefa Criada!';
        res.redirect("/todo")
    }).catch(function(erro){
        req.session.error = 'Ocorreu um erro!';
        return res.redirect("/todo");
    })
})

app.post("/atualizar", async(req, res) => {
    await Task.update({
        title: req.body.nomeTarefa,
        due: req.body.dataConclusao,
        description: req.body.descricao,
        class: req.body.nomeMateria
    },{
        where: {
            id: req.body.id,
            userId: req.session.user
        }
    }).then(function(){
        req.session.success = 'Tarefa Atualizada!';
        res.redirect("/todo")
    }).catch(function(erro){
        req.session.error = 'Ocorreu um erro!';
        return res.redirect("/todo");
    })
})

//VIEW VISUALIZAR TAREFA
app.get("/view/:id", async(req, res) => {
    if (!req.session.user) {
        return res.render("errors/erro", {error: "403", textError: 'Você não tem permissão para acessar essa página!'});
    }

    await Task.findAll({where: {'id': req.params.id, 'userId': req.session.user}}).then(function(task){
        return res.render("view", {task, title: "Visualizar Tarefa"})
    }).catch(function(erro){
        req.session.error = 'Ocorreu um erro!';
        return res.redirect("/todo");
    })
});



app.get('/getError', (req, res) => {
    const error = req.session.error;
    delete req.session.error; // Limpar a sessão após usar

    if (error) {
        res.json({ error });
    } else {
        res.json({});
    }
});

app.get('/getSuccess', (req, res) => {
    const success = req.session.success;
    delete req.session.success; // Limpar a sessão após usar

    if (success) {
        res.json({ success });
    } else {
        res.json({});
    }
});



app.use((req, res) => {
    return res.render("errors/erro", {error: "404", textError: 'Página Inexistente!'});
})



//Iniciando Servidor: localhost:8081
app.listen(8081, () => {
    console.log("Servidor Ativo na Porta 8081!");
});