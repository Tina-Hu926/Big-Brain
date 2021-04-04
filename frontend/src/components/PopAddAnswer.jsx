import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
  TextField, FormControl, FormLabel,
  FormControlLabel, RadioGroup, Radio,
  FormHelperText,
} from '@material-ui/core';
import PopError from './PopError';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    maxWidth: 345,
  },
}));

let time = 0;
const PopAddAnswer = ({ saveAnswerData }) => {
  const [error, setErrror] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [correct, setCorrect] = React.useState('True');
  const [answerList, setAnswerList] = React.useState([]);
  const classes = useStyles();
  const changeTitle = (e) => {
    setTitle(`Answer Title: ${e.target.value}`);
  };
  const answerID = [1, 2, 3, 4, 5, 6];
  const createAnswerDetail = async (e) => {
    e.preventDefault();
    if (answerList.length === 24) {
      setErrror(true);
      setErrorMessage('Maxmum 6 Answers');
      return;
    }
    setAnswerList([...answerList, ...[`Answer No. ${answerID[time]}`, title, `Answer Correct: ${correct}`, '----------']]);
    if (time === 5) {
      time = 0;
    } else {
      time += 1;
    }
  };
  React.useEffect(() => {
    saveAnswerData(answerList);
  }, [answerList, saveAnswerData]);
  const correctOrnot = (e) => {
    setCorrect(e.target.value);
  };
  const closeError = () => {
    setErrror(false);
  };
  return (
    <div>
      <form onSubmit={createAnswerDetail}>
        <Card className={classes.root}>
          <CardContent>
            {answerList.map(
              (item) => <Typography variant="body2" color="textSecondary" component="p">{item}</Typography>,
            )}
          </CardContent>
          <FormControl className={classes.formControl}>
            <FormHelperText>The Number of Answers:</FormHelperText>
            <FormHelperText>Min: 2, Max: 6</FormHelperText>
          </FormControl>
          <TextField id="standard-basic" label="Answer title" type="text" onChange={changeTitle} />
          <FormControl component="fieldset">
            <FormLabel component="legend">Question Type</FormLabel>
            <RadioGroup aria-label="correct" name="correct" value={correct} onChange={correctOrnot}>
              <FormControlLabel value="True" control={<Radio />} label="True" />
              <FormControlLabel value="False" control={<Radio />} label="False" />
            </RadioGroup>
          </FormControl>
          <CardActions>
            <Button size="small" variant="contained" color="secondary" type="submit">
              Submit This Answer
            </Button>
          </CardActions>
        </Card>
      </form>
      { error
        ? <PopError errorMessage={errorMessage} close={closeError} />
        : null }
    </div>
  );
};
PopAddAnswer.propTypes = {
  saveAnswerData: PropTypes.string,
};
PopAddAnswer.defaultProps = {
  saveAnswerData: PropTypes.string,
};

export default PopAddAnswer;
