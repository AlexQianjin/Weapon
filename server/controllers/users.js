var mongoose = require('mongoose');
var userDb = mongoose.model('users');
var utils = require('../utils/utils');

module.exports.getUser = function (req, res) {
    // let password = utils.encrypt('alex');
    // let de = utils.decrypt(password);
    // var user = {"id":3, "name":"AlexQin", "password":password, "de": de};
    // utils.sendJSONresponse(res, 200, user);

    userDb.find({'username': 'alex'
    }, { password: 0 }, function (err, data) {
        if (err) {
            res.json(err);
        }
        if (data.length > 0) {
            res.json(data);
        }
        else {
            res.json({ "message": "User doesn't exist!" })
        }
    });
}

module.exports.getUsers = function (req, res) {
    userDb.find({
    }, { password: 0 }, function (err, data) {
        if (err) {
            res.json(err);
        }
        if (data.length > 0) {
            res.json(data);
        }
        else {
            res.json({ "message": "User doesn't exist!" })
        }
    });
};