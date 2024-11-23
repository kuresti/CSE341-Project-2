/* ******************************
 * Required Resources
 * ******************************/
const express = require('express');
const router = require('express').Router();


/* ******************************
 *  Routes
 * ******************************/
router.get('/', (req, res,) => {
    //swagger.tags=['Hello world']
    res.send('Hello World');
})

// Swagger route
router.use('/', require('./swagger'));


/* ******************************
 * Use route for recipes CSE-Project-2/recipes
 * ******************************/
router.use('/recipes', require('./recipes'));

/* ******************************
 * Use route for CSE-Project-2/ingredients
 * ******************************/
router.use('/ingredients', require('./ingredients'));



module.exports = router;