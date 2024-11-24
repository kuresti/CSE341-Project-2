/* *********************************
 * Required assets
 * *********************************/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const env = require('dotenv');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./database/connectDb');



/* **********************************
 * DotEnv configuration
 * **********************************/
env.config()

/* **********************************
 * Routes
 * **********************************/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use(bodyParser.json());
app.use('/', require('./routes/index.js'));

/* **********************************
 * MiddleWare 
 * **********************************/
// Error Handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
    res.status(err.statusCode).json({
        message: err.message,
    });
});

/* **********************************
 * Port server is listening to
 * **********************************/
const port = process.env.PORT || 3000;

/* **********************************
 * Connect MongoDB
 * **********************************/
mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Connected to DB and listening on ${port}`);
        });
        
    }
});
