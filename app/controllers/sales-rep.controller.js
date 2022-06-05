const salesRepService = require('../services/sales-rep.service');

const getAllRequirements = async (req, res, next) => {
    try {
        res.send(await salesRepService.getAllRequirements());
    } catch (error) {
        error = {...error, source: 'sales-rep.controller - getAllRequirements'}
        next(error);
    }
}

module.exports = {
    getAllRequirements,
}