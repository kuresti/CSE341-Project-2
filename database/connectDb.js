/* **************************
 * Required Resources
 * **************************/
const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;


/* *************************
 * Connect to CSE-Project-1 DB
 * *************************/
let _db;

const initDb = (callback) => {
    if (_db) {
        console.log('Database is already initialized');
        return callback(null, _db);
    }
    MongoClient.connect(process.env.DATABASE_URL)
    .then((client) => {
        _db = client.db('CSE-Project-2');
        callback(null, _db);
    })
    .catch((err) => {
        callback(err);
    });
};

/* ***************************
 * Get CSE-Project-2 Database
 * ***************************/
const getDb = () => {
    if(!_db) {
        throw Error('Db not initialized');
    }
    return _db
};

module.exports = { initDb, getDb }