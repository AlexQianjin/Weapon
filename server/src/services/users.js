var userDb = require('../models/users');

module.exports.getUser = name => {
	return new Promise((resolve, reject) => {
		userDb.findOne({ username: name }, { password: 0 }, function(err, data) {
			if (err) {
				reject(err);
			}
			if (data) {
				resolve(data);
			} else {
				resolve({ message: 'User doesnot exist!' });
			}
		});
	});
};

module.exports.getUsers = () => {
	return new Promise((resolve, reject) => {
		userDb.find({}, { password: 0 }, function(err, data) {
			if (err) {
				reject(err);
			}
			if (data.length > 0) {
				resolve(data);
			} else {
				resolve({ message: 'User doesnot exist!' });
			}
		});
	});
};
