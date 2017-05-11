import 'whatwg-fetch';
import React, { Component } from 'react';
import getter from 'lodash/get';
import times from 'lodash/times';
import { ProgressBar, Table } from 'react-bootstrap';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: 0,
      stories: [],
    };
  }

  componentDidMount() {
    this.fetchStories();
  }

  fetchStories() {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(response => response.json())
      .then(json => {
        const topStoryIds = times(10, () => {
          return json[Math.floor(Math.random() * json.length)];
        });

        Promise.all(topStoryIds.map((storyId) => {
          return fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
            .then(response => response.json())
            .then(storyJson => {
              return fetch(`https://hacker-news.firebaseio.com/v0/user/${storyJson.by}.json`)
                .then(response => response.json())
                .then(authorJson => {
                  this.setState({ loading: this.state.loading + 10 });
                  return {
                    id: storyId,
                    story: storyJson,
                    author: authorJson,
                  };
                });
            })
        }))
          .then(stories => {
            stories.sort((a, b) => {
              const scoreA = getter(a, 'story.score', 0);
              const scoreB = getter(b, 'story.score', 0);
              return +(scoreA < scoreB) || +(scoreA === scoreB) -1
            });
            this.setState({ loading: 100, stories });
          });
      })
      .catch(error => {
        console.log('error', error);
      })
  }

  render() {
    const { loading, stories } = this.state;

    const storyRows = stories.map(story => {
      const {
        id,
        story: { title, url, time, score, by },
        author: { karma }
      } = story;

      return (
        <tr key={`key-${id}`}>
          <td>{title}</td>
          <td>{url}</td>
          <td>{time}</td>
          <td>{score}</td>
          <td>{by}</td>
          <td>{karma}</td>
        </tr>
      )
    })

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        { loading < 100 ? <ProgressBar now={loading} label={`${loading}%`} /> : null }
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Url</th>
              <th>time</th>
              <th>score</th>
              <th>by</th>
              <th>karma</th>
            </tr>
          </thead>
          <tbody>
            {storyRows}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
