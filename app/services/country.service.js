const { countryDb } = require('../db');
const BaseError = require('../utils/base-error');

const find = (query) => {
    try {
        if (query) {
            if (query.region && query.region !== '') {
                return countryDb.find({ region: { $regex: new RegExp(query.region, "i") } });
            } else {
                throw new BaseError({
                    ...error,
                    message: 'Region parameter is missing',
                })
            }
        } else if (!query) {
            return countryDb.find(query);
        }
    } catch (error) {
        throw new BaseError({
            ...error,
            message: 'Error on finding countries',
        })
    }
}

module.exports = {
    find,
}