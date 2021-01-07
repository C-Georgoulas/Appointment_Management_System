import React, { useState, useEffect }from 'react'
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Nav from './Nav'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import Slide from '@material-ui/core/Slide';
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
}))



export default function CarrierApproved() {

  const [employees, setEmployees] = React.useState([

  ])

    // Fetches current user information and then stores it into currentUser state

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


const [carrier, setCarrier] = useState({

});

useEffect(() => {
  fetch(`http://localhost:8080/employee/${currentUser.id}/carriers`, {
          headers: new Headers({
              'Authorization': 'Bearer ' + currentUser.accessToken, 
            }), 
      })
      .then(response => response.json())
      .then(json => setCarrier(json))
  }, [currentUser]); //Should be currentUser not carrier

const [appointments, setAppointments] = useState([

])

// fetches the users from the specific carrier

useEffect( () => {
  fetch(`http://localhost:8080/employee/carriers/${carrier.id}/appointments/`, {
      headers: new Headers({
          'Authorization': 'Bearer ' + currentUser.accessToken, 
        }), 
  })
  .then(response => response.json())
  .then(json => setAppointments(json))
}, [appointments])

// approving appointment

const approveAppointment = (appointment) => {
  const userReceived = AuthService.getCurrentUser();
  console.log("before approval")
  console.log(appointment);
  console.log("attempting to send")
  let updatedAppointment = {
    ...appointment,
    approved: true,
  }
  console.log(updatedAppointment);

  fetch(`http://localhost:8080/employee/carriers/${carrier.id}/appointments/${appointment.id}/approve`, {
    method: 'PUT',
    headers: new Headers({
      'Authorization': 'Bearer ' + userReceived.accessToken,
      "Content-Type": "application/json", 
    }), 
    body: JSON.stringify(updatedAppointment)
  })
  .then(res => res.json())
  // .then(json => setAppointment(json.updatedAppointment))
}



    const classes = useStyles();

    return (
      <div>
      <Nav/>
      <div className={classes.content}>
      <Container maxwidth="sm" className={classes.toolbar}>
       {/* <div style={{display: 'inline-flex'}}>
        <Button startIcon={<LocalHospitalIcon />} color="primary" variant="outlined" className={classes.button}>Add</Button>
        <span style={{marginLeft: "550px", marginTop: "8px"}}>
    </span>
    </div> */}
    <Toolbar/>
    {/* <Button variant="outlined" color="black" onClick={handleClickOpen}>
    Add Employee
    </Button> */}
    {/* overflow hides the scrollbar at the table on patient GET/POST/UPDATE/DELETE */}
    <TableContainer component={Paper} style={{overflow: "hidden"}}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell><strong>Citizen</strong></TableCell>
          <TableCell><strong>Civil Registration Number</strong></TableCell>
          <TableCell><strong>Appointment Date</strong></TableCell>
          <TableCell><strong>Status</strong></TableCell>
          {/* <TableCell align="center"><strong>Action</strong></TableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
        {appointments.length > 0 && appointments.map((appointment) => (
        <>
        {appointment.approved === true &&     
      <Slide direction="up" in={appointments} mountOnEnter unmountOnExit>
      <TableRow key={appointment.id}>
            <TableCell>{appointment.citizenFullName}</TableCell>
            <TableCell>{appointment.citizenCRN}</TableCell>
            <TableCell>{appointment.appointmentDate}</TableCell>
            <TableCell>{appointment.approved === false ? "Pending" : "Approved"}</TableCell>
            <TableCell align="center">
                 {/* <Tooltip title="Approve">
                        <IconButton aria-label="approve" onClick={()=>approveAppointment(appointment)}>
                          <ThumbUpIcon />
                        </IconButton>
                       </Tooltip>  */}
            </TableCell>
          </TableRow>
          </Slide>
          }
          </>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  </Container>
        </div>
        </div>
    )
}