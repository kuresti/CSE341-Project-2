/* **************************
 * Required Resources
 * **************************/
const swaggerAutogen = require('swagger-autogen')();

/* **************************
 * Defines swagger doc
 * **************************/
const doc = {
    info: {
        title: 'My API',
        description: 'Recipes'
    },
    host: 'localhost:3000',
    schemes: ['https', 'http'],
};

/* ***************************
 * Routes
 * ***************************/
const outputFile = './swagger.json';
const endpointFiles = ['./routes/recipes.js']

/* ***************************
 * Generates swagger.json
 * ***************************/
swaggerAutogen(outputFile, endpointFiles, doc);