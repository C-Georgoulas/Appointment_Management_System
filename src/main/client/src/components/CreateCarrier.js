import React, { useState, useEffect, useRef }from 'react'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Nav from './Nav'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import AuthService from ".././services/auth.service";



function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
        Appointment Management IVS
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    stepper: {
      minWidth: 900,
      backgroundColor: "#fafafa",
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    typography2: {
      width: '100%',
      maxWidth: 500,
    },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  }));

  function getSteps() {
    return ['Fill out the carrier registration form', 'Submit the application', 'Add your employees'];
  }

export default function CreateCarrier(props) {
    const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  // user object to sent for the POST request

const [carrier, setCarrier] = React.useState({})

// Post request to add a carrier

const onCarrierSubmit = (e) => {
 e.preventDefault()
 const userReceived = AuthService.getCurrentUser();
 console.log(carrier)
 console.log("sending")
 fetch(`http://localhost:8080/supervisor/${userReceived.id}/carriers/create`, {
   method: 'POST',
   headers: new Headers({
     'Authorization': 'Bearer ' + userReceived.accessToken,
     "Content-Type": "application/json", 
   }), 
   body: JSON.stringify(carrier),
 })
 .then(res => res.json())
 .then(json => setCarrier(json.carrier))
 .then(props.history.push('/create/carrier/submitted'))
}

// // GET Request to receive a carrier

// useEffect(() => {
//   const userReceived = AuthService.getCurrentUser();
//   fetch(`http://localhost:8080/admin/users/${userReceived.id}`, {
//       headers: new Headers({
//           'Authorization': 'Bearer ' + userReceived.accessToken, 
//         }), 
//   })
//   .then(response => response.json())
//   .then(json => setCarrier(json))
//   .then(console.log(carrier))
// }, [])

const [currentUser, setCurrentUser] = useState({

});

useEffect(() => {
  const user = AuthService.getCurrentUser();
  // console.log(user);

  if (user) {
    setCurrentUser(user);
    // console.log(currentUser);
  } else {
    console.log("user not logged");
  }
}, []);

// Fetches the carrier that the user is supervisor in 


const [fetchedCarrier, setFetchedCarrier] = useState({

});

useEffect(() => {
    // console.log(currentUser);
    // console.log("ELAAAA");
    fetch(`http://localhost:8080/supervisor/${currentUser.id}/carriers`, {
        headers: new Headers({
            'Authorization': 'Bearer ' + currentUser.accessToken, 
          }), 
    })
    .then(response => response.json())
    .then(json => setFetchedCarrier(json))
    .then(console.log(fetchedCarrier))
}, [fetchedCarrier])

const form = useRef();

    return (
      <div>
      <Nav/>
      <div className={classes.content}>
        <Container component="main" maxWidth="xs" className={classes.toolbar}>
      <CssBaseline />
      {fetchedCarrier.name === undefined && 
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Carrier Registration Application Form
        </Typography>
        {/* <form className={classes.form} noValidate onSubmit={onCarrierSubmit}> */}
        <ValidatorForm
            ref={form}
            onSubmit={onCarrierSubmit}
            onError={errors => console.log(errors)}>
        <TextValidator
            variant="outlined"
            margin="normal"
            fullWidth
            type="text"
            label="Carrier"
            name="carrier[name]"
            onChange={e => setCarrier({...carrier, name: e.target.value})}
            value={carrier.name}
            validators={['required']}
            errorMessages={['Please add a name to your carrier.']}
            autoFocus
          />
          <TextValidator
            variant="outlined"
            margin="normal"
            id="standard-multiline-static"
            type="number"
            fullWidth
            label="Carrier Phone Number"
            name="carrier[phone]"
            onChange={e => setCarrier({...carrier, phone: e.target.value})}
            value={carrier.phone}
            validators={['required']}
            errorMessages={['Please add a phone number to your carrier.']}
            autoFocus
          />
          <TextValidator
            variant="outlined"
            margin="normal"
            id="standard-multiline-static"
            multiline
            fullWidth
            type="text"
            label="Carrier Description"
            name="carrier[description]"
            onChange={e => setCarrier({...carrier, description: e.target.value})}
            value={carrier.description}
            validators={['required']}
            errorMessages={['Please add a description to the carrier.']}
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            SEND APPLICATION
          </Button>
        {/* </form> */}
        </ValidatorForm>
        <Stepper activeStep={activeStep} alternativeLabel className={classes.stepper}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      </div>
      }
         {fetchedCarrier && 
      <div className={classes.paper}>
<Typography variant="subtitle1" className={classes.typography2} gutterBottom>
        You have already sent in an application for carrier registration.
      </Typography>
      <Typography variant="subtitle1" className={classes.typography2} gutterBottom>
        APPLICATION STATUS: {fetchedCarrier.approved === false ? "Pending" : "Approved"}
      </Typography>            
      </div>
      }
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </div>
    </div>
    )
}