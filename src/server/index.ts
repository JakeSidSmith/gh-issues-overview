import axios, { AxiosError } from 'axios';
import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';
import fs from 'fs';
import mustache from 'mustache';
import path from 'path';
import queryString from 'query-string';
import uuid from 'uuid/v4';

const SECURE = process.env.NODE_ENV === 'production';
const APP_URL = 'https://gh-issues-overview.herokuapp.com/';
const UTF8 = 'utf8';
const PORT = typeof process.env.PORT === 'undefined' ? 7777 : process.env.PORT;

const app = express();

const INDEX_TEMPLATE = fs.readFileSync(path.resolve(__dirname, '../../templates/index.html'), UTF8);

app.use(cookieParser());

const handleUnauthorized = (request: Request, response: Response) => {
  const state = uuid();
  const gitHubUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}` +
    `&redirect_uri=${APP_URL}` +
    `&state=${state}`;

  response.clearCookie('github-token');
  response.cookie('state', state, { httpOnly: true, secure: SECURE });
  response.send(mustache.render(INDEX_TEMPLATE, {GITHUB_URL: gitHubUrl}));
};

const handleAuthorized = (request: Request, response: Response) => {
  const { access_token } = queryString.parse(request.cookies['github-token']);

  axios.request({
    method: 'GET',
    url: `https://api.github.com/applications/${process.env.GITHUB_CLIENT_ID}/tokens/${access_token}`,
    auth: {
      username: process.env.GITHUB_CLIENT_ID || '',
      password: process.env.GITHUB_CLIENT_SECRET || '',
    },
  })
    .then(() => {
      response.clearCookie('state');
      response.send(mustache.render(INDEX_TEMPLATE, {AUTHORIZED: true}));
    })
    .catch((error) => {
      console.error(error);
      handleUnauthorized(request, response);
    });
};

const handleAccessToken = (request: Request, response: Response) => {
  axios.request({
    method: 'POST',
    url: 'https://github.com/login/oauth/access_token',
    params: {
      client_id: process.env.GITHUB_CLIENT_ID,
      redirect_uri: APP_URL,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      state: request.query.state,
      code: request.query.code,
    },
  })
  .then((res) => {
    response.cookie('github-token', res.data, { httpOnly: true, secure: SECURE });
    response.clearCookie('state');
    response.redirect('/');
  })
  .catch((error) => {
    console.error(error);
    response.clearCookie('state');
    response.send(mustache.render(INDEX_TEMPLATE, {ERROR_MESSAGE: error.message}));
  });
};

app.use('/api', (request, response) => {
  const cookieParams = queryString.parse(request.cookies['github-token']);

  axios.request({
    url: `https://api.github.com${request.url}`,
    method: request.method,
    params: cookieParams,
  })
    .then((res) => {
      const headerKeys = Object.keys(res.headers);

      headerKeys.forEach((key) => {
        response.header(key, res.headers[key]);
      });

      response.send(res.data);
    })
    .catch((error: AxiosError) => {
      response.status(error.response ? error.response.status : 0);
      response.send(error.response ? error.response.data : {message: error.message});
    });
});

app.post('/logout', (request, response) => {
  const { access_token } = queryString.parse(request.cookies['github-token']);

  axios.request({
    method: 'DELETE',
    url: `https://api.github.com/applications/${process.env.GITHUB_CLIENT_ID}/tokens/${access_token}`,
    auth: {
      username: process.env.GITHUB_CLIENT_ID || '',
      password: process.env.GITHUB_CLIENT_SECRET || '',
    },
  })
    .then(() => {
      response.clearCookie('github-token');
      response.redirect('/');
    })
    .catch((error) => {
      console.error(error);
      response.send(mustache.render(INDEX_TEMPLATE, {ERROR_MESSAGE: error.message}));
    });
});

app.get('/', (request, response) => {
  if (request.cookies['github-token']) {
    handleAuthorized(request, response);
  } else if (request.query.code && request.query.state && request.cookies.state === request.query.state) {
    handleAccessToken(request, response);
  } else {
    handleUnauthorized(request, response);
  }
});

app.use(express.static(path.resolve(__dirname, '../../static')));
app.use(express.static(path.resolve(__dirname, '../../dist')));

app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});
