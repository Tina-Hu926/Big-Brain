import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
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

const PopAddThumbnail = (props) => {
  const classes = useStyles();
  const [error, setErrror] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const {
    data, gameId, close,
  } = props;
  const [pic, setPic] = React.useState('');
  const closeError = () => {
    setErrror(false);
  };
  const uploadPic = (i) => {
    const FR = new FileReader();
    FR.addEventListener('load', (e) => {
      const { result } = e.target;
      setPic(result);
    });
    FR.readAsDataURL(i.target.files[0]);
  };
  const uploadAll = async (e) => {
    e.preventDefault();
    if (pic === '') {
      setErrror(true);
      setErrorMessage('You have not choose a pic');
      return;
    }
    data.thumbnail = pic;
    await apiRequest('putGameDetail', 'PUT', [gameId, data.questions, data.name, data.thumbnail]);
    close();
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
            <input type="file" name="Choose Pic" onChange={uploadPic} />
            <div><img src={pic} alt={pic} width="350" /></div>
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" type="submit" onClick={uploadAll}>
            Upload
          </Button>
        </CardActions>
      </Card>
      { error
        ? <PopError errorMessage={errorMessage} close={closeError} />
        : null }
    </div>
  );
};

PopAddThumbnail.propTypes = {
  data: PropTypes.string,
  gameId: PropTypes.string,
  close: PropTypes.func,
};

PopAddThumbnail.defaultProps = {
  close: PropTypes.func,
  data: PropTypes.string,
  gameId: PropTypes.string,
};

export default PopAddThumbnail;
