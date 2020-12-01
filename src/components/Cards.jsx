import React, { useEffect, useState } from 'react'
import { getFilme } from '../api/getMovies'
import { useDispatch, useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import './Cards.css'

export default props => {
    const dispatch = useDispatch()
    const moviesList = useSelector(state => state.movies.list)
    const BASE_URL_IMG = 'http://image.tmdb.org/t/p/w185/'

    const [obs, setObs] = useState([{listObsCard: []}])
    const [inputs, setInputs] = useState('')

    useEffect(() => {
        dispatch(getFilme('724989', moviesList))
    }, [])


    function changeInput(event, index){
        let values = [...inputs]
        values[index] = event.target.value
        setInputs(values)
    }

    function handleAdd(index){ 
        let newObs = [...obs]
        let newList = []

        if(obs[index]){ // verificando se já existe observações para o card
            newList = obs[index].listObsCard

        } else {
            newObs[index] = {listObsCard: []} // adiciona o campo de observações para o  card especifico
            newList = newObs[index].listObsCard
        }

        newList.push(inputs[index])
        newObs[index] = {listObsCard: newList}
        let values = [...inputs]
        values[index] = ''
        setInputs(values)
        setObs(newObs)
        
    }

    function handleRemove(indexPai,indexFilho){ //funcao remove um observação do card
        let newObs = [...obs]
        let valor = newObs[indexPai].listObsCard[indexFilho]
        newObs[indexPai].listObsCard.splice(newObs[indexPai].listObsCard.indexOf(valor), 1)
        setObs(newObs)
    }

    return (
        <div className='cards'>
            {moviesList.map((e, i) => (
                <div className={`card ${i}`} key={i}>
                    <img src={`${BASE_URL_IMG}${moviesList[0] ? e.poster_path : false}`} alt={`${e.title} poster`} />
                    <span className="title">{e.title}</span>
                    <p className="description">{e.overview}</p>
                    <div className="obs">
                        {obs[i] ? obs[i].listObsCard.map((msg,index)=>(
                            <span key={`span${index}`}>
                                <a  className='icon' href onClick={() => handleRemove(i, index)}>
                                    <FontAwesomeIcon  icon={faTrashAlt} size='1x' />
                                </a>
                                {msg}
                            </span>
                        )) : false}
                    </div>
                    <form className='liked'>
                        <input type='obs' name={`obs${i}`} value={inputs[i]} onChange={e => changeInput(e,i)}/>
                        <div className="buttons">
                            <button type='button' onClick={e => handleAdd(i)}>
                                <FontAwesomeIcon className='icon' icon={faPlus} size='1x' /> Adicionar Obs.
                            </button>
                            <button className='favorite' type='submit'>
                                <FontAwesomeIcon className='icon' icon={faHeart} size='1x' /> Favoritar
                        </button>
                        </div>
                    </form>
                </div>
            ))}
        </div>
    )
}