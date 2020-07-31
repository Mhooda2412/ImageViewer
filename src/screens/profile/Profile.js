import React, { Component } from 'react'
import './Profile.css'
import Header from '../../common/header/Header'
import profileImage from '../../assets/upgrad.svg'



class Profile extends Component {
    constructor(){
        super()
        this.state={
            isLogin: sessionStorage.getItem("access_token") === null ? false : true,
            access_token: sessionStorage.getItem("access_token"),
            user_id: sessionStorage.getItem('user_id'),
        }
    }
    render() {
        return (
            <div>
                <Header showProfileIcon={this.state.isLogin ? true : false}></Header>
            </div>)

    }
}



export default Profile