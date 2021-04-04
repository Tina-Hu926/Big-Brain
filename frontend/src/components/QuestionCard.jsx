import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import apiRequest from '../utils/api';
import { StoreContext } from '../utils/store';

const useStyles = makeStyles({
  root: {
    minWidth: 400,
  },
});

const QuestionCard = (props) => {
  const { name, gameId, data } = props;
  const context = React.useContext(StoreContext);
  const { newQuestion: [, setNewQuestion] } = context;
  const classes = useStyles();
  const deleteQuestion = async () => {
    setNewQuestion('deleting question');
    const deleteDate = () => {
      for (let i = 0; i < data.questions.length; i += 1) {
        if (data.questions[i].name === name) {
          data.questions.splice(i, 1);
        }
      }
    };
    await deleteDate();
    apiRequest('putGameDetail', 'PUT', [gameId, data.questions, data.name, data.thumbnail]);
    setNewQuestion('deleted');
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          <Link to={`/dashboard/editQuestion/${gameId}/${name}`}>
            Edit Question
          </Link>
        </Button>
        <Button size="small" color="primary" onClick={deleteQuestion}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

QuestionCard.propTypes = {
  gameId: PropTypes.string,
  name: PropTypes.string,
  data: PropTypes.string,
};

QuestionCard.defaultProps = {
  gameId: PropTypes.string,
  name: PropTypes.string,
  data: PropTypes.string,
};

export default QuestionCard;
