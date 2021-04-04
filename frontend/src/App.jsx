import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch, useHistory,
  Route,
  Link,
} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import EditQuestion from './pages/EditQuestion';
import EditGame from './pages/EditGame';
import PlayGame from './pages/PlayGame';
import Answerboard from './pages/Answerboard';
import { StoreContext } from './utils/store';
import apiRequest from './utils/api';

export default function App() {
  const history = useHistory();
  const context = React.useContext(StoreContext);
  const { islogged: [islogged, setIslogged] } = context;
  const logout = () => {
    if (islogged) {
      apiRequest('auth/logout', 'POST');
      localStorage.setItem('token', null);
      setIslogged(false);
    }
    history.push('');
    history.go(0);
    return null;
  };
  return (
    <>
      <header className="navbar">
        {islogged ? <nav className="navbar"><Button variant="contained" color="primary" onClick={logout}>logout</Button></nav> : <Link to="/" /> }
      </header>
      <main>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/dashboard/editGame/:quizid" component={EditGame} />
            <Route exact path="/dashboard/editQuestion/:quizid/:questionid" component={EditQuestion} />
            <Route exact path="/playGame" component={PlayGame} />
            <Route exact path="/playGame/:playerid" component={Answerboard} />
          </Switch>
        </Router>
      </main>
    </>
  );
}
