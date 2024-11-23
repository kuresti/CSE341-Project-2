/* *******************************
 * Required Resources
 * *******************************/
const express = require('express');
const router = express.Router();
const recipesCont = require('../controllers/recipes');
const validate = require('../validation/validate');
const { handleErrors } = require('../utilities/validation');


/* *******************************
 * Get Routes
 * *******************************/
router.get('/', recipesCont.getAll);

router.get('/:id', handleErrors(recipesCont.getSingle));

/* *******************************
 * POST Routes
 * *******************************/
router.post(
    '/', 
    validate.recipesRules(),
    validate.validateRecipes,
   handleErrors(recipesCont.createNewRecipe)
)

/* *******************************
 * PUT Routes
 * *******************************/
router.put('/:id', 
    validate.recipesRules(),
    validate.validateRecipes,
    handleErrors(recipesCont.updateRecipe)
)

/* *******************************
 * DELETE Routes
 * *******************************/
router.delete('/:id', handleErrors(recipesCont.deleteRecipe));

module.exports = router;