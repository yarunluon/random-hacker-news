import 'whatwg-fetch';
import React, { Component } from 'react';
import times from 'lodash/times';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      topStories: [],
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
                  return {
                    id: storyId,
                    story: storyJson,
                    author: authorJson,
                  };
                });
            })
        }))
          .then(stories => {
            this.setState({ loading: false, stories });
          });
      })
      .catch(error => {
        console.log('error', error);
      })
  }

  render() {
    const { loading, stories } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
