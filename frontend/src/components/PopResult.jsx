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

const PopResult = ({ close, sessionId }) => {
  const classes = useStyles();
  const [result, setResult] = React.useState(null);
  const viewResult = async () => {
    const response = await apiRequest('adminResult', 'GET', sessionId);
    const res = await response.json();
    setResult(res[0].name);
  };
  return (
    <div className="pop-window">
      {result ? <p>{result}</p> : null}
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            <div className="info-banner">
              <button type="button" className="close-butt" onClick={close}>x</button>
            </div>
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Would you like to view the results?
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" type="submit" onClick={viewResult}>
            Yes
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

PopResult.propTypes = {
  close: PropTypes.func,
  sessionId: PropTypes.number,
};

PopResult.defaultProps = {
  close: PropTypes.func,
  sessionId: PropTypes.number,
};

export default PopResult;
