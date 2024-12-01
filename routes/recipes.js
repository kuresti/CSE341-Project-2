/* *******************************
 * Required Resources
 * *******************************/
const express = require('express');
const router = express.Router();
const recipesCont = require('../controllers/recipes');
const validate = require('../validation/validate');
const { handleErrors } = require('../utilities/validation');
const { isAuthenticated } = require('../utilities/authenticate');


/* *******************************
 * Get Routes
 * *******************************/
router.get('/', recipesCont.getAll);

router.get('/:id', recipesCont.getSingle);

/* *******************************
 * POST Routes
 * *******************************/
router.post(
    '/', 
    isAuthenticated,
    validate.recipesRules(),
    validate.validateRecipes,
    recipesCont.createNewRecipe
)

/* *******************************
 * PUT Routes
 * *******************************/
router.put('/:id', 
    isAuthenticated,
    validate.recipesRules(),
    validate.validateRecipes,
    recipesCont.updateRecipe
)

/* *******************************
 * DELETE Routes
 * *******************************/
router.delete('/:id', 
    isAuthenticated,
    recipesCont.deleteRecipe)

router.use(handleErrors)
module.exports = router;