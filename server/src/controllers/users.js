var userService = require('../services/users');
var utils = require('../utils/utils');

module.exports.getUser = async function(req, res) {
	// let password = utils.encrypt('alex');
	// let de = utils.decrypt(password);
	// var user = {"id":3, "name":"AlexQin", "password":password, "de": de};
	// utils.sendJSONresponse(res, 200, user);

	// userDb.find({ username: 'alex' }, { password: 0 }, function(err, data) {
	// 	if (err) {
	// 		res.json(err);
	// 	}
	// 	if (data.length > 0) {
	// 		res.json(data);
	// 	} else {
	// 		res.json({ message: 'User doesnot exist!' });
	// 	}
	// });
	try {
		let data = await userService.getUser('alex');
		utils.sendJSONresponse(res, 200, data);
	} catch (error) {
		utils.sendJSONresponse(res, 401, error);
	}
};

module.exports.getUsers = async function(req, res) {
	try {
		let data = await userService.getUsers();
		utils.sendJSONresponse(res, 200, data);
	} catch (error) {
		utils.sendJSONresponse(res, 401, error);
	}
};
