import React, { useState, useEffect }from 'react'
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Nav from './Nav'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    table: {
      minWidth: 650,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        [theme.breakpoints.up("sm")]: {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`
        }
      },
      stepper: {
        minWidth: 900,
        backgroundColor: "#fafafa",
      },
}))

function getSteps() {
  return ['Fill out the carrier registration form', 'Submit the application', 'Await for approval'];
}

export default function CarrierSubmitted() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(2);
  const steps = getSteps();

    return (
        <div>
        <Nav/>
        <div className={classes.content}>
        <Container component="main" maxWidth="md" className={classes.toolbar}>
            <Fade in={true} timeout={3500}>
            <Typography variant="body2" align="center">
            <br></br>
            {/* <img src="https://www.rib-saa.com/images/mes/Module-Quality-Check.jpg" style={{borderRadius: "50px"}}></img> */}
            <h1>Thank you for your trust and support!</h1>
            <h2>You have successfully submitted your application for your carrier to be registered.</h2>
            <h3>Should your application be accepted, you will have access to Carrier Administration Panel.</h3>
            <CheckCircleIcon fontSize="large" style={{ color: "green" }}/>
            </Typography>
            </Fade>
        </Container>
        <Fade in={true} timeout={3500}>
        <Stepper activeStep={activeStep} alternativeLabel className={classes.stepper}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      </Fade>
        </div>
        </div>

    )
}