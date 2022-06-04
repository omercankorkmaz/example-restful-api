const { countryDb } = require('../db');

const find = (query) => {
    return countryDb.find(query);
}

module.exports = {
    find,
}