Iniciando projeto:
(SEMPRE CLONE DA BRANCH DE HOMOLOGAÇÃO)
- git clone https://github.com/vek03/aula-handlebar-nodejs homologacao
- cd <projeto>
- npm i
- npm run start
- htttp://localhost:8081

<br>

EXPLICAÇÕES:
- Models: arquivos da estrutura das tabelas
- Server: arquivo de conexão ao banco
- app.js: inicialização das bibliotecas, rotas e operações
- views/layout: arquivos de layout que serão utilizados em todas as páginas
- views: paginas do projeto 

<br>

GITHUB:
<h1>SUBINDO SUAS ALTERAÇÕES PARA O GITHUB</h1>
PRIMEIRA VEZ (quando ainda não existir a sua branch):
- git branch <seu_nome>
- git checkout <seu_nome>
- git add *
- git commit -m "<seu_comentario>"
- git push -u origin <seu_nome>
- pull request pelo site do Github da sua branch para a branch de homologação

OUTRAS VEZES:
- git add *
- git commit -m "<seu_comentario>"
- git push
- pull request pelo site do Github da sua branch para a branch de homologação

<br>

<h1>PUXANDO AS ALTERAÇÕES DA BRANCH DE HOMOLOGAÇÃO</h1>
Caso o projeto já exista na sua máquina e outra pessoa tiver feito alterações antes de você, execute:
- git pull https://github.com/vek03/aula-handlebar-nodejs homologacao

<br>

DOCUMENTAÇÃO:
- npm i express --save
- npm i express-handlebars --save
- npm i sequelize --save
- npm i mysql2 --save
- npm i nodemon --save-dev
- npm i body-parser --save

- Front-End: https://handlebarsjs.com/guide/
