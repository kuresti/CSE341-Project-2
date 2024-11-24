/* *******************************
 * Required Resources
 * *******************************/
const express = require('express');
const router = express.Router();
const nutritionCont = require('../controllers/nutrition');
const validate = require('../validation/validate');
const { handleErrors } = require('../utilities/validation');

/* *******************************
 * Get Routes
 * *******************************/
router.get('/', handleErrors(nutritionCont.getAll));

router.get('/:id', handleErrors(nutritionCont.getSingle));

/* *******************************
 * POST Routes
 * *******************************/
router.post(
    '/', 
    validate.nutritionRules(),
    validate.validateNutrition,
    handleErrors(nutritionCont.createNewNutrition)
)

/* *******************************
 * PUT Routes
 * *******************************/
router.put('/:id', 
    validate.nutritionRules(),
    validate.validateNutrition,
    handleErrors(nutritionCont.updateNutrition)
)

/* *******************************
 * DELETE Routes
 * *******************************/
router.delete('/:id', handleErrors(nutritionCont.deleteNutrition));

module.exports = router;