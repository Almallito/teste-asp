import axios from 'axios'
import {changeMovies} from '../store/actions/movies'
import {changeBd} from '../store/actions/favorites'

import {KEY,API,BD} from './urlsBases'
const API_KEY = KEY
const BASE_URL_API = API
const BASE_URL_BD = BD



const getMoviesApi = params => dispatch => {

    axios.get(`${BASE_URL_API}/${params.mode}/movie${API_KEY}&page=1&language=${params.language}${params.year ? `&year=${params.year}` : ''}`)
        .then(resp => 
            dispatch(changeMovies([...resp.data.results]))
            // console.log(resp.data.results)
        )
        .catch(err => console.log(err))
}


const addFavorite = values => dispatch => {

    axios.post(`${BASE_URL_BD}/api/movies`,values)
        .then(resp => dispatch(changeBd(resp.data)))
        .catch(err => console.log(err))
}



export{getMoviesApi, addFavorite}