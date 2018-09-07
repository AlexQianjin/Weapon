var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var mongoose = require('mongoose');
var config = require('../../config');
var userDb = mongoose.model('users');

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretOrKey;
// opts.issuer = config.issuer;
// opts.audience = config.audience;
console.log(opts);
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    // User.findOne({id: jwt_payload.sub}, function(err, user) {
    //     if (err) {
    //         return done(err, false);
    //     }
    //     if (user) {
    //         return done(null, user);
    //     } else {
    //         return done(null, false);
    //         // or you could create a new account
    //     }
	// });
	userDb.findById(jwt_payload.sub, function (err, user) {
		if (err) { return done(err); }
		if (!user) { return done(null, false); }
	 //    if(token.exp < Math.floor(Date.now() / 1000))
	 //    { 
	 //        return done(null, false, 'Token has expired!');
	 //    }
		return done(null, user);
	  });
}));