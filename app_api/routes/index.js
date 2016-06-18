var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/users')

router.get('/users', ctrlUsers.getUsers);

module.exports = router;