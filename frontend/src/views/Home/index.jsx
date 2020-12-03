import React, { useEffect, useState } from 'react'
import { getPopularMovies, addFavorite } from '../../api/movies'
import { useDispatch, useSelector } from 'react-redux'
import './Home.css'

import Cards from '../../components/Cards'

export default props => {


    const dispatch = useDispatch()
    const moviesList = useSelector(state => state.movies.list)

    const [obs, setObs] = useState([{ listObsCard: [] }])
    const [inputs, setInputs] = useState([])

    useEffect(() => {
        
        if(moviesList.length<1) dispatch(getPopularMovies(moviesList))
    }, [])


    function changeInput(event, index) {
        let values = [...inputs]
        values[index] = event.target.value
        setInputs(values)
    }

    function handleAdd(index) {
        let newObs = [...obs]
        let newList = []

        if (obs[index]) { // verificando se já existe observações para o card
            newList = obs[index].listObsCard

        } else {
            newObs[index] = { listObsCard: [] } // adiciona o campo de observações para o  card especifico
            newList = newObs[index].listObsCard
        }

        newList.push(inputs[index])
        newObs[index] = { listObsCard: newList }
        let values = [...inputs]
        values[index] = ''
        setInputs(values)
        setObs(newObs)

    }

    function handleRemove(indexPai, indexFilho) { //funcao remove um observação do card
        let newObs = [...obs]
        let valor = newObs[indexPai].listObsCard[indexFilho]
        newObs[indexPai].listObsCard.splice(newObs[indexPai].listObsCard.indexOf(valor), 1)
        setObs(newObs)
    }

    function handleSubmit(event, index, element) {
        event.preventDefault()
        let values = [...inputs]
        values[index] = ''
        setInputs(values)
        const observations = obs[index] ? obs[index].listObsCard.map(e => ({
            observation: e
        })) : []
        const idMovie = element.id
        const sendFavorite = { observations, idMovie }
        console.log(sendFavorite)
        dispatch(addFavorite(sendFavorite))
    }

    return (
        <div className='content'>
            <Cards view='home' 
                handleSubmit={handleSubmit} 
                handleRemove={handleRemove} 
                handleAdd={handleAdd} 
                changeInput={changeInput} 
                moviesList={moviesList} 
                obs={obs}
                inputs={inputs}
                />
        </div>
    )
}