var express = require('express');
var router = express.Router();
var passport = require('passport');

var ctrlUsers = require('../controllers/users')

router.get('/user', ctrlUsers.getUser);
router.get('/users', passport.authenticate('jwt-bearer', { session: false }), ctrlUsers.getUsers);

router.post('/token', function(req, res){
        console.log(`${req.body.username} + ${req.body.password}`);
        var username = req.body.username.toLowerCase();
        var password = req.body.password.toLowerCase();
        userDb.find({
                username: username,
                password: encrypt(password)
            },
                { password: 0 },
                function (err, data) {
                    if(err){
                        res.json(err);
                    }
                    if(data.length > 0){
                        let user = data[0];
                        let token = jwt.sign({ sub: user._id, 
                            username: user.username,
                            exp: Math.floor(Date.now() / 1000) + (60), 
                            issuer: config.issuer, 
                            audience: config.audience 
                        }, config.secretOrPublicKey);
                        res.json({"access_token": token});
                    }
                    else{
                        res.json({"message": "User doesn't exist!"})
                    }
                });
    });

module.exports = router;