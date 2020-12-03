import React, { useEffect, useState } from 'react'
import { getFavoritesApi, getInfoBd } from '../../api/favorites'
import { useDispatch, useSelector } from 'react-redux'
import {changeObs} from '../../store/actions/favorites'
import {editFavorite, removeFavorite} from '../../api/favorites'

import './Favorite.css'

import Cards from '../../components/Cards'

export default props => {


    const dispatch = useDispatch()
    const moviesList = useSelector(state => state.favorites.list)
    const listIds = useSelector(state => state.favorites.infoBd.favoriteMovies)
    const observationsCard = useSelector(state => state.favorites.infoBd.observationsMovies)

    const [obs, setObs] = useState([{ listObsCard: [] }])
    const [inputs, setInputs] = useState([])

    // console.log(observationsCard)
    useEffect(() => {
        dispatch(getInfoBd())
    },[])
    useEffect(() => {
        dispatch(getFavoritesApi(listIds, moviesList))
    },[listIds.length > 0])



    function changeInput(event, index) {
        let values = [...inputs]
        values[index] = event.target.value
        setInputs(values)
    }

    function handleAdd(id, index) {
        let newObs = [...observationsCard]
        newObs.push({observation: inputs[index], favorite_id: id})
        let values = [...inputs]
        values[index] = ''
        setInputs(values)
        dispatch(changeObs(newObs))

    }

    function handleRemove(index) { //funcao remove um observação do card
        let newObs = [...observationsCard]
        let valor = newObs[index]
        newObs.splice(newObs.indexOf(valor), 1)
        dispatch(changeObs(newObs))
    }

    function handleSubmit(event,id) {
        event.preventDefault()
        const id_favorite = id
        const request = {id_favorite}
        console.log(request)
        dispatch(removeFavorite(request))
        
    }
    function handleEdit(id, index){
        let values = [...inputs]
        values[index] = ''
        setInputs(values)
        let newObservations = []
        observationsCard.map((e, i)=>{
            if(e.favorite_id === id){
                newObservations = [...newObservations,{observation: e.observation}]
            }
        })
        const request = {id_favorite: id, observations: newObservations}
        console.log(request)

        dispatch(editFavorite(request))
    }
    return (
        <div className='content'>
            <Cards view='favorite'
                handleSubmit={handleSubmit}
                handleRemove={handleRemove}
                handleAdd={handleAdd}
                changeInput={changeInput}
                moviesList={moviesList}
                obs={obs}
                inputs={inputs}
                observations={observationsCard}
                handleEdit={handleEdit}
                listIds={listIds}
            />
        </div>
    )
}