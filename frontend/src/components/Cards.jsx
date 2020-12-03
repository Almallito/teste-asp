import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faPlus, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import If from '../components/If'
import { useSelector } from 'react-redux'

import './Cards.css'

export default props => {
    const BASE_URL_IMG = 'http://image.tmdb.org/t/p/w185/'
    const { handleSubmit, handleRemove, handleAdd, moviesList, obs, inputs, changeInput, view, handleEdit } = props

    const listIds = useSelector(state => state.favorites.infoBd.favoriteMovies)
    const observations = useSelector(state => state.favorites.infoBd.observationsMovies)

    let idFavorite = []

    let notNullObs = true

    for (let obj of listIds) {
        if(!idFavorite.includes(obj.id)){
            idFavorite.push(obj.id)
        }
    }

    let listIdsMoviesFavorites = []
    listIds.map(e=>{
        listIdsMoviesFavorites = [...listIdsMoviesFavorites, e.movie_id]
    })

    return (
        <div className='cards'>
            {moviesList.map((e, i) => (
                <div className={`card ${i}`} key={i}>
                    <div className="title">
                        <span >{e.title}</span>
                    </div>
                    <div className="poster">
                        <img src={`${BASE_URL_IMG}${moviesList[0] ? e.poster_path : false}`} alt={`${e.title} poster`} />
                    </div>
                    <div className="text">
                        <p className="description">{e.overview ? e.overview : <label className='nullcontent' >Nenhuma descrição...</label>}</p>
                    </div>
                    <div className='coment'>
                        <div className="label">
                            <label>Observações:</label>
                        </div>
                        {view === 'home' ? (
                            <div className="obs">
                                {obs[i] && obs[i].listObsCard.length > 0 ? obs[i].listObsCard.map((msg, index) => (
                                    <span key={`span${index}`}>
                                        <button className='icon' href onClick={() => handleRemove(i, index)}
                                             disabled={listIdsMoviesFavorites.includes(e.id) ? true : false}>
                                            <FontAwesomeIcon icon={faTrashAlt} size='1x' />
                                        </button>
                                        {msg}
                                    </span>
                                )) : (<label className='nullcontent'>Nenhuma observação...</label>)}
                            </div>
                        ) : (
                                <div className="obs">
                                    {observations.map((msg, index) => {
                                        
                                        for (let obj of listIds) {
                                            if (obj.movie_id === e.id && obj.id === msg.favorite_id) {
                                                notNullObs = false
                                                return (
                                                    <span key={`span${index}`}>
                                                        <button className='icon' href onClick={() => handleRemove(index)}>
                                                            <FontAwesomeIcon icon={faTrashAlt} size='1x' />
                                                        </button>
                                                        {msg.observation}
                                                    </span>
                                                )
                                            }
                                        }
                                    })}
                                    {notNullObs === true ? (<label>Nenhuma observação...</label>) : false}
                                </div>
                            )}
                    </div>
                    <form className='input' onSubmit={view === 'home' ? event => handleSubmit(event, i, e) : event => handleSubmit(event, idFavorite[i])}>
                        <input type='obs' name={`obs${i}`} value={inputs[i]} onChange={e => changeInput(e, i)} />
                        <div className="buttons">
                            <button type='button' 
                                onClick={e => view === 'home' ? handleAdd(i) : handleAdd(idFavorite[i], i)}
                                disabled={listIdsMoviesFavorites.includes(e.id) && view === 'home' ? true : false}>
                                <FontAwesomeIcon className='icon' icon={faPlus} size='1x' /> Adicionar Obs.
                            </button>
                            <If teste={view === 'favorite'}>
                                <button type='button' className='iconEdit' onClick={e => handleEdit(idFavorite[i], i)}>
                                    <FontAwesomeIcon className='icon' icon={faEdit} size='1x' /> Salvar
                                </button>
                            </If>
                            <button className='favorite' type='submit' disabled={listIdsMoviesFavorites.includes(e.id) && view === 'home' ? true : false}>
                                <FontAwesomeIcon className={listIdsMoviesFavorites.includes(e.id)? 'icon favorite' : 'icon'} icon={faHeart} size='1x'/> 
                                {view === 'favorite' ? (<span>Remover</span>) : (<span>{listIdsMoviesFavorites.includes(e.id) ? 'Favorito' : 'Favoritar'}</span>)}
                            </button>
                        </div>
                    </form>
                </div>

            ))}
        </div>
    )
}