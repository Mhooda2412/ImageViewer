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
import { Link , Redirect } from 'react-router-dom';


// Custom Styles to over ride material ui default styles
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
        borderRadius: '50%',
    },
    menuList: {
        "width": "145px",
        padding: "0px",
        marginRight: '0px',
        overflow: 'hidden',
        'background-color': '#c0c0c0'

    },
    menuItems: {
        "text-decoration": "none",
        "color": "black",
        "text-decoration-underline": "none",
        marginRight: '0px',
        paddingRight: '0px',

    }

})



class Header extends Component {

    constructor() {
        super()
        this.state = {
            isMenuOpen: false,
            isLogin: sessionStorage.getItem("access_token") === null ? false : true
        }

        this.anchorRef = React.createRef(false)
    }
     //This method is called when the profile icon is clicked to open the menu
    profileIconClickHandler = () => {
        this.state.isMenuOpen ? this.setState({ isMenuOpen: false }) : this.setState({ isMenuOpen: true })
    }
    // This method handle the close action of menu
    handleClose = (event) => {
        if (this.anchorRef.current && this.anchorRef.current.contains(event.target)) {
            return;
        }

        this.profileIconClickHandler()
    }
    // This method is called when text is entered into search input,
    //this inturn calls method captionSearchHandler of Home component and passes the text entered in the search input
    searchChangeHandler = (event)=>{

                this.props.captionSearchHandler(event.target.value)

    }

    //This method is called when log out is clicked in the menu
    //The method clears the session deatils like access-token , user_id and changes the logged to false
    logoutButtonHandler = ()=>{
        sessionStorage.removeItem("access_token")
        sessionStorage.removeItem("user_id")
        this.setState({
            isLogin:false
        })
    }

 // This is called everytime the page renders so that to check if the user is not logged to redirect to login page
    redirectToLogin = () => {
        if (!this.state.isLogin) {
           return <Redirect to = "/"/>
        }
    }

    render() {
      //custom Styles are stored in classes
        const { classes } = this.props

        return (

            <div>
            {/* this is called everytime the page reloads to check if the user is logged out if yes the redirects to login page */}
                {this.redirectToLogin()}
                <header className="app-header">
                    <div className="app-logo">Image Viewer</div>
                    {this.props.showSearchBox ?  //checking if the showSearchBox is true,only then it is shown
                        <div className="header-searchbox">
                            <SearchIcon id="search-icon"></SearchIcon>
                            <Input placeholder="Search…" disableUnderline={true} onChange={this.searchChangeHandler}></Input>
                        </div> : <div className="header-searchbox-off"></div>}
                    {this.props.showProfileIcon ?  // checking if the showSearchBox is true,only then it is shown
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
                                                        <MenuItem className={classes.menuItems} onClick={this.logoutButtonHandler}>Logout</MenuItem>
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
