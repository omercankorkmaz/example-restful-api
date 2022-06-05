const mongoose = require('mongoose');
require('dotenv').config();

const countryDb = require('./country.db');
const BaseError = require('../utils/base-error');


const connectionString = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`

mongoose.connect(connectionString, {
    user: process.env.MONGODB_USERNAME,
    pass: process.env.MONGODB_PASSWORD,
    dbName: process.env.MONGODB_DBNAME,
    authSource: 'admin'
}).then(res => {
}).catch(error => {
    throw {
        message: 'mongodb connection error',
        ...error,
    }
})

const db = mongoose.connection;

db.on('error', (error) => {
    throw {
        message: 'mongodb connection error',
        ...error,
    }
});

db.once('open', () => {
  console.log('db connection open');
});

module.exports = {
    countryDb
}