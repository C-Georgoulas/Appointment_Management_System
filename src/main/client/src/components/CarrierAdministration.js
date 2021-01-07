import React, { useState, useEffect, useRef }from 'react'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { TransitionGroup } from 'react-transition-group';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import {Link} from 'react-router-dom';
import Nav from './Nav'
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AuthService from ".././services/auth.service";
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

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

  export default function DataTable() {
    const classes = useStyles();

// add employee dialog

const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
  setOpen(true);
};

const handleDialogClose = () => {
  setOpen(false);
};

// date picker for employees

const [selectedDate, setSelectedDate] = React.useState(new Date('2020-01-01T00:00:00'));

const handleDateChange = (date) => {
    setSelectedDate(date);
    setEmployee({...employee, birthday: date})
  };

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
  fetch(`http://localhost:8080/supervisor/${currentUser.id}/carriers`, {
          headers: new Headers({
              'Authorization': 'Bearer ' + currentUser.accessToken, 
            }), 
      })
      .then(response => response.json())
      .then(json => setCarrier(json))
  }, [currentUser]); //Should be currentUser not carrier

const [employees, setEmployees] = useState([

])

// fetches the users from the specific carrier

useEffect( () => {
  fetch(`http://localhost:8080/supervisor/carriers/${carrier.id}/employees/`, {
      headers: new Headers({
          'Authorization': 'Bearer ' + currentUser.accessToken, 
        }), 
  })
  .then(response => response.json())
  .then(json => setEmployees(json))
}, [employees])

//  // Post request to add a user

const [employee, setEmployee] = useState({})


 const onEmployeeSubmit = (e) => {
  e.preventDefault()
  const userReceived = AuthService.getCurrentUser();
  console.log(employee)
  console.log("employee to send")
  fetch(`http://localhost:8080/supervisor/carriers/${carrier.id}/employees/create`, {
    method: 'POST',
    headers: new Headers({
      'Authorization': 'Bearer ' + userReceived.accessToken,
      "Content-Type": "application/json", 
    }), 
    body: JSON.stringify(employee),
  })
  .then(res => res.json())
  .then(json => setEmployees(json.employee))
  .then(json => setEmployee({
    fullname: "",
    address: "",
    email: "",
    username: "",
    password: "",
    crn: "",
    birthday: ""
  }))
  .then(setOpen(false))
}

// DELETE EMPLOYEE / USER

// delete request

const deleteUser = (employeeID) => {
  console.log(employeeID)
  const userReceived = AuthService.getCurrentUser();
  fetch(`http://localhost:8080/supervisor/carriers/${carrier.id}/employees/${employeeID}`, {
    method: 'DELETE',
    headers: new Headers({
      'Authorization': 'Bearer ' + userReceived.accessToken,
      "Content-Type": "application/json", 
    }), 
  })
  .then(response => response.json())
  console.log(employeeID + ":employee deleted!!!")
};

// Put request to edit the specific employee

// const onEditedUserSubmit = (e) => {
//   e.preventDefault()
//   const userReceived = AuthService.getCurrentUser();
//   console.log("attempting to send")
//   console.log(editEmployee);
//   setUser(editEmployee)
//   console.log(user);
//   fetch(`http://localhost:8080/admin/users/${editUser.id}/edit`, {
//     method: 'PUT',
//     headers: new Headers({
//       'Authorization': 'Bearer ' + userReceived.accessToken,
//       "Content-Type": "application/json", 
//     }), 
//     body: JSON.stringify(editUser),
//   })
//   .then(res => res.json())
//   .then(json => setUsers(json.editUser))
// }

