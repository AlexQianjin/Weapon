'use strict';
var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var config = require('./config');
require('./app_api/models/db');

var app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'public')));

console.log(app.get('env'));

// var token = jwt.sign({ sub: 'bar', issuer: config.issuer, audience: config.audience }, config.secretOrKey);
// var token = jwt.sign({ sub: 'bar' }, config.secretOrKey);
// console.log(token);
// var decoded = jwt.verify(token, config.secretOrKey);
// console.log(decoded.sub);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/app_client/index.html')
});

var routesApi = require('./app_api/routes/index');
app.use('/v1', routesApi);

var port = 5000;
app.listen(process.env.PORT || port, function () {
    console.log('server listening on port ' + (process.env.PORT ||
        port));
});

// var routes = function (app) {
//     app.get('/',
//         function (req, res) {
//             res.json(({ "message": "The current version of this API is v1. Please access by sending a POST request to /v1/login." }));
//         });

//     app.get('/login',
//         passport.authenticate('jwt', { session: false }),
//         function (req, res) {
//             res.json(({ "message": "GET is not allowed. Please POST request with username and password." }));
//         });
// }

// var router = express.Router();
// routes(router);