import './App.css';
import SelectScreen from './components/SelectScreen'
import Dashboard from './components/Dashboard'
import CarrierAdministration from './components/CarrierAdministration'
import CarrierHandled from './components/CarrierHandled'
import CarrierPending from './components/CarrierPending'
import Error from './components/Error'
import SystemAdministration from './components/SystemAdministration'
import CreateCarrier from './components/CreateCarrier'
import CarrierSubmitted from './components/CarrierSubmitted'
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
      { currentUser.role === "ROLE_SUPERVISOR" &&
      <Route path="/create/carrier" exact component={CreateCarrier}></Route>
      }
      { currentUser.role === "ROLE_SUPERVISOR" &&
      <Route path="/create/carrier/submitted" exact component={CarrierSubmitted}></Route>
      }
      { currentUser.role !== undefined &&
      <Route path="/dashboard" exact component={Dashboard}></Route>
      }
      { currentUser.role === "ROLE_EMPLOYEE" &&
      <Route path="/carrier/:id/employee/:id/appointments/pending" exact component={CarrierPending}/>
      }
      { currentUser.role === "ROLE_EMPLOYEE" &&
      <Route path="/carrier/:id/employee/:id/appointments/handled" exact component={CarrierHandled}/>
      }
      { currentUser.role === "ROLE_SUPERVISOR" &&
      <Route path="/carrier/:id/administration" exact component={CarrierAdministration}/>
      }
      { currentUser.role === "ROLE_ADMIN" &&
      <Route path="/administration" exact component={SystemAdministration}/> 
      }
      <Route path='*' exact={true} component={Error} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
