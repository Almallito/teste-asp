import {types} from '../types'
const INITIAL_STATE = {infoBd: {favoriteMovies: [], observationsMovies: []},list:[] }

export default function (state = INITIAL_STATE, action){
    switch (action.type){
        case types.GET_FAVORITES:
            return {
                ...state,
                infoBd: action.payload
            }
        case types.SEARCH_FAVORITES:
            return {
                ...state,
                list: action.payload
            }
        case types.CLEAR_FAVORITES:
            return {
                ...state,
                list: action.payload
            }
        case types.CHANGE_OBS:
            return {
                ...state,
                infoBd: {
                    ...state.infoBd,
                    observationsMovies: action.payload
                }
            }
        default:
            return state
    }
}