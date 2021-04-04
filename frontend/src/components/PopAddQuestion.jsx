import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { StoreContext } from '../utils/store';
import apiRequest from '../utils/api';
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

const PopAddQuestion = (props) => {
  const classes = useStyles();
  const {
    data, gameId, close,
  } = props;
  const context = React.useContext(StoreContext);
  const { newQuestion: [, setNewQuestion] } = context;
  const [questionName, setQuestionName] = React.useState('');
  const [error, setErrror] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const updateQuestionName = (e) => {
    setQuestionName(e.target.value);
  };
  const createQuestionName = async (e) => {
    e.preventDefault();
    if (questionName === '') {
      setErrror(true);
      setErrorMessage('Question Name cannot be empty');
      return;
    }
    setNewQuestion(questionName);
    data.questions.push({ name: questionName });
    await apiRequest('putGameDetail', 'PUT', [gameId, data.questions, data.name, data.thumbnail]);
    close();
  };
  const closeError = () => {
    setErrror(false);
  };
  return (
    <div className="pop-window">
      <Card className={classes.root} variant="outlined">
        <form onSubmit={createQuestionName}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              <div className="info-banner">
                <button type="button" className="close-butt" onClick={close}>x</button>
              </div>
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              <TextField id="standard-basic" label="Question Name" type="text" onChange={updateQuestionName} />
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary" type="submit">
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

PopAddQuestion.propTypes = {
  data: PropTypes.string,
  gameId: PropTypes.string,
  close: PropTypes.func,
};

PopAddQuestion.defaultProps = {
  close: PropTypes.func,
  data: PropTypes.string,
  gameId: PropTypes.string,
};

export default PopAddQuestion;
