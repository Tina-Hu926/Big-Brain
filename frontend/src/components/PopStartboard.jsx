import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import apiRequest from '../utils/api';

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

const PopStartboard = (props) => {
  const { id, close, setSessionId } = props;
  const classes = useStyles();
  const [sess, setSess] = React.useState('');
  const fn = async () => {
    const response = await apiRequest('getOneQuiz', 'GET', id);
    const res = await response.json();
    setSessionId(res.active);
    setSess(res.active);
  };
  fn();
  const url = window.location.host;
  const copyLink = () => {
    navigator.clipboard.writeText(`http://${url}/playGame`);
    localStorage.setItem('copying', true);
    localStorage.setItem('sessionId', sess);
  };
  return (
    <div className="pop-window">
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            <div className="info-banner">
              <button type="button" className="close-butt" onClick={close}>x</button>
            </div>
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Sesson ID:
            <div>{sess}</div>
            Click Advance Button to Start Question
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" onClick={copyLink}>Copy Link</Button>
        </CardActions>
      </Card>
    </div>
  );
};

PopStartboard.propTypes = {
  id: PropTypes.number,
  close: PropTypes.func,
  setSessionId: PropTypes.func,
};

PopStartboard.defaultProps = {
  id: PropTypes.number,
  close: PropTypes.func,
  setSessionId: PropTypes.func,
};

export default PopStartboard;
