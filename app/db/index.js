const mongoose = require('mongoose');
const countryDb = require('./country.db');
require('dotenv').config();

const connectionString = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`

mongoose.connect(connectionString, {
    user: process.env.MONGODB_USERNAME,
    pass: process.env.MONGODB_PASSWORD,
    dbName: process.env.MONGODB_DBNAME,
    authSource: 'admin'
});

var db = mongoose.connection;

db.on('error', (error) => {
    console.log(error);
});

db.once('open', () => {
  console.log('db connection open');
});

module.exports = {
    countryDb
}