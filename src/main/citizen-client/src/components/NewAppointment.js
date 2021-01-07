import React, { useState, useEffect }from 'react'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/Lock';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link} from 'react-router-dom';
import Fade from '@material-ui/core/Fade';
import Navbar from './Navbar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import 'date-fns';
import AuthService from ".././services/auth.service";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

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
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    formControl: {
      minWidth: 552,
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }));

export default function NewAppointment(props) {
    const classes = useStyles();

    const [carriers, setCarriers] = React.useState([

    ])

      useEffect(() => {
      const userReceived = AuthService.getCurrentUser();
      fetch(`http://localhost:8080/citizen/carriers`, {
          headers: new Headers({
              'Authorization': 'Bearer ' + userReceived.accessToken, 
            }), 
      })
      .then(response => response.json())
      .then(json => setCarriers(json))
  }, [carriers])

  const [carrierInfo, setCarrierInfo] = React.useState({

  })

  const handleClick = (carrier) => {
    setCarrierInfo({...carrierInfo, 
      id: carrier.id
  })
    console.log(carrierInfo.id)
  }

  const [appointment, setAppointment] = React.useState({

  })

  const onAppointmentSubmit = (e) => {
    e.preventDefault()
    const userReceived = AuthService.getCurrentUser();
    fetch(`http://localhost:8080/citizen/${userReceived.id}/carriers/${carrierInfo.id}/appointment/create`, {
      method: 'POST',
      headers: new Headers({
        'Authorization': 'Bearer ' + userReceived.accessToken,
        "Content-Type": "application/json", 
      }), 
      body: JSON.stringify(appointment),
    })
    .then(res => res.json())
    .then(console.log(appointment))
    .then(json => setAppointment(json.appointment))
    .then(props.history.push('/appointments/:id'))
  }

    
    // date picker
    
    const [selectedDate, setSelectedDate] = React.useState(new Date('2020-01-01T00:00:00'));
    
    const handleDateChange = (date) => {
        setSelectedDate(date);
        // setUser({...user, birthday: date})
        setAppointment({...appointment, appointmentDate: date})
      };



    const [age, setAge] = React.useState('');
  
    const handleChange = (event) => {
      setAge(event.target.value);
    };
  
    return (
      <React.Fragment>
        <CssBaseline />
        {/* <AppBar position="relative">
          <Toolbar>
            <LockIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" noWrap>
            <Button variant="contained" color="primary">
                  LOGOUT
             </Button>
            </Typography>
          </Toolbar>
        </AppBar> */}
        <Navbar/>
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                New Appointment
              </Typography>
              <form className={classes.form} noValidate onSubmit={onAppointmentSubmit}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            InputLabelProps={{shrink: true}}
            fullWidth
            // disabled
            type="text"
            label="Name"
            name="appointment[citizenFullName]"
            onChange={e => setAppointment({...appointment, citizenFullName: e.target.value})}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            InputLabelProps={{shrink: true}}
            // disabled
            type="text"
            label="Civil Registration Number"
            name="appointment[citizenCRN]"
            onChange={e => setAppointment({...appointment, citizenCRN: e.target.value})}
            autoFocus
          />
          <br></br>
          <br></br>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Available Carriers</InputLabel>
        <Select
          fullWidth
          margin="normal"
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={age}
          onChange={handleChange}
          label="Available carriers"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {carriers && carriers.map((carrier) => (   
                <MenuItem value={carrier.id} onClick={()=>handleClick(carrier)}>
                <em>{carrier.name}</em>
              </MenuItem>
       ))}
        </Select>        
        <FormHelperText>Select a carrier to schedule your appointment with.</FormHelperText>
      </FormControl>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          required
          variant="outlined"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Appointment Date"
          value={selectedDate}
          name="appointment[appointmentDate]"
          fullWidth
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>
          <Button 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            SCHEDULE APPOINTMENT
          </Button>
        </form>
            </Container>
          </div>
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Distributed Systems Class
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
              Harokopio University
          </Typography>
          <Copyright />
        </footer>
        {/* End footer */}
      </React.Fragment>
    );
  }