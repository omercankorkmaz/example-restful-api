const countryService = require('../services/country.service');

const find = (req, res, next) => {

    // using only following line also satifies condition but
    // if u use name parameter also filters the result by name attribute 
    // instead of getting all countries
    // findByQuery(req, res, next) 
    
    // according to `without the region parameter it should return all country documents`
    if (req.query.region) findByQuery(req, res, next) 
    else findAll(req, res, next)

}

const findAll = async (req, res, next) => {
    try {
        res.send(await countryService.find());
    } catch (error) {
        next(error);
    }
}

const findByQuery = async (req, res, next) => {
    try {
        res.send(await countryService.find(req.query));
    } catch (error) {
        next(error);
    }
}

module.exports = {
    find,
}