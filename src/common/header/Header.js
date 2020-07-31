import React, { Component } from 'react'
import './Header.css'
import profileImage from '../../assets/upgrad.svg'

import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input'
import IconButton from '@material-ui/core/IconButton'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';



const styles = (theme) => ({
    root: {
        display: 'flex',
        width: '110px',
        
    },
    paper: {
        marginRight: theme.spacing(2),
    },
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
        float: 'right'

    },
    profileImage: {
        height: '100%',
        width: '100%',
        borderRadius: '50%'
    },
    menuList: {
        "width": "150px",
        padding: "0px",
        marginRight: '0px'

    },
    menuItems: {
        "text-decoration": "none",
        "color": "black",
        "text-decoration-underline": "none",
        marginRight: '0px',
        paddingRight: '0px',
        width: 'fit-content'
    }

})



class Header extends Component {

    constructor() {
        super()
        this.state = {
            isMenuOpen: false
        }

        this.anchorRef = React.createRef(false)
    }

    profileIconClickHandler = () => {
        this.state.isMenuOpen ? this.setState({ isMenuOpen: false }) : this.setState({ isMenuOpen: true })
    }

    handleClose = (event) => {
        if (this.anchorRef.current && this.anchorRef.current.contains(event.target)) {
            return;
        }

        this.profileIconClickHandler()
    }

    searchChangeHandler = (event)=>{
                
                this.props.captionSearchHandler(event.target.value)

    }

    render() {

        const { classes } = this.props

        return (


            <div>
                <header className="app-header">
                    <div className="app-logo">Image Viewer</div>
                    {this.props.showSearchBox ?
                        <div className="header-searchbox">
                            <SearchIcon id="search-icon"></SearchIcon>
                            <Input placeholder="Search…" disableUnderline={true} onChange={this.searchChangeHandler}></Input>
                        </div> : <div className="header-searchbox-off"></div>}
                    {this.props.showProfileIcon ?
                        <div>
                            <IconButton className={classes.profileIcon} onClick={this.profileIconClickHandler} ref={this.anchorRef} aria-controls={this.state.isMenuOpen ? 'menu-list' : undefined} aria-haspopup="true" >
                                <img src={profileImage} alt='profile pic' className={classes.profileImage}></img>
                            </IconButton>
                            <div>
                                <Popper open={this.state.isMenuOpen} anchorEl={this.anchorRef.current} role={undefined} transition disablePortal>
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                            {...TransitionProps}
                                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                        >
                                            <Paper className={classes.root} >
                                                <ClickAwayListener onClickAway={this.handleClose}>
                                                    <MenuList autoFocusItem={this.state.isMenuOpen} id="menu-list" className={classes.menuList} >
                                                    {this.props.showMyAccount === true ?
                                                    <div>
                                                    <Link to={"/profile"} className={classes.menuItems} underline="none" color={"default"}>
                                                        <MenuItem >My account</MenuItem>
                                                    </Link>
                                                    <div className="horizontal-line"> </div>
                                                    </div>
                                                    :""}
                                                        <MenuItem className={classes.menuItems} onClick={this.handleClose}>Logout</MenuItem>
                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>

                                        </Grow>
                                    )}
                                </Popper>

                            </div>

                        </div> : ""}
                </header>
            </div>

        )
    }
}



export default withStyles(styles)(Header)