import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Login from './login/Login'



class Controller extends Component {
    render() {
        return (
            <Router>
                {/* Route to login screen */}
                <Route exact path='/' render={(props)=><Login {...props} />} />
            </Router>
        )
    }
}



export default Controller
