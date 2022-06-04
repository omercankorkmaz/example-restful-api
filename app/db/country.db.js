const countryModel = require('../models/country.model');

const find = (query) => {
    return countryModel.find(query, '-_id');
}
  
module.exports = {
    find,
}