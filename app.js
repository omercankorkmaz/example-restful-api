const express = require('express');
const process = require('node:process');
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();

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
        'Representative requirements each region': `${PROTOCOL}://${HOSTNAME}:${PORT}/salesrep`,
        'Country distribution each representative': `${PROTOCOL}://${HOSTNAME}:${PORT}/optimal`,
      }
    }
  }

  res.status(404).send(response);
});

app.use(logErrorMiddleware)
app.use(sendErrorMiddleware)

app.on('ready', () => {
  app.listen(PORT, (err, res) => {
    if (err) {
      console.log(`error on listening ${PORT}`);
      return;
    }
    console.log('APP IS READY ON: ',`${PROTOCOL}://${HOSTNAME}:${PORT}`);
  });
})

process
  .on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at Promise:\n',reason);
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    // process.exit(1);
  });


// DB CONNECTION

console.log('WAITING FOR DB CONNECTION');
  
const connectionString = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`

mongoose.connect(connectionString, {
    user: process.env.MONGODB_USERNAME,
    pass: process.env.MONGODB_PASSWORD,
    dbName: process.env.MONGODB_DBNAME,
    authSource: 'admin',
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(res => {
}).catch(error => {
    throw {
        ...error,
        source: 'mongodb connection',
        message: error.message,
    }
})

const db = mongoose.connection;

db.on('error', (error) => {
    throw {
        ...error,
        source: 'mongodb connection',
        message: error.message,
    }
});

db.once('open', () => {
    app.emit('ready');
    console.log('DB CONNECTION OK');
});

module.exports = app;