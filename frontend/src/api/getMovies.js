import axios from 'axios'
import {changeMovies} from '../store/actions/movies'

const API_KEY= '?api_key=537f48af0947b2cdf1dd8d6406075076'
const BASE_URL_API = 'https://api.themoviedb.org/3/movie'
const BASE_URL_BD = 'http://localhost:8080'


const getPopularMovies = oldMovies => dispatch => {

    axios.get(`${BASE_URL_API}/popular${API_KEY}&page=1`)
        .then(resp => 
            dispatch(changeMovies([...oldMovies, ...resp.data.results]))
            // console.log(resp.data.results)
        )
        .catch(err => console.log(err))
}
const getMovie = (idFilme, oldMovies) => dispatch => {

    axios.get(`${BASE_URL_API}/${idFilme}${API_KEY}`)
        .then(resp => dispatch(changeMovies([...oldMovies, resp.data])))
        .catch(err => console.log(err))
}

const addFavorite = values => dispatch => {

    axios.post(`${BASE_URL_BD}/api/movies`,values)
        .then(resp => console.log(resp.data))
        .catch(err => console.log(err))
}

// const postFavorite =  values => async dispatch =>{
//     const resp = await addFavorite(values)
//     console.log(resp)
// }

export{getPopularMovies,getMovie, addFavorite}