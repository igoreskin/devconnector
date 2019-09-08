import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-router-dom';
import { addComment } from '../../actions/postActions';

const CommentForm = ({ addComment }) => {
  return (
    <div>
      
    </div>
  )
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
}

export default connect(null, { addComment })(CommentForm);
