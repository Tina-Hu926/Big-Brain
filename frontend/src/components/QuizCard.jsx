import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import apiRequest from '../utils/api';
import { StoreContext } from '../utils/store';
import PopStartboard from './PopStartboard';
import PopError from './PopError';
import PopResult from './PopResult';

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    minWidth: 400,
  },
});

const QuizCard = (props) => {
  const classes = useStyles();
  const {
    id, name, thumbnail, QuizDetail,
  } = props;
  const context = React.useContext(StoreContext);
  const { newquiz: [, setNewQuiz] } = context;
  const [start, setStart] = React.useState(false);
  const [sessionId, setSessionId] = React.useState('');
  const [error, setErrror] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [showResult, setShowResult] = React.useState(false);

  const deletQuiz = async () => {
    const response = await apiRequest('auth/quiz/quizid', 'DELETE', id, 'null');
    setNewQuiz('deleting quiz');
    if (response.status === 200) {
      setNewQuiz('deleted quiz');
    } else {
      setErrror(true);
      setErrorMessage('Invalid Input');
    }
  };
  const startQuiz = async () => {
    setStart(true);
    await apiRequest('startquiz', 'POST', id);
  };
  const advance = async () => {
    const response = await apiRequest('advance', 'POST', id);
    if (response.status !== 200) {
      setErrror(true);
      setErrorMessage('You have not start yet');
    }
  };
  const stopQuiz = async () => {
    const response = await apiRequest('stopquiz', 'POST', id);
    if (response.status !== 200) {
      setErrror(true);
      setErrorMessage('You have not start yet');
    } else {
      setShowResult(true);
    }
  };
  const closePopStart = () => {
    setStart(false);
  };
  const closeError = () => {
    setErrror(false);
  };
  const closeResult = () => {
    setShowResult(false);
  };
  return (
    <Card className={classes.root}>
      <CardMedia
        component="img"
        height="200"
        src={thumbnail}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          The number of questions:
          {QuizDetail[0]}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Total time to complete:
          {QuizDetail[1]}
        </Typography>
      </CardContent>
      <Button size="small" color="primary" data={id}>
        <Link to={`/dashboard/editGame/${id}`}>
          Edit
        </Link>
      </Button>
      <Button size="small" color="primary" onClick={deletQuiz}>
        Delete
      </Button>
      <Button size="small" color="primary" onClick={startQuiz}>
        Start
      </Button>
      <Button size="small" color="primary" onClick={stopQuiz}>
        Stop
      </Button>
      {showResult ? <PopResult close={closeResult} sessionId={sessionId} /> : null}
      <Button size="small" color="primary" onClick={advance}>
        Advance
      </Button>
      {start ? <PopStartboard id={id} close={closePopStart} setSessionId={setSessionId} /> : null}
      { error
        ? <PopError errorMessage={errorMessage} close={closeError} />
        : null }
    </Card>
  );
};

QuizCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  thumbnail: PropTypes.string,
  QuizDetail: PropTypes.string,
};

QuizCard.defaultProps = {
  id: PropTypes.number,
  name: PropTypes.string,
  thumbnail: PropTypes.string,
  QuizDetail: PropTypes.string,
};

export default QuizCard;
