import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import apiRequest from '../utils/api';
import { StoreContext } from '../utils/store';
import PopError from './PopError';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const PopAddQuiz = (props) => {
  const { close } = props;
  const [error, setErrror] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const context = React.useContext(StoreContext);
  const classes = useStyles();
  const { newquiz: [, setNewquiz] } = context;
  const [quizName, setQuizName] = React.useState('');
  const updateQuizName = (e) => {
    setQuizName(e.target.value);
  };
  const createQuizName = async (e) => {
    e.preventDefault();
    if (quizName === '') {
      setErrror(true);
      setErrorMessage('Quiz Name cannot be empty');
      return;
    }
    const response = await apiRequest('quiz/new', 'POST', quizName);
    if (response.status === 200) {
      setNewquiz(quizName);
      close();
    } else if (response.status === 400) {
      setErrror(true);
      setErrorMessage('Invalid Input');
    } else {
      setErrror(true);
      setErrorMessage('Invalid Token');
    }
  };
  const closeError = () => {
    setErrror(false);
  };
  return (
    <div className="pop-window">
      <Card className={classes.root} variant="outlined">
        <form onSubmit={createQuizName}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              <div className="info-banner">
                <button type="button" className="close-butt" onClick={close}>x</button>
              </div>
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              <TextField id="standard-basic" label="Quiz Name" type="text" onChange={updateQuizName} />
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </CardActions>
        </form>
      </Card>
      { error
        ? <PopError errorMessage={errorMessage} close={closeError} />
        : null }
    </div>
  );
};

PopAddQuiz.propTypes = {
  close: PropTypes.func,
};

PopAddQuiz.defaultProps = {
  close: PropTypes.func,
};

export default PopAddQuiz;
