const countryDb = require('../db/country.db');

const find = (query) => {
    try {
        if (query) {
            if (query.region && query.region !== '') {
                return countryDb.find({ region: { $regex: new RegExp(query.region, "i") } });
            } else {
                throw {
                    ...error,
                    message: error.message,
                    desc: 'Region parameter is missing',
                    source: 'country.service - findByQuery',
                }
            }
        } else if (!query) {
            return countryDb.find(query);
        }
    } catch (error) {
        throw {
            ...error,
            message: error.message,
            desc: 'Error on finding countries',
            source: 'country.service - findAll',
        }
    }
}

module.exports = {
    find,
}