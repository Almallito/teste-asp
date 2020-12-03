Teste-ASP;
Sistema que consome a API TMDB(The Movie Database API), podendo aplicar filtros, observações e favoritar, algumas tecnologias empregadas:

        ReactJS
        Redux
        React Router
        NodeJS
        Knex
        Express
        PostgreSQL
        
      

Páginas e objetivos;

        Página principal - Procurar por filmes

        Página /favorite - Listagem dos favoritos, podendo editar observações e remover da lista



Para rodar projeto;
entre em ./server/knexfile.js e configure seu banco de dados
entre em ./frontend/api/urlsBases.js e configure o endereço do seu banco de dados na const BD

$ cd ./server
$ npm i
$ npm run migrate
$ npm run dev

$ cd ./frontend
$ npm i
$ npm start

