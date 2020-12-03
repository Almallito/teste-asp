import React from 'react'
import './Filter.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import If from '../components/If'

export default props => {
    const { changeFilterLanguage, changeFilterYear, yearFilter, languageFilter, submitFilter, view, title} = props
    return (
        <div className="filterPanel">
            <form className='formFilter row' onSubmit={e => submitFilter(e)}>
                <div className='column filter'>
                    <label htmlFor="lang">Filtrar o Idioma:</label>
                    <select name="languages" id='lang' value={languageFilter} onChange={e => changeFilterLanguage(e)}>
                        <option value="pt-BR">Português</option>
                        <option value="en-US">Inglês</option>
                    </select>
                </div>
                <If teste={view === 'home'}>
                    <div className='column filter'>
                        <label htmlFor="year">Filtrar o Ano de Lançamento: </label>
                        <input type="number" name='year' value={yearFilter} onChange={e => changeFilterYear(e)} />
                    </div>
                </If>
                <button type='submit'>
                    <FontAwesomeIcon icon={faFilter} size='1x' />  Filtrar
            </button>
            </form>
            <div className='title'>
                <h1>{title}</h1>
            </div>
        </div>
    )
}