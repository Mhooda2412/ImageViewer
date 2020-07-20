import React, { Component } from 'react'
import './Home.css'
import Header from '../../common/header/Header'


class Home extends Component {

    constructor() {
        super()
        this.state = {
            isLogin: sessionStorage.getItem("access_token") === null ? false : true,
            access_token: sessionStorage.getItem("access_token")
        }
    }

    render() {
        return (
            <div>
                <Header showSearchBox={this.state.isLogin ? true : false} />
                <div>Home Page</div>

            </div>

        )
    }
}


export default Home