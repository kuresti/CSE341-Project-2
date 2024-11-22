/* ******************************
 * Required Resources
 * ******************************/
const routes = require('express').Router();

/* ******************************
 *  Routes
 * ******************************/
routes.get('/', (req, res,) => {
    //swagger.tags=['Hello world']
    res.send('Hello World');
})

/* ******************************
 * Use route for contacts CSE-Project-2/recipes
 * ******************************/
routes.use('/recipes', require('./recipes'));



module.exports = routes;