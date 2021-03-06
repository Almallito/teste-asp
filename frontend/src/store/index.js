import {combineReducers} from 'redux'
import { applyMiddleware, createStore } from 'redux'

import thunk from 'redux-thunk'
import multi from 'redux-multi'

import moviesReducers from './reducers/movies'
import favoritesReducers from './reducers/favorites'

const reducers = combineReducers({
    movies: moviesReducers,
    favorites: favoritesReducers
})

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ 
      && window.__REDUX_DEVTOOLS_EXTENSION__()

const configStore = applyMiddleware(multi, thunk)(createStore)(reducers, devTools)

export {configStore} 