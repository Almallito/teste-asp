import axios from 'axios'
import {changeMovies} from '../store/actions/movies'

const API_KEY= '?api_key=537f48af0947b2cdf1dd8d6406075076'
const BASE_URL = 'https://api.themoviedb.org/3/movie'


const getFilme = (idFilme, oldMovies) => dispatch => {

    axios.get(`${BASE_URL}/${idFilme}${API_KEY}`)
        .then(resp => dispatch(changeMovies([...oldMovies, resp.data])))
        .catch(err => console.log(err))
}

export{getFilme}