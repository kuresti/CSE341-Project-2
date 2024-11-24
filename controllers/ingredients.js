/* *******************************
 * Required Resources
 * *******************************/
const mongodb = require('../database/connectDb');
const ObjectId = require('mongodb').ObjectId;

/* ********************************
 * Get all from CSE-Project-2 Ingredients
 * ********************************/
const getAll = async(req, res) => {
    //#swagger.tag=['Ingredients']
    const result = await mongodb.getDb().collection('ingredients').find();
    result.toArray().then((ingredients) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(ingredients);
    });
};

/* ********************************
 * Get single from CSE-Project-2 Ingredients
 * ********************************/
const getSingle = async(req, res) => {
    // #swagger.tag=['Ingredients']
    const ingredientId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('ingredients').find({ _id: ingredientId });
    result.toArray().then((ingredients) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(ingredients[0]);
    });
};

/* ********************************
 * POST Create New Ingredient
 * ********************************/
const createNewIngredient = async(req, res) => {
    // #swagger.tag=['Ingredients']
    const newIngredient = {
        ingredient_name: req.body.ingredient_name,
        ingredient_quantity: req.body.ingredient_quantity,
        ingredient_unit: req.body.ingredient_unit,
        recipe_id: req.body.recipe_id
    };
   const response = await mongodb.getDb().collection('ingredients').insertOne(newIngredient);
   if (response.acknowledged) {
    res.status(204).send();
   } else {
    res.status(500).json(response.error || 'An error occurred while creating a ingredient')
   }
};

/* ***********************************
 * PUT Update Ingredient
 * ***********************************/
const updateIngredient = async(req, res) => {
    // #swagger.tag=['Ingredients']
    const ingredientId = new ObjectId(req.params.id);
    const ingredient = {
        ingredient_name: req.body.ingredient_name,
        ingredient_quantity: req.body.ingredient_quantity,
        ingredient_unit: req.body.ingredient_unit,
        recipe_id: req.body.recipe_id
    };
    const response = await mongodb.getDb().collection('ingredients').replaceOne({_id: ingredientId}, ingredient);
    if(response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while updating the ingredient.');
    }
};

/* ***********************************
 * DELETE Ingredient
 * ***********************************/
const deleteIngredient = async(req,res) => {
    // #swagger.tag=['Ingredients']
    try {
        // Validate recipeId
        const ingredientId = req.params.id
        if (!ObjectId.isValid(ingredientId)) {
            return res.status(400).json({ error: 'Invalid ingredient ID' });
        }

        const response = await mongodb.getDb().collection('ingredients').deleteOne({ _id: new ObjectId(ingredientId) });
        if (response.deletedCount > 0) {
            res.status(204).send();
           } else {
                return res.status(400).json({ error: 'Ingredient not found' });
           }
    } catch (err) {
        console.error('Error deleting recipe:', err)
        return res.status(500).json({ error: 'An error occurred while deleting the ingredient.'})
    }  
};
 
    
   


module.exports = { getAll, getSingle, createNewIngredient, updateIngredient, deleteIngredient };