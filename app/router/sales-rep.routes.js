const express = require('express');

const salesRepController = require('../controllers/sales-rep.controller')

const router = express.Router();

router.get('/', salesRepController.getAllRequirements)

module.exports = router;