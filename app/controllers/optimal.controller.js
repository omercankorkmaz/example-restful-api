const optimalService = require('../services/optimal.service');

const getRoster = async (req, res, next) => {
    try {
        res.send(await optimalService.getRoster());
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getRoster,
}