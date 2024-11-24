/* ****************************
 * Required Resources
 * ****************************/
const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

/* ****************************
 * Routes
 * ****************************/
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router