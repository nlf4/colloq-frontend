import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { getUser } from '../data/search';
import { makeStyles } from "@material-ui/core/styles";
import { Container , Paper, Grid, Typography, Button, TextField, IconButton } from '@material-ui/core';
import Footer from './landing/Footer'
import Avatar from '@material-ui/core/Avatar';
import { postUserMessage } from '../data/messages';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { postComment, getComments } from '../data/comments';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


///Modal Calculations /////////////////////////
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

// Snackbar
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

//STYLE //////////////////////////////////////
const useStyles = makeStyles(theme => ({
  root: {
      justifySelf: "center",
      textAlign: "center"
    },
    paperModal: {
      position: 'absolute',
      width: 500,
      backgroundColor: theme.palette.background.paper,
      border: '0px solid #c6a3ff',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      },
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      backgroundColor: "#eeeeee",
      height: "150px",
      width: "400px",
      margin: "30px"
    },
  container: {
      backgroundColor: "#E1E2E1",
      width: "100vw",
      minHeight: "100vh",
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      },
  },
  grid1: {
      paddingTop: "80px",
      alignItems: "center",
      marginLeft: "20px",
      [theme.breakpoints.down('xs')]: {
        marginLeft: "0px",
        width: '100%',
        marginBottom: '50px'
      },
      [theme.breakpoints.down('md')]: {
        marginLeft: "0px",
        width: '100%',
        marginBottom: '50px'
      },
      [theme.breakpoints.up('lg')]: {
        marginBottom: '0px'
      },
  },
  grid2: {
      minHeight: "800px"
  },
  gridBottomLeft: {
      // border: "1px solid red"
  },
  gridBottomRight: {
      minWidth: "400px",
      marginLeft: "90px",
      [theme.breakpoints.down('xs')]: {
        marginLeft: "70px",
        width: '100%'
      },
      [theme.breakpoints.down('md')]: {
        marginRight: "100px",
      },
  },
  paperInfo: {
    // border: 'solid 1px red',
      backgroundColor: "#eeeeee",
      minHeight: "500px",
      width: "400px",
      overflow: "auto",
      marginRight: '2rem',
      [theme.breakpoints.down('xs')]: {
        marginLeft: "35px",
      },
  },
  paperAbout: {
      backgroundColor: "#eeeeee",
      minHeight: "175px",
      width: "450px",
      marginLeft: "30px",
      overflow: "auto",
      [theme.breakpoints.down('xs')]: {
        width: "400px",
        marginLeft: "50px",
      },
      [theme.breakpoints.down('md')]: {
        width: "400px",
        marginRight: "50px",
      },
  },
  typeAbout: {
      padding: "20px",
      color: theme.palette.text.secondary,
  },
  photo: {
      backgroundColor: "#c6a3ff",
      height: "200px",
      width: "200px",
      borderRadius: "50%"
  },
  large: {
      width: theme.spacing(25),
      height: theme.spacing(25),
    },
  input: {
      display: 'none',
    },
  form: {
        paddingTop: "0px",
      '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '34ch',
          },
    },
    infoDiv: {
      padding: '2rem',
      color: theme.palette.text.secondary,
    },
    name: {
      fontSize: '2rem',

    },
    subDiv: {
      marginTop: '2rem'
    },
    subInfo: {
      fontSize: '1.25rem',
      lineHeight: '2.5rem',
      color: theme.palette.text.secondary,
    },
    msgBtn: {
      margin: '1rem'
    },
    backLink: {
      textDecoration: 'none',
      fontSize: '1rem'
    },
    backIcon: {
     verticalAlign: 'text-bottom',
     fontSize: '1.1rem' 
    },
    backDiv: {
      marginBottom: '1.8rem'
    },
    close: {
      display: 'inline'
    },
    sendDiv: {
      display: 'flex',
      flexDirection: "row",
      justifyContent: "space-between"
    },
    textarea: {
      width: '100%',
      '&::placeholder': {
        fontFamily: "Arial"
      }
    },
    paperComment: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
      backgroundColor: "#eeeeee",
      minHeight: "2rem",
      width: "400px",
      margin: "1rem",
      borderRadius: "25px",
      [theme.breakpoints.down('xs')]: {
        marginRight: "80px",
      },
    },
    titleDialog: {
      marginBottom: 0
    }
}));

