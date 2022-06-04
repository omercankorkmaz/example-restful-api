const salesRepService = require('../services/sales-rep.service');

const getAllRequirements = async (req, res, next) => {
    res.send(await salesRepService.getAllRequirements());
}

module.exports = {
    getAllRequirements,
}