import React, { useEffect, useState } from 'react'
import { getFavoritesApi, getInfoBd } from '../../api/favorites'
import { useDispatch, useSelector } from 'react-redux'
import { changeObs, changeFavorites, changeList } from '../../store/actions/favorites'
import { editFavorite, removeFavorite } from '../../api/favorites'


import Cards from '../../components/Cards'
import Filter from '../../components/Filter'

export default props => {
    const [yearFilter, setYearFilter] = useState('2020')
    const [languageFilter, setLanguageFilter] = useState('pt-BR')

    const dispatch = useDispatch()
    const moviesList = useSelector(state => state.favorites.list)
    const listIds = useSelector(state => state.favorites.infoBd.favoriteMovies)
    const observationsCard = useSelector(state => state.favorites.infoBd.observationsMovies)

    const [obs, setObs] = useState([{ listObsCard: [] }])
    const [inputs, setInputs] = useState([])

    useEffect(() => {
        dispatch(getInfoBd())
    }, [])
    useEffect(() => {
        const params = {
            mode: 'movie',
            language: languageFilter
        }
        dispatch(getFavoritesApi(listIds, moviesList,params))
    }, [listIds.length > 0])


    function changeInput(event, index) {
        let values = [...inputs]
        values[index] = event.target.value
        setInputs(values)
    }

    function handleAdd(id, index) {
        let newObs = [...observationsCard]
        newObs.push({ observation: inputs[index], favorite_id: id })
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

    function handleSubmit(event, id) {
        event.preventDefault()
        const id_favorite = id
        const request = { id_favorite }
        let newList = [...listIds]
        for (let obj of newList) {
            if (obj.id === id) {
                newList.splice(newList.indexOf(obj))
            }
        }

        dispatch(removeFavorite(request, newList, moviesList))

    }
    function handleEdit(id, index) {
        let values = [...inputs]
        values[index] = ''
        setInputs(values)
        let newObservations = []
        observationsCard.map((e, i) => {
            if (e.favorite_id === id) {
                newObservations = [...newObservations, { observation: e.observation }]
            }
        })
        const request = { id_favorite: id, observations: newObservations }

        dispatch(editFavorite(request))
    }

    function changeFilterYear(event) {

        setYearFilter(event.target.value)

    }
    function changeFilterLanguage(event) {
        setLanguageFilter(event.target.value)
    }

    function submitFilter(event) {
        event.preventDefault()
        console.log(languageFilter, yearFilter)
        const params = {
            mode: 'movie',
            language: languageFilter,
            year: `${yearFilter}`
        }
        dispatch(getFavoritesApi(listIds, [],params))
    }

    return (
        <div className='content'>
            <Filter changeFilterLanguage={changeFilterLanguage}
                changeFilterYear={changeFilterYear}
                yearFilter={yearFilter}
                languageFilter={languageFilter}
                submitFilter={submitFilter} 
                view='favorite'
                title='Favoritos'/>
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