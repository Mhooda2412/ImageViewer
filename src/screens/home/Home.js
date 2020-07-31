import React, { Component } from 'react'
import './Home.css'
import Header from '../../common/header/Header'
import profileImage from '../../assets/upgrad.svg'


import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar'
import CardMedia from '@material-ui/core/CardMedia'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite'
import IconButton from '@material-ui/core/IconButton'
import FormControl from "@material-ui/core/FormControl";
import InputLable from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    root: { //style for the root 
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    grid: { //style for the grid component 
        padding: "20px",
        "margin-left": "10%",
        "margin-right": "10%",
    },
    card: { //style for the card component 
        maxWidth: "100%",
    },
    media: { // style for the image in the card
        height: 0,
        //width: "100%",
        paddingTop: '56.25%', // 16:9
    },
    avatar: { //style for the avatar in the card header 

        margin: 10,
        width: 60,
        height: 60,
    },
    title: { //Style for the title of the card 
        'font-weight': '600',
    },
    likeButton: {
        'padding-left': '0px'
    },
    addCommentBtn: { // ADD button styling 
        "margin-left": "15px",
    },

    comment: { //for the form control
        "flex-direction": "row",
        "margin-top": "25px",
        "align-items": "baseline",
        "justify-content": "center",
    },
    commentUsername: {
        fontSize: 'inherit'
    }
})

class Home extends Component {

    constructor() {
        super()
        this.state = {
            isLogin: sessionStorage.getItem("access_token") === null ? false : true,
            access_token: sessionStorage.getItem("access_token"),
            user_id: sessionStorage.getItem('user_id'),
            images: [],
            comments: [],
            comment: "",
            commentCount: 1

        }
    }

    randomLikeGenerator() {
        return Math.floor(Math.random() * 10) + 1
    }

    UNSAFE_componentWillMount() {

        let that = this
        if (this.state.isLogin) {
            let data = null
            let xhr = new XMLHttpRequest()
            xhr.addEventListener('readystatechange', function () {
                if (this.readyState === 4) {
                    that.setState({

                        media_count: JSON.parse(this.responseText).media_count,
                        username: JSON.parse(this.responseText).username
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

    likeBtnHandler = (imageId) => {
        let imageArr = this.state.images
        for (let i = 0; i < imageArr.length; i++) {
            if (imageArr[i].id === imageId) {
                if (imageArr[i].isLiked === true) {
                    imageArr[i].isLiked = false
                    imageArr[i].likes--
                    this.setState({
                        images: imageArr
                    })
                    break
                }
                else {
                    imageArr[i].isLiked = true
                    imageArr[i].likes++
                    this.setState({
                        images: imageArr
                    })
                    break
                }
            }
        }

    }

    commentTextChangeHandler = (event, imageId) => {
        let comment = {
            id: imageId,
            commentText: event.target.value
        }
        this.setState({
            comment
        })



    }

    addCommentHandler = () => {
        let count = this.state.commentCount
        let comment = {
            id: count,
            imageId: this.state.comment.id,
            username: this.state.username,
            commentText: this.state.comment.commentText
        }
        count++
        let comments = [...this.state.comments, comment]
        this.setState({
            comments,
            count,
            comment: ""
        })


    }

    render() {

        const { classes } = this.props
        console.log(this.state)
        return (
            <div >
                <Header showSearchBox={this.state.isLogin ? true : false} showProfileIcon={this.state.isLogin ? true : false} showMyAccount={this.state.isLogin ? true : false} />

                <div className="flex-container">
                    <Grid container spacing={3} wrap="wrap" alignContent="center" className={classes.grid}>
                        {this.state.images.map((image) => (

                            <Grid key={image.id} item xs={12} sm={6} className="grid-item">
                                <Card className={classes.card}>
                                    <CardHeader
                                        classes={{
                                            title: classes.title,
                                        }}
                                        avatar={
                                            <Avatar src={profileImage}></Avatar>

                                        }
                                        title={this.state.username}
                                        subheader={image.timestamp}
                                        className={classes.cardheader}

                                    >

                                    </CardHeader>
                                    <CardMedia image={image.media_url} className={classes.media}>
                                    </CardMedia>
                                    <CardContent>
                                        <div className="horizontal-rule"></div>

                                        <div className="image-caption">
                                            {image.caption[0]}
                                        </div>
                                        <div className="image-hashtags">
                                            {image.caption[1]}
                                        </div>
                                        <IconButton className={classes.likeButton} aria-label="like-button" onClick={() => this.likeBtnHandler(image.id)}>
                                            {image.isLiked ? <FavoriteIcon fontSize="large" style={{ color: 'red' }}></FavoriteIcon> : <FavoriteBorderIcon fontSize='large'></FavoriteBorderIcon>}
                                        </IconButton>

                                        {image.likes === 1 ?
                                            <span className="like-count">
                                                {image.likes} like
                                                </span>
                                            : <span className="like-count">
                                                {image.likes} likes
                                                </span>
                                        }

                                        {this.state.comments.map(comment => (
                                            image.id === comment.imageId ? <div className="comment-display" key={comment.id}>
                                                <Typography variant="subtitle2" className={classes.commentUsername} gutterbottom="true" >
                                                    {comment.username}:
                                            </Typography>
                                                <Typography variant="body1" className="comment-text" gutterbottom="true">
                                                    {comment.commentText}
                                                </Typography>
                                            </div>
                                                : ""
                                        ))}


                                        <FormControl className={classes.comment} fullWidth={true}>

                                            <InputLable htmlFor={"Addcomment" + image.id}>Add a comment</InputLable>
                                            <Input id={"Addcomment" + image.id} className="comment-text" onChange={(event) => this.commentTextChangeHandler(event, image.id)} value={image.id === this.state.comment.id ? this.state.comment.commentText : ""}></Input>
                                            <Button variant="contained" color="primary" className={classes.addCommentBtn} onClick={this.addCommentHandler.bind(this)} >Add</Button>


                                        </FormControl>


                                    </CardContent>

                                </Card>

                            </Grid>
                        )

                        )}

                    </Grid>


                </div>
            </div>

        )
    }
}


export default withStyles(styles)(Home)