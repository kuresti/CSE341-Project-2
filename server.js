/* *********************************
 * Required assets
 * *********************************/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const env = require('dotenv');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./database/connectDb');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');


/* **********************************
 * DotEnv configuration
 * **********************************/
env.config()

/* **********************************
 * Routes
 * **********************************/
app.use(bodyParser.json());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true , 
}))
// This is the basic express session({...}) initialization.
app.use(passport.initialize())
// init passport on every route call.
app.use(passport.session())
// allow passport to use "express-session".
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
app.use(cors({ origin: '*'}))

app.use('/', require('./routes/index.js'));

/* **********************************
 * MiddleWare 
 * **********************************/
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
    //User.findOrCreate({ githubid: profile.id}, function (err, user)) {
        return done(null, profile);
    //});
}
));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });

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
