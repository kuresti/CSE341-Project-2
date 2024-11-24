/* *******************************
 * Required Resources
 * *******************************/
const express = require('express');
const router = express.Router();
const ingredientsCont = require('../controllers/ingredients');
const validate = require('../validation/validate');
const { handleErrors } = require('../utilities/validation');

/* *******************************
 * Get Routes
 * *******************************/
router.get('/', handleErrors(ingredientsCont.getAll));

router.get('/:id', handleErrors(ingredientsCont.getSingle));

/* *******************************
 * POST Routes
 * *******************************/
router.post(
    '/', 
    validate.ingredientsRules(),
    validate.validateIngredient,
    handleErrors(ingredientsCont.createNewIngredient)
)

/* *******************************
 * PUT Routes
 * *******************************/
router.put('/:id', 
    validate.ingredientsRules(),
    validate.validateIngredient,
    handleErrors(ingredientsCont.updateIngredient)
)

/* *******************************
 * DELETE Routes
 * *******************************/
router.delete('/:id', handleErrors(ingredientsCont.deleteIngredient));

module.exports = router;