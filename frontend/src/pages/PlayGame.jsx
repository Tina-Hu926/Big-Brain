import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Redirect, Link } from 'react-router-dom';
import { TextField } from '@material-ui/core';
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

const PlayGame = () => {
  const classes = useStyles();
  const [sessionId, setSessionId] = React.useState('');
  const [playerName, setPlayerName] = React.useState('');
  const [playing, setPlaying] = React.useState(false);
  const [playerId, setPlayerId] = React.useState(0);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [defaultsession, setDefaultsession] = React.useState('');
  React.useEffect(() => {
    if (localStorage.getItem('copying')) {
      setDefaultsession(localStorage.getItem('sessionId'));
      setSessionId(localStorage.getItem('sessionId'));
      localStorage.setItem('copying', false);
    }
  }, [defaultsession]);
  const updateSessionId = (e) => {
    setSessionId(e.target.value);
  };
  const updatePlayerName = (e) => {
    setPlayerName(e.target.value);
  };
  const startGame = async () => {
    if (sessionId === '' || playerName === '') {
      setError(true);
      setErrorMessage('Session Id/Player Name can not be empty');
      return;
    }
    const response = await apiRequest('joinsession', 'POST', [sessionId, playerName]);
    const res = await response.json();
    if (response.status !== 200) {
      setError(true);
      setErrorMessage('Invalid Session ID');
      return;
    }
    setPlayerId(res.playerId);
    setPlaying(true);
  };
  const closeError = () => {
    setError(false);
  };
  return (
    <div className={classes.root}>
      <div>
        <TextField id="standard-basic" label="Session ID:" type="text" onChange={updateSessionId} value={defaultsession} />
      </div>
      <div>
        <TextField id="standard" label="Player Name:" type="text" onChange={updatePlayerName} />
      </div>
      <Button size="small" variant="contained" color="secondary" onClick={startGame}>
        Join the Game
      </Button>
      {playing ? <Redirect to={`/playGame/${playerId}`} /> : null}
      <Button size="small" variant="contained" color="primary">
        <Link to="/">
          Back to Login
        </Link>
      </Button>
      {error
        ? <PopError errorMessage={errorMessage} close={closeError} />
        : null }
    </div>
  );
};

export default PlayGame;
