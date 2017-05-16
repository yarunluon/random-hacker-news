## Table of Contents
- [Overview](#overview)
- [View hosted version](#view-hosted-version)
- [Run production version](#run-production-version)
- [Run development version](#run-development-version)
- [Original Task](#original-task)
- [Credits](#credits)

## Overview
10 random Hacker News Stories are retrieved every time the page is loaded. This page was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

### Additional features
- Instead of the actual date, a relative time is shown. E.g., 5 hours ago
- Hovering over the relative time will show the actual date.

## View hosted version
Production version of source code is hosted at: http://yarunluon.github.io/zmags/

## Run production version
Running the production code locally requires a static server.

1. After cloning the repo, go into the build directory: `cd build`
1. Start a [static server](https://gist.github.com/willurd/5720255). For example: `ruby -run -ehttpd . -p8000`
1. Open a browser and go to the local address of the server: `http://localhost:8000/`

## Run development version
Development version tested on Node 5+, 6+.
1. (Optional) `nvm install` to set the node version. Requires [nvm](https://github.com/creationix/nvm) to be installed.
1. `npm install` will install all the dependencies.
1. `npm start` will start the development server

## Original task
(Task copied below) https://www.workingnomads.co/jobs/javascript-engineer-zmags
### 10 Hacker News
For this assignment we will utilize the open hacker news API provided by Ycombinator, specifically the following API endpoints:

Topstories: https://hacker-news.firebaseio.com/v0/topstories.json

Story info: https://hacker-news.firebaseio.com/v0/item/[id].json (replace [id] with story id) Author info: https://hacker-news.firebaseio.com/v0/user/[id].json (replace [id] with user id)

More information available at: https://github.com/HackerNews/API

To complete the assignment, use client side JavaScript to fetch ten stories at random from the top stories list. Then present these stories on a web page sorted by story score ascendingly. The presentation must include:

* Story title
* Story URL
* Story timestamp
* Story score
* Author id
* Author karma score.

You will need to call all three API endpoints to collect the data, and your website should not present any data until all is collected. You are required to use JavaScript for all API communication and data handling.

## Credits
- [Create React App](https://github.com/facebookincubator/create-react-app)
- [React-Bootstrap](https://react-bootstrap.github.io/)
- [Lodash](https://lodash.com/)
- [Moment](https://momentjs.com/)
- [Whatwg-fetch polyfill](https://github.com/github/fetch)
