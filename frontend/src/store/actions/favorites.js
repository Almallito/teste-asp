import {types} from '../types'

export function changeBd(value){
    return {
        type: types.GET_FAVORITES,
        payload: value
    }
}
export function changeList(value){
    return {
        type: types.SEARCH_FAVORITES,
        payload: value
    }
}
export function changeObs(value){
    return {
        type: types.CHANGE_OBS,
        payload: value
    }
}
export function clearFavorite(){
    return {
        type: types.CLEAR_FAVORITES,
        payload: []
    }
}