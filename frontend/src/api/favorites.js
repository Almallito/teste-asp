import axios from 'axios'
import { changeBd, changeList } from '../store/actions/favorites'
import { toast } from 'react-toastify'

import { KEY, API, BD } from './urlsBases'
const API_KEY = KEY
const BASE_URL_API = API
const BASE_URL_BD = BD


const getInfoBd = () => dispatch => {

    axios.get(`${BASE_URL_BD}/api/movies`)
        .then(resp => dispatch(changeBd(resp.data)))
        .catch(err => {
            toast.error(`${err}`, {
                toastId: 'error-auth'
            })
        })
}

const getFavoritesApi = (listIds, oldMovies, params) => async dispatch => {
    let list = [...oldMovies]
    let oldListIds = []
    for(let film of oldMovies){
        if(film.id) oldListIds.push(film.id)
    }
    listIds.length > 0 ? listIds.map(e => {
        axios.get(`${BASE_URL_API}/${params.mode}/${e.movie_id}${API_KEY}&language=${params.language}${params.year ? `&year=${params.year}` : ''}`)
            .then(resp => {
                if(oldListIds.length == 0){ // verificando se é a primeira vez que a view de favoritos esta sendo carregada
                    return list = [...list, resp.data]
                } else { 
                    if(!oldListIds.includes( resp.data.id)){ // verificando se o filme ja está na lista para ser renderizado
                        return list = [...list, resp.data]
                    }
                    return list
                }
            })
            .then(resp => dispatch(changeList(resp)))
            .catch(err => {
                toast.error(`${err}`, {
                    toastId: 'error-auth'
                })
            })
        }) : dispatch(changeList([]))

}

const editFavorite = values => dispatch => {

    axios.put(`${BASE_URL_BD}/api/favorites`,values)
        .then(resp => toast.success('Observações Salvas com Sucesso!'))
        .catch(err => {
            toast.error(`${err}`, {
                toastId: 'error-auth'
            })
        })
}
const removeFavorite = (value) => dispatch => {
    const params = {
        mode: 'movie',
        language: 'pt-BR'
    }
    axios.post(`${BASE_URL_BD}/api/remove-favorite`,value)
        .then(resp => {
            dispatch(changeBd(resp.data))
            return resp.data.favoriteMovies
        })
        .then(resp=> dispatch(getFavoritesApi(resp,[],params)))
        .catch(err => {
            toast.error(`${err}`, {
                toastId: 'error-auth'
            })
        })
}



export { getFavoritesApi, getInfoBd, editFavorite, removeFavorite }