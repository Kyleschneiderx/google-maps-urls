
import React from 'react';
import {Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/pages/Home/Home'
import CSVloading from './components/pages/csvLoading/'

const Routes = ()=>{
    return(
        <BrowserRouter>
                <Switch>
                    <Route path='/csvloading' component={CSVloading}/>
                    <Route path='/' component={Home}/>
                </Switch>
        </BrowserRouter>
    )
}

export default Routes;