// for form validation in notes
const form = useRef();
const form2 = useRef();


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
      <Button variant="outlined" color="black" onClick={handleClickOpen}>
      Add Employee
      </Button>
      {/* overflow hides the scrollbar at the table on patient GET/POST/UPDATE/DELETE */}
      <TableContainer component={Paper} style={{overflow: "hidden"}}>
      <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell><strong>Name</strong></TableCell>
          <TableCell><strong>Username</strong></TableCell>
          <TableCell><strong>Email</strong></TableCell>
          <TableCell><strong>Civil Registration Number</strong></TableCell>
          {/* <TableCell><strong>System Role</strong></TableCell> */}
          <TableCell><strong>Address</strong></TableCell>
          <TableCell><strong>Date of birth</strong></TableCell>
          <TableCell align="center"><strong>Action</strong></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {employees && employees.length > 0 && employees.map((employeeCarrier) => (   
      <Slide direction="up" in={employees} mountOnEnter unmountOnExit>
      <TableRow key={employeeCarrier.id}>
            <TableCell>{employeeCarrier.fullname}</TableCell>
            <TableCell>{employeeCarrier.username}</TableCell>
            <TableCell>{employeeCarrier.email}</TableCell>
            <TableCell>{employeeCarrier.crn}</TableCell>
            {/* <TableCell>{employeeCarrier.role}</TableCell> */}
            <TableCell>{employeeCarrier.address}</TableCell>
            <TableCell>{employeeCarrier.birthday}</TableCell>
            <TableCell align="center">
            {/* <Tooltip title="Modify">
                        <IconButton aria-label="modify" size="small" onClick={() => handleClickOpenEditUser(user)}>
                            <EditIcon />
                         </IconButton>
                        </Tooltip>  */}
                      <Tooltip title="Delete">
                        <IconButton aria-label="delete" onClick={()=>deleteUser(employeeCarrier.id)}>
                          <DeleteIcon />
                        </IconButton>
                       </Tooltip> 
            </TableCell>
          </TableRow>
          </Slide>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  <Dialog open={open} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
{/* <form className={classes.root} noValidate autoComplete="off" onSubmit={onEmployeeSubmit}> */}
<ValidatorForm
            ref={form}
            onSubmit={onEmployeeSubmit}
            onError={errors => console.log(errors)}>
        <DialogTitle id="form-dialog-title">EMPLOYEE CREATION</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new employee to the system, please use the form below
          </DialogContentText>
          <TextValidator
            variant="outlined"
            margin="normal"
            fullWidth
            type="text"
            label="Full name"
            name="employee[fullname]"
            onChange={e => setEmployee({...employee, fullname: e.target.value})}
            value={employee.fullname}
            validators={['required']}
            errorMessages={['Please add a full name to the employee!']}
            autoFocus
          />
          <TextValidator
            variant="outlined"
            margin="normal"
            fullWidth
            type="text"
            label="Address"
            name="employee[address]"
            onChange={e => setEmployee({...employee, address: e.target.value})}
            value={employee.address}
            validators={['required']}
            errorMessages={['Please add an address to the employee!']}
            autoFocus
          />
          <TextValidator
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="employee[email]"
            autoComplete="email"
            autoFocus
            onChange={e => setEmployee({...employee, email: e.target.value})}
            value={employee.email}
            validators={['required']}
            errorMessages={['Please add an e-mail address to the employee!']}
          />
          <TextValidator
            variant="outlined"
            margin="normal"
            fullWidth
            type="number"
            label="Civil Registration Number"
            name="employee[crn]"
            onChange={e => setEmployee({...employee, crn: e.target.value})}
            value={employee.crn}
            validators={['required']}
            errorMessages={['Please add a civil registration number to the employee!']}
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
          name="employee[birthday]"
          fullWidth
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>
        <TextValidator
            variant="outlined"
            margin="normal"
            fullWidth
            type="text"
            label="Username"
            name="employee[username]"
            onChange={e => setEmployee({...employee, username: e.target.value})}
            value={employee.username}
            validators={['required']}
            errorMessages={['Please add a username to the employee!']}
            autoFocus
          />
          <TextValidator
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            label="Password"
            name="employeee[password]"
            onChange={e => setEmployee({...employee, password: e.target.value})}
            value={employee.password}
            validators={['required']}
            errorMessages={['Please add a password to the employee!']}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Add
          </Button>
        </DialogActions>
        {/* </form> */}
        </ValidatorForm>
      </Dialog>
        </Container>
        </div>
        </div>
    )
}