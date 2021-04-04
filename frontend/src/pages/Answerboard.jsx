import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import apiRequest from '../utils/api';
import AnswerCard from '../components/AnswerCard';
import PopError from '../components/PopError';

const useStyles = makeStyles({
  root: {
    minWidth: 400,
  },
  media: {
    height: 140,
  },
});

const Answerboard = (props) => {
  const [error, setErrror] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const classes = useStyles();
  const { match } = props;
  const { params: player } = match;
  const { playerid: playerId } = player;
  const [question, setQuestion] = React.useState({});
  const [back, setBack] = React.useState(false);
  const [duration, setDuration] = React.useState(-1);
  const [status, setStatus] = React.useState(-1);
  const [start, setStart] = React.useState(1);
  const [questionName, setQuestionName] = React.useState('');
  const [answers, setAnswers] = React.useState('');
  const [ended, setEnded] = React.useState(false);
  const [correct, setCorrect] = React.useState(null);
  const [pic, setPic] = React.useState('');
  const [video, setVideo] = React.useState('');

  if (start > 0 && !ended) {
    setTimeout(() => setStart(start + 1), 2000);
  }
  if (status > 0 && !ended) {
    setTimeout(() => setStatus(status + 1), 1000);
  }
  const closeError = () => {
    setErrror(false);
  };
  React.useEffect(() => {
    const fn = async () => {
      const response = await apiRequest('playerStatus', 'GET', playerId);
      const res = await response.json();
      if (res.started) {
        setStatus(1);
      }
    };
    if (start > 0 && !ended) {
      fn();
    }
  }, [playerId, start, ended]);
  React.useEffect(() => {
    const fetch = async () => {
      const response1 = await apiRequest('playerStatus', 'GET', playerId);
      const res1 = await response1.json();
      if (res1.started) {
        const response = await apiRequest('getQuestion', 'GET', playerId);
        const res = await response.json();
        if (response.status === 200) {
          if (JSON.stringify(question) !== JSON.stringify(res)) {
            setCorrect('');
            setDuration(res.question.duration);
            setQuestionName(res.question.questionName);
            setPic(res.question.pic);
            setAnswers(res.question.answers);
            setQuestion(res);
            setVideo(res.question.videoLink);
          }
        }
      } else {
        setEnded(true);
      }
    };
    if (status > 0 && !ended) {
      fetch();
    }
  }, [playerId, status, question, ended]);

  React.useEffect(() => {
    if (duration > 0) {
      setTimeout(() => setDuration(duration - 1), 1000);
      setErrror(false);
    }
    if (duration === 0) {
      setErrror(true);
      setErrorMessage('Time Out! Can not Change Answer');
      const fetch = async () => {
        const response = await apiRequest('getAnswer', 'GET', playerId);
        const res = await response.json();
        if (response.status === 200) {
          const ans = answers;
          for (let i = 0; i < ans.length; i += 1) {
            if (ans[i].answerID === res.answerIds[0]) {
              setCorrect(ans[i].title);
            }
          }
        }
        setStatus(1);
        const response1 = await apiRequest('playerStatus', 'GET', playerId);
        const res1 = await response1.json();
        if (!res1.started) {
          setEnded(true);
        }
      };
      fetch();
    }
  }, [playerId, duration, answers]);

  const collectResult = async () => {
    await apiRequest('playerResult', 'GET', playerId);
  };
  return (
    <Card className={classes.root}>
      <Button variant="contained" color="primary" onClick={() => setBack(true)}>return</Button>
      {back ? <Redirect to="/" /> : null }
      {pic ? <div><img src={pic} alt="question pic" /></div> : null}
      {video
        ? <CardMedia className={classes.media} title="Contemplative Reptile" src={video} /> : null}
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {status > 0 && !ended ? <p>{duration}</p> : <p>Wait Start</p>}
          <p>
            {questionName}
          </p>
        </Typography>
      </CardContent>
      <div>
        {correct ? <div id="correct">{`correct answer is ${correct}`}</div> : null}
        {answers
          ? answers.map(
            (key) => <AnswerCard key={key.answerID} inf={key} playerId={playerId} />,
          )
          : null}
      </div>
      { error
        ? <PopError errorMessage={errorMessage} close={closeError} />
        : null }
      {ended ? <div>Session Ended!</div> : null}
      {ended ? <Button variant="contained" color="primary" onClick={collectResult}>collect Result</Button> : null}
    </Card>
  );
};

Answerboard.propTypes = {
  match: PropTypes.number,
};
Answerboard.defaultProps = {
  match: PropTypes.number,
};

export default Answerboard;
