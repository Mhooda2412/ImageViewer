import React, { Component } from 'react'
import './Login.css'
import Header from '../../common/header/Header'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';



const styles = theme => ({
    root: {

        top: '50',
        position: 'fixed',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        padding: '1%',
        transform: 'translate(-50%, 0)',
        overflow: 'auto'
    },
    input: {
        marginRight: theme.spacing(5),

    }


})

class Login extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            usernameRequired: 'dispNone',
            passwordRequired: 'dispNone'
        }
    }

    usernameChangeHandler = (e) => {
        this.setState({ username: e.target.value })
    }

    passwordChangeHandler = (e) => {
        this.setState({ password: e.target.value })
    }

    loginClickHandler = () => {
        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <Header />
                <Card className={classes.root}>
                    <CardContent >
                        <Typography variant="h5" >
                            LOGIN
                        </Typography><br></br>
                        <FormControl required>
                            <InputLabel htmlFor="username"> Username </InputLabel>
                            <Input id="username" type="text" className={classes.input} fullWidth={true} username={this.state.username} onChange={this.usernameChangeHandler} />
                            <FormHelperText className={this.state.usernameRequired}><span className="red">required</span></FormHelperText>
                        </FormControl><br /><br />
                        <FormControl required>
                            <InputLabel htmlFor="password"> Password </InputLabel>
                            <Input id="password" type="password" className={classes.input} fullWidth={true} onChange={this.passwordChangeHandler} />
                            <FormHelperText className={this.state.passwordRequired}><span className="red">required</span></FormHelperText>
                        </FormControl><br /><br /><br></br>
                        <Button variant="contained" color="primary" onClick={this.loginClickHandler} >LOGIN</Button>
                    </CardContent>
                </Card>
            </div>
        )
    }
}




export default withStyles(styles)(Login)