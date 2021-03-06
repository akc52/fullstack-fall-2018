'use strict';

const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// when /users is hit, let routes/users.js handle the request
app.use('/users', require('./routes/users'))
// when /posts is hit, let routes/posts.js handle the request
app.use('/posts', require('./routes/posts'))

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    const errors = [
      { message: 'unauthorized' },
    ];

    res.status(401).json({ errors });
  }
});

module.exports = app;
