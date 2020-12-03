import axios from 'axios'
import {changeMovies} from '../store/actions/movies'
import {changeBd} from '../store/actions/favorites'

import {KEY,API,BD} from './urlsBases'
const API_KEY = KEY
const BASE_URL_API = API
const BASE_URL_BD = BD



const getPopularMovies = oldMovies => dispatch => {

    axios.get(`${BASE_URL_API}/popular${API_KEY}&page=1`)
        .then(resp => 
            dispatch(changeMovies([...oldMovies, ...resp.data.results]))
            // console.log(resp.data.results)
        )
        .catch(err => console.log(err))
}


const addFavorite = values => dispatch => {

    axios.post(`${BASE_URL_BD}/api/movies`,values)
        .then(resp => dispatch(changeBd(resp.data)))
        .catch(err => console.log(err))
}

// const postFavorite =  values => async dispatch =>{
//     const resp = await addFavorite(values)
//     console.log(resp)
// }

export{getPopularMovies, addFavorite}