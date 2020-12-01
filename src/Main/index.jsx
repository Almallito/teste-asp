import React, {useState} from 'react'
import Routes from '../routes'
import Menu from '../components/Menu'

export default props => {
    const [openMenu, setOpenMenu] = useState(false)
    return (
        <div className={openMenu ? 'body-site menuOpen' : 'body-site'}>
            <Menu openMenu={openMenu} setOpenMenu={setOpenMenu}/>
            <Routes />
        </div>
    )
}