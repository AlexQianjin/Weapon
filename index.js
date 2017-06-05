'use strict';
var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;
var app = express();

app.use(cors({ credentials: true, origin: true }));

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/loginapp/users');

var appToken = '1234567890';
passport.use(new Strategy(
    function (token, cb) {
        //console.log(token);
        if (token === appToken) {
            return cb(null, true);
        }
        return cb(null, false);
    })
);

var userSchema = new mongoose.Schema({
    id: String,
    username: String,
    password: String
});
var userDb = mongoose.model('users', userSchema);

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = '2vdbhs4Gttb2';

function encrypt(text) {
    var cipher = crypto.createCipher(algorithm, password)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}
function decrypt(text) {
    var decipher = crypto.createDecipher(algorithm, password)
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}

var routes = function (app) {
    app.use(bodyparser.json());
    app.get('/',
        function (req, res) {
            res.json(({ "message": "The current version of this API is v1. Please access by sending a POST request to /v1/login." }));
        });

    app.get('/login',
        passport.authenticate('bearer', { session: false }),
        function (req, res) {
            res.json(({ "message": "GET is not allowed. Please POST request with username and password." }));
        });

    app.post('/login',
        passport.authenticate('bearer', { session: false }),
        function (req, res) {
            var username = req.body.username.toLowerCase();
            var password = req.body.password.toLowerCase();
            userDb.find({
                login: username,
                password: encrypt(password)
            },
                { password: 0 },
                function (err, data) {
                    res.json(data);
                });
        });
}

var router = express.Router();
routes(router);
app.use('/v1', router);

var port = 5000;
app.listen(process.env.PORT || port, function () {
    console.log('server listening on port ' + (process.env.PORT ||
        port));
});