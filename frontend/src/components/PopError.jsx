import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

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

const PopError = (props) => {
  const classes = useStyles();
  const {
    errorMessage, close,
  } = props;
  return (
    <div className="pop-window">
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            <div className="info-banner">
              <button type="button" className="close-butt" onClick={close}>x</button>
            </div>
          </Typography>
          <Typography gutterBottom variant="h5" component="p">
            {errorMessage}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

PopError.propTypes = {
  errorMessage: PropTypes.string,
  close: PropTypes.func,
};

PopError.defaultProps = {
  errorMessage: PropTypes.string,
  close: PropTypes.func,
};

export default PopError;
