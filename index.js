'use strict';
var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var passport = require('passport');
// var Strategy = require('passport-http-bearer').Strategy;
var JwtBearerStrategy = require('passport-http-jwt-bearer');
var config = require('./config');
require('./app_api/models/db');

var app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'public')));

// var dbURI = process.env.MONGOLAB_URI || 'mongodb://localhost/loginapp/users';
// if (process.env.NODE_ENV === 'production') {
//     dbURI = process.env.MONGOLAB_URI || 'mongodb://alexqintest:alexqintest@ds127962.mlab.com:27962/heroku_kr6x4m02';
// }
// mongoose.connect(dbURI);
// console.log(dbURI);
console.log(app.get('env'));

// var appToken = '1234567890';
// passport.use(new Strategy(
//     function (token, cb) {
//         //console.log(token);
//         if (token === appToken) {
//             return cb(null, true);
//         }
//         return cb(null, false);
//     })
// );

var token = jwt.sign({ sub: 'bar', issuer: config.issuer, audience: config.audience }, config.secretOrPublicKey);
console.log(token);
var decoded = jwt.verify(token, config.secretOrPublicKey);
console.log(decoded.sub);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/app_client/index.html')
})

var routes = function (app) {
    app.get('/',
        function (req, res) {
            res.json(({ "message": "The current version of this API is v1. Please access by sending a POST request to /v1/login." }));
        });

    app.get('/login',
        passport.authenticate('jwt-bearer', { session: false }),
        function (req, res) {
            res.json(({ "message": "GET is not allowed. Please POST request with username and password." }));
        });

    // app.post('/login',
    //     passport.authenticate('bearer', { session: false }),
    //     function (req, res) {
    //         console.log(`${req.body.username} + ${req.body.password}`);
    //         var username = req.body.username.toLowerCase();
    //         var password = req.body.password.toLowerCase();
    //         console.log(encrypt(password));// "sarah" -> dd0ea4c984 bearer
    //         userDb.find({
    //             username: username,
    //             password: encrypt(password)
    //         },
    //             { password: 0 },
    //             function (err, data) {
    //                 res.json(data);
    //             });
    //     });
    
    // app.post('/token', function(req, res){
    //     console.log(`${req.body.username} + ${req.body.password}`);
    //     var username = req.body.username.toLowerCase();
    //     var password = req.body.password.toLowerCase();
    //     userDb.find({
    //             username: username,
    //             password: encrypt(password)
    //         },
    //             { password: 0 },
    //             function (err, data) {
    //                 if(err){
    //                     res.json(err);
    //                 }
    //                 if(data.length > 0){
    //                     let user = data[0];
    //                     let token = jwt.sign({ sub: user._id, 
    //                         username: user.username,
    //                         exp: Math.floor(Date.now() / 1000) + (60), 
    //                         issuer: config.issuer, 
    //                         audience: config.audience 
    //                     }, config.secretOrPublicKey);
    //                     res.json({"access_token": token});
    //                 }
    //                 else{
    //                     res.json({"message": "User doesn't exist!"})
    //                 }
    //             });
    // });

    // app.get('/users',
    //     passport.authenticate('jwt-bearer', { session: false }),
    //     function (req, res) {
    //         userDb.find({
    //         }, { password: 0 }, function (err, data) {
    //                 if(err){
    //                     res.json(err);
    //                 }
    //                 if(data.length > 0){
    //                     res.json(data);
    //                 }
    //                 else{
    //                     res.json({"message": "User doesn't exist!"})
    //                 }
    //             });
    //     });
}

// var router = express.Router();
// routes(router);
var routesApi = require('./app_api/routes/index');
app.use('/v1', routesApi);

var port = 5000;
app.listen(process.env.PORT || port, function () {
    console.log('server listening on port ' + (process.env.PORT ||
        port));
});