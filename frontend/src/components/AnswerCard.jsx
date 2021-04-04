import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import apiRequest from '../utils/api';

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 200,
  },
}));

const AnswerCard = (props) => {
  const classes = useStyles();
  const {
    inf, playerId,
  } = props;
  const select = async () => {
    const request = [playerId, [inf.answerID]];
    await apiRequest('putAnswer', 'PUT', request);
    // const res1 = await response1.json();
  };
  return (
    <Button className={classes.root} variant="contained" color="secondary">
      <div className="answer-card" role="button" onClick={select} onKeyDown={select} tabIndex="0">
        <p>{inf.title}</p>
      </div>
    </Button>
  );
};
AnswerCard.propTypes = {
  inf: PropTypes.objectOf(PropTypes.string),
  playerId: PropTypes.string,
};

AnswerCard.defaultProps = {
  inf: PropTypes.objectOf(PropTypes.string),
  playerId: PropTypes.string,
};

export default AnswerCard;
