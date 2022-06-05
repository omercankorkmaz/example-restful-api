const optimalService = require('../services/optimal.service');

const getRoster = async (req, res, next) => {
    try {
        res.send(await optimalService.getRoster());
    } catch (error) {
        error = {...error, source: 'optimal.controller - getRoster'}
        next(error);
    }
}

module.exports = {
    getRoster,
}