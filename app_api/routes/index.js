var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/users')

router.get('/users', ctrlUsers.getUsers);
router.get('/user', ctrlUsers.getUser);

module.exports = router;