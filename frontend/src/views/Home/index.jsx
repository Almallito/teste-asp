import React, { useEffect, useState } from 'react'
import { getMoviesApi, addFavorite } from '../../api/movies'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import './Home.css'

import Cards from '../../components/Cards'

export default props => {


    const dispatch = useDispatch()
    const moviesList = useSelector(state => state.movies.list)

    const [obs, setObs] = useState([{ listObsCard: [] }])
    const [yearFilter, setYearFilter] = useState('2020')
    const [languageFilter, setLanguageFilter] = useState('pt-BR')
    const [inputs, setInputs] = useState([])

    useEffect(() => {
        const params = {
            mode: 'discover',
            language: 'pt-BR'
        }
        if (moviesList.length < 1) dispatch(getMoviesApi(params))
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

    function changeFilterYear(event){
        
         setYearFilter(event.target.value)
       
    }
    function changeFilterLanguage(event){
        setLanguageFilter(event.target.value)
    }

    function submitFilter(event){
        event.preventDefault()
        console.log(languageFilter, yearFilter)
        const params = {
            mode: 'discover',
            language: languageFilter,
            year: `${yearFilter}`
        }
        dispatch(getMoviesApi(params))
    }

    return (
        <>
            <div className='content'>
                <div className="filterPanel">
                    <form className='formFilter row' onSubmit={e => submitFilter(e)}>
                        <div className='column filter'>
                            <label htmlFor="lang">Filtrar o Idioma:</label>
                            <select name="languages" id='lang' value={languageFilter} onChange={e => changeFilterLanguage(e)}>
                                <option value="pt-BR">Português</option>
                                <option value="en-US">Inglês</option>
                            </select>
                        </div>
                        <div className='column filter'>
                            <label htmlFor="year">Filtrar o Ano de Lançamento: </label>
                            <input type="number" name='year' value={yearFilter} onChange={e => changeFilterYear(e)}/>
                        </div>
                        <button type='submit'>
                                <FontAwesomeIcon icon={faFilter} size='1x' />  Filtrar
                        </button>
                    </form>

                </div>
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
        </>
    )
}