import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/login/login';
import ViewUser from './components/admin/viewUsers';
import CreateUser from './components/admin/createUser';
import UpdateUser from './components/updateUser/updateUser';
import AddNotes from './components/student/addNotes';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/updateUser" component={UpdateUser} />
        <Route exact path="/getUsers" component={ViewUser} />
        <Route exact path="/addNote" component={AddNotes} />
        <Route exact path="/createUser" component={CreateUser} />

        <Redirect from="/" to="/login" component={Login} />
      </Switch>

    </Router>
  );
}

export default App;
