/* ****************************
 * Required Resources
 * ****************************/
const { body, validationResult } = require('express-validator');
const moment = require('moment');
const { ObjectId } = require('mongodb');
    const validate = {};

/* ****************************
 * Recipes Validation Rules
 * ****************************/
validate.recipesRules = () => {
    return[
        body('title')
            .isString().withMessage('Title must be a string')
            .notEmpty().withMessage('Title is required.'),

        body('author')
            .isString().withMessage('Description must be a string')
            .notEmpty().withMessage('Description is required.'),
        
        body('cooking_time')
            .matches(/^\d+-\d+$/).withMessage('Cooking time must be in the format "min-max".'),

        body('servings')
            .isInt({ gt: 0}).withMessage('Servings must be a positive integer.')
            .notEmpty().withMessage('Please include value for servings.'),

        body('materials')
            .isString().withMessage('Materials must be a string.')
            .notEmpty().withMessage('Materials is required.'),

        body('instructions')
            .isObject().withMessage('Instructions must be an object.'),

        body('instructions.to_freeze_and_cook_later')
            .isArray().withMessage('"to_freeze_and_cook_later" must be an array')
            .custom((steps) => steps.every((step) => typeof step === 'string'))
            .withMessage('Each step in "to_freeze_and_cook_later" must be a string.'),

        body('instructions.to_cook')
            .isArray().withMessage('"to_cook" must be an array.')
            .custom((steps) => steps.every((step) => typeof step === 'string'))
            .withMessage('Each step in "to-cook" must be a string.')

    ];
}

/* *******************************
 * Recipe check validation
 * *******************************/
validate.validateRecipes = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

/* ****************************
 * Ingredients Validation Rules
 * ****************************/
validate.ingredientsRules = () => {
    return[
        body('ingredient_name')
            .isString().withMessage('"ingredient_name" must be a string')
            .notEmpty().withMessage('"ingredient_name" is required.'),

        body('ingredient_quantity')
            .isFloat().withMessage('"ingredient_quantity" must be a float number.')
            .notEmpty().withMessage('"ingredient_quantity" is required.'),
        
        body('ingredient_unit')
            .isString().withMessage('"ingredient_unit" must be a string.')
            .notEmpty().withMessage('"ingredient_unit" is required.'),

        body('recipe_id')
            .notEmpty().withMessage('"recipe_id" is required')
            .bail()
            .custom((value) => {
                if(!ObjectId.isValid(value)) {
                    throw new Error('Invalid recipe_id ');
                }
                return true;
            })
    ];
}

/* *******************************
 * Ingredient check validation
 * *******************************/
validate.validateIngredient = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

/* ****************************
 * Nutrition Validation Rules
 * ****************************/
validate.nutritionRules = () => {
    return[
        body('calories')
            .isInt().withMessage('calories must be a number')
            .notEmpty().withMessage('calories is required.'),

        body('calories_unit')
            .isString().withMessage('"calories_unit" must be a string')
            .notEmpty().withMessage('"calories_unit" is required.'),
        
        body('polyunsaturated_fat')
            .isInt().withMessage('"polyunsaturated_fat" must be a number.')
            .notEmpty().withMessage('"polyunsaturated_fat" is required.'),

        body('polyunsaturated_fat_unit')
            .isString().withMessage('"polyunsaturated_fat_unit" must be a string')
            .notEmpty().withMessage('"polyunsaturated_fat_unit" is required.'),

        body('potassium')
            .isInt().withMessage('potassium must be a number')
            .notEmpty().withMessage('potassium is required'),

        body('potassium_unit')
            .isString().withMessage('"potassium_unit" must be a string')
            .notEmpty().withMessage('"potassium_unit" is required'),
        
        body('carbohydrates')
            .isInt().withMessage('carbohydrates must be a number')
            .notEmpty().withMessage('carbohydrates is required'),

        body('carbohydrates_unit')
            .isString().withMessage('"carbohydrates_unit" must be a string')
            .notEmpty().withMessage('"carbohydrates_unit" is required'),

        body('monounsaturated_fat')
            .isInt().withMessage('"monounsaturated_fat" must be a number')
            .notEmpty().withMessage('"monounsaturated_fat" is required'),
        
        body('monounsaturated_fat_unit')
            .isString().withMessage('"monounsaturated_fat_unit" must be a string')
            .notEmpty().withMessage('"monounsaturated_fat_unit" is required'),

        body('fiber')
            .isInt().withMessage('fiber must be a number')
            .notEmpty().withMessage('fiber is required'),

        body('fiber_unit')
            .isString().withMessage('"fiber_unit" must be a string')
            .notEmpty().withMessage('"fiber_unit" is required'),

        body('protein')
            .isInt().withMessage('protein must be a number')
            .notEmpty().withMessage('protein is required'),

        body('protein_unit')
            .isString().withMessage('"protein_unit" must be a string')
            .notEmpty().withMessage('"protein_unit" is required'),

        body('fat')
            .isInt().withMessage('fat must be a number')
            .notEmpty().withMessage('fat is required'),

        body('fat_unit')
            .isString().withMessage('"fat_unit" must be a string')
            .notEmpty().withMessage('"fat_unit" is required'),

        body('recipe_id')
            .notEmpty().withMessage('"recipe_id" is required')
            .bail()
            .custom((value) => {
                if(!ObjectId.isValid(value)) {
                    throw new Error('Invalid recipe_id ');
                }
                return true;
            })
    ];
}


/* *******************************
 * Nutrition check validation
 * *******************************/
validate.validateNutrition = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}


module.exports = validate