var passport = require('passport');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var userDb = mongoose.model('users');
var config = require('../../config');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

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

module.exports.getToken = function (req, res) {
	console.log(`${req.body.username} + ${req.body.password}`); // "sarah" -> dd0ea4c984 bearer
    var username = req.body.username.toLowerCase();
    var password = req.body.password.toLowerCase();
    userDb.find({
        username: username,
        password: encrypt(password)
    },
        { password: 0 },
        function (err, data) {
            if (err) {
                res.json(err);
            }
            if (data.length > 0) {
                let user = data[0];
                let token = jwt.sign({
                    sub: user._id,
                    username: user.username,
                    exp: Math.floor(Date.now() / 1000) + (60),
                    issuer: config.issuer,
                    audience: config.audience
                }, config.secretOrKey);
                res.json({ "access_token": token });
            }
            else {
                res.json({ "message": "User doesn't exist!" })
            }
        });
};

module.exports.getTempToken = function (req, res) {
    let user = {_id: '5944aeca6f6cf104a61bacc4', username: 'alex'};
    let token = jwt.sign({
        sub: user._id,
        username: user.username,
        exp: Math.floor(Date.now() / 1000) + (60),
        issuer: config.issuer,
        audience: config.audience
    }, config.secretOrKey);
    res.json({ "access_token": token });
};