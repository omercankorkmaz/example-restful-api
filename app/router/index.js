const express = require('express')
const mainRouter = express.Router();
const countryRoutes = require('./country.routes');
const salesRepRoutes = require('./sales-rep.routes');
const optimalRoutes = require('./optimal.routes');

mainRouter.use('/countries', countryRoutes);
mainRouter.use('/salesrep', salesRepRoutes);
mainRouter.use('/optimal', optimalRoutes);

module.exports = mainRouter;