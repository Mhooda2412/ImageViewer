import React, { Component } from 'react'
import './Header.css'

import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input'


class Header extends Component {
    render() {

        return (


            <div>
                <header className="app-header">
                    <div className="app-logo">Image Viewer</div>
                    {this.props.showSearchBox ?
                        <div className="header-searchbox">
                            <SearchIcon id="search-icon"></SearchIcon>
                            <Input placeholder="Search…" disableUnderline={true}></Input>
                        </div> : ""}
                </header>
            </div>

        )
    }
}



export default Header