import {types} from '../types'
const INITIAL_STATE = {list: []}

export default function (state = INITIAL_STATE, action){
    switch (action.type){
        case types.GET_MOVIES:
            return {
                ...state,
                list: action.payload
            }
        default:
            return state
    }
}