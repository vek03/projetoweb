<h1>INICIANDO PROJETO</h1>
<h3>(SEMPRE CLONE DA BRANCH DE HOMOLOGAÇÃO)</h3>
- git clone https://github.com/vek03/aula-handlebar-nodejs homologacao
- cd <projeto>
- npm i
- npm run start
- htttp://localhost:8081

<br>

<h1>EXPLICAÇÕES</h1>
- Models: arquivos da estrutura das tabelas
- Server: arquivo de conexão ao banco
- app.js: inicialização das bibliotecas, rotas e operações
- views/layout: arquivos de layout que serão utilizados em todas as páginas
- views: paginas do projeto 

<br>

<h1>GITHUB</h1>
<h2>SUBINDO SUAS ALTERAÇÕES PARA O GITHUB</h1>
PRIMEIRA VEZ (quando ainda não existir a sua branch):
- git branch <seu_nome>
- git checkout <seu_nome>
- git add *
- git commit -m "<seu_comentario>"
- git push -u origin <seu_nome>
- pull request pelo site do Github da sua branch para a branch de homologação

<h2>OUTRAS VEZES</h2>
- git add *
- git commit -m "<seu_comentario>"
- git push
- pull request pelo site do Github da sua branch para a branch de homologação

<br>

<h1>PUXANDO AS ALTERAÇÕES DA BRANCH DE HOMOLOGAÇÃO</h1>
Caso o projeto já exista na sua máquina e outra pessoa tiver feito alterações antes de você, execute:
- git pull https://github.com/vek03/aula-handlebar-nodejs homologacao

<br>

<h1>DOCUMENTAÇÃO:</h1>
- npm i express --save
- npm i express-handlebars --save
- npm i sequelize --save
- npm i mysql2 --save
- npm i nodemon --save-dev
- npm i body-parser --save

- Front-End: https://handlebarsjs.com/guide/
