/* ********************************
 * Required Resources
 * ********************************/
const swaggerAutogen = require('swagger-autogen')

/* *********************************
 * Creating swagger doc
 * *********************************/
const doc = {
    info: {
        title: 'Recipe API',
        description: 'Recipe API'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);