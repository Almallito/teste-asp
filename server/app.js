const express = require('express')
const app = express()
const db = require('./knex')
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.get('/api/movies', async (req, res) => { // get de todos os favoritos
    let response = { favoriteMovies: [], observationsMovies: [] }

    response.favoriteMovies = await db.select().table('favorites')
    response.observationsMovies = await db.select().table('observations')

    res.json(response);

})

app.post('/api/movies', async (req, res) => { //insert filme nos favortios e as observações
    let response = { favoriteMovies: [], observationsMovies: [] }

    const { idMovie, observations } = req.body;
    let idFavorite = 0

    await db.insert({ movie_id: idMovie }).into('favorites').returning('id').then(resp => idFavorite = resp[0])

    const newObservations = observations.map((e, i) => (observations[i] = { ...e, favorite_id: idFavorite }))
    await db.insert(newObservations).into('observations')

    response.favoriteMovies = await db.select().table('favorites')
    response.observationsMovies = await db.select().table('observations')

    res.json(response);


})
app.post('/api/remove-favorite', async (req, res) => { //remove um filme dos favoritos
    let response = { favoriteMovies: [], observationsMovies: [] }

    const { id_favorite } = req.body;
    // console.log(req.body)
    try {
        await db('observations').where({ favorite_id: id_favorite }).del()
        await db('favorites').where({ id: id_favorite }).del()
    } catch(err){
        console.log(err)
    }
    
    response.favoriteMovies = await db.select().table('favorites')
    response.observationsMovies = await db.select().table('observations')

    res.json(response);


})
app.put('/api/favorites', async (req, res) => { // edita as observações de um filme
    let response = { favoriteMovies: [], observationsMovies: [] }

    const { id_favorite, observations } = req.body

    await db('observations').where({ favorite_id: id_favorite }).del()
    const newObservations = observations.map((e, i) => (observations[i] = { ...e, favorite_id: id_favorite }))
    await db.insert(newObservations).into('observations')
    console.log(newObservations)

    response.favoriteMovies = await db.select().table('favorites')
    response.observationsMovies = await db.select().table('observations')

    res.json(response);


})

const porta = 8080;
app.listen(porta, () => {
    console.log(`Server is running port: ${porta}`);
})

module.exports = app;