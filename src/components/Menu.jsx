import React, { useState} from 'react'
import './Menu.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faHome, faHeart } from '@fortawesome/free-solid-svg-icons'

import { history } from '../routes/history'
import If from './If'
import { Link,useLocation } from 'react-router-dom'

export default props => {
    const { setOpenMenu, openMenu } = props
    const [location, setLocation] = useState(useLocation().pathname)

    history.listen(location => {
        return locationActualy(location.pathname)
    })

    function locationActualy(local) {
        setLocation(local)
    }
    function changeMenu(value) {
        setOpenMenu(value)

    }
    return (
        <div className='menu'>
            <div className={openMenu === false ? 'actions closed' : 'actions'}>
                <If teste={openMenu === false}>
                    <a href className="actionIcon" onClick={() => changeMenu(true)}>
                        <FontAwesomeIcon icon={faBars} size='2x' />
                    </a>
                </If>
                <If teste={openMenu === true}>
                    <a href className="actionIcon" onClick={() => changeMenu(false)}>
                        <FontAwesomeIcon icon={faTimes} size='2x' />
                    </a>
                </If>
            </div>
            <div className="nav">
                <If teste={openMenu === true}>
                    <ul>
                        <Link to='/home'>
                            <li className={location === '/home' ? 'option selected': 'option'}>
                                <FontAwesomeIcon icon={faHome} size='1x' /> Início
                            </li>
                        </Link>
                        <Link to='/favorites'>
                            <li className={location === '/favorites' ? 'option selected': 'option'}>
                                <FontAwesomeIcon icon={faHeart} size='1x' /> Favoritos
                            </li>
                        </Link>
                    </ul>
                </If>
            </div>
        </div>
    )
}