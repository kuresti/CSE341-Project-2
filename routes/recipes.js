/* *******************************
 * Required Resources
 * *******************************/
const express = require('express');
const router = express.Router();
const recipesCont = require('../controllers/recipes');
//onst validate = require('../validation/validation');
//const { handleErrors } = require('../utilities/validate');


/* *******************************
 * Get Routes
 * *******************************/
router.get('/', recipesCont.getAll);

router.get('/recipes/:id', recipesCont.getSingle);

/* *******************************
 * POST Routes
 * *******************************/
router.post(
    '/', 
    // validate.recipesRules(),
    // validate.validateRecipes,
   recipesCont.createNewRecipe
)
/* *******************************
 * PUT Routes
 * *******************************/
router.put('/recipes/:id', 
    // validate.recipesRules(),
    // validate.validateRecipes,
    recipesCont.updateRecipe
)
/* *******************************
 * DELETE Routes
 * *******************************/
router.delete('/recipes/:id', recipesCont.deleteRecipe);

module.exports = router;