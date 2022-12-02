const { mongoose } = require("mongoose");
const express = require("express");
const {join} = require("path");
const session = require("express-session");
var bodyParser = require('body-parser');


const routes = require('./routes/route');

const app = express();

app.set('view engine', 'ejs');
app.set('views', join(__dirname,'views'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(express.static(join(__dirname,'public','css')));
app.use(express.static(join(__dirname,'public','img')));
app.use(express.static(join(__dirname,'public','scripts')));

const oneDay = 1000 * 60 * 60 * 24;

app.use(session({
    secret: 'secret-key',
    cookie: {
        sameSite: 'strict',
        maxAge: oneDay
    },
    resave: false,
    saveUninitialized: false,
}));

app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(routes);

app.listen(3080);
console.log("Listening on port 3080");