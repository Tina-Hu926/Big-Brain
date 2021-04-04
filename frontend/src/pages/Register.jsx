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

const Register = () => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const context = React.useContext(StoreContext);
  const { islogged: [, setIslogged] } = context;
  const [error, setErrror] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const RegisterHandeler = async (e) => {
    e.preventDefault();
    if (email === '' || password === '' || name === '') {
      setErrror(true);
      setErrorMessage('Email/Password/Name cannot be empty');
      return;
    }
    const response = await apiRequest('auth/register', 'POST', [email, password, name]);
    const res = await response.json();
    if (response.status === 200) {
      localStorage.setItem('token', `Bearer ${res.token}`);
      setIslogged(true);
      history.push('/dashboard');
    } else {
      setErrror(false);
      setErrorMessage('Invalid Input');
    }
  };
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };
  const updatePassword = (e) => {
    setPassword(e.target.value);
  };
  const updateName = (e) => {
    setName(e.target.value);
  };
  const backLogin = () => {
    history.push('/Login');
  };
  const closeError = () => {
    setErrror(false);
  };
  return (
    <>
      <form onSubmit={RegisterHandeler} className={classes.root}>
        <div>
          <TextField id="standard-basic" label="Email:" type="text" onChange={updateEmail} />
        </div>
        <div>
          <TextField id="standard-basic" label="password:" type="text" onChange={updatePassword} />
        </div>
        <div>
          <TextField id="standard-basic" label="Name:" type="text" onChange={updateName} />
        </div>
        <Button variant="contained" color="secondary" type="submit">
          Regist
        </Button>
        <Button variant="contained" color="primary" onClick={backLogin}>
          Login
        </Button>
        { error
          ? <PopError errorMessage={errorMessage} close={closeError} />
          : null }
      </form>
    </>
  );
};

export default Register;
