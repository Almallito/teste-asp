import React from 'react'
import {Route, Switch, Redirect} from 'react-router'

import Home from '../views/Home'
import Favorite from '../views/Favorite'


export default props => (
    
        <Switch>
            <Route path='/home' exact component={Home}/>
            <Route path='/favorites' exact component={Favorite}/>
            <Redirect to="/home" />
        </Switch>

)