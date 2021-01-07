import React, { useState, useEffect }from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import AuthService from "../services/auth.service";



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
  error: {
    color: "red",
  },
  submitCitizen: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

  const TransitionCitizen = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


 
export default function SelectScreen(props) {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = (e) => {
    e.preventDefault();

    AuthService.login(username, password).then(
        () => {
          props.history.push("/dashboard");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage("Invalid login credentials! Please try again.");
        }
      );
        };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openCitizen, setOpenCitizen] = React.useState(false);

  const handleOpenCitizen = () => {
    setOpenCitizen(true);
  };

  const handleCloseCitizen = () => {
    setOpenCitizen(false);
    setMessage("");
  };


  return (
      <div>
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AssignmentIndIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Hello, good to see you. 
          </Typography>
          <br></br>
        <Button variant="outlined" onClick={handleOpenCitizen} color="primary">LOGIN</Button>
        <br></br>
        <Link href="/register" variant="body2">
                  Don't have an account?
                </Link>
            <Box mt={5}>
              <Copyright />
            </Box>
        </div>
      </Grid>
    </Grid>
      <Dialog
        open={openCitizen}
        TransitionComponent={TransitionCitizen}
        keepMounted
        onClose={handleCloseCitizen}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Fill out the form with your login credentials."}</DialogTitle>
        <DialogContent>
        <form className={classes.form} noValidate onSubmit={handleLogin}>
        <FormControl className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="text"
            label="Username"
            name="username"
            onChange={e => setUsername(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            onChange={e => setPassword(e.target.value)}
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submitCitizen}
          >
            Sign In
          </Button>
          <span className={classes.error}>{message}</span>
          <FormHelperText id="my-helper-text">Please contact an administrator if you forgot your login credentials.</FormHelperText>
          </FormControl>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}