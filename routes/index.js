/* ******************************
 * Required Resources
 * ******************************/
const express = require('express');
const router = require('express').Router();
const passport = require('passport')


/* ******************************
 *  Routes
 * ******************************/
// router.get('/', (req, res,) => {
//     //swagger.tags=['Hello world']
//     res.send('Hello World');
// })

// Login route
router.get('/login', passport.authenticate('github'), (req, res) => {});

// Logout route
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

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

/* ******************************
 * Use route for CSE-Project-2/nutrition
 * ******************************/
router.use('/nutrition', require('./nutrition'));



module.exports = router;