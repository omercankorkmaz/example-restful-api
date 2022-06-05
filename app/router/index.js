const express = require('express')

const countryRoutes = require('./country.routes');
const salesRepRoutes = require('./sales-rep.routes');
const optimalRoutes = require('./optimal.routes');

const mainRouter = express.Router();

mainRouter.use('/countries', countryRoutes);
mainRouter.use('/salesrep', salesRepRoutes);
mainRouter.use('/optimal', optimalRoutes);

module.exports = mainRouter;