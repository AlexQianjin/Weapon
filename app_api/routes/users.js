var express = require('express');
var router = express.Router();
var passport = require('passport');
var ctrlUsers = require('../controllers/users')

router.get('/',
        passport.authenticate('jwt-bearer', { session: false }),
        ctrlUsers.getUsers);

module.exports = router;