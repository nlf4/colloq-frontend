// import React, {useState} from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import axios from 'axios'
// import 'date-fns';
// import {useDispatch} from 'react-redux'
// import { Link } from "react-router-dom";
// import DateFnsUtils from '@date-io/date-fns';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
// import { registerUser } from '../data/auth';
// import { Formik } from "formik";
// import * as Yup from "yup";
// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker,
// } from '@material-ui/pickers';
// import {Grid, Typography, TextField, Button, Paper, FormControl } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//     root: {
//       backgroundColor: "#E1E2E1",
//       minWidth: 400,
//       maxWidth: 600,
//       height: 'auto',
//       position: 'relative',
//       top: '10%',
//       left: 0,
//       right: 0,
//       margin: '15px auto',

//     },
//   paper: {
//     backgroundColor: "white",
//     border: '1px solid #bdbdbd',
//     padding: 20,
//     overflow: 'auto',
//   },
//   // gridTop: {
//   //   border: "1px solid black",
//   //   display: "flex",
//   //   flexDirection: "row",
//   //   justifyContent: "center",
//   //   height: "80%",
//   //   alignContent: "center"
//   // },
//   // gridLeft: {
//   //   border: "1px solid blue",
//   //   height: "65ch",
//   //   width: "73ch"
//   // },
//   // gridRight: {
//   //   border: "1px solid red",
//   //   height: "65ch",
//   //   width: "73ch"
//   // },
//   title: {
//     fontSize: "2.5rem",
//     textAlign: "center",
//     margin: "3ch 1ch",
//     fontFamily: 'Segoe UI',
//     color: '#757575'
//   },
//   form: {
//     width: "70%",
//     margin: 'auto'
//   },
//   submitDiv: {
//     margin: "4ch",
//     [theme.breakpoints.down('xs')]: {
//       margin: '.5ch'
//     },
//   },
//   link: {
//     fontSize: '1rem',
//     marginLeft: "6ch",
//     textDecoration: "none",
//     color: "gray",
//     '&:hover': {
//       color: "black"
//     },
//     [theme.breakpoints.down('xs')]: {
//       marginLeft: '3ch'
//     },
//   },
//   formControl: {
//     margin: '2ch'
//   },
//   roleSelect: {
//     paddingRight: '18px'
//   }
// }));



// export default function Register() {
//     const classes = useStyles();
//     const dispatch = useDispatch();
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [firstname, setFirstName] = useState("");
//     const [lastname, setLastName] = useState("");
//     const [city, setCity] = useState("");
//     const [nativeLang, setNativeLang] = useState("");
//     const [targetLang, setTargetLang] = useState("");
//     const [meetupCity, setMeetupCity] = useState("");
//     const [meetupType, setMeetupType] = useState("");
//     const [age, setAge] = useState("");
//     const [radioValue, setRadioValue] = useState('');
//     // const [isTourist, setIsTourist] = useState(false);
//     // const [isTutor, setIsTutor] = useState(false);
//     const [startDate, setStartDate] = useState(Date.now());
//     const [endDate, setEndDate] = useState(Date.now());
    
    
//     const handleStartDateChange = (date) => {
//       setStartDate(date);
//     };

//     const handleEndDateChange = (date) => {
//       setEndDate(date);
//     };
    
//     const handleRoleChange = (event) => {
//         setRadioValue(event.target.value)
//         console.log(radioValue)
//       };

//     const submitHandler = async (e) => {
//       e.preventDefault();
//       // console.log(email, password, firstname, lastname, age, meetupType, startDate, endDate, cityIri, meetupCityIri, radioValue)
//       dispatch(registerUser(email, password, firstname, lastname, age, city, meetupCity, nativeLang, targetLang, meetupType, startDate, endDate, radioValue))
//     };

