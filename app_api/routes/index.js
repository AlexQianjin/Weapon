var express = require('express');
var router = express.Router();
var passport = require('passport');

var ctrlUsers = require('../controllers/users');
var ctrlAuth = require('../controller/authentication');

router.get('/user', ctrlUsers.getUser);
router.get('/users', passport.authenticate('jwt-bearer', { session: false }), ctrlUsers.getUsers);

router.post('/token', ctrlAuth.getToken);

module.exports = router;