/* *******************************
 * Required Resources
 * *******************************/
const mongodb = require('../database/connectDb');
const ObjectId = require('mongodb').ObjectId;

/* ********************************
 * Get all from CSE-Project-2 Nutrition
 * ********************************/
const getAll = async(req, res) => {
    // #swagger.tag=['Nutrition']
    const result = await mongodb.getDb().collection('nutrition').find();
    result.toArray().then((nutrition) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(nutrition);
    });
};

/* ********************************
 * Get single from CSE-Project-2 Nutrition
 * ********************************/
const getSingle = async(req, res) => {
    // #swagger.tag=['Nutrition']
    const nutritionId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('nutrition').find({ _id: nutritionId });
    result.toArray().then((nutrition) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(nutrition[0]);
    });
};

/* ********************************
 * POST Create New Nutrition
 * ********************************/
const createNewNutrition = async(req, res) => {
    // #swagger.tag=['Nutrition']
    const newNutrition = {
        calories: req.body.calories,
        calories_unit: req.body.calories_unit,
        polyunsaturated_fat: req.body.polyunsaturated_fat,
        polyunsaturated_fat_unit: req.body.polyunsaturated_fat_unit,
        potassium: req.body.potassium,
        potassium_unit: req.body.potassium_unit,
        carbohydrates: req.body.carbohydrates,
        carbohydrates_unit: req.body.carbohydrates_unit,
        monounsaturated_fat: req.body.monounsaturated_fat,
        monounsaturated_fat_unit: req.body.monounsaturated_fat_unit,
        fiber: req.body.fiber,
        fiber_unit: req.body.fiber_unit,
        protein: req.body.protein,
        protein_unit: req.body.protein_unit,
        fat: req.body.fat,
        fat_unit: req.body.fat_unit,
        recipe_id: req.body.recipe_id
    };
   const response = await mongodb.getDb().collection('nutrition').insertOne(newNutrition);
   if (response.acknowledged) {
    res.status(204).send();
   } else {
    res.status(500).json(response.error || 'An error occurred while creating a nutrition')
   }
};

/* ***********************************
 * PUT Update Nutrition
 * ***********************************/
const updateNutrition = async(req, res) => {
    // #swagger.tag=['Nutrition']
    const nutritionId = new ObjectId(req.params.id);
    const nutrition = {
        calories: req.body.calories,
        calories_unit: req.body.calories_unit,
        polyunsaturated_fat: req.body.polyunsaturated_fat,
        polyunsaturated_fat_unit: req.body.polyunsaturated_fat_unit,
        potassium: req.body.potassium,
        potassium_unit: req.body.potassium_unit,
        calcium: req.body.calcium,
        calcium_unit: req.body.calcium_unit,
        carbohydrates: req.body.carbohydrates,
        carbohydrates_unit: req.body.carbohydrates_unit,
        monounsaturated_fat: req.body.monounsaturated_fat,
        monounsaturated_fat_unit: req.body.monounsaturated_fat_unit,
        fiber: req.body.fiber,
        fiber_unit: req.body.fiber_unit,
        protein: req.body.protein,
        protein_unit: req.body.protein_unit,
        fat: req.body.fat,
        fat_unit: req.body.fat_unit,
        recipe_id: req.body.recipe_id
    };
    const response = await mongodb.getDb().collection('nutrition').replaceOne({_id: nutritionId}, nutrition);
    if(response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while updating the nutrition.');
    }
};

/* ***********************************
 * DELETE Nutrition
 * ***********************************/
const deleteNutrition = async(req,res) => {
    // #swagger.tag=['Nutrition']
    try {
        // Validate recipeId
        const nutritionId = req.params.id
        if (!ObjectId.isValid(nutritionId)) {
            return res.status(400).json({ error: 'Invalid nutrition ID' });
        }

        const response = await mongodb.getDb().collection('nutrition').deleteOne({ _id: new ObjectId(nutritionId) });
        if (response.deletedCount > 0) {
            res.status(204).send();
           } else {
                return res.status(400).json({ error: 'Nutrition not found' });
           }
    } catch (err) {
        console.error('Error deleting nutrition:', err)
        return res.status(500).json({ error: 'An error occurred while deleting the nutrition.'})
    }  
};

module.exports = { getAll, getSingle, createNewNutrition, updateNutrition, deleteNutrition };