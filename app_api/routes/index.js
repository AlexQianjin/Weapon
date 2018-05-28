var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../config/passport');

var ctrlUsers = require('../controllers/users');
var ctrlAuth = require('../controllers/authentication');

router.get('/user', ctrlUsers.getUser);
router.get('/users', passport.authenticate('jwt-bearer', { session: false }), ctrlUsers.getUsers);
// router.get('/users', ctrlUsers.getUsers);

router.post('/token', ctrlAuth.getToken);
router.get('/token', ctrlAuth.getTempToken);

module.exports = router;