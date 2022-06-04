const express = require('express');
const optimalController = require('../controllers/optimal.controller')

const router = express.Router();

router.get('/', optimalController.getRoster)

module.exports = router;