//     return (
//       <>
//       <div>
//         <div className={classes.root}>
//           <Paper className={classes.paper} component="div" elevation={3}>
//             <Typography variant="h4" component="h2" className={classes.title}>
//               Register
//             </Typography>
//             <form className={classes.form} method="POST" onSubmit={submitHandler}>
//                           <TextField variant="standard" margin="normal" type="email" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" value={email}
//                           onChange={(e) => {
//                             setEmail(e.target.value);
//                           }}
//                         />
//                         <TextField variant="standard" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" value={password}
//                           onChange={(e) => {
//                             setPassword(e.target.value);
//                           }}
//                         />
//                         <TextField variant="standard" margin="normal" required fullWidth id="firstname" label="First name" name="firstname" autoComplete="firstname" value={firstname}
//                           onChange={(e) => {
//                             setFirstName(e.target.value);
//                           }}
//                         />
//                         <TextField variant="standard" margin="normal" required fullWidth id="lastname" label="Last name" name="lastname" autoComplete="lastname" value={lastname}
//                           onChange={(e) => {
//                             setLastName(e.target.value);
//                           }}
//                         />
//                         <TextField variant="standard" margin="normal" fullWidth id="age" label="Age" name="age" autoComplete="age" value={age}
//                           onChange={(e) => {
//                             setAge(e.target.value);
//                           }}
//                         />
//                         <TextField variant="standard" margin="normal" required fullWidth name="city" label="City" type="text" id="city" value={city}
//                           onChange={(e) => {
//                             setCity(e.target.value);
//                           }}
//                         />
//                         <TextField variant="standard" margin="normal" required fullWidth name="nativeLang" label="Native Language" type="text" id="nativeLang" value={nativeLang}
//                           onChange={(e) => {
//                             setNativeLang(e.target.value);
//                           }}
//                         />
//                         <TextField variant="standard" margin="normal" required fullWidth name="targetLang" label="Meetup Language" type="text" id="targetLang" value={targetLang}
//                           onChange={(e) => {
//                             setTargetLang(e.target.value);
//                           }}
//                         />
//                         <TextField variant="standard" margin="normal" required fullWidth name="meetup_city" label="City of meetup" type="text" id="meetup_city" value={meetupCity}
//                           onChange={(e) => {
//                             setMeetupCity(e.target.value);
//                           }}
//                         />
//                         <TextField variant="standard" margin="normal" fullWidth name="meetup_type" label="Preferred type of meetup" type="text" id="meetup_type" value={meetupType}
//                           onChange={(e) => {
//                             setMeetupType(e.target.value);
//                           }}
//                         />
//                   <MuiPickersUtilsProvider utils={DateFnsUtils}>
//                   <Grid container justify="start">
//                     {/* <TextField
//                     id="startdate"
//                     label="Start Date"
//                     type="date"
//                     defaultValue="2017-05-24"
//                     value={startDate}
//                     onChange={handleStartDateChange}
//                     className={classes.textField}
//                     InputLabelProps={{
//                       shrink: true,
//                     }}
//                   /> */}
                  
//                     <KeyboardDatePicker
//                       disableToolbar
//                       variant="inline"
//                       format="MM/dd/yyyy"
//                       margin="normal"
//                       id="date-picker-inline"
//                       label="Available start date"
//                       value={startDate}
//                       onChange={handleStartDateChange}
//                       KeyboardButtonProps={{
//                         'aria-label': 'change date',
//                       }}
//                     />
//                     <KeyboardDatePicker
//                       disableToolbar
//                       variant="inline"
//                       format="MM/dd/yyyy"
//                       margin="normal"
//                       id="date-picker-inline2"
//                       label="Available end date"
//                       value={endDate}
//                       onChange={handleEndDateChange}
//                       KeyboardButtonProps={{
//                         'aria-label': 'change date',
//                       }}
//                     />
                      
//                       <FormControl className={classes.formControl}>
//                       <InputLabel id="simple-select-label">Role: </InputLabel>
//                       <Select
//                         className={classes.roleSelect}
//                         labelId="simple-select-label"
//                         id="simple-select"
//                         value={radioValue}
//                         onChange={handleRoleChange}
//                       >
//                         <MenuItem value={"tourist"}>Tourist</MenuItem>
//                         <MenuItem value={"tutor"}>Tutor</MenuItem>
                        
//                       </Select>
//                     </FormControl>
//                         </Grid>
//                       </MuiPickersUtilsProvider>
//                       <div className={classes.submitDiv}>
//                         <Button type="submit" variant="contained" color="secondary">
//                           Submit
//                         </Button>
//                         <Link className={classes.link} to="/login">Already have an account? </Link>
//                         </div>
//               </form>
//           </Paper>
//         </div>
//         </div>
//       </>
//     );
//   }