import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/login/login';
import ViewUser from './components/admin/viewUsers';
import CreateUser from './components/admin/createUser/createUser';
import UpdateUser from './components/updateUser/updateUser';
import AddNotes from './components/student/addNotes';

import CreateNotes from './components/student/createNotes';
import UpdateNotes from './components/student/updateNotes';


function App() {
  return (
    <Router>
      <Switch>
        {/* login */}
        <Route exact path="/login" component={Login} />

        {/* Admin Paths */}
        <Route exact path="/getUsers" component={ViewUser} />
        <Route exact path="/createUser" component={CreateUser} />

        {/* student Paths */}
        <Route exact path="/addNote" component={AddNotes} />
        <Route exact path="/craeteNotes" component={CreateNotes} />
        <Route exact path="/updateNotes/:id" component={UpdateNotes} />

        {/* update User */}
        <Route exact path="/updateUser" component={UpdateUser} />

        <Redirect from="/" to="/login" component={Login} />
      </Switch>

      <ToastContainer position="top-center"
        autoClose={2000}
        hideProgressBar={false} />

    </Router>
  );
}

export default App;
