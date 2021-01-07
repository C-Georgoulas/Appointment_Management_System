import React, { useState, useEffect }from 'react'
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
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import 'date-fns';
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
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://www.telestax.com/wp-content/uploads/2018/01/Lumin-header.png)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: "#40a5ab",
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
  }));



export default function Signup() {
    const classes = useStyles();

    const [user, setUser] = React.useState({

    })
    
     // date picker
    
     const [selectedDate, setSelectedDate] = React.useState(new Date('1999-01-01T00:00:00'));
    
     const handleDateChange = (date) => {
         setSelectedDate(date);
         setUser({...user, birthday: date})
       };


    return (
    //   <Container component="main" maxWidth="xs">
    //   <CssBaseline />
    //   <div className={classes.paper}>
    //     <Avatar className={classes.avatar}>
    //       <LockOutlinedIcon />
    //     </Avatar>
    //     <Typography component="h1" variant="h5">
    //       Registration Form
    //     </Typography>
        // <form className={classes.form} noValidate>
        // <TextField
        //     variant="outlined"
        //     margin="normal"
        //     required
        //     fullWidth
        //     type="text"
        //     label="Full name"
        //     name="user[fullname]"
        //     autoFocus
        //   />
        //   <TextField
        //     variant="outlined"
        //     margin="normal"
        //     required
        //     fullWidth
        //     type="text"
        //     label="Address"
        //     name="user[address]"
        //     autoFocus
        //   />
        //   <TextField
        //     variant="outlined"
        //     margin="normal"
        //     required
        //     fullWidth
        //     id="email"
        //     label="Email Address"
        //     name="user[email]"
        //     autoComplete="email"
        //     autoFocus
        //   />
        //   <TextField
        //     variant="outlined"
        //     margin="normal"
        //     required
        //     fullWidth
        //     type="number"
        //     label="Civil Registration Number"
        //     name="user[CRN]"
        //     autoFocus
        //   />
        //   <MuiPickersUtilsProvider utils={DateFnsUtils}>
        // <KeyboardDatePicker
        //   disableToolbar
        //   variant="inline"
        //   format="MM/dd/yyyy"
        //   margin="normal"
        //   id="date-picker-inline"
        //   label="Date of Birth"
        //   value={selectedDate}
        //   name="user[birthday]"
        //   fullWidth
        //   onChange={handleDateChange}
        //   KeyboardButtonProps={{
        //     'aria-label': 'change date',
        //   }}
        // />
        // </MuiPickersUtilsProvider>
        // <TextField
        //     variant="outlined"
        //     margin="normal"
        //     required
        //     fullWidth
        //     type="text"
        //     label="Username"
        //     name="user[username]"
        //     autoFocus
        //   />
        //   <TextField
        //     variant="outlined"
        //     margin="normal"
        //     required
        //     fullWidth
        //     type="password"
        //     label="Password"
        //     name="user[password]"
        //     autoFocus
        //   />
        //   <Button
        //     type="submit"
        //     fullWidth
        //     variant="contained"
        //     color="primary"
        //     className={classes.submit}
        //   >
        //     SIGN UP!
        //   </Button>
        // </form>
    //   </div>
    //   <Box mt={8}>
    //     <Copyright />
    //   </Box>
    // </Container>
    <div>
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Account Registration
          </Typography>
          <form className={classes.form} noValidate>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="text"
            label="Full name"
            name="user[fullname]"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="text"
            label="Address"
            name="user[address]"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="user[email]"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="number"
            label="Civil Registration Number"
            name="user[CRN]"
            autoFocus
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date of Birth"
          value={selectedDate}
          name="user[birthday]"
          fullWidth
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="text"
            label="Username"
            name="user[username]"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            label="Password"
            name="user[password]"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            SIGN UP!
          </Button>
        </form>

            <Box mt={5}>
              <Copyright />
            </Box>
        </div>
      </Grid>
    </Grid>
    </div>
    )
}