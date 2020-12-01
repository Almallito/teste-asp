import {types} from '../types'

export function changeMovies(value){
    return {
        type: types.GET_MOVIES,
        payload: value
    }
}