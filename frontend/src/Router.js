import {Link,Route, BrowserRouter as Router} from 'react-router-dom'
import Login from './components/Login'
import Registration from './components/Registration'
import HomePage from './components/HomePage'
import React from 'react'

const Routing = () =>
(
    <Router>
        <Route exact path='/login' component={Login} />
        <Route exact path='/reg' component={Registration} />
        <Route exact path='/' component ={HomePage} />
    </Router>
)
export default Routing