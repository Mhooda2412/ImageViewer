import React, { Component } from 'react'
import './Profile.css'
import Header from '../../common/header/Header'
import profileImage from '../../assets/upgrad.svg'


import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core';
import Modal from 'react-modal';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  editIcon: {
    marginLeft: '2%',
    width: '40px',
    height: '40px'
  }
})


const TabContainer = function (props) {
  return (
    <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
      {props.children}
    </Typography>
  );
};




const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}


class Profile extends Component {
  constructor() {
    super()
    this.state = {
      isLogin: sessionStorage.getItem("access_token") === null ? false : true,
      access_token: sessionStorage.getItem("access_token"),
      user_id: sessionStorage.getItem('user_id'),
      nameUpdateModalIsOpen: false,
      modifiedFullName: '',
      modifiedFullNameRequired: 'dispNone',
    }
  }

  randomNumberGenerator() {
    return Math.floor(Math.random() * 50) + 5
  }

  randomLikeGenerator() {
    return Math.floor(Math.random() * 10) + 1
  }

  componentDidMount() {

    let that = this
    if (this.state.isLogin) {
      let data = null
      let xhr = new XMLHttpRequest()
      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
          that.setState({

            media_count: JSON.parse(this.responseText).media_count,
            username: JSON.parse(this.responseText).username,
            full_name: JSON.parse(this.responseText).username,
            followers: that.randomNumberGenerator(),
            following: that.randomNumberGenerator(),
          })

        }
      })
      xhr.open('get', this.props.baseUrl + this.state.user_id + "?fields=media_count,username&access_token=" + this.state.access_token)
      xhr.send(data)
    }

    if (this.state.isLogin) {
      let data = null
      let xhr = new XMLHttpRequest()
      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
          let imageArr = JSON.parse(this.responseText).data
          imageArr.forEach(imageElement => {
            let created_time = new Date(imageElement.timestamp).toLocaleString().split(",")
            imageElement.timestamp = created_time
            let likes = that.randomLikeGenerator()
            imageElement.likes = likes
            imageElement.caption = imageElement.caption.split('\n')
            let isLiked = false
            imageElement.isLiked = isLiked


          });
          that.setState({
            images: imageArr,


          })



        }

      })
      xhr.open('get', this.props.baseUrl + "me/media?fields=caption,media_url,thumbnail_url,timestamp&access_token=" + this.state.access_token)
      xhr.send(data)


    }

  }



  userNameEditHandler = () => {
    this.setState({
      modifiedFullName: '',
      modifiedFullNameRequired: 'dispNone',
      nameUpdateModalIsOpen: true
    });
  };

  closeModalHandler = () => {
    this.setState({ nameUpdateModalIsOpen: false, imageModalIsOpen: false });
  };


  fullNameChangeHandler = (event) => {
  this.setState({modifiedFullName: event.target.value})
};

updateFullNameClickHandler = () => {
  if (this.state.modifiedFullName === '') {
    this.setState({modifiedFullNameRequired: 'dispBlock'});
  } else {
    this.setState({
      full_name: this.state.modifiedFullName,
      nameUpdateModalIsOpen: false
    });
  }
};
  render() {
    const { classes } = this.props;
    return (

      <div>

        <Header showProfileIcon={this.state.isLogin ? true : false}></Header>
        <div className='profile-container'>
          <div className='flex-container'>
            <div className="profile-picture-section">
              <img src={profileImage} className="profile-picture" alt='profile' />

            </div>
            <div className="details-section">
              <Typography variant='h5' component='h5'>{this.state.username}
              </Typography>
              <Typography component='p' className='stats-section'>
                <span>Posts: {this.state.media_count}</span>
                <span>Follows: {this.state.following}</span>
                <span>Followed By: {this.state.followers}</span>
              </Typography>
              <Typography component='h6' variant='h6'>
                {this.state.full_name}
                <Fab color='secondary' className={classes.editIcon} onClick={this.userNameEditHandler}><EditIcon />
                </Fab>
              </Typography>
              <Modal ariaHideApp={false}
                isOpen={this.state.nameUpdateModalIsOpen}
                contentLabel="Edit"
                onRequestClose={this.closeModalHandler}
                style={customStyles}>

              <Typography variant="h5" component="h5">
                Edit
        </Typography><br />
              <TabContainer>
                <FormControl required>
                  <InputLabel htmlFor="fullName">Full Name</InputLabel>
                  <Input id="fullName" type="text"
                    onChange={this.fullNameChangeHandler} />
                  <FormHelperText
                    className={this.state.modifiedFullNameRequired}>
                    <span className="red">required</span>
                  </FormHelperText>
                </FormControl><br /><br />
              </TabContainer><br />
              <Button variant="contained" color="primary"
                onClick={this.updateFullNameClickHandler}>Update</Button>
                </Modal>
            </div>
          </div>
        </div>

      </div >
    )

  }
}



export default withStyles(styles)(Profile)
