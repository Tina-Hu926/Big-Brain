import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import {
  TextField, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import PopAddAnswer from '../components/PopAddAnswer';
import apiRequest from '../utils/api';
import PopAddMoreQuestionDetail from '../components/PopAddMoreQuestionDetail';
import PopError from '../components/PopError';

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    minWidth: 400,
  },
});

const EditQuestion = (props) => {
  const [showOriginalAnswer, setshowOriginalAnswer] = React.useState(true);
  const [showaddAnswer, setshowaddAnswer] = React.useState(true);
  const [showaddMoreDetail, setshowaddMoreDetail] = React.useState(true);
  const classes = useStyles();
  const { location } = props;
  const history = useHistory();
  const gameId = location.pathname.split('/')[3];
  const questionName = location.pathname.split('/')[4];
  const [questionDetail, setQuestionDetail] = React.useState([]);
  const [addAnswer, setAddAnswer] = React.useState(false);
  const [answerDetail, setAnswerDetail] = React.useState('');
  const [addMoreDetail, setAddMoreDetail] = React.useState(false);
  const [moreDetail, setMoreDetail] = React.useState([]);
  const [name, setName] = React.useState('');
  const [duration, setDuration] = React.useState('');
  const [choice, setChoice] = React.useState('Single');
  const [points, setPoints] = React.useState(0);
  const [originalName, setoriginalName] = React.useState('null');
  const [originalDuration, setoriginalDuration] = React.useState('null');
  const [originalChoice, setoriginalChoice] = React.useState('null');
  const [originalPoints, setoriginalPoints] = React.useState('null');
  const [originalVideo, setoriginalVideo] = React.useState('null');
  const [originalPic, setoriginalPic] = React.useState('');
  const [originalAnswer, setoriginalAnswer] = React.useState([]);
  const [originalCorrectAnswer, setoriginalCorrectAnswer] = React.useState('');
  const [error, setErrror] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const addNewAnswer = () => {
    setshowaddAnswer(false);
    setAddAnswer(true);
  };
  const thisQuestionDetail = (data) => {
    for (let i = 0; i < data.questions.length; i += 1) {
      if (data.questions[i].name === questionName) {
        setoriginalName(data.questions[i].name);
        setoriginalDuration(data.questions[i].duration);
        setoriginalChoice(data.questions[i].choice);
        setoriginalPoints(data.questions[i].points);
        setoriginalVideo(data.questions[i].videoLink);
        setoriginalPic(data.questions[i].pic);
        setoriginalCorrectAnswer(data.questions[i].correctAnswer);
        if (data.questions[i].answers) {
          const answer = [];
          for (let j = 0; j < data.questions[i].answers.length; j += 1) {
            answer.push('----------',
              `ID: ${data.questions[i].answers[j].answerID}`,
              `Title: ${data.questions[i].answers[j].title}`,
              `Colour: ${data.questions[i].answers[j].colour}`);
            setoriginalAnswer(answer);
          }
          break;
        }
      }
    }
  };
  const originalDetail = () => {
    setshowOriginalAnswer(false);
    apiRequest('getGameDetail', 'GET', gameId)
      .then((res) => res.json())
      .then(
        (data) => {
          thisQuestionDetail(data);
          setQuestionDetail({
            questions: data.questions, name: data.name, thumbnail: data.thumbnail,
          });
        },
      );
  };
  const goReturn = () => {
    history.push(`/dashboard/editGame/${gameId}`);
  };
  const updateQuestionDetail = async (e) => {
    e.preventDefault();
    if (name === '' || duration === '' || points === '' || answerDetail.length < 8 || answerDetail.length > 24) {
      setErrror(true);
      setErrorMessage('Name/Duration/Points cannot be empty, 2-6 Answers ');
      return;
    }
    const changeQuestionDetail = async () => {
      const videolink = moreDetail[0];
      const pic = moreDetail[1];
      if (questionDetail.questions) {
        for (let i = 0; i < questionDetail.questions.length; i += 1) {
          if (questionDetail.questions[i].name === questionName) {
            questionDetail.questions[i].name = name;
            questionDetail.questions[i].duration = duration;
            questionDetail.questions[i].choice = choice;
            questionDetail.questions[i].points = points;
            questionDetail.questions[i].answers = [];
            questionDetail.questions[i].videoLink = videolink;
            questionDetail.questions[i].pic = pic;
            questionDetail.questions[i].correctAnswer = [];
            for (let j = 0; j < answerDetail.length / 4; j += 1) {
              questionDetail.questions[i].answers[j] = {};
              questionDetail.questions[i].answers[j].title = answerDetail[j * 4 + 1].slice(14);
              questionDetail.questions[i].answers[j].answerID = `${name}${answerDetail[j * 4].slice(11)}`;
              if (answerDetail[j * 3 + 2].slice(16) === 'True') {
                questionDetail.questions[i].correctAnswer.push(`${name}${answerDetail[j * 4].slice(11)}`);
              }
            }
            break;
          }
        }
      }
    };
    await changeQuestionDetail();
    apiRequest('putGameDetail', 'PUT', [gameId, questionDetail.questions, questionDetail.name, questionDetail.thumbnail]);
    goReturn();
  };
  const AddAnswer = (i) => {
    setAnswerDetail(i);
  };
  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeDuration = (e) => {
    setDuration(e.target.value);
  };
  const choiceSelect = (event) => {
    setChoice(event.target.value);
  };
  const changePoints = (event) => {
    setPoints(event.target.value);
  };
  const addMore = () => {
    setshowaddMoreDetail(false);
    setAddMoreDetail(true);
  };
  const updateMoreDetail = (i) => {
    setMoreDetail(i);
  };
  const closeError = () => {
    setErrror(false);
  };
  return (
    <div className="quiz-container">
      <Card className={classes.root}>
        <CardActions>
          <FormGroup row>
            <FormControlLabel
              control={<Switch checked={showOriginalAnswer} name="checkedB" onClick={originalDetail} />}
              label="Step1: Click Left Button to Show Original Detail First"
            />
          </FormGroup>
        </CardActions>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Question Name:
            {originalName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Question Duration:
            {originalDuration}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Question Choice Type:
            {originalChoice}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Question Points:
            {originalPoints}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Question Video Link:
            {originalVideo}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Question Picture:
            <div><img src={originalPic} alt={originalPic} width="400" /></div>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Question Answer (Correct:
            {originalCorrectAnswer}
            ):
            {originalAnswer.map((item) => <Typography variant="body2" color="textSecondary" component="p">{item}</Typography>)}
          </Typography>
        </CardContent>
      </Card>
      <Card className={classes.root}>
        <div><TextField id="standard-basic" label="Question's Name" type="text" onChange={changeName} /></div>
        <div><TextField id="standard-basic" label="Question's Duration" type="number" onChange={changeDuration} /></div>
        <div><TextField id="standard-basic" label="Question's Points" type="number" onChange={changePoints} /></div>
        <div>
          <FormControl component="fieldset">
            <FormLabel component="legend">Question Type</FormLabel>
            <RadioGroup aria-label="choice" name="choice" value={choice} onChange={choiceSelect}>
              <FormControlLabel value="Single" control={<Radio />} label="Single Choice" />
              <FormControlLabel value="Multiple" control={<Radio />} label="Multiple Choice" />
            </RadioGroup>
          </FormControl>
        </div>
      </Card>
      <Card className={classes.root}>
        <CardActions>
          <FormGroup row>
            <FormControlLabel
              control={<Switch checked={showaddAnswer} name="checkedB" onClick={addNewAnswer} />}
              label="Step2: Click Left to Add Answer"
            />
          </FormGroup>
          { addAnswer
            ? <PopAddAnswer saveAnswerData={(i) => { AddAnswer(i); }} />
            : null }
        </CardActions>
      </Card>
      <Card className={classes.root}>
        <CardActions>
          <FormGroup row>
            <FormControlLabel
              control={<Switch checked={showaddMoreDetail} name="checkedB" onClick={addMore} />}
              label="Step3: Click Left to Add More (Optinal)"
            />
          </FormGroup>
          { addMoreDetail
            ? <PopAddMoreQuestionDetail saveMoreDetail={(i) => { updateMoreDetail(i); }} /> : null }
        </CardActions>
      </Card>
      <Button variant="contained" color="secondary" onClick={updateQuestionDetail}>
        Comfirmation!
      </Button>
      <Button variant="contained" color="grey" onClick={goReturn}>
        Return
      </Button>
      { error
        ? <PopError errorMessage={errorMessage} close={closeError} />
        : null }
    </div>
  );
};

EditQuestion.propTypes = {
  location: PropTypes.string,
};

EditQuestion.defaultProps = {
  location: PropTypes.string,
};

export default EditQuestion;