// PUBLIC PROFILE /////////////////////////////
const UserProfile = () => {
  const dispatch = useDispatch();
  let location = useLocation()
  const classes = useStyles()
  // const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  // const photos = useSelector((state) => state.photos.photos);
  const comments = useSelector((state) => state.comments.comments);
  // const userFirstName = useSelector((state) => state.auth.user.firstName);
  // const userAge = useSelector((state) => state.auth.user.age);
  // const userMeetupType = useSelector((state) => state.auth.user.meetupType);
  // const userPublicMessage = useSelector((state) => state.auth.user.publicMessage);
  const str = location.pathname
  // const user = useSelector((state) => state.search.singleUser);
  // const userId = useSelector((state) => state.search.singleUser.id);
  const authUserId = useSelector((state) => state.auth.user.id);
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const loading = useSelector((state) => state.search.loading);
  const [singleUserMessage, setSingleUserMessage] = useState("");
  const [singleUserFirstname, setSingleUserFirstname] = useState("");
  const [singleUserLastname, setSingleUserLastname] = useState("");
  const [singleUserAge, setSingleUserAge] = useState("");
  const [singleUserIsTourist, setSingleUserIsTourist] = useState("");
  const [singleUserIsTutor, setSingleUserIsTutor] = useState("");
  const [singleUserNatLanguage, setSingleUserNatLanguage] = useState("");
  const [singleUserTarLanguage, setSingleUserTarLanguage] = useState("");
  const [singleUserCity, setSingleUserCity] = useState("");
  const [singleUserMeetupCity, setSingleUserMeetupCity] = useState("");
  const [singleUserMeetupType, setSingleUserMeetupType] = useState("");
  const [singleUserStartDate, setSingleUserStartDate] = useState("");
  const [singleUserEndDate, setSingleUserEndDate] = useState("");
  const [singleUserPhoto, setSingleUserPhoto] = useState("");
  const [commentText, setCommentText] = useState("");
  const [message, setMessage] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);

//HANDLERS ///////////////////////////////
  const handleClose = () => {
    setOpen(false);
  };

  const handleSendMessageClick = () => {
    setOpen(true);
  }

  const handleMessageFormSubmit = (e) => {
    e.preventDefault()
    console.log('message form submit')
    dispatch(postUserMessage(subject, text, id, authUserId))
    handleClose()
    setMessage("Message has been sent!")
    setSnackBarOpen(true)
  }

  const handleOpenCommentModal = () => {
    setOpenCommentModal(true);
  };

  const handleCloseCommentModal = () => {
    setOpenCommentModal(false);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault()
    console.log('comment submit')
    dispatch(postComment(commentText, id, authUserId))
    handleCloseCommentModal()
  }

  // const handleGetComments = () => {
  //   dispatch(getComments(id))
    
  // }

  const handleSnackBarClose = () => {
    setSnackBarOpen(false)
  }

/////MODAL BODY ///////////////////////
  const body = (
    <div style={modalStyle} className={classes.paperModal}>
      <div className={classes.sendDiv}>
        <h2 id="simple-modal-title">Send Message</h2>
          <IconButton aria-label="delete" className={classes.close} size="small" onClick={handleClose}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
      </div>
      <form method="POST" onSubmit={handleMessageFormSubmit}>
        <TextField 
          variant="standard" 
          margin="normal" 
          required 
          fullWidth 
          id="subject" 
          label="Subject" 
          name="subject" 
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
          }}
        />
        <TextareaAutosize 
          className={classes.textarea} 
          aria-label="message textarea" 
          required 
          fullWidth 
          rowsMin={8} 
          placeholder="Write a message..." 
          id="text" 
          label="Message" 
          name="text" 
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            }} 
        />
        <Button type="submit" className={classes.submitmsgBtn} variant="contained" color="secondary">
          Send
        </Button>
      </form>
    </div>
  );
  //////////////////////////////////////////

  


//get user id //////////////////////
var n = str.lastIndexOf('/');
var id = str.substring(n + 1);


