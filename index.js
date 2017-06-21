'use strict';
var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var passport = require('passport');
// var Strategy = require('passport-http-bearer').Strategy;
var JwtBearerStrategy = require('passport-http-jwt-bearer');

var app = express();

app.use(cors({ credentials: true, origin: true }));

// mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/loginapp/users');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://alexqintest:alexqintest@ds127962.mlab.com:27962/heroku_kr6x4m02');
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

var secretOrPublicKey = 'secret';

 passport.use(new JwtBearerStrategy(
   secretOrPublicKey,
   function(token, done) {
     User.findById(token.sub, function (err, user) {
       if (err) { return done(err); }
       if (!user) { return done(null, false); }
       return done(null, user, token);
     });
   }
 ));

var token = jwt.sign({ sub: 'bar', issuer: 'accounts.examplesoft.com', audience: 'yoursite.net' }, secretOrPublicKey);
console.log(token);
var decoded = jwt.verify(token, secretOrPublicKey);
console.log(decoded.sub);

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

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/app_client/index.html')
})

var routes = function (app) {
    app.use(bodyparser.json());
    app.get('/',
        function (req, res) {
            res.json(({ "message": "The current version of this API is v1. Please access by sending a POST request to /v1/login." }));
        });

    app.get('/login',
        passport.authenticate('jwt-bearer', { session: false }),
        function (req, res) {
            res.json(({ "message": "GET is not allowed. Please POST request with username and password." }));
        });

    app.post('/login',
        passport.authenticate('bearer', { session: false }),
        function (req, res) {
            console.log(`${req.body.username} + ${req.body.password}`);
            var username = req.body.username.toLowerCase();
            var password = req.body.password.toLowerCase();
            console.log(encrypt(password));// "sarah" -> dd0ea4c984 bearer
            userDb.find({
                username: username,
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