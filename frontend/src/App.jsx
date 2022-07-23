import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/login/login';
import ViewUser from './components/admin/viewUsers';
import CreateUser from './components/admin/createUser';


function App() {
  return (
    <Router>
      <Switch>
        {/* <Login /> */}
        {/* <ViewUser /> */}
        <CreateUser />
      </Switch>

    </Router>
  );
}

export default App;
