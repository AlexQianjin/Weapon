var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/',
        passport.authenticate('jwt-bearer', { session: false }),
        function (req, res) {
            userDb.find({
            }, { password: 0 }, function (err, data) {
                    if(err){
                        res.json(err);
                    }
                    if(data.length > 0){
                        res.json(data);
                    }
                    else{
                        res.json({"message": "User doesn't exist!"})
                    }
                });
        });

module.exports = router;