import Signup from './components/Signup'
import SelectScreen from './components/SelectScreen'
import Dashboard from './components/Dashboard'
import Error from './components/Error'
import NewAppointment from './components/NewAppointment'
import AllAppointments from './components/AllAppointments'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import React, { useState, useEffect }from 'react'
import AuthService from "./services/auth.service";

function App() {

  const [currentUser, setCurrentUser] = useState({

  });

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      console.log(currentUser);
    } else {
      console.log("user not logged");
    }
  }, []);

  return (
    <Router>
    <div className="App">
      <Switch>
      <Route path="/" exact component={SelectScreen}></Route>
      <Route path="/register" exact component={Signup}></Route>
      { currentUser.role === "ROLE_CITIZEN" &&
      <Route path="/dashboard" exact component={Dashboard}></Route>
      }
     { currentUser.role === "ROLE_CITIZEN" &&
      <Route path="/create/appointment" exact component={NewAppointment}></Route>
    }
    { currentUser.role === "ROLE_CITIZEN" &&
      <Route path="/appointments/:id" exact component={AllAppointments}></Route>
    }
    <Route path='*' exact={true} component={Error} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
