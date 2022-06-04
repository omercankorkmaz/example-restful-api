const optimalService = require('../services/optimal.service');

const getRoster = async (req, res, next) => {
    res.send(await optimalService.getRoster());
}

module.exports = {
    getRoster,
}