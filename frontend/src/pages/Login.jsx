import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import { StoreContext } from '../utils/store';
import apiRequest from '../utils/api';
import PopError from '../components/PopError';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '80%',
    },
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const context = React.useContext(StoreContext);
  const { islogged: [, setIslogged] } = context;
  const [error, setErrror] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const LoginHandeler = async (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setErrror(true);
      setErrorMessage('Email/Password cannot be empty');
      return;
    }
    const response = await apiRequest('auth/login', 'POST', [email, password]);
    const res = await response.json();
    if (response.status === 200) {
      localStorage.setItem('token', `Bearer ${res.token}`);
      setIslogged(true);
      history.push('/dashboard');
    } else {
      setErrror(true);
      setErrorMessage('Invalid Input');
    }
  };
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };
  const updatePassword = (e) => {
    setPassword(e.target.value);
  };
  const goRegister = () => {
    history.push('/register');
  };
  const joinGame = () => {
    history.push('/playGame');
  };
  const closeError = () => {
    setErrror(false);
  };
  return (
    <div>
      <form onSubmit={LoginHandeler} className={classes.root}>
        <div>
          <TextField id="standard-basic" label="Email" type="text" onChange={updateEmail} />
        </div>
        <div>
          <TextField id="standard-basic" label="password" type="text" onChange={updatePassword} />
        </div>
        <Button variant="contained" color="secondary" type="submit">
          Login
        </Button>
      </form>
      <div className="togetherButton">
        <Button color="primary" onClick={goRegister}>
          Register
        </Button>
        <Button color="primary" onClick={joinGame}>
          Join a NewGame
        </Button>
      </div>
      { error
        ? <PopError errorMessage={errorMessage} close={closeError} />
        : null }
    </div>
  );
};

export default Login;
