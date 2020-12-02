const express = require('express')
const app = express()
const db = require('./knex')
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.get('/api/movies', async (req, res) => {
    let response = {favoriteMovies: [], observationsMovies: []}

    response.favoriteMovies = await db.select().table('favorites')
    response.observationsMovies =  await db.select().table('observations')

    res.json(response);

})

app.post('/api/movies', async (req, res) => {
    let response = {favoriteMovies: [], observationsMovies: []}

    const {idMovie,observations} = req.body;
    let idFavorite = 0

    await db.insert({movie_id: idMovie}).into('favorites').returning('id').then(resp => idFavorite = resp[0])
    
    const newObservations = observations.map((e,i)=> (observations[i] = {...e, favorite_id: idFavorite}))
    await db.insert(newObservations).into('observations')

    response.favoriteMovies = await db.select().table('favorites')
    response.observationsMovies =  await db.select().table('observations')

    res.json(response);


})

const porta = 8080;
app.listen(porta, () => {
    console.log(`Server is running port: ${porta}`);
})

module.exports = app;