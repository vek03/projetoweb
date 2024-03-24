# ETAPAS
O projeto ainda está em desenvolvimento:

- [x] Estrutura
- [x] Front-End
- [x] Create
- [x] Read
- [x] Update
- [x] Delete


> Projeto CRUD de Agendamentos com Node.js e Handlebars

# INICIANDO PROJETO</h1>
### (SEMPRE CLONE DA BRANCH DE HOMOLOGAÇÃO)
- Crie uma base de dados MySQL chamada "agendamentos_bd"
```
git clone -b homologacao https://github.com/vek03/CRUD-nodejs-handlebar.git
cd <projeto>
npm i
npm run start
```
- htttp://localhost:8081

<br><br>

# EXPLICAÇÕES
- Models: arquivos da estrutura das tabelas
- Server: arquivo de conexão ao banco
- app.js: inicialização das bibliotecas, rotas e operações
- views/layout: arquivos de layout que serão utilizados em todas as páginas
- views: paginas do projeto 

<br><br>

# GITHUB
> SUBINDO SUAS ALTERAÇÕES PARA O GITHUB
## PRIMEIRA VEZ (quando ainda não existir a sua branch):
```
git branch <seu_nome>
git checkout <seu_nome>
git add *
git commit -m "<seu_comentario>"
git push -u origin <seu_nome>
```
- pull request pelo site do Github da sua branch para a branch de homologação

<br>

## OUTRAS VEZES
```
git add *
git commit -m "<seu_comentario>"
git push
```
- pull request pelo site do Github da sua branch para a branch de homologação

<br><br>

# PUXANDO AS ALTERAÇÕES DA BRANCH DE HOMOLOGAÇÃO
Caso o projeto já exista na sua máquina e outra pessoa tiver feito alterações antes de você, execute:
```
git pull https://github.com/vek03/CRUD-nodejs-handlebar.git homologacao
```

<br><br><br>

# DOCUMENTAÇÃO
```
npm i express --save
npm i express-handlebars --save
npm i sequelize --save
npm i mysql2 --save
npm i nodemon --save-dev
npm i body-parser --save
npm i @handlebars/allow-prototype-access --save
```

- Front-End: https://handlebarsjs.com/guide/
