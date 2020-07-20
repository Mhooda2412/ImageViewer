import React, { Component } from 'react'
import './Header.css'
import profileImage from '../../assets/upgrad.svg'

import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles';



const styles = (theme) => ({
    profileIcon: {
        marginLeft: '30px',
        heignt: '100%',
        width: '50px',
        padding: '0',
        border: 'solid',
        borderColor: 'white',
        overflow: 'hidden',
        borderWidth: 'thin',
        marginRight: '15px',
        float:'right'

    },
    profileImage: {
        height: '100%',
        width: '100%',
        borderRadius: '50%'
    }

})



class Header extends Component {
    render() {

        const { classes } = this.props

        return (


            <div>
                <header className="app-header">
                    <div className="app-logo">Image Viewer</div>
                    {this.props.showSearchBox ?
                        <div className="header-searchbox">
                            <SearchIcon id="search-icon"></SearchIcon>
                            <Input placeholder="Search…" disableUnderline={true}></Input>
                        </div> : <div className="header-searchbox-off"></div>}
                    {this.props.showProfileIcon ?
                        <div>
                            <IconButton className={classes.profileIcon}>
                                <img src={profileImage} alt='profile pic' className={classes.profileImage}></img>
                            </IconButton>
                        </div> : ""}
                </header>
            </div>

        )
    }
}



export default withStyles(styles)(Header)