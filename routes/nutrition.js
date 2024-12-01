/* *******************************
 * Required Resources
 * *******************************/
const express = require('express');
const router = express.Router();
const nutritionCont = require('../controllers/nutrition');
const validate = require('../validation/validate');
const { handleErrors } = require('../utilities/validation');
const { isAuthenticated } = require('../utilities/authenticate');

/* *******************************
 * Get Routes
 * *******************************/
router.get('/', nutritionCont.getAll);

router.get('/:id', nutritionCont.getSingle);

/* *******************************
 * POST Routes
 * *******************************/
router.post(
    '/', 
    isAuthenticated,
    validate.nutritionRules(),
    validate.validateNutrition,
    nutritionCont.createNewNutrition
)

/* *******************************
 * PUT Routes
 * *******************************/
router.put('/:id', 
    isAuthenticated,
    validate.nutritionRules(),
    validate.validateNutrition,
    nutritionCont.updateNutrition
)

/* *******************************
 * DELETE Routes
 * *******************************/
router.delete('/:id', 
    isAuthenticated,
    nutritionCont.deleteNutrition);

router.use(handleErrors)    
module.exports = router;