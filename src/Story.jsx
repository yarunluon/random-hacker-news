import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { Media } from 'react-bootstrap';

const Story = (props) => {
  const {
    story: {
      story: { title, url, time, score, by } = {},
      author: { karma } = {},
    },
  } = props;

  const titleJsx = url
    ? (<a target="_blank" href={url}>{title}</a>)
    : `${title} [No link]`;

  return (
    <Media>
      <Media.Left align="top">
        {score}
      </Media.Left>
      <Media.Body>
        <Media.Heading>
          {titleJsx}
        </Media.Heading>
        <p>
          posted
          <span
            title={moment(time * 1000).format('LLLL')}
          >
            {` ${moment(time * 1000).fromNow()} `}
          </span>
          by {by} ({karma})
        </p>
      </Media.Body>
    </Media>
  );
}

export default Story;

Story.defaultProps = {
  story: {},
};

Story.propTypes = {
  story: PropTypes.shape({
    author: PropTypes.shape({}),
    story: PropTypes.shape({}),
  }),
}
