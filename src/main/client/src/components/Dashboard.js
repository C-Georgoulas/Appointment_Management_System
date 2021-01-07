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
import AuthService from ".././services/auth.service";


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


export default function Dashboard() {
    const classes = useStyles();


    const [currentUser, setCurrentUser] = useState({

    });
    
    useEffect(() => {
      const user = AuthService.getCurrentUser();
      console.log(user);
    
      if (user) {
        setCurrentUser(user);
        console.log(currentUser);
      } else {
        console.log("user not logged");
      }
    }, []);

    // const [carrier, setCarrier] = useState({

    // });
    
    // useEffect(() => {
    //     console.log(currentUser);
    //     console.log("ELAAAA");
    //     if (currentUser.role === "ROLE_SUPERVISOR") {
    //       console.log("fetching supervisor")
    //       fetch(`http://localhost:8080/supervisor/${currentUser.id}/carriers`, {
    //         headers: new Headers({
    //             'Authorization': 'Bearer ' + currentUser.accessToken, 
    //           }), 
    //     })
    //     .then(response => response.json())
    //     .then(json => setCarrier(json))
    //     } else if (currentUser.role === "ROLE_EMPLOYEE") {
    //       console.log("fetching employee")
    //       fetch(`http://localhost:8080/employee/${currentUser.id}/carriers`, {
    //         headers: new Headers({
    //             'Authorization': 'Bearer ' + currentUser.accessToken, 
    //           }), 
    //     })
    //     .then(response => response.json())
    //     .then(json => setCarrier(json))
    //     }
        
    // }, [carrier])


    return (
        <div>
        <Nav/>
        <div className={classes.content}>
        <Container component="main" maxWidth="md" className={classes.toolbar}>
            <Typography variant="body2" align="center">
            <br></br>
            <h1>Welcome {currentUser.username}</h1>
            <h2>Your user ID is {currentUser.id}</h2>
            {/* <h2>{carrier.name}</h2>
            <h2>{carrier.id} this is the carrier ID</h2> */}
            </Typography>
        </Container>
        </div>
        </div>

    )
}