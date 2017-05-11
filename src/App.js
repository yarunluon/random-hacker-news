import 'whatwg-fetch';
import React, { Component } from 'react';
import getter from 'lodash/get';
import times from 'lodash/times';
import { Button, Col, Glyphicon, Grid, PageHeader, Row } from 'react-bootstrap';

import ProgressBar from './ProgressBar';
import Story from './Story';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: 0,
      stories: [],
    };

    this.fetchStories.bind(this);
  }

  componentDidMount() {
    this.fetchStories();
  }

  fetchStories() {
    this.setState({ loading: 0, stories: [] });

    // Fetch the list of top stories
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(response => response.json())
      .then(json => {
        const NUM_STORIES = 10;

        // Randomly select 10 stories
        const topStoryIds = times(NUM_STORIES, () => {
          return json[Math.floor(Math.random() * json.length)];
        });

        // Make sure all the stories are returned before preceding
        Promise.all(topStoryIds.map((storyId) => {
          // Get each story
          return fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
            .then(response => response.json())
            .then(storyJson => {
              // Get author
              return fetch(`https://hacker-news.firebaseio.com/v0/user/${storyJson.by}.json`)
                .then(response => response.json())
                .then(authorJson => {
                  this.setState({ loading: this.state.loading + (100 / NUM_STORIES) });

                  // All the collected data for that story id
                  return {
                    id: storyId,
                    story: storyJson,
                    author: authorJson,
                  };
                });
            })
        }))
          .then(stories => {
            // Sort the stories by score ascending
            const sortedStories = stories.slice().sort((a, b) => {
              const scoreA = getter(a, 'story.score', 0);
              const scoreB = getter(b, 'story.score', 0);
              return +(scoreA > scoreB) || +(scoreA === scoreB) -1
            })
            this.setState({ loading: 100, stories: sortedStories });
          });
      })
      .catch(error => {
        console.error('Problem fetching stories:', error);
      })
  }

  render() {
    const { loading, stories } = this.state;
    const storyRows = stories.map((story, index) => (
      <Story story={story} key={`story-${story.id}-${index}`} />)
    );
    const progressBarJsx = loading < 100 ? (<ProgressBar loading={loading} />) : null
    const storiesJsx = loading >= 100 ? storyRows : null;

    return (
      <Grid>
        <Row>
          <Col xs={12} md={12}>
            <PageHeader>
              10 Random Top Hacker News Stories
            </PageHeader>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            {progressBarJsx}
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            {storiesJsx}
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <hr />
            <a target="_blank" href="https://www.github.com/yarunluon">
              Yarun Luon
            </a>
            {` | `}
            <a target="_blank" href="https://www.github.com/yarunluon/random-hacker-news">
              Source Code
            </a>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
