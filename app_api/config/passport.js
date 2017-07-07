var passport = require('passport');
var JwtBearerStrategy = require('passport-http-jwt-bearer');
var mongoose = require('mongoose');
var config = require('../../config');
var userDb = mongoose.model('users');
// var User = mongoose.model('users');
// var userDb = new User();

passport.use(new JwtBearerStrategy(
   config.secretOrPublicKey,
   function(token, done) {
     userDb.findById(token.sub, function (err, user) {
       if (err) { return done(err); }
       if (!user) { return done(null, false); }
    //    if(token.exp < Math.floor(Date.now() / 1000))
    //    { 
    //        return done(null, false, 'Token has expired!');
    //    }
       return done(null, user, token);
     });
   }
 ));