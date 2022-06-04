const express = require('express');
const countryController = require('../controllers/country.controller')

const router = express.Router();

router.get('/', countryController.find)

module.exports = router;