//GET single user data based on ID ////////////////////////
const getUser = async (id) => {
  const user = await axios.get(`${process.env.REACT_APP_ENDPOINT}/users/${id}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    }
   });
   
    console.log(user);
    setSingleUserMessage(user.data.publicMessage);
    setSingleUserFirstname(user.data.firstname);
    setSingleUserLastname(user.data.lastname);
    setSingleUserAge(user.data.age);
    setSingleUserIsTourist(user.data.isTourist);
    setSingleUserIsTutor(user.data.isTutor);
    setSingleUserCity(user.data.city.name);
    setSingleUserMeetupCity(user.data.meetupCity.name);
    setSingleUserMeetupType(user.data.meetupType);
    setSingleUserPhoto(user.data.image.filePath);
    setSingleUserNatLanguage(user.data.nativeLanguage.name);
    setSingleUserTarLanguage(user.data.targetLanguage.name);
    setSingleUserStartDate(user.data.availStartDate);
    setSingleUserEndDate(user.data.availEndDate);
}


 useEffect(() => {
  getUser(id);
 }, [id]);

 useEffect(() => {
  dispatch(getComments(id))
 }, []);


  
  return (
    <>
      <div className={classes.root}>
        <Container className={classes.container}>
          {loading && <h2>Profile is loading...</h2>}
            <Grid className={classes.grid1} justify="space-evenly" container spacing={4}>
              <Grid item>
                {/* BACK LINK ----------*/}
                <div className={classes.backDiv}>
                  <Link className={classes.backLink} to='/search'><ArrowBackIosIcon className={classes.backIcon}/>Back to search results</Link>
                </div>

                {/* PHOTO --------------*/}
                <Paper className={classes.photo} elevation={3}>
                  <Avatar alt="user profile photo" src={`https://wdev.be/wdev_nicole/eindwerk/images/${singleUserPhoto}`} className={classes.large} />
                  {/* <img src={`http://localhost:8000/image.php?${photos.image}&height=200&image=/wdev_nicole/eindwerk/system/img/albums/${photos.image}`} />) */}
                </Paper>
                {/* SEND MESSAGE BTN --*/}
                <Button  className={classes.msgBtn} variant="contained" color="secondary" component="span" onClick={handleSendMessageClick}>
                  Send message
                </Button>  
                {/* MESSAGE MODAL ----*/}
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  {body}
                </Modal>
                {/* SNACKBAR --------*/}
                <Snackbar open={snackBarOpen} autoHideDuration={6000} onClose={handleSnackBarClose}>
                  <Alert onClose={handleSnackBarClose} severity="success">
                    {message}
                  </Alert>
                </Snackbar>
                </Grid>
                <Grid item>
                  <Paper className={classes.paperAbout} elevation={3}><Typography className={classes.typeAbout}>{singleUserMessage}</Typography></Paper>
                </Grid>
                </Grid>
                {/* INFO SECTION ---------*/}
                <Grid className={classes.grid2} justify="center" alignItems="center" container direction="row" spacing={0}>
                  <Grid className={classes.gridBottomLeft}>
                    <Grid item xs>
                      <Paper className={classes.paperInfo} elevation={3}>
                        <div className={classes.infoDiv}>
                          <Typography className={classes.name}>{singleUserFirstname}  {singleUserLastname}</Typography>
                            <div className={classes.subDiv}>
                              <Typography className={classes.subInfo}>Age: {singleUserAge}</Typography>
                              <Typography className={classes.subInfo}>Speaks: {singleUserNatLanguage}</Typography>
                              {singleUserIsTourist ? 
                                <Typography className={classes.subInfo}>Learning: {singleUserTarLanguage}</Typography>
                                :
                                <Typography className={classes.subInfo}>Teaching: {singleUserTarLanguage}</Typography>
                                }
                              <Typography className={classes.subInfo}>Lives in: {singleUserCity}</Typography>
                              <Typography className={classes.subInfo}>Wants to meet in: {singleUserMeetupCity}</Typography>
                              <Typography className={classes.subInfo}>Meetup type: {singleUserMeetupType}</Typography>
                              <Typography className={classes.subInfo}>Available: <br />
                                {new Date(singleUserStartDate).toLocaleString('en-GB', { timeZone: 'UTC' }).substr(0,10)} 
                                - 
                                {new Date(singleUserEndDate).toLocaleString('en-GB', { timeZone: 'UTC' }).substr(0,10)}</Typography>
                            </div>
                        </div>
                      </Paper>
                    </Grid>
                  </Grid>
                  {/* COMMENT SECTION ----------------*/}
                  <Grid className={classes.gridBottomRight}>
                    {comments.length === 0 && <p>No comments to display</p>}
                    {comments.map((comment, index) => (
                      <Grid item key={index} xs={6}>
                        <Paper className={classes.paperComment} elevation={1}>
                          <Typography variant="overline">{new Date(comment.createdAt).toDateString()}</Typography>
                          <Typography variant="h6">{comment.text}</Typography>
                          <Typography variant="overline">- {comment.commentAuthor.firstname} {comment.commentAuthor.lastname}</Typography>
                        </Paper>
                      </Grid>
                    ))}
                    {/* POST COMMENT DIALOG -------*/}
                    <Grid item xs>
                      <Button  className={classes.msgBtn} variant="contained" color="secondary" component="span" onClick={handleOpenCommentModal}>
                        Post Comment
                      </Button> 
                      <Dialog
                        open={openCommentModal}
                        onClose={handleCloseCommentModal}
                        aria-labelledby="max-width-dialog-title"
                      >
                      <DialogTitle className={classes.titleDialog} id="max-width-dialog-title">Post a Comment</DialogTitle>
                      <DialogContent>
                        <form className={classes.form} noValidate>
                          <TextField
                            id="text"
                            label="Write something..."
                            type="text"
                            fullWidth
                            multiline
                            InputProps={{
                              disableUnderline: true,
                            }}
                            rows={4}
                            variant='filled'
                            value={commentText}
                            onChange={(e) => {
                            setCommentText(e.target.value);
                            }}
                          />
                        </form>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleSubmitComment} color="primary">
                          Post
                        </Button>
                        <Button onClick={handleCloseCommentModal} color="primary">
                          Cancel
                        </Button>
                      </DialogActions>
                      </Dialog>
                    </Grid>
                  </Grid>
                </Grid>
        </Container>
        <Footer />
    </div>  
  </>
  )
}

export default UserProfile;
