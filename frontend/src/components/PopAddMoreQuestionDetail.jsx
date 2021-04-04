import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';

const PopAddMoreQuestionDetail = ({ saveMoreDetail }) => {
  const [link, setLink] = React.useState('');
  const [pic, setPic] = React.useState('');
  const uploadLink = (e) => {
    setLink(e.target.value);
  };
  const uploadPic = (i) => {
    const FR = new FileReader();
    FR.addEventListener('load', (e) => {
      const { result } = e.target;
      setPic(result);
    });
    FR.readAsDataURL(i.target.files[0]);
  };
  const uploadAll = (e) => {
    e.preventDefault();
    saveMoreDetail([link, pic]);
  };
  return (
    <div>
      <form onSubmit={uploadAll}>
        <div><TextField id="standard-basic" label="Video Link" type="text" onChange={uploadLink} /></div>
        <input type="file" name="Choose Pic" onChange={uploadPic} />
        <Button size="small" variant="contained" color="secondary" type="submit" value="Upload">
          Upload
        </Button>
      </form>
    </div>
  );
};

PopAddMoreQuestionDetail.propTypes = {
  saveMoreDetail: PropTypes.string,
};
PopAddMoreQuestionDetail.defaultProps = {
  saveMoreDetail: PropTypes.string,
};

export default PopAddMoreQuestionDetail;
