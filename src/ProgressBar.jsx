import PropTypes from 'prop-types';
import React from 'react';
import { ProgressBar as BootstrapProgressBar } from 'react-bootstrap';


const ProgressBar = (props) => {
  const { loading } = props;
  return (
    <div>
      <h4>Fetching juicy stories...</h4>
      <BootstrapProgressBar active now={loading} label={`${loading}%`} />
    </div>
  );
}

export default ProgressBar;

ProgressBar.defaultProps = {
  loading: 0,
}

ProgressBar.propTypes = {
  loading: PropTypes.number,
}
