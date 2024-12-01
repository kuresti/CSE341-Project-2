/* *******************************
 * Required Resources
 * *******************************/
const express = require('express');
const router = express.Router();
const ingredientsCont = require('../controllers/ingredients');
const validate = require('../validation/validate');
const { handleErrors } = require('../utilities/validation');
const { isAuthenticated } = require('../utilities/authenticate');

/* *******************************
 * Get Routes
 * *******************************/
router.get('/', ingredientsCont.getAll);

router.get('/:id', ingredientsCont.getSingle);

/* *******************************
 * POST Routes
 * *******************************/
router.post(
    '/', 
    isAuthenticated,
    validate.ingredientsRules(),
    validate.validateIngredient,
    ingredientsCont.createNewIngredient
)

/* *******************************
 * PUT Routes
 * *******************************/
router.put('/:id', 
    isAuthenticated,
    validate.ingredientsRules(),
    validate.validateIngredient,
    ingredientsCont.updateIngredient
)

/* *******************************
 * DELETE Routes
 * *******************************/
router.delete('/:id', 
    isAuthenticated,
    ingredientsCont.deleteIngredient);

router.use(handleErrors)
module.exports = router;