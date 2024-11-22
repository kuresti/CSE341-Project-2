/* *******************************
 * Required Resources
 * *******************************/
const mongodb = require('../database/connectDb');
const ObjectId = require('mongodb').ObjectId;

/* ********************************
 * Get all from CSE-Project-2 Recipes
 * ********************************/
const getAll = async(req, res) => {
    // #swagger.tag=['Recipes']
    const result = await mongodb.getDb().collection('recipes').find();
    result.toArray().then((recipes) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(recipes);
    });
};

/* ********************************
 * Get single from CSE-Project-2 Recipes
 * ********************************/
const getSingle = async(req, res) => {
    // #swagger.tag=['Recipes']
    const recipeId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('recipes').find({ _id: recipeId });
    result.toArray().then((recipes) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(recipes[0]);
    });
};

/* ********************************
 * POST Create New Recipe
 * ********************************/
const createNewRecipe = async(req, res) => {
    // #swagger.tag=['Recipes']
    const newRecipe = {
        title: req.body.title,
        description: req.body.description,
        cooking_time: req.body.cooking_time,
        servings: req.body.servings,
        materials: req.body.materials,
        instructions: req.body.instructions
    };
   const response = await mongodb.getDb().collection('recipes').insertOne(newRecipe);
   if (response.acknowledged) {
    res.status(204).send();
   } else {
    res.status(500).json(response.error || 'An error occurred while creating a recipe')
   }
};

/* ***********************************
 * PUT Update Recipe
 * ***********************************/
const updateRecipe = async(req, res) => {
    // #swagger.tag=['Recipes']
    const recipeId = new ObjectId(req.params.id);
    const recipe = {
        title: req.body.title,
        description: req.body.description,
        cooking_time: req.body.cooking_time,
        servings: req.body.servings,
        materials: req.body.materials,
        instructions: req.body.instructions
    };
    const response = await mongodb.getDb().collection('recipes').replaceOne({_id: recipeId}, recipe);
    if(response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while updating the recipe.');
    }
};

/* ***********************************
 * DELETE Recipe
 * ***********************************/
const deleteRecipe = async(req,res) => {
    // #swagger.tag=['Contacts']
   const recipeId = new ObjectId(req.params.id);
   const response = await mongodb.getDb().collection('recipes').deleteOne({ _id: recipeId });
   if (response.deletedCount > 0) {
    res.status(204).send();
   } else {
    res.status(500).json(response.error || 'An error occurred while deleting recipe.');
   }
};
 
    
   


module.exports = { getAll, getSingle, createNewRecipe, updateRecipe, deleteRecipe };