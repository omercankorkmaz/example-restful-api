const express = require('express');
const mainRouter = require('./app/router');

const app = express();

app.use('/', mainRouter);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});