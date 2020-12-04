# Teste ASP

Sistema que consome a API TMDB(The Movie Database API), podendo aplicar filtros, observações e favoritar, algumas tecnologias empregadas:

    ReactJS
    Redux
    React Router
    NodeJS
    Knex
    Express
    PostgreSQL
        
      

## Páginas e objetivos

    Página principal - Procurar por filmes

    Página /favorite - Listagem dos favoritos, podendo editar observações e remover da lista



## Para rodar projeto;
- entre em ./server/knexfile.js e configure seu banco de dados
- entre em ./frontend/api/urlsBases.js e configure o endereço do seu banco de dados na const BD

```
$ cd ./server
$ npm i
$ npm run migrate
$ npm run dev

$ cd ./frontend
$ npm i
$ npm start
```
## Prints
1. Home
![asp1](https://user-images.githubusercontent.com/61473497/101104865-dfc6eb00-35aa-11eb-86c7-4264995438dc.png)

2. Favorites
![asp2](https://user-images.githubusercontent.com/61473497/101104866-e0f81800-35aa-11eb-9603-7c262089ba60.png)


