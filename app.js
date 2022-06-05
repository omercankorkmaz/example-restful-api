const express = require('express');
const process = require('node:process');
const fs = require('fs');

const mainRouter = require('./app/router');
const { logErrorMiddleware, sendErrorMiddleware } = require('./app/middleware')

const app = express();

const PROTOCOL = 'http';
const HOSTNAME = '127.0.0.1';
const PORT = 3000;

app.use('/', mainRouter);

app.use((req, res, next) => {
  let response = {
    statusCode: 404,
    statusText: 'Not Found',
    message: `${PROTOCOL}://${HOSTNAME}:${PORT}${req.url}`,
  };

  if (req.url === '/') {
    response = {
      'Endpoints': {
        'All countries': `${PROTOCOL}://${HOSTNAME}:${PORT}/countries`,
        'Countries by region': `${PROTOCOL}://${HOSTNAME}:${PORT}/countries?region=REGION_NAME`,
        'Tepresentative requirements': `${PROTOCOL}://${HOSTNAME}:${PORT}/salesrep`,
        'Country distribution each representative': `${PROTOCOL}://${HOSTNAME}:${PORT}/optimal`,
      }
    }
  }

  res.status(404).send(response);
});

app.use(logErrorMiddleware)
app.use(sendErrorMiddleware)

app.listen(PORT, (err, res) => {
  if (err) {
    console.log(`error on listening ${PORT}`);
    return;
  }
  console.log(`${PROTOCOL}://${HOSTNAME}:${PORT}`);
});

process
  .on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at Promise:\n',reason);
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });

module.exports